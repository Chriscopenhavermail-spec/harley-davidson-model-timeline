# Harley-Davidson Interactive Model Timeline

## Overview

A React app for exploring major Harley-Davidson motorcycle models from 1903 to present.

## Features

- Interactive model timeline
- Graphical production overview chart with year-based model bars
- Hover details and click-to-open behavior on production bars
- Filter by era, decade, engine, model family, and motorcycle type
- Search by model, engine, year, or keyword
- Detailed model evolution timelines
- Motorcycle image thumbnails in model cards
- Large motorcycle image support in model detail views
- Optional 360-degree spin viewer
- Static image fallback
- Compare models

## Running Locally

```bash
npm install
npm run dev
```

## Sharing Publicly

This is a static Vite app. Run `npm run build` and deploy the generated `dist` folder to any static host.

Included deployment options:

- Netlify: import the repo and use `netlify.toml`.
- Vercel: import the repo and use `vercel.json`.
- GitHub Pages: push to a GitHub repo, enable Pages using GitHub Actions, then use `.github/workflows/deploy-pages.yml`.

Build settings for any static host:

```txt
Build command: npm run build
Publish directory: dist
```

## Data

Model data lives in:

`/src/data/harleyModels.ts`

Era data lives in:

`/src/data/eras.ts`

## Adding a Model

Add a new `HarleyModel` object using the existing type structure.

Each model should include at least one `changeTimeline` entry.

Models with significant changes should include multiple timeline entries.

## 360-Degree Image Support

Each model can optionally include a `spin360` object with a sequence of image frames.

When those frames are available, the model detail view displays a drag-to-rotate 360-degree motorcycle viewer.

If 360 images are not available, the app falls back to the standard model image.

Only use 360 image assets that are licensed, public-domain, user-supplied, or otherwise permitted for use.

## Image Notes

Use licensed, public-domain, user-supplied, or properly credited image sources.

Harley-Davidson names and trademarks belong to Harley-Davidson.

## Footer

Built as a historical reference timeline. Harley-Davidson names and trademarks belong to Harley-Davidson.
