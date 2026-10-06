# Structural V0

> Historical description, superseded by [CURRENT-VERSION.md](CURRENT-VERSION.md). The current site has five expertise activities, concise project summaries and optional technical details. Legacy sensitive material has been moved outside the repository. Publish only `dist/`; missing editorial content is tracked privately rather than displayed on public pages.

## Run and edit

This site uses static HTML, CSS and progressive-enhancement JavaScript. No framework or installation is needed to serve it. Open `index.html` directly, or serve the repository using a static HTTP server.

Edit `content/site.cjs` for public content and associations. Edit `build.cjs` for shared components and page templates, `site.css` for styling, and `site.js` for the menu and filters. Run `node build.cjs` after content or template changes. Generated HTML files are committed/deployed with the site; do not edit them manually.

Run `node verify.cjs` for link, anchor, metadata and relationship checks. With Playwright available, `node verify.cjs --browser` also checks layouts at 375, 768, 1440 and 1920 pixels, filters, mobile navigation, images and no-JavaScript navigation. Set `PLAYWRIGHT_MODULE` to an absolute module path if needed. Browser verification uses installed Microsoft Edge.

## Routes

- `/index.html`: durable profile, selected work, four expertise groups, background, two visitor paths.
- `/work/index.html`: all five projects, filterable by expertise.
- `/work/<project-id>/index.html`: shared case study template, optional sections and explicit individual contribution.
- `/expertise/index.html`: four groups and their project evidence.
- `/services/index.html`: provisional problem-oriented support areas, linked engineering work, contact.
- `/about/index.html`: experience, education, engineering approach and resume access.
- `/contact/index.html`: thesis and services email paths.
- `/404.html`: recovery links.

Explicit relative `index.html` URLs work both on static hosting and when opening the site locally. Each page has server-readable content, a unique title, meta description and a single H1. No SPA rewrite is required.

## Content model

Projects own their expertise IDs, experience ID, media and case-study sections. Services reference project IDs. Home selects projects using `selected`; Expertise and About derive project lists from associations. This prevents duplicated project copy.

`sections` supports context, problem, constraints, approach, development, physical reality, validation, outcome and contribution. Use `null` to omit non-applicable sections; an unknown outcome currently gets an explicit editorial placeholder. Do not confuse missing evidence with a non-applicable section.

Media supports a real `src`, alt text, caption, light/dark presentation and wide/portrait placeholders. `representative: true` adds the confidentiality caption. Public clearance is required before supplying restricted project imagery. Reconstructed visuals must be marked representative, never presented as original geometry or actual measured results.

Projects may also define `mediaBlocks: [{ layout: 'pair', items: [mediaA, mediaB] }]`. Supported layouts are `full` (large figure), `pair` (two figures) and `split` (figure plus `text`). Figures retain their natural aspect ratio and captions can describe annotations embedded in approved technical images. Set image `width` and `height` to the source dimensions. These blocks appear below the main project figure.

The FEA image has responsive 640/1280-pixel WebP versions. To regenerate them, run `node prepare-images.cjs` with Sharp installed or `SHARP_MODULE` pointing to its bundled module. This tool is only needed for image preparation, not building or serving pages. Original PNGs remain untouched.

## Preserved material

The previous uncommitted homepage, styling, scripts and data were copied to `docs/before-structural-v0/` before rebuilding. Original `data.js`, `script.js`, `styles.css` and all existing assets remain available but are not loaded by the V0. No existing asset was deleted. The old data contains quantitative claims that require review before reuse.

The existing composite FEA image is used for EPFL Solar Boat only, without asserting a load case or validation result. Fuel-cell and integration images are retained but excluded from public V0 pages. Navier and hydrogen case studies use explicitly labelled placeholders.

## Remaining editorial inputs

- Final case-study narratives, constraints and outcomes supported by evidence.
- Precise individual contributions and project dates.
- Approved public images and captions, including representative diagrams where needed.
- Final CV file (`person.resume`, repository-relative path) and verified LinkedIn URL (`person.linkedin`). Until then, resume buttons open a real email request and LinkedIn is labelled pending.
- Confirm that the existing contact email and experience dates remain current.
- Final art direction after structural approval.

Services intentionally have no packages, pricing, fabricated testimonials or consulting client claims. All page copy is English, consistent with the brief.
