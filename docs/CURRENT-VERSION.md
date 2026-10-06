# Current version — 4 October 2026

The existing design, six main routes and five project URLs are preserved. English public content is defined in `content/site.cjs`; shared templates in `build.cjs`. `site.css` retains the palette and typography. `site.js` enhances the mobile menu and Work filters. Project details use native `details`/`summary` and work without JavaScript.

## Build and publish

Run `node build.cjs`, then `node verify.cjs`. Open the root `index.html` for local review, or serve `dist` for a publication preview. Publish **only `dist/`**. It contains rendered HTML and an explicit list of assets used by the current pages. Scripts, editorial notes, source data and archives are excluded. If a previous export contains unexpected files, the build stops rather than silently retaining or deleting them.

Netlify configuration points to `dist`. For GitHub Pages, upload `dist` as the Pages artifact; do not serve the source branch root. Remote deployment settings have not been changed by this iteration.

## Content model

- `person`: shared name, email, pitch, availability, optional `resume` and `linkedin`.
- `expertise`: five activities with concise descriptions, detailed scope and evidence references. Evidence may link to a project or a documented experience. Manufacturing links to the Solar Boat experience rather than being assigned to a FEA project.
- `services`: proposed interventions with possible outputs and related background work. They are not historical client engagements or fixed packages.
- `experience`: primary work and education, with documented contribution bullets.
- `additionalExperience`: compact secondary experience; render only records with an actual role and description.
- `projects`: common source for summaries, problem, individual contribution, optional outcome, expertise relationships and technical details. `homeOrder` balances integration, simulation and testing on Home.

The summary always shows context, problem and contribution. Unknown outcomes are omitted. `details` optionally provides descriptive technical blocks; otherwise populated legacy sections become native expandable blocks. Do not add empty sections or editorial promises to public pages.

## CV

Place the final PDF at `assets/jadd-ilyes-ali-larbi-cv.pdf`, then set `person.resume` to that repository-relative path. The generator checks that it exists and begins with a PDF signature. All `Get CV` controls then become direct PDF downloads. With no file, they remain visibly disabled and open neither an email nor a fake download. Header access remains visible with the mobile menu closed. LinkedIn is hidden until configured.

## Media and confidentiality

No new visuals were generated. Existing FEA WebP assets remain in use. Fuel-cell and integration source images, old sensitive data and the V0 backup were moved to `../portfolio-private/archive-2026-10-04/` and are recoverable there. Editorial follow-up is `../portfolio-private/EDITORIAL-FOLLOWUP.md`, outside the repository and public export.

Confidential cards use neutral placeholders; case studies omit empty hero figures. A future independent illustration must set `representative: true` and receive the caption `Illustrative example — not the original project geometry.` A representative image is not evidence of a measured project result. Never include restricted assets in the public export even if hidden in the UI.

## Verification

`node verify.cjs` checks content relationships, all local links and anchors, absence of editorial placeholders, summary ordering and the exact export file list. `node verify.cjs --browser` checks 320/375/768/1440/1920 px layouts, CV access, image decoding, filters, the mobile menu, visible keyboard focus and expandable details with and without JavaScript. It uses Playwright and installed Microsoft Edge. Set `PLAYWRIGHT_MODULE` if using a bundled runtime.
