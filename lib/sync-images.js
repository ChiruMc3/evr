import fs from 'node:fs/promises';
import path from 'node:path';

import { GalleryConfigError, PROJECT_ROOT, validateManifestEntries } from './gallery.js';

const CONTENT_TYPE_BY_EXTENSION = new Map([
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp'],
  ['.avif', 'image/avif'],
]);

function parseEnvFile(source) {
  const values = {};

  for (const rawLine of source.split(/\r?\n/u)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

export async function loadProjectEnvFiles(projectRoot = PROJECT_ROOT) {
  const shellDefinedKeys = new Set(Object.keys(process.env));
  const filenames = ['.env', '.env.local'];

  for (const filename of filenames) {
    const filePath = path.join(projectRoot, filename);

    try {
      const source = await fs.readFile(filePath, 'utf8');
      const parsedValues = parseEnvFile(source);

      for (const [key, value] of Object.entries(parsedValues)) {
        if (!shellDefinedKeys.has(key)) {
          process.env[key] = value;
        }
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new GalleryConfigError(`Unable to load environment file ${filePath}.`, {
          statusCode: 500,
          cause: error,
        });
      }
    }
  }
}

export function requireEnv(names, env = process.env) {
  const missingNames = names.filter((name) => {
    const value = env[name];
    return typeof value !== 'string' || value.trim().length === 0;
  });

  if (missingNames.length > 0) {
    throw new GalleryConfigError(
      `Missing required environment variables: ${missingNames.join(', ')}.`,
      { statusCode: 500 },
    );
  }

  return Object.fromEntries(
    names.map((name) => [name, env[name].trim()]),
  );
}

export function buildS3ObjectKey(filename) {
  return `portfolio/${filename}`;
}

export function getContentTypeForFilename(filename) {
  const extension = path.extname(filename).toLowerCase();
  return CONTENT_TYPE_BY_EXTENSION.get(extension) || 'application/octet-stream';
}

async function assertDirectoryExists(directoryPath) {
  let stat;

  try {
    stat = await fs.stat(directoryPath);
  } catch (error) {
    throw new GalleryConfigError(
      `LOCAL_IMAGE_SOURCE_DIR does not exist: ${directoryPath}.`,
      { statusCode: 500, cause: error },
    );
  }

  if (!stat.isDirectory()) {
    throw new GalleryConfigError(
      `LOCAL_IMAGE_SOURCE_DIR must point to a directory: ${directoryPath}.`,
      { statusCode: 500 },
    );
  }
}

export async function createUploadPlan({
  manifestEntries,
  localImageSourceDir,
}) {
  if (typeof localImageSourceDir !== 'string' || localImageSourceDir.trim().length === 0) {
    throw new GalleryConfigError('LOCAL_IMAGE_SOURCE_DIR must be provided.', {
      statusCode: 500,
    });
  }

  const resolvedDirectory = path.resolve(localImageSourceDir.trim());
  await assertDirectoryExists(resolvedDirectory);

  const normalizedEntries = validateManifestEntries(manifestEntries);

  return Promise.all(
    normalizedEntries.map(async (entry) => {
      const sourcePath = path.join(resolvedDirectory, entry.filename);

      let stat;

      try {
        stat = await fs.stat(sourcePath);
      } catch (error) {
        throw new GalleryConfigError(
          `Missing source image for "${entry.filename}" in ${resolvedDirectory}.`,
          { statusCode: 500, cause: error },
        );
      }

      if (!stat.isFile()) {
        throw new GalleryConfigError(
          `Source path is not a file for "${entry.filename}": ${sourcePath}.`,
          { statusCode: 500 },
        );
      }

      return {
        id: entry.id,
        filename: entry.filename,
        key: buildS3ObjectKey(entry.filename),
        sourcePath,
        contentType: getContentTypeForFilename(entry.filename),
      };
    }),
  );
}
