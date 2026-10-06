# Portfolio Content Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore missing hero, expertise, experiences, and projects content from V1 into the current data-driven architecture while preserving all modern improvements (dynamic rendering, GitHub integration, structured data).

**Architecture:** The current portfolio uses a `data.js` file with structured portfolio metadata (hero pitch, skills taxonomy, experiences, projects). A new `script.js` will dynamically render all sections from this data, implement skill filtering, and restore full interactivity from V1.

**Tech Stack:** Vanilla JavaScript, HTML5, CSS3 (no frameworks, data-driven templates)

---

## File Structure

**Files to modify:**
- `script.js` — Complete rewrite: render hero, skills, experiences, projects; implement filtering
- `index.html` — Already has correct structure with placeholder IDs; no changes needed
- `styles.css` — Already complete; no changes needed
- `data.js` — Already has all hero/skill/experience/project data; no changes needed

**No new files needed** — architecture is already in place.

---

## Comparison: V1 vs Current

### MISSING in Current Version:
1. **Hero Section**
   - ❌ Hero title ("Design structures lighter, more reliable, more readable...")
   - ❌ Hero pitch/introduction paragraph
   - ✅ Buttons present, illustration present

2. **Expertise Section**
   - ❌ Skill buttons not generated (empty container)
   - ❌ Skill category labels missing
   - ❌ Skill filtering not working
   - ❌ Skill detail panel not updating on click

3. **Experiences Section**
   - ❌ No experience cards rendered
   - ❌ No expandable details
   - ❌ No filtering by skill

4. **Projects Section**
   - ❌ No project cards rendered
   - ❌ No featured project styling

5. **Behavior**
   - ❌ No dynamic rendering from data.js
   - ❌ No event listeners for skill filtering
   - ❌ No expand/collapse for experiences

### PRESERVED in Current Version:
- ✅ Modern HTML structure with semantic IDs
- ✅ Clean CSS with responsive layout
- ✅ data.js with complete, structured content (11 skills, 3 experiences, 7 projects)
- ✅ GitHub integration (repo configured)
- ✅ Contact info updated (jadd-engineering.com, not example.com)

---

## Implementation Tasks

### Task 1: Populate Hero Section (Title & Pitch)

**Files:**
- Modify: `script.js:1-30`

**Step 1: Add helper function to safely set text**

```javascript
function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}
```

**Step 2: Populate hero on DOMContentLoaded**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  setText('#hero-title', 'Design structures lighter, more reliable, more readable.');
  setText('#hero-pitch', portfolioData.about.pitch);
});
```

**Step 3: Run and verify**

Open page. Should see:
- Hero title visible: "Design structures lighter..."
- Hero pitch visible (from data.js about.pitch)
- No console errors

**Step 4: Test**

```bash
# Open browser console (F12)
# Verify no errors
# Reload page
# Check title and pitch appear
```

**Step 5: Commit**

```bash
git add script.js
git commit -m "feat: populate hero section from data.js"
```

---

### Task 2: Generate Skill Buttons Dynamically

**Files:**
- Modify: `script.js:40-100`

**Step 1: Create skill button generator function**

```javascript
function renderSkillButtons() {
  const container = document.getElementById('skill-buttons-container');
  const skills = portfolioData.skills;
  
  skills.forEach(skill => {
    const button = document.createElement('button');
    button.className = 'skill';
    button.setAttribute('data-skill', skill.id);
    button.setAttribute('aria-pressed', 'false');
    
    // Create button text: skill name + category in span
    button.textContent = skill.name + ' ';
    const countSpan = document.createElement('span');
    countSpan.textContent = skill.proficiency;
    button.appendChild(countSpan);
    
    button.addEventListener('click', () => updateSkillFilter(skill.id));
    container.appendChild(button);
  });
  
  // Update count on "All Skills" button
  const allButton = document.querySelector('.skill[data-skill="all"]');
  if (allButton) {
    const span = allButton.querySelector('span');
    if (span) span.textContent = skills.length;
  }
}
```

**Step 2: Call function on page load**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  setText('#hero-title', 'Design structures lighter, more reliable, more readable.');
  setText('#hero-pitch', portfolioData.about.pitch);
  renderSkillButtons();
});
```

