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

// Initialize hero section on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setText('#hero-title', 'Design structures lighter, more reliable, more readable.');
  if (typeof portfolioData !== 'undefined') {
    setText('#hero-pitch', portfolioData.about.pitch);
  }
});

// ============================================================================

const skillButtons = document.querySelectorAll('.skill');
const experiences = document.querySelectorAll('.experience');
const detail = document.querySelector('#skill-detail');

const skillCopy = {
  all: ['Vue générale', 'Sélectionne une compétence pour voir où elle s’exprime.', 'Le site final reliera chaque compétence aux expériences, sous-projets, outils et résultats correspondants.'],
  composites: ['Structures composites', 'Concevoir avec la matière, les plis et les contraintes du réel.', 'Les expériences associées pourront détailler conception, choix matériaux et justification du comportement.'],
  calcul: ['Calcul & dimensionnement', 'Passer de l’hypothèse mécanique à une décision de conception.', 'Les résultats de calcul, modèles et critères de dimensionnement seront reliés ici.'],
  essais: ['Essais & validation', 'Confronter le modèle au comportement observé.', 'Cette vue pourra regrouper essais, corrélations, écarts et enseignements techniques.'],
  industrialisation: ['Industrialisation', 'Rendre la solution performante et fabricable.', 'Les liens montreront comment les choix techniques dialoguent avec les procédés et la production.'],
  pilotage: ['Pilotage technique', 'Faire avancer un sujet complexe avec les bonnes interfaces.', 'Une compétence à illustrer par les décisions, arbitrages et livrables produits.']
};

function updateSkill(skill) {
  skillButtons.forEach((button) => {
    const active = button.dataset.skill === skill;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  experiences.forEach((experience) => {
    const visible = skill === 'all' || experience.dataset.skills.split(' ').includes(skill);
    experience.hidden = !visible;
  });
  const [label, title, copy] = skillCopy[skill];
  detail.innerHTML = `<p class="detail-label">${label}</p><h3>${title}</h3><p>${copy}</p><div class="detail-grid"><span>Expériences liées</span><span>Mini-projets</span><span>Résultats</span></div>`;
}

skillButtons.forEach((button) => button.addEventListener('click', () => updateSkill(button.dataset.skill)));

document.querySelectorAll('.experience-toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const experience = toggle.closest('.experience');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    experience.classList.toggle('open', !expanded);
  });
});
