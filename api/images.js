import {
  GALLERY_MANIFEST_PATH,
  GalleryConfigError,
  createGalleryResponse,
  readGalleryManifest,
} from '../lib/gallery.js';

function createJsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...init.headers,
    },
  });
}

export async function createImagesResponse(
  request,
  {
    manifestPath = GALLERY_MANIFEST_PATH,
    publicImageBaseUrl = process.env.PUBLIC_IMAGE_BASE_URL,
  } = {},
) {
  try {
    const url = new URL(request.url);
    const manifestEntries = await readGalleryManifest(manifestPath);
    const payload = createGalleryResponse({
      manifestEntries,
      publicImageBaseUrl,
      category: url.searchParams.get('category'),
    });

    return createJsonResponse(payload, {
      headers: {
        'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    const statusCode = error instanceof GalleryConfigError ? error.statusCode : 500;
    const message = error instanceof Error
      ? error.message
      : 'Unable to load gallery images.';

    return createJsonResponse({ error: message }, { status: statusCode });
  }
}

export function GET(request) {
  return createImagesResponse(request);
}

export default GET;