**Step 3: Test in browser**

F12 Console: Should show no errors. Page should display:
- All 11 skill buttons in left column
- Each with proficiency level (Expert/Advanced/Intermediate)
- "All Skills" button showing count: 11

**Step 4: Commit**

```bash
git add script.js
git commit -m "feat: generate skill buttons from data.js"
```

---

### Task 3: Implement Skill Filtering

**Files:**
- Modify: `script.js:100-170`

**Step 1: Create skill filter function**

```javascript
function updateSkillFilter(selectedSkill) {
  // Update button states
  document.querySelectorAll('.skill').forEach(button => {
    const isActive = button.dataset.skill === selectedSkill;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  // Filter experiences
  document.querySelectorAll('.experience').forEach(exp => {
    if (selectedSkill === 'all') {
      exp.hidden = false;
    } else {
      const expSkills = exp.dataset.skills ? exp.dataset.skills.split(' ') : [];
      exp.hidden = !expSkills.includes(selectedSkill);
    }
  });

  // Update detail panel
  updateSkillDetail(selectedSkill);
}
```

**Step 2: Create detail panel updater**

```javascript
function updateSkillDetail(skillId) {
  const panel = document.getElementById('skill-detail');
  if (!panel) return;
  
  // Clear previous content
  while (panel.firstChild) {
    panel.removeChild(panel.firstChild);
  }
  
  if (skillId === 'all') {
    const label = document.createElement('p');
    label.className = 'detail-label';
    label.textContent = 'Overview';
    panel.appendChild(label);
    
    const h3 = document.createElement('h3');
    h3.textContent = 'Select a skill to see where it\'s applied.';
    panel.appendChild(h3);
    
    const p = document.createElement('p');
    p.textContent = 'This portfolio connects each skill to related experiences, projects, tools, and results.';
    panel.appendChild(p);
    
    const grid = document.createElement('div');
    grid.className = 'detail-grid';
    ['Design', 'Analysis', 'Validation'].forEach(text => {
      const span = document.createElement('span');
      span.textContent = text;
      grid.appendChild(span);
    });
    panel.appendChild(grid);
    return;
  }
  
  const skill = portfolioData.skills.find(s => s.id === skillId);
  if (!skill) return;
  
  const label = document.createElement('p');
  label.className = 'detail-label';
  label.textContent = skill.category;
  panel.appendChild(label);
  
  const h3 = document.createElement('h3');
  h3.textContent = skill.name;
  panel.appendChild(h3);
  
  const desc = document.createElement('p');
  desc.textContent = skill.description;
  panel.appendChild(desc);
  
  const grid = document.createElement('div');
  grid.className = 'detail-grid';
  skill.tools.forEach(tool => {
    const span = document.createElement('span');
    span.textContent = tool;
    grid.appendChild(span);
  });
  panel.appendChild(grid);
}
```

