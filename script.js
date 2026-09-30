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
