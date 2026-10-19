// Progressive enhancement: content and navigation also work without JavaScript.
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (menu && nav) {
  menu.hidden = false;
  document.documentElement.classList.add('js');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
}
const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    const selected = button.dataset.filter;
    filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    let count = 0;
    document.querySelectorAll('.project-row').forEach(row => {
      row.hidden = selected !== 'all' && !row.dataset.expertise.split(' ').includes(selected);
      if (!row.hidden) count++;
    });
    document.querySelector('.result-count').textContent = `${count} project${count === 1 ? '' : 's'}`;
  });
}

const resumeRoot = document.querySelector('[data-resume]');
if (resumeRoot) {
  document.documentElement.classList.add('js');
  const skillButtons = [...resumeRoot.querySelectorAll('[data-skill]')];
  const missions = [...resumeRoot.querySelectorAll('[data-mission]')];
  const experiences = [...resumeRoot.querySelectorAll('[data-experience]')];
  const experienceColumn = resumeRoot.querySelector('.resume-experience-column');
  const skillsPanel = resumeRoot.querySelector('.resume-skills');
  const instruction = document.querySelector('.resume-instruction');
  const clearButton = resumeRoot.querySelector('[data-clear-resume-filter]');
  const status = resumeRoot.querySelector('.resume-filter-status');
  const manuallyExpanded = new Map(experiences.map(experience => [experience.id, false]));
  let activeSkill = null;

  skillsPanel.hidden = false;
  instruction.hidden = false;

  const syncResumeOrder = () => {
    if (window.innerWidth <= 760) resumeRoot.prepend(skillsPanel);
    else resumeRoot.insertBefore(experienceColumn, skillsPanel);
  };
  syncResumeOrder();
  window.addEventListener('resize', syncResumeOrder);

  const missionTags = mission => mission.dataset.tags.split(' ').filter(Boolean);
  const renderResume = () => {
    skillButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.skill === activeSkill)));
    clearButton.hidden = !activeSkill;
    missions.forEach(mission => {
      const matches = Boolean(activeSkill && missionTags(mission).includes(activeSkill));
      const experience = mission.closest('[data-experience]');
      mission.hidden = mission.dataset.visibility === 'detail' && !manuallyExpanded.get(experience.id) && !matches;
      mission.classList.toggle('is-match', matches);
      mission.classList.toggle('is-muted', Boolean(activeSkill && !matches));
    });
    experiences.forEach(experience => {
      const button = experience.querySelector('[data-expand-experience]');
      if (!button) return;
      button.hidden = false;
      const expanded = manuallyExpanded.get(experience.id);
      button.setAttribute('aria-expanded', String(expanded));
      button.querySelector('span').textContent = expanded ? 'Show less' : 'Show more';
    });
    if (!activeSkill) {
      status.textContent = 'No skill selected.';
      return;
    }
    const button = skillButtons.find(item => item.dataset.skill === activeSkill);
    const count = missions.filter(mission => missionTags(mission).includes(activeSkill)).length;
    status.textContent = `${button.querySelector('strong').textContent} · ${count} relevant missions`;
  };

  skillButtons.forEach(button => button.addEventListener('click', () => {
    activeSkill = activeSkill === button.dataset.skill ? null : button.dataset.skill;
    renderResume();
  }));
  clearButton.addEventListener('click', () => {
    const previousButton = skillButtons.find(item => item.dataset.skill === activeSkill);
    activeSkill = null;
    renderResume();
    previousButton?.focus();
  });
  experiences.forEach(experience => {
    const button = experience.querySelector('[data-expand-experience]');
    if (!button) return;
    button.addEventListener('click', () => {
      manuallyExpanded.set(experience.id, !manuallyExpanded.get(experience.id));
      renderResume();
    });
  });
  renderResume();
}