**Step 3: Add click listeners**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  setText('#hero-title', 'Design structures lighter, more reliable, more readable.');
  setText('#hero-pitch', portfolioData.about.pitch);
  renderSkillButtons();
  
  // Wire skill buttons
  document.querySelectorAll('.skill').forEach(button => {
    button.addEventListener('click', () => {
      updateSkillFilter(button.dataset.skill);
    });
  });
  
  // Initialize detail to "all"
  updateSkillDetail('all');
});
```

**Step 4: Test in browser**

- Click "FEA & Nonlinear Simulation" → detail updates, shows category/description/tools
- Click "All Skills" → detail resets to overview, all experiences visible
- Experiences should filter based on skill association (check data-skills attribute)

**Step 5: Commit**

```bash
git add script.js
git commit -m "feat: implement skill filtering and detail panel"
```

---

### Task 4: Generate Experience Cards Dynamically

**Files:**
- Modify: `script.js:170-270`

**Step 1: Create experience renderer**

```javascript
function renderExperiences() {
  const container = document.getElementById('experience-container');
  if (!container) return;
  
  const experiences = portfolioData.experiences;
  
  experiences.forEach(exp => {
    const article = document.createElement('article');
    article.className = 'experience';
    article.dataset.skills = exp.associatedSkills.join(' ');
    
    // Toggle button with header info
    const toggle = document.createElement('button');
    toggle.className = 'experience-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    
    const header = document.createElement('span');
    
    const period = document.createElement('small');
    period.textContent = exp.period.start + ' — ' + exp.period.end;
    header.appendChild(period);
    
    const role = document.createElement('strong');
    role.textContent = exp.role;
    header.appendChild(role);
    
    const company = document.createElement('em');
    company.textContent = exp.company;
    header.appendChild(company);
    
    toggle.appendChild(header);
    
    const icon = document.createElement('span');
    icon.className = 'toggle-icon';
    icon.textContent = '+';
    toggle.appendChild(icon);
    
    article.appendChild(toggle);
    
    // Expandable body
    const body = document.createElement('div');
    body.className = 'experience-body';
    
    const desc = document.createElement('p');
    desc.textContent = exp.description;
    body.appendChild(desc);
    
    const highlights = document.createElement('ul');
    exp.highlights.forEach(h => {
      const li = document.createElement('li');
      const strong = document.createElement('strong');
      strong.textContent = h.title + ': ';
      li.appendChild(strong);
      li.appendChild(document.createTextNode(h.details));
      highlights.appendChild(li);
    });
    body.appendChild(highlights);
    
    article.appendChild(body);
    
    // Add toggle handler
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      article.classList.toggle('open', !isExpanded);
    });
    
    container.appendChild(article);
  });
}
```

**Step 2: Call on page load**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  setText('#hero-title', 'Design structures lighter, more reliable, more readable.');
  setText('#hero-pitch', portfolioData.about.pitch);
  renderSkillButtons();
  renderExperiences();
  
  // ... rest of listeners
});
```

**Step 3: Test in browser**

- All 3 experiences visible in dark section
- Click + icon → details expand (company, role, date, highlights)
- Click again → details collapse
- Each experience shows associated skills in data-skills

**Step 4: Commit**

```bash
git add script.js
git commit -m "feat: render experience cards with expand/collapse"
```

---

### Task 5: Generate Project Cards Dynamically

**Files:**
- Modify: `script.js:270-330`

**Step 1: Create project renderer**

```javascript
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  
  const projects = portfolioData.projects;
  
  projects.forEach((proj, index) => {
    const article = document.createElement('article');
    article.className = 'project-card' + (index === 0 ? ' project-featured' : '');
    
    const type = document.createElement('p');
    type.className = 'project-type';
    type.textContent = proj.category;
    article.appendChild(type);
    
    const title = document.createElement('h3');
    title.textContent = proj.title;
    article.appendChild(title);
    
    const context = document.createElement('p');
    context.textContent = proj.context;
    article.appendChild(context);
    
    const results = document.createElement('p');
    results.style.fontSize = '0.9em';
    results.style.color = 'var(--muted)';
    const firstResult = proj.results.quantified[0] || '';
    results.textContent = firstResult;
    article.appendChild(results);
    
    const link = document.createElement('a');
    link.href = '#contact';
    link.className = 'project-link';
    link.textContent = 'View project ';
    const arrow = document.createElement('span');
    arrow.textContent = '↗';
    link.appendChild(arrow);
    article.appendChild(link);
    
    container.appendChild(article);
  });
}
```

**Step 2: Call on page load**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  setText('#hero-title', 'Design structures lighter, more reliable, more readable.');
  setText('#hero-pitch', portfolioData.about.pitch);
  renderSkillButtons();
  renderExperiences();
  renderProjects();
  
  // ... rest of listeners
});
```

**Step 3: Test in browser**

- All 7 projects visible
- First project has featured styling (thicker border-top: 3px solid accent color)
- Each shows: category, title, context, first result, link

**Step 4: Commit**

```bash
git add script.js
git commit -m "feat: render project cards from data.js"
```

---

### Task 6: Final Script Assembly

**Files:**
- Review and finalize: `script.js`

**Step 1: Consolidate all DOMContentLoaded code**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero
  setText('#hero-title', 'Design structures lighter, more reliable, more readable.');
  setText('#hero-pitch', portfolioData.about.pitch);
  
  // 2. Skills & filtering
  renderSkillButtons();
  
  document.querySelectorAll('.skill').forEach(button => {
    button.addEventListener('click', () => {
      updateSkillFilter(button.dataset.skill);
    });
  });
  
  updateSkillDetail('all');
  
  // 3. Experiences
  renderExperiences();
  
  // 4. Projects
  renderProjects();
});
```

