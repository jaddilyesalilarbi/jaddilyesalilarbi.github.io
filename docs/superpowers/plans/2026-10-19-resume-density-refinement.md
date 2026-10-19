# Resume Density Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing Resume short by default and detailed on demand without removing mission data or changing the global site design.

**Architecture:** Keep `content/site.cjs` as the mission source, `build.cjs` as the static renderer and `site.js` as progressive enhancement. Encode the summary/detail boundary in mission data, derive expansion labels and skill counts at runtime, and scope all layout changes to Resume selectors in `site.css`.

**Tech Stack:** CommonJS content/build scripts, static HTML, vanilla JavaScript, CSS, Node assertions and Playwright browser QA.

**Spec:** `C:/Users/jaddi/.codex/attachments/734e8613-0ded-4941-8cf7-4585b45981bf/Texte collé.txt`

## Global Constraints

- Keep every detailed Resume mission in the content source.
- Do not rewrite engineering claims except the explicitly requested Teaching consolidation.
- Do not alter project pages, Work, Expertise, Services, global identity, footer, CV or About content.
- Default visible missions must be Navier 4, EPFL Solar Boat 4 and Teaching 2.
- Skill counts remain derived from mission tags; filters temporarily reveal matching details without changing manual expansion state.
- Preserve keyboard access, visible focus, `aria-pressed`, `aria-expanded` and reduced-motion behavior.

## Design Direction

- **Color:** retain the existing `--paper`, `--ink`, `--muted`, `--line` and `--surface` tokens; add no accent color.
- **Type:** retain the current site families and hierarchy; mission text stays at readable body size.
- **Layout:** left-aligned editorial grid, approximately 70% Experience and 30% sticky Skills.

```text
Desktop                              Mobile
Experience              Skills      Skills strip
  header                selector    Experience
  4 / 4 / 2 summaries   counts      Education
  reveal control        status      Toolset
  compact work links                CTA
```

- **Principles:** the page's distinctive interaction is evidence-by-skill, not decoration. Avoid cards, shadows and new visual chrome; use hierarchy, rules and whitespace.
- **Brief review:** the initial risk was reproducing a generic sidebar/card layout. The revised direction keeps the site’s existing editorial language and spends visual emphasis only on the skill-to-evidence interaction.

## Review Focus

- A selected skill must reveal matching detail missions while leaving summary non-matches visible and subdued.
- Clearing a skill must restore each experience’s prior manual expansion state.
- Expansion labels must reflect the number of missions currently hidden by that control.
- The sticky desktop skill panel must remain visible while scrolling inside the Resume section and become non-sticky on mobile.
- Mobile must preserve the same 4/4/2 default mission limits and place Skills before Experience in visual and DOM order.

---

### Task 1: Summary hierarchy and mission data

**Files:**
- Modify: `verify.cjs`
- Modify: `content/site.cjs`

**Interfaces:**
- Consumes: `resumePage.experiences[].missions[].visibility`
- Produces: exact 4/4/2 summary sets with all other missions retained as detail

- [ ] Add assertions for the exact visible summary IDs and the 4/4/2 counts.
- [ ] Run `rtk node verify.cjs` and confirm failure on the existing 5/5/3 data.
- [ ] Change only the relevant visibility values and consolidate the two requested Teaching summaries.
- [ ] Rebuild and run the static verification to green.

### Task 2: Expansion and filter behavior

**Files:**
- Modify: `verify.cjs`
- Modify: `site.js`
- Modify: `build.cjs`

**Interfaces:**
- Consumes: mission visibility and skill tags from Task 1
- Produces: dynamic `Show X more missions`, `Show less`, compact related links and reversible filter/expansion state

- [ ] Add browser assertions for initial 4/4/2 visibility, dynamic labels, expand/collapse, all six filters and state restoration.
- [ ] Run browser verification and confirm the new expectations fail.
- [ ] Implement the minimal rendering and state logic required by those assertions.
- [ ] Rebuild and run browser verification to green.

### Task 3: Resume-only responsive hierarchy

**Files:**
- Modify: `verify.cjs`
- Modify: `site.css`
- Generated: `resume/index.html`, `dist/resume/index.html`

**Interfaces:**
- Consumes: Resume markup from Task 2
- Produces: 70/30 desktop layout, bounded sticky skills, compact related work, two-column education/toolset and mobile skill strip

- [ ] Add layout assertions at 1440, 1280 and 390 px, including sticky behavior and mobile default mission count.
- [ ] Run browser verification and confirm the layout expectations fail where the current CSS differs.
- [ ] Implement scoped Resume CSS without changing global tokens or components.
- [ ] Run the production build and full static/browser suite.
- [ ] Inspect full-page screenshots at all three target widths and correct only demonstrated Resume defects.

### Task 4: Final review

**Files:**
- Review all files changed by Tasks 1–3.

**Interfaces:**
- Consumes: complete implementation and verification evidence
- Produces: independent review findings and one severity-gated fix pass if required

- [ ] Request a fresh code review against the supplied spec.
- [ ] Apply Critical/Important fixes using RED→GREEN tests; defer Minor findings explicitly.
- [ ] Run a fresh production build and the complete verification suite before reporting completion.
