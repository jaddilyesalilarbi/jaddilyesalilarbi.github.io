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

// Initialize hero section on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setText('#hero-title', 'Design structures lighter, more reliable, more readable.');
  if (typeof portfolioData !== 'undefined') {
    setText('#hero-pitch', portfolioData.about.pitch);
  }

  // Generate skill buttons
  renderSkillButtons();
});
