# EVR Photography

This project now includes a small backend layer for serving portfolio metadata to the frontend, plus a sync script that uploads your original local images to S3-compatible object storage.

## Gallery architecture

- `gallery/manifest.json` is the source of truth for titles, alt text, category labels, and ordering.
- `scripts/sync-images.js` reads the manifest and uploads matching files from `LOCAL_IMAGE_SOURCE_DIR` to `portfolio/<filename>` in your bucket.
- `api/images.js` reads the same manifest and returns frontend-ready image metadata from `GET /api/images`.
- `src/pages/Portfolio.jsx` fetches `/api/images` instead of using hardcoded Unsplash data.

## Manifest format

`gallery/manifest.json` must be a JSON array. Each entry needs:

```json
[
  {
    "filename": "wedding-ceremony.jpg",
    "title": "Wedding Ceremony",
    "alt": "Bride and groom during the wedding ceremony",
    "categorySlug": "weddings",
    "categoryLabel": "Weddings",
    "sortOrder": 1
  }
]
```

The manifest starts empty so you can fill it with your actual filenames.

## Environment variables

Copy `.env.example` into `.env.local` and update the values:

```bash
LOCAL_IMAGE_SOURCE_DIR=/absolute/path/to/your/local/images
S3_BUCKET=your-bucket-name
S3_ENDPOINT=https://your-s3-compatible-endpoint
S3_REGION=your-region
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
PUBLIC_IMAGE_BASE_URL=https://cdn.example.com/portfolio/
```

`PUBLIC_IMAGE_BASE_URL` should point to the public URL prefix for the uploaded `portfolio/` folder.

## Commands

```bash
npm install
npm run test
npm run sync:images
npm run build
```

Use `vercel dev` when you want the Vercel function and SPA rewrites available locally.

## API response

`GET /api/images`

```json
{
  "categories": [
    { "slug": "weddings", "label": "Weddings" }
  ],
  "images": [
    {
      "id": "wedding-ceremony",
      "title": "Wedding Ceremony",
      "alt": "Bride and groom during the wedding ceremony",
      "categorySlug": "weddings",
      "categoryLabel": "Weddings",
      "src": "https://cdn.example.com/portfolio/wedding-ceremony.jpg"
    }
  ]
}
```
