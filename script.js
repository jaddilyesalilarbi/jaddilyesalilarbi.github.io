/**
 * PORTFOLIO SCRIPT - Initialization and interactive behavior
 */

// Helper: Safely set text content on an element
function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = text;
  }
}

// Render skill buttons from data
function renderSkillButtons() {
  const container = document.getElementById('skill-buttons-container');
  const countSpan = document.getElementById('count-all');

  if (!container || typeof portfolioData === 'undefined') {
    return;
  }

  // Generate buttons for each skill
  portfolioData.skills.forEach(skill => {
    const button = document.createElement('button');
    button.className = 'skill';
    button.setAttribute('data-skill', skill.id);
    button.setAttribute('aria-pressed', 'false');

    // Create text content: skill name + proficiency span
    const skillName = document.createTextNode(skill.name + ' ');
    const proficiencySpan = document.createElement('span');
    proficiencySpan.textContent = skill.proficiency;

    button.appendChild(skillName);
    button.appendChild(proficiencySpan);

    container.appendChild(button);
  });

  // Update "All Skills" count
  if (countSpan) {
    countSpan.textContent = portfolioData.skills.length;
  }
}

// Render experiences with data-skills attribute for filtering
function renderExperiences() {
  const container = document.getElementById('experience-container');

  if (!container || typeof portfolioData === 'undefined') {
    return;
  }

  portfolioData.experiences.forEach(exp => {
    const article = document.createElement('article');
    article.className = 'experience-card';
    article.setAttribute('data-skills', exp.associatedSkills.join(','));

    // Header with company, role, period
    const header = document.createElement('div');
    header.className = 'experience-header';

    const company = document.createElement('h3');
    company.className = 'experience-company';
    company.textContent = exp.company;

    const role = document.createElement('p');
    role.className = 'experience-role';
    role.textContent = exp.role;

    const period = document.createElement('p');
    period.className = 'experience-period';
    period.textContent = `${exp.period.start} – ${exp.period.end}`;

    header.appendChild(company);
    header.appendChild(role);
    header.appendChild(period);

    // Description
    const description = document.createElement('p');
    description.className = 'experience-description';
    description.textContent = exp.description;

    // Associated skills badges
    const skillBadges = document.createElement('div');
    skillBadges.className = 'skill-badges';
    exp.associatedSkills.forEach(skillId => {
      const skill = portfolioData.skills.find(s => s.id === skillId);
      if (skill) {
        const badge = document.createElement('span');
        badge.className = 'skill-badge';
        badge.textContent = skill.name;
        skillBadges.appendChild(badge);
      }
    });

    article.appendChild(header);
    article.appendChild(description);
    article.appendChild(skillBadges);

    container.appendChild(article);
  });
}

// Update skill filter: toggle button states and filter experiences
function updateSkillFilter(selectedSkill) {
  // Update all skill buttons
  document.querySelectorAll('.skill').forEach(button => {
    const isSelected = button.dataset.skill === selectedSkill;
    button.classList.toggle('active', isSelected);
    button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
  });

  // Filter experiences
  document.querySelectorAll('[data-skills]').forEach(experience => {
    const hasSkill = selectedSkill === 'all' ||
                     experience.dataset.skills.includes(selectedSkill);
    experience.hidden = !hasSkill;
  });

  // Update detail panel
  updateSkillDetail(selectedSkill);
}

// Update skill detail panel
function updateSkillDetail(skillId) {
  const detailPanel = document.getElementById('skill-detail');

  if (!detailPanel) return;

  // Clear previous content
  while (detailPanel.firstChild) {
    detailPanel.removeChild(detailPanel.firstChild);
  }

  if (skillId === 'all') {
    // Show default overview
    const label = document.createElement('p');
    label.className = 'detail-label';
    label.textContent = 'Overview';

    const heading = document.createElement('h3');
    heading.textContent = 'Select a skill to see where it\'s applied.';

    const description = document.createElement('p');
    description.textContent = 'This portfolio connects each skill to related experiences, projects, tools, and results.';

    const grid = document.createElement('div');
    grid.className = 'detail-grid';

    const items = ['Design', 'Analysis', 'Validation'];
    items.forEach(item => {
      const span = document.createElement('span');
      span.textContent = item;
      grid.appendChild(span);
    });

    detailPanel.appendChild(label);
    detailPanel.appendChild(heading);
    detailPanel.appendChild(description);
    detailPanel.appendChild(grid);
  } else {
    // Find and display selected skill
    const skill = portfolioData.skills.find(s => s.id === skillId);
    if (skill) {
      const label = document.createElement('p');
      label.className = 'detail-label';
      label.textContent = skill.category;

      const heading = document.createElement('h3');
      heading.textContent = skill.name;

      const description = document.createElement('p');
      description.textContent = skill.description;

      const grid = document.createElement('div');
      grid.className = 'detail-grid';

      skill.tools.forEach(tool => {
        const span = document.createElement('span');
        span.textContent = tool;
        grid.appendChild(span);
      });

      detailPanel.appendChild(label);
      detailPanel.appendChild(heading);
      detailPanel.appendChild(description);
      detailPanel.appendChild(grid);
    }
  }
}

// Initialize hero section on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setText('#hero-title', 'Design structures lighter, more reliable, more readable.');
  if (typeof portfolioData !== 'undefined') {
    setText('#hero-pitch', portfolioData.about.pitch);
  }

  // Generate skill buttons
  renderSkillButtons();

  // Render experiences with skill data
  renderExperiences();

  // Wire up skill filter event listeners
  document.querySelectorAll('.skill').forEach(button => {
    button.addEventListener('click', () => {
      updateSkillFilter(button.dataset.skill);
    });
  });

  // Initialize detail panel to "all"
  updateSkillDetail('all');
});
