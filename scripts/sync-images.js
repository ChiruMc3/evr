#!/usr/bin/env node

import { createReadStream } from 'node:fs';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { readGalleryManifest } from '../lib/gallery.js';
import { createUploadPlan, loadProjectEnvFiles, requireEnv } from '../lib/sync-images.js';

async function main() {
  await loadProjectEnvFiles();

  const {
    LOCAL_IMAGE_SOURCE_DIR,
    S3_BUCKET,
    S3_ENDPOINT,
    S3_REGION,
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
  } = requireEnv([
    'LOCAL_IMAGE_SOURCE_DIR',
    'S3_BUCKET',
    'S3_ENDPOINT',
    'S3_REGION',
    'S3_ACCESS_KEY_ID',
    'S3_SECRET_ACCESS_KEY',
  ]);

  const manifestEntries = await readGalleryManifest();
  const uploadPlan = await createUploadPlan({
    manifestEntries,
    localImageSourceDir: LOCAL_IMAGE_SOURCE_DIR,
  });

  if (uploadPlan.length === 0) {
    console.log('Gallery manifest is empty. No images to upload.');
    return;
  }

  const s3Client = new S3Client({
    region: S3_REGION,
    endpoint: S3_ENDPOINT,
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID,
      secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
  });

  for (const item of uploadPlan) {
    await s3Client.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: item.key,
      Body: createReadStream(item.sourcePath),
      ContentType: item.contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }));

    console.log(`Uploaded ${item.filename} -> s3://${S3_BUCKET}/${item.key}`);
  }

  console.log(`Synced ${uploadPlan.length} image(s) to s3://${S3_BUCKET}/portfolio.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
