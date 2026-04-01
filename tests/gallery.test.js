import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createImagesResponse } from '../api/images.js';
import { GalleryConfigError, createGalleryResponse, validateManifestEntries } from '../lib/gallery.js';
import { createUploadPlan } from '../lib/sync-images.js';

const sampleManifestEntries = [
  {
    filename: 'wedding-ceremony.jpg',
    title: 'Wedding Ceremony',
    alt: 'Bride and groom during the wedding ceremony',
    categorySlug: 'weddings',
    categoryLabel: 'Weddings',
    sortOrder: 1,
  },
  {
    filename: 'portrait-session.png',
    title: 'Portrait Session',
    alt: 'Portrait session with soft natural light',
    categorySlug: 'portraits',
    categoryLabel: 'Portraits',
    sortOrder: 2,
  },
];

async function withTempDir(run) {
  const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'evr-gallery-'));

  try {
    return await run(tempDirectory);
  } finally {
    await fs.rm(tempDirectory, { recursive: true, force: true });
  }
}

async function writeManifest(manifestPath, entries) {
  await fs.writeFile(manifestPath, JSON.stringify(entries, null, 2));
}

test('validateManifestEntries rejects missing metadata', () => {
  assert.throws(
    () => validateManifestEntries([
      {
        filename: 'broken.jpg',
        title: '',
        alt: 'Missing a title',
        categorySlug: 'weddings',
        categoryLabel: 'Weddings',
        sortOrder: 1,
      },
    ]),
    (error) => (
      error instanceof GalleryConfigError
      && error.message.includes('title')
    ),
  );
});

test('validateManifestEntries rejects duplicate filenames', () => {
  assert.throws(
    () => validateManifestEntries([
      sampleManifestEntries[0],
      {
        ...sampleManifestEntries[0],
        title: 'Another Wedding Photo',
        sortOrder: 3,
      },
    ]),
    (error) => (
      error instanceof GalleryConfigError
      && error.message.includes('Duplicate filename')
    ),
  );
});

test('createUploadPlan returns upload descriptors for valid local files', async () => {
  await withTempDir(async (tempDirectory) => {
    await fs.writeFile(path.join(tempDirectory, 'wedding-ceremony.jpg'), 'jpg-bytes');
    await fs.writeFile(path.join(tempDirectory, 'portrait-session.png'), 'png-bytes');

    const uploadPlan = await createUploadPlan({
      manifestEntries: sampleManifestEntries,
      localImageSourceDir: tempDirectory,
    });

    assert.equal(uploadPlan.length, 2);
    assert.deepEqual(
      uploadPlan.map(({ key, contentType }) => ({ key, contentType })),
      [
        { key: 'portfolio/wedding-ceremony.jpg', contentType: 'image/jpeg' },
        { key: 'portfolio/portrait-session.png', contentType: 'image/png' },
      ],
    );
  });
});

test('createUploadPlan fails when a source image is missing', async () => {
  await withTempDir(async (tempDirectory) => {
    await fs.writeFile(path.join(tempDirectory, 'wedding-ceremony.jpg'), 'jpg-bytes');

    await assert.rejects(
      () => createUploadPlan({
        manifestEntries: sampleManifestEntries,
        localImageSourceDir: tempDirectory,
      }),
      (error) => (
        error instanceof GalleryConfigError
        && error.message.includes('Missing source image')
      ),
    );
  });
});

test('createGalleryResponse shapes images and categories for the frontend', () => {
  const payload = createGalleryResponse({
    manifestEntries: sampleManifestEntries,
    publicImageBaseUrl: 'https://cdn.example.com/portfolio',
  });

  assert.deepEqual(payload.categories, [
    { slug: 'weddings', label: 'Weddings' },
    { slug: 'portraits', label: 'Portraits' },
  ]);

  assert.deepEqual(payload.images[0], {
    id: 'wedding-ceremony',
    title: 'Wedding Ceremony',
    alt: 'Bride and groom during the wedding ceremony',
    categorySlug: 'weddings',
    categoryLabel: 'Weddings',
    src: 'https://cdn.example.com/portfolio/wedding-ceremony.jpg',
  });
});

test('createImagesResponse filters images by category', async () => {
  await withTempDir(async (tempDirectory) => {
    const manifestPath = path.join(tempDirectory, 'manifest.json');
    await writeManifest(manifestPath, sampleManifestEntries);

    const response = await createImagesResponse(
      new Request('https://example.com/api/images?category=weddings'),
      {
        manifestPath,
        publicImageBaseUrl: 'https://cdn.example.com/portfolio/',
      },
    );

    assert.equal(response.status, 200);

    const payload = await response.json();

    assert.deepEqual(payload.categories, [
      { slug: 'weddings', label: 'Weddings' },
      { slug: 'portraits', label: 'Portraits' },
    ]);
    assert.equal(payload.images.length, 1);
    assert.equal(payload.images[0].categorySlug, 'weddings');
    assert.equal(payload.images[0].src, 'https://cdn.example.com/portfolio/wedding-ceremony.jpg');
  });
});
