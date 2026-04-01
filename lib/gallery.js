import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED_FIELDS = [
  'filename',
  'title',
  'alt',
  'categorySlug',
  'categoryLabel',
  'sortOrder',
];

const CATEGORY_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PROJECT_ROOT = path.resolve(__dirname, '..');
export const GALLERY_MANIFEST_PATH = path.join(PROJECT_ROOT, 'gallery', 'manifest.json');

export class GalleryConfigError extends Error {
  constructor(message, { statusCode = 500, cause } = {}) {
    super(message, { cause });
    this.name = 'GalleryConfigError';
    this.statusCode = statusCode;
  }
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function normalizeStringField(entry, fieldName, index) {
  const value = entry[fieldName];

  if (!isNonEmptyString(value)) {
    throw new GalleryConfigError(
      `Gallery manifest entry ${index + 1} is missing a valid "${fieldName}" value.`,
      { statusCode: 500 },
    );
  }

  return value.trim();
}

export function deriveImageId(filename) {
  return path.parse(filename).name;
}

function normalizeSortOrder(value, index) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new GalleryConfigError(
      `Gallery manifest entry ${index + 1} must provide a numeric "sortOrder".`,
      { statusCode: 500 },
    );
  }

  return value;
}

function normalizeEntry(entry, index) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    throw new GalleryConfigError(
      `Gallery manifest entry ${index + 1} must be an object.`,
      { statusCode: 500 },
    );
  }

  for (const fieldName of REQUIRED_FIELDS) {
    if (!(fieldName in entry)) {
      throw new GalleryConfigError(
        `Gallery manifest entry ${index + 1} is missing required field "${fieldName}".`,
        { statusCode: 500 },
      );
    }
  }

  const filename = normalizeStringField(entry, 'filename', index);
  const title = normalizeStringField(entry, 'title', index);
  const alt = normalizeStringField(entry, 'alt', index);
  const categorySlug = normalizeStringField(entry, 'categorySlug', index);
  const categoryLabel = normalizeStringField(entry, 'categoryLabel', index);
  const sortOrder = normalizeSortOrder(entry.sortOrder, index);

  if (path.basename(filename) !== filename) {
    throw new GalleryConfigError(
      `Gallery manifest entry ${index + 1} must use a filename only; nested paths are not allowed.`,
      { statusCode: 500 },
    );
  }

  if (!CATEGORY_SLUG_PATTERN.test(categorySlug)) {
    throw new GalleryConfigError(
      `Gallery manifest entry ${index + 1} has an invalid "categorySlug". Use lowercase letters, numbers, and hyphens only.`,
      { statusCode: 500 },
    );
  }

  const id = deriveImageId(filename);

  if (!isNonEmptyString(id)) {
    throw new GalleryConfigError(
      `Gallery manifest entry ${index + 1} must derive a valid image id from "${filename}".`,
      { statusCode: 500 },
    );
  }

  return {
    id,
    filename,
    title,
    alt,
    categorySlug,
    categoryLabel,
    sortOrder,
  };
}

export function validateManifestEntries(entries) {
  if (!Array.isArray(entries)) {
    throw new GalleryConfigError('Gallery manifest must be a JSON array.', {
      statusCode: 500,
    });
  }

  const seenFilenames = new Set();
  const seenIds = new Set();
  const normalizedEntries = entries.map((entry, index) => {
    const normalizedEntry = normalizeEntry(entry, index);

    if (seenFilenames.has(normalizedEntry.filename)) {
      throw new GalleryConfigError(
        `Duplicate filename "${normalizedEntry.filename}" found in gallery manifest.`,
        { statusCode: 500 },
      );
    }

    if (seenIds.has(normalizedEntry.id)) {
      throw new GalleryConfigError(
        `Duplicate image id "${normalizedEntry.id}" found in gallery manifest. Filenames must have unique basenames.`,
        { statusCode: 500 },
      );
    }

    seenFilenames.add(normalizedEntry.filename);
    seenIds.add(normalizedEntry.id);

    return normalizedEntry;
  });

  return normalizedEntries.sort((left, right) => {
    if (left.sortOrder !== right.sortOrder) {
      return left.sortOrder - right.sortOrder;
    }

    return left.title.localeCompare(right.title);
  });
}

export async function readGalleryManifest(manifestPath = GALLERY_MANIFEST_PATH) {
  let manifestSource;

  try {
    manifestSource = await fs.readFile(manifestPath, 'utf8');
  } catch (error) {
    throw new GalleryConfigError(
      `Unable to read gallery manifest at ${manifestPath}.`,
      { statusCode: 500, cause: error },
    );
  }

  let parsedManifest;

  try {
    parsedManifest = JSON.parse(manifestSource);
  } catch (error) {
    throw new GalleryConfigError(
      `Gallery manifest at ${manifestPath} must contain valid JSON.`,
      { statusCode: 500, cause: error },
    );
  }

  return validateManifestEntries(parsedManifest);
}

export function normalizePublicImageBaseUrl(publicImageBaseUrl) {
  if (!isNonEmptyString(publicImageBaseUrl)) {
    throw new GalleryConfigError(
      'PUBLIC_IMAGE_BASE_URL must be configured before serving gallery images.',
      { statusCode: 500 },
    );
  }

  const normalizedBaseUrl = publicImageBaseUrl.trim().endsWith('/')
    ? publicImageBaseUrl.trim()
    : `${publicImageBaseUrl.trim()}/`;

  try {
    return new URL(normalizedBaseUrl).toString();
  } catch (error) {
    throw new GalleryConfigError(
      'PUBLIC_IMAGE_BASE_URL must be a valid absolute URL.',
      { statusCode: 500, cause: error },
    );
  }
}

export function buildImageUrl(filename, publicImageBaseUrl) {
  const baseUrl = normalizePublicImageBaseUrl(publicImageBaseUrl);
  return new URL(encodeURIComponent(filename), baseUrl).toString();
}

export function buildGalleryCategories(entries) {
  const categories = [];
  const seenSlugs = new Set();

  for (const entry of validateManifestEntries(entries)) {
    if (seenSlugs.has(entry.categorySlug)) {
      continue;
    }

    seenSlugs.add(entry.categorySlug);
    categories.push({
      slug: entry.categorySlug,
      label: entry.categoryLabel,
    });
  }

  return categories;
}

export function createGalleryResponse({
  manifestEntries,
  publicImageBaseUrl,
  category,
}) {
  const normalizedEntries = validateManifestEntries(manifestEntries);
  const normalizedCategory = typeof category === 'string' ? category.trim() : '';
  const categories = buildGalleryCategories(normalizedEntries);

  const filteredEntries = normalizedCategory && normalizedCategory !== 'all'
    ? normalizedEntries.filter((entry) => entry.categorySlug === normalizedCategory)
    : normalizedEntries;

  return {
    categories,
    images: filteredEntries.map((entry) => ({
      id: entry.id,
      title: entry.title,
      alt: entry.alt,
      categorySlug: entry.categorySlug,
      categoryLabel: entry.categoryLabel,
      src: buildImageUrl(entry.filename, publicImageBaseUrl),
    })),
  };
}
