# Interactive Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a lightweight, accessible `/resume/` page that exposes the supplied engineering experience and lets visitors highlight missions by skill without hiding context.

**Architecture:** Resume content lives as structured data in `content/site.cjs`; `build.cjs` renders the page, shared navigation changes and no-JavaScript-readable mission content. `site.js` progressively enhances skill highlighting and per-experience expansion, while targeted selectors in `site.css` preserve the existing design system.

**Tech Stack:** Existing dependency-free Node.js static generator, semantic HTML, CSS, vanilla JavaScript, `verify.cjs`.

**Spec:** `C:/Users/jaddi/.codex/attachments/a9e963cf-aa48-422f-acf3-45c007f37e80/Texte collé.txt` plus the supplied content in `C:/Users/jaddi/.codex/attachments/212da782-8ffc-4da5-abb4-8b748218c6e9/Texte collé.txt`.

## Global Constraints

- Work only in this repository and add no framework or dependency.
- Preserve the current visual identity and existing downloadable CV.
- Use the supplied copy, mission IDs, tags, mappings and claims without adding confidential values.
- Skill counts must be derived from mission tags.
- Unrelated missions stay visible while filtering; matching hidden detail missions become visible automatically.
- Maintain keyboard access, `aria-pressed`, `aria-expanded`, visible focus and reduced-motion support.

## Review Focus

- JavaScript disabled: all missions and links remain available and the page stays understandable.
- Filter plus manual expansion: clearing a filter restores the visitor's prior expansion choices.
- Mobile width: skills precede experience, controls wrap and no horizontal overflow occurs.
- Data integrity: duplicate IDs, unknown tags or broken project links fail verification.
- Existing navigation and PDF download continue to resolve from every route depth.

---

### Task 1: Resume data and structural verification

**Files:**
- Modify: `content/site.cjs`
- Modify: `verify.cjs`

**Interfaces:**
- Produces: `data.resumePage` with `skills`, `experiences`, `education`, `distinction` and `toolset`.
- Mission shape: `{ id, text, tags, visibility }` where visibility is `summary` or `detail`.

- [ ] Add failing assertions for six skills, unique mission IDs, valid tags and visibility values, derived counts, education/toolset copy and valid related-project IDs.
- [ ] Run `rtk node verify.cjs` and confirm the Resume assertions fail because `resumePage` is absent.
- [ ] Add the exact supplied Resume content to `content/site.cjs`.
- [ ] Run `rtk node verify.cjs`; structural data assertions pass while route assertions still fail.

### Task 2: Route, navigation and About integration

**Files:**
- Modify: `build.cjs`
- Modify: `verify.cjs`
- Generate: `resume/index.html`
- Generate: `dist/resume/index.html`
- Generate: navigation/footer/About HTML pages through the existing build.

**Interfaces:**
- Consumes: `data.resumePage`.
- Produces: semantic Resume HTML with data attributes used by progressive enhancement.

- [ ] Add failing route/render assertions for the hero, sections, controls, counts, project links, navigation, footer, About callout and existing PDF URL.
- [ ] Render `/resume/` with the exact page order and copy; insert Resume into shared navigation and footer, and update only the About Resume callout.
- [ ] Run the build and verification until all static structure and link assertions pass.

### Task 3: Progressive interaction and targeted styling

**Files:**
- Modify: `site.js`
- Modify: `site.css`
- Modify: `verify.cjs`

**Interfaces:**
- Consumes: `[data-resume]`, `[data-skill]`, `[data-mission]`, `[data-experience]`, `[data-expand-experience]`.
- Produces: one active skill at a time, mission match/dim states, automatic detail reveal and independent manual expansion state.

- [ ] Add browser assertions for toggling a skill, counts, automatic matching-detail reveal, clear filter, repeated-click clearing and `aria-expanded` behaviour.
- [ ] Implement the Resume controller in vanilla JavaScript without affecting existing project filters or menu behaviour.
- [ ] Add scoped desktop/mobile/print CSS using existing tokens; preserve visible focus and reduced-motion behaviour.
- [ ] Run the full verification suite and production build.

### Task 4: Visual and regression verification

**Files:**
- Modify only files from Tasks 1–3 if visual defects require correction.

- [ ] Inspect `/resume/` at desktop and mobile widths with screenshots.
- [ ] Check layout order, sticky behaviour, wrapping, mission readability, highlighted/dimmed contrast and horizontal overflow.
- [ ] Re-run `rtk node build.cjs` and `rtk node verify.cjs` after any correction.
- [ ] Review changed files and confirm no unrelated content or styling changed.
