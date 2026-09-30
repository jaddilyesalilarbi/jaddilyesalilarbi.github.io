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
    // Create article with class 'experience'
    const article = document.createElement('article');
    article.className = 'experience';
    // Set data-skills to space-separated list of skill IDs
    article.setAttribute('data-skills', exp.associatedSkills.join(' '));

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'experience-toggle';
    toggleButton.setAttribute('aria-expanded', 'false');

    // Create wrapper span for text content
    const textWrapper = document.createElement('span');

    // Small: period.start + ' — ' + period.end
    const smallText = document.createElement('small');
    smallText.textContent = `${exp.period.start} — ${exp.period.end}`;

    // Strong: role
    const strongText = document.createElement('strong');
    strongText.textContent = exp.role;

    // Em: company (not styled italic, just semantic)
    const emText = document.createElement('em');
    emText.textContent = exp.company;

    textWrapper.appendChild(smallText);
    textWrapper.appendChild(strongText);
    textWrapper.appendChild(emText);

    // Create toggle icon span
    const iconSpan = document.createElement('span');
    iconSpan.className = 'toggle-icon';
    iconSpan.textContent = '+';

    toggleButton.appendChild(textWrapper);
    toggleButton.appendChild(iconSpan);

    // Create expandable body div
    const body = document.createElement('div');
    body.className = 'experience-body';

    // Description paragraph
    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = exp.description;
    body.appendChild(descriptionPara);

    // Highlights as ul
    if (exp.highlights && exp.highlights.length > 0) {
      const highlightsList = document.createElement('ul');
      exp.highlights.forEach(highlight => {
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        strong.textContent = highlight.title + ': ';
        li.appendChild(strong);
        li.appendChild(document.createTextNode(highlight.details));
        highlightsList.appendChild(li);
      });
      body.appendChild(highlightsList);
    }

    // Add toggle button and body to article
    article.appendChild(toggleButton);
    article.appendChild(body);

    // Add click listener to toggle button
    toggleButton.addEventListener('click', () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', !isExpanded);
      article.classList.toggle('open');
    });

    // Append article to container
    container.appendChild(article);
  });
}

// Render projects as dynamic cards
function renderProjects() {
  const container = document.getElementById('projects-container');

  if (!container || typeof portfolioData === 'undefined') {
    return;
  }

  portfolioData.projects.forEach((project, index) => {
    // Create article with project-card class
    const article = document.createElement('article');
    article.className = 'project-card';

    // Add project-featured class for first project
    if (index === 0) {
      article.classList.add('project-featured');
    }

    // Create project type paragraph
    const typeP = document.createElement('p');
    typeP.className = 'project-type';
    typeP.textContent = project.category;

    // Create title heading
    const titleH3 = document.createElement('h3');
    titleH3.textContent = project.title;

    // Create context paragraph (truncate to ~150 chars)
    const contextP = document.createElement('p');
    let contextText = project.context;
    if (contextText.length > 150) {
      contextText = contextText.substring(0, 150) + '…';
    }
    contextP.textContent = contextText;

    // Create result paragraph (first quantified result)
    const resultP = document.createElement('p');
    if (project.results && project.results.quantified && project.results.quantified.length > 0) {
      resultP.textContent = project.results.quantified[0];
    }

    // Create "View project" link
    const link = document.createElement('a');
    link.href = '#contact';
    link.textContent = 'View project ';

    // Add arrow span
    const arrowSpan = document.createElement('span');
    arrowSpan.textContent = '↗';
    link.appendChild(arrowSpan);

    // Append all elements to article
    article.appendChild(typeP);
    article.appendChild(titleH3);
    article.appendChild(contextP);
    article.appendChild(resultP);
    article.appendChild(link);

    // Append article to container
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

  // Render projects
  renderProjects();

  // Wire up skill filter event listeners
  document.querySelectorAll('.skill').forEach(button => {
    button.addEventListener('click', () => {
      updateSkillFilter(button.dataset.skill);
    });
  });

  // Initialize detail panel to "all"
  updateSkillDetail('all');
});