**Step 2: Verify function order**

Ensure functions are defined before use:
1. `setText()` — helper, defined first
2. `updateSkillDetail()` — used by updateSkillFilter
3. `updateSkillFilter()` — used by button listeners
4. `renderSkillButtons()` — standalone
5. `renderExperiences()` — standalone
6. `renderProjects()` — standalone

**Step 3: Test complete page**

Checklist:
- [ ] Hero title visible
- [ ] Hero pitch visible
- [ ] All 11 skills rendered
- [ ] Click skill → filters experiences, updates detail
- [ ] Click "All Skills" → restores full view
- [ ] All 3 experiences visible, expandable
- [ ] All 7 projects visible
- [ ] No console errors

**Step 4: Commit**

```bash
git add script.js
git commit -m "chore: consolidate and finalize script.js"
```

---

### Task 7: Responsive Testing

**Files:**
- Test only (no changes)

**Step 1: Test mobile (375px width)**

Browser DevTools → Toggle Device Toolbar → iPhone 12

Checklist:
- [ ] Hero title readable, wraps properly
- [ ] Skills stack in single column
- [ ] Detail panel readable
- [ ] Experiences cards full width, expandable
- [ ] Projects cards stack vertically
- [ ] All text readable, no cutoffs

**Step 2: Test tablet (768px)**

- [ ] Skills and detail in 2-column layout (should work)
- [ ] Projects in 2-column grid (or responsive grid)
- [ ] Text comfortable to read

**Step 3: Test desktop (1180px+)**

- [ ] Full 3-column project grid visible
- [ ] All layouts as designed
- [ ] No horizontal scroll

**Step 4: Browser console check**

F12 → Console tab

Expected: No red errors, all DOM renders successfully

**Step 5: Commit**

```bash
git add .
git commit -m "test: verify responsive layout across breakpoints"
```

---

### Task 8: Final Cleanup

**Files:**
- Modify: `script.js` (remove any debug code)

**Step 1: Remove debug statements**

Search for and delete all `console.log`, `console.error`, etc.

**Step 2: Verify clean code**

- No trailing whitespace
- No commented-out code
- Consistent indentation (2 spaces)

**Step 3: Final checklist before push**

- [ ] Hero title: "Design structures lighter, more reliable, more readable."
- [ ] Hero pitch: from portfolioData.about.pitch
- [ ] All 11 skills visible with proficiency labels
- [ ] Skill filtering works (click = filter + detail update)
- [ ] All 3 experiences visible, expand/collapse works
- [ ] All 7 projects visible
- [ ] Featured project (first) has accent-colored border
- [ ] Mobile: responsive single-column
- [ ] Tablet: 2-column layouts
- [ ] Desktop: full 3-column grid
- [ ] No console errors
- [ ] Footer unchanged (Jadd-Ilyes Ali Larbi)
- [ ] Contact email: jadd-engineering.com (not example.com)

**Step 4: Commit**

```bash
git add script.js
git commit -m "chore: remove debug code and verify clean final state"
```

---

## Quality Checklist

✅ **Hero:** Title + pitch from data  
✅ **Expertise:** All 11 skills, filtering, detail updates  
✅ **Experiences:** All 3 cards, expandable, linked to skills  
✅ **Projects:** All 7 cards, featured styling, results shown  
✅ **Responsive:** Mobile (375), Tablet (768), Desktop (1180)  
✅ **Secure:** No innerHTML with untrusted data; all DOM via createElement  
✅ **No console errors:** All DOM elements exist before manipulation  
✅ **No fake data:** Everything from portfolioData structure  
✅ **GitHub:** Integration preserved  

---

## Execution Options

**Plan saved.** Two ways to proceed:

**Option 1: Subagent-Driven (Recommended)**
- I dispatch a subagent per task
- Review between tasks
- Fast, parallel work

**Option 2: Inline Execution**
- I execute all tasks in this session
- One comprehensive flow
- Complete before push

Which approach?
