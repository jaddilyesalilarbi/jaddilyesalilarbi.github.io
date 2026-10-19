/* Dependency-free static generator. Run: node build.cjs */
const fs = require('node:fs');
const path = require('node:path');
const data = require('./content/site.cjs');
const root = __dirname;
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const route = (name = '') => name ? `${name}/index.html` : 'index.html';
const projectRoute = p => route(`work/${p.id}`);
const pages = [];
const labels = [['work', 'Work'], ['expertise', 'Expertise'], ['services', 'Services'], ['about', 'About'], ['contact', 'Contact']];
const detailLabels = [['constraints', 'Engineering constraints'], ['approach', 'Engineering approach'], ['development', 'Design & analysis work'], ['physical', 'Manufacturing & integration'], ['validation', 'Testing & comparison']];
const publicAssets = new Set(['site.css', 'site.js', 'CNAME']);
const editorialProject = project => {
  const editorial = project.editorial || {};
  return {
    ...project,
    ...editorial,
    sections: { ...project.sections, ...(editorial.sections || {}) },
    expertise: editorial.expertise || project.expertise,
    tags: editorial.tags || project.tags,
    details: editorial.details || project.details
  };
};
function allowAsset(file) {
  if (!file || path.isAbsolute(file) || file.split(/[\\/]/).includes('..')) throw new Error(`Invalid public asset: ${file}`);
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing public asset: ${file}`);
  publicAssets.add(file);
}
if (data.person.resume) {
  if (path.extname(data.person.resume).toLowerCase() !== '.pdf' || fs.readFileSync(path.join(root, data.person.resume)).subarray(0,5).toString() !== '%PDF-') throw new Error('Resume must point to a real PDF.');
  allowAsset(data.person.resume);
}
allowAsset('assets/qr.png');
allowAsset('assets/solar-boat.png');
function page(file, title, description, render, active = '') {
  const depth = file.split('/').length - 1;
  const prefix = '../'.repeat(depth);
  const url = target => prefix + target;
  const link = (target, text, cls = '') => `<a class="${cls}" href="${esc(url(target))}">${esc(text)}</a>`;
  const mail = (subject, text, cls = 'button') => `<a class="${cls}" href="mailto:${esc(data.person.email)}?subject=${encodeURIComponent(subject)}">${esc(text)}</a>`;
  const resume = (cls = 'button secondary') => data.person.resume ? `<a class="${cls}" href="${esc(url(data.person.resume))}" download>Get CV</a>` : `<span class="${cls} cv-pending" aria-disabled="true" title="CV PDF not yet available">Get CV</span>`;
  const tags = items => items?.length ? `<ul class="tags">${items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '';
  const media = (p, hero = false) => {
    if (!p.media) return '';
    if (p.media.src) { allowAsset(p.media.src); (p.media.srcset || []).forEach(allowAsset); }
    const sourceWidths = p.media.srcsetWidths || [640, Math.min(1280, p.media.width || 1280), Math.min(1920, p.media.width || 1920)];
    const srcset = p.media.srcset?.map((asset, index) => ({ asset, width: sourceWidths[index] })).filter((item, index, items) => items.findIndex(other => other.width === item.width) === index).map(item => `${url(item.asset)} ${item.width}w`).join(', ');
    const caption = hero ? p.media.detailCaption : p.media.caption;
    return `<figure class="figure ${p.media.theme === 'dark' ? 'technical-dark' : ''} ${p.media.fit === 'contain' ? 'figure-contain' : ''} ${p.media.layout === 'portrait' ? 'figure-portrait' : ''} ${hero ? 'large-figure' : ''}">${p.media.src ? `<img src="${esc(url(p.media.src))}" ${srcset ? `srcset="${srcset}" sizes="${hero ? '(max-width: 760px) 100vw, 1240px' : '(max-width: 760px) 100vw, 650px'}"` : ''} alt="${esc(p.media.alt)}" width="${p.media.width || 2292}" height="${p.media.height || 1300}" loading="${hero ? 'eager' : 'lazy'}" decoding="async">` : `<div class="media-placeholder ${p.media.layout}" role="img" aria-label="${esc(p.media.label)} — project visual withheld"><span class="placeholder-cross" aria-hidden="true">+</span><strong>${esc(p.media.label)}</strong></div>`}${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}</figure>`;
  };
  const mediaBlocks = blocks => (blocks || []).map(block => `<div class="media-block media-${esc(block.layout || 'full')}">${(block.items || []).map(item => media({media:item})).join('')}${block.text ? `<div class="media-copy"><p>${esc(block.text)}</p></div>` : ''}</div>`).join('');
  const projectLinks = projects => projects.length ? `<ul class="related-links">${projects.map(p => `<li>${link(projectRoute(p), `${p.title} — ${p.organization}`)}</li>`).join('')}</ul>` : '';
  const evidenceLinks = (e, limit = 2) => `<ul class="related-links">${e.evidence.slice(0,limit).map(item => {
    const p = data.projects.find(p => p.id === item.project);
    return `<li>${p ? link(projectRoute(p), `${p.title} — ${p.organization}`) : link(route('about') + '#' + item.experience, item.label)}</li>`;
  }).join('')}</ul>`;
  const expertiseMedia = e => {
    if (e.media?.src) {
      allowAsset(e.media.src);
      (e.media.srcset || []).forEach(allowAsset);
      const sourceWidths = e.media.srcsetWidths || [640, Math.min(1280, e.media.width || 1280), Math.min(1920, e.media.width || 1920)];
      const srcset = e.media.srcset?.map((asset, index) => ({ asset, width: sourceWidths[index] })).filter((item, index, items) => items.findIndex(other => other.width === item.width) === index).map(item => `${url(item.asset)} ${item.width}w`).join(', ');
      return `<div class="expertise-media ${e.media.fit === 'contain' ? 'expertise-media-contain' : ''}"><img src="${esc(url(e.media.src))}" ${srcset ? `srcset="${srcset}" sizes="(max-width: 760px) 100vw, 420px"` : ''} alt="${esc(e.media.alt || '')}" width="${e.media.width || 1280}" height="${e.media.height || 800}" loading="lazy" decoding="async"></div>`;
    }
    return `<div class="expertise-media expertise-media-placeholder" role="img" aria-label="${esc(e.media?.label || `${e.name} image placeholder`)}"><span>${esc(e.media?.label || 'Image placeholder')}</span></div>`;
  };
  const projectsFor = id => data.projects.filter(p => p.expertise.includes(id));
  const projectList = (projects, editorial = false) => `<div class="project-list">${projects.map(project => {
    const p = editorial ? editorialProject(project) : project;
    const facts = `<p class="card-fact"><strong>Problem</strong> ${esc(p.sections.problem)}</p><p class="card-fact"><strong>My contribution</strong> ${esc(p.sections.contribution)}</p>${p.sections.outcome ? `<p class="card-fact"><strong>Outcome</strong> ${esc(p.sections.outcome)}</p>` : ''}`;
    return `<article class="project-row" data-expertise="${p.expertise.join(' ')}">${media(p)}<div class="project-copy"><p class="meta">${esc(p.organization)} / ${esc(p.category)}</p><h2>${link(projectRoute(project), p.title)}</h2><p>${esc(p.summary)}</p>${facts}${tags(p.tags)}${link(projectRoute(project), 'View project', 'text-link')}</div></article>`;
  }).join('')}</div>`;
  const heading = (eyebrow, h, intro = '') => `<div class="page-heading${eyebrow ? '' : ' page-heading--editorial'}">${eyebrow ? `<p class="meta">${esc(eyebrow)}</p>` : ''}<h1>${esc(h)}</h1>${intro ? `<p class="lead">${esc(intro)}</p>` : ''}</div>`;
  const cta = () => `<section class="closing"><div><h2>Continue the conversation.</h2><p>Explore the engineering work or bring a problem to discuss.</p></div><div class="actions">${link(route('work'), 'Explore engineering work', 'button secondary')}${link(route('contact'), 'Discuss an engineering problem', 'button')}</div></section>`;
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#fafafa"><meta property="og:title" content="${esc(title)} | JIAL."><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><title>${esc(title)} | Jadd-Ilyes Ali Larbi</title><link rel="stylesheet" href="${url('site.css')}"><script defer src="${url('site.js')}"></script></head>
<body><a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="header-inner"><a class="brand" href="${esc(url(route()))}" aria-label="JIAL. — Home"><span class="brand-word">JIAL</span><span class="brand-period">.</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" hidden>Menu</button><nav id="main-nav" aria-label="Main navigation">${labels.map(([id, label]) => `<a href="${url(route(id))}" ${active === id ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>${resume('header-cv')}</div></header>
<main id="main" class="shell" tabindex="-1">${render({ url, link, mail, resume, tags, evidenceLinks, expertiseMedia, media: (p, hero) => media(p, hero) + (hero ? mediaBlocks(p.mediaBlocks) : ''), mediaBlocks, projectList, projectLinks, projectsFor, heading, cta })}</main>
<footer class="shell site-footer"><div><strong>${esc(data.person.name)}</strong><p>Mechanical engineering</p></div><nav aria-label="Footer navigation">${link(route('work'), 'Work')}${link(route('services'), 'Services')}${link(route('about') + '#resume', 'Resume / CV')}${link(route('contact'), 'Contact')}</nav><small>© ${new Date().getFullYear()} JIAL.</small></footer></body></html>`;
  pages.push({ file, html });
}
page(route(), 'Mechanical Engineer — Structures, Composites & Complex Systems', data.person.pitch, c => `
  <section class="hero"><p class="meta">${esc(data.person.name)}</p><h1>Mechanical engineering<br class="desktop-break"> from design to testing.</h1><div class="hero-bottom"><div class="hero-support"><p class="lead">Mechanical Engineer</p><p class="hero-pitch">${esc(data.person.pitch)}</p><div class="actions">${c.link(route('work'), 'Explore my work', 'button')}${c.link(route('services'), 'Engineering services', 'button secondary')}${c.resume('button tertiary hero-cv')}</div></div><aside class="availability"><p>${esc(data.person.availability)}</p>${c.link(route('contact') + '#thesis', 'Discuss a thesis opportunity')}</aside></div></section>
  <section class="section home-chapter home-work"><div class="section-heading"><h2>My Work</h2>${c.link(route('work'), 'View all projects', 'text-link chapter-link')}</div>${c.projectList(data.projects.filter(p => p.selected).sort((a,b) => a.homeOrder - b.homeOrder))}</section>
  <section class="section home-chapter home-expertise"><div class="section-heading"><h2>Areas of Expertise</h2>${c.link(route('expertise'), 'Explore expertise', 'text-link chapter-link')}</div><div class="expertise-preview">${data.expertise.map(e => `<article class="expertise-module">${c.expertiseMedia(e)}<h3>${c.link(route('expertise') + '#' + e.id, e.name)}</h3><p>${esc(e.description)}</p>${c.evidenceLinks(e,1)}</article>`).join('')}</div></section>
  <section class="section background home-chapter home-background"><div><h2>Background</h2><p>Simulation, design, manufacturing and testing inform one another.</p>${c.link(route('about'), 'About my background', 'text-link chapter-link')}</div><div>${data.experience.map(e => `<article><h3>${esc(e.name)}</h3><p>${esc(e.role)}</p></article>`).join('')}</div></section>${c.cta()}`);
page(route('work'), 'Work', 'Five engineering projects in mechanical design, integration, structural simulation and testing.', c => `${c.heading('', 'From the model to the physical system.', 'Five projects across Navier and EPFL Solar Boat. Explore the problem, the engineering approach and my contribution.')}<div class="filters" aria-label="Filter projects by expertise" hidden><button data-filter="all" aria-pressed="true">All work</button>${data.expertise.map(e => `<button data-filter="${e.id}" aria-pressed="false">${esc(e.name)}</button>`).join('')}</div><p class="result-count" role="status" aria-live="polite">5 projects</p>${c.projectList(data.projects, true)}${c.cta()}`, 'work');
page(route('expertise'), 'Expertise', 'Mechanical design, systems integration, structural simulation / FEA, manufacturing & assembly, testing & instrumentation.', c => `${c.heading('', 'Engineering across the hardware-development loop.', 'Design, integration, analysis, manufacturing and testing are connected parts of how I work on physical systems.')}<nav class="jump-links" aria-label="Expertise sections">${data.expertise.map(e => `<a href="#${e.id}">${esc(e.name)}</a>`).join(' ')}</nav>${data.expertise.map(e => `<section class="expertise-section" id="${e.id}"><div><h2>${esc(e.name)}</h2><p class="expertise-positioning">${esc(e.pageDescription)}</p><p>${esc(e.detail)}</p></div><div><h3>Methods &amp; work</h3>${c.tags(e.skills)}<h3 class="evidence-heading">Relevant work</h3>${c.evidenceLinks(e)}</div></section>`).join('')}${c.cta()}`, 'expertise');
page(route('services'), 'Engineering Services', 'Mechanical design, equipment integration, structural assessment and simulation–test comparison for hardware teams.', c => `${c.heading('', 'Focused support for physical products.', 'I support mechanical engineering projects from design and structural analysis to integration and testing. Engagements can cover a specific technical question or a defined part of the hardware-development process.')}<p class="reading services-intro">My strongest experience is with physical products, composite structures, mechanical systems and hardware that must move from CAD into manufacturing and assembly.</p><div class="actions">${c.link(route('contact') + '#services', 'Discuss an engineering project', 'button')}</div><section class="section services-list"><h2>Ways I can support a project.</h2>${data.services.map(s => `<article class="service-row" id="${s.id}"><div><h3>${esc(s.name)}</h3><p class="service-positioning">${esc(s.description)}</p><div class="service-examples"><h4>Typical work</h4><ul>${s.examples.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div></div><div><div class="service-deliverables"><h4>Typical deliverables</h4><ul class="deliverable-list">${s.outputs.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div><p class="meta">Relevant work</p>${c.projectLinks(data.projects.filter(p => s.projects.includes(p.id)))}</div></article>`).join('')}</section><section class="closing"><div><h2>Discuss an engineering project.</h2><p>Send me the system, design or technical question you are working on.</p></div>${c.link(route('contact') + '#services', 'Discuss an engineering project', 'button')}</section>`, 'services');
page(route('about'), 'About & CV', 'Mechanical engineering experience at Navier and EPFL Solar Boat, with an EPFL education and four years of teaching.', c => `${c.heading('', data.person.name, 'Mechanical engineer working across design, integration, structural analysis, manufacturing and testing.')}<div class="about-intro"><p>Most of my work has been on full-scale physical systems: composite boats, hydrofoil structures, propulsion hardware and mechanical equipment that had to move from CAD and analysis into manufacturing, assembly and use.</p></div>${data.experience.filter(e => e.about).map(e => `<section class="experience-row" id="${e.id}"><div><h2>${esc(e.name)}</h2><p class="meta">${esc(e.period)}</p>${e.location ? `<p class="meta">${esc(e.location)}</p>` : ''}${e.leadPeriod ? `<p class="meta">${esc(e.leadPeriod)}</p>` : ''}</div><div><h3>${esc(e.aboutRole || e.role)}</h3><div class="experience-copy">${e.about.map(text => `<p>${esc(text)}</p>`).join('')}</div>${c.projectLinks(data.projects.filter(p => p.experience === e.id))}</div></section>`).join('')}<section class="section education" id="education"><h2>Education</h2><div class="education-list">${data.education.map(e => `<article id="${e.id}"><div><h3>${esc(e.degree)}</h3><p>${esc(e.school)}</p>${e.detail ? `<p>${esc(e.detail)}</p>` : ''}</div><p class="meta">${esc(e.period)}</p></article>`).join('')}</div></section><section class="section teaching" id="teaching"><h2>Teaching</h2>${data.additionalExperience.map(e => `<article><div><h3>${esc(e.role)} — ${esc(e.organization)}</h3><p>${esc(e.description)}</p></div><p class="meta">${esc(e.duration)}</p></article>`).join('')}</section><section class="closing" id="resume"><div><h2>Resume / CV</h2><p>${data.person.resume ? 'Read my complete background and experience.' : 'CV PDF not yet available.'}</p><p>${esc(data.person.availability)}</p></div>${c.resume()}</section>`, 'about');
page(route('contact'), 'Contact', 'Discuss a six-month Master’s thesis opportunity or an engineering project with Jadd-Ilyes Ali Larbi.', c => `${c.heading('', 'Let’s talk engineering.', 'A Master’s thesis opportunity or a problem your hardware team is working on.')}<section class="contact-direct" aria-label="Direct contact details"><div class="contact-details"><div><p class="meta">Email</p><a class="contact-email" href="mailto:${esc(data.person.email)}">${esc(data.person.email)}</a></div><div class="contact-phone"><p class="meta">Phone / WhatsApp</p><a href="tel:${esc(data.person.phone)}">${esc(data.person.phoneDisplay)}</a><p>I usually reply faster on WhatsApp.</p><a class="text-link" href="https://wa.me/${esc(data.person.phone.replace(/^\+/, ''))}">Message me on WhatsApp</a></div></div><figure class="contact-qr"><img src="${c.url ? c.url('assets/qr.png') : '../assets/qr.png'}" alt="QR code linking to the Jadd Engineering website" width="1254" height="1254"><figcaption>Open this website on your phone.</figcaption></figure></section><div class="contact-paths"><section id="thesis"><h2>Master’s thesis / opportunities</h2><p>I am looking for a six-month Master’s thesis / PDM involving mechanical design, integration, structures or testing.</p>${c.mail('Master’s thesis / PDM opportunity', 'Discuss a thesis opportunity')}${c.link(route('work'), 'Explore my work', 'text-link')}</section><section id="services"><h2>Engineering project / services</h2><p>Share the system you are developing, the engineering question and the support you are looking for.</p>${c.mail('Engineering project enquiry', 'Discuss an engineering project')}${c.link(route('services'), 'Explore engineering services', 'text-link')}</section></div><section class="section"><h2>Background & connections</h2><div class="actions">${c.resume()}${data.person.linkedin ? `<a class="button secondary" href="${esc(data.person.linkedin)}">LinkedIn</a>` : ''}</div></section>`, 'contact');

const caseParagraphs = items => items.map(text => `<p>${esc(text)}</p>`).join('');
const caseList = (items, cls = 'case-study-list') => `<ul class="${cls}">${items.map(text => `<li>${esc(text)}</li>`).join('')}</ul>`;
const caseSection = (id, title, body, cls = '') => `<section class="case-study-section ${cls}" id="${id}"><h2>${esc(title)}</h2><div class="case-study-body">${body}</div></section>`;
const caseHeader = (c, project, study) => `<nav class="breadcrumbs" aria-label="Breadcrumb">${c.link(route('work'), 'Work')}<span aria-hidden="true">/</span><span>${esc(project.organization)}</span></nav>${c.heading(project.organization, study.title, project.summary)}<dl class="project-meta"><div><dt>Organisation</dt><dd>${esc(project.organization)}</dd></div><div><dt>Period</dt><dd>${esc(study.year)}</dd></div><div><dt>Disciplines</dt><dd>${esc(study.disciplines.join(', '))}</dd></div></dl>`;
const caseFooter = (c, project, related) => `<section class="section"><h2>Related expertise</h2><div class="jump-links">${project.expertise.map(id => c.link(route('expertise') + '#' + id, data.expertise.find(e => e.id === id).name)).join(' ')}</div></section>${related.length ? `<section class="section"><h2>Continue exploring</h2>${c.projectLinks(related)}</section>` : ''}${c.cta()}`;

function renderHydrogenCaseStudy(c, project, related) {
  const study = project.caseStudy;
  const tradeoffs = `<div class="tradeoff-grid">${study.tradeoffs.map(item => `<section><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></section>`).join('')}</div>`;
  return `${caseHeader(c, project, study)}${c.media(project, true)}<article class="case-study case-study--hydrogen">${caseSection('challenge', 'The challenge', caseParagraphs(study.challenge))}${caseSection('what-i-did', 'What I did', caseList(study.whatIDid))}${caseSection('main-tradeoffs', 'Main trade-offs', tradeoffs)}${caseSection('outcome', 'Outcome', `<div class="release-outcome">${caseParagraphs(study.outcome)}</div>`, 'case-study-callout')}</article>${caseFooter(c, project, related)}`;
}

function renderHydrofoilCaseStudy(c, project, related) {
  const study = project.caseStudy;
    const approach = `<div class="analysis-scope">${study.analysisApproach.map(item => `<section><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></section>`).join('')}</div>`;
    return `${caseHeader(c, project, study)}${c.media(project, true)}<article class="case-study case-study--hydrofoil">${caseSection('structural-question', 'The structural question', caseParagraphs(study.question))}${caseSection('what-i-did', 'What I did', caseList(study.whatIDid))}${caseSection('analysis-approach', 'Analysis approach', approach)}${caseSection('outcome', 'Outcome', `<div class="decision-panel">${caseParagraphs(study.outcome)}</div>`, 'case-study-callout')}</article>${caseFooter(c, project, related)}`;
}

function renderCorrelationCaseStudy(c, project, related) {
  const study = project.caseStudy;
  const conclusions = `<div class="correlation-conclusions">${study.conclusions.map((item, index) => `<section class="conclusion-${index + 1}"><p class="meta">Conclusion ${index + 1}</p><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></section>`).join('')}</div>${caseParagraphs(study.conclusionContext)}`;
  return `${caseHeader(c, project, study)}${c.media(project, true)}<article class="case-study case-study--correlation">${caseSection('correlation-question', 'Prediction versus measurement', caseParagraphs(study.question))}${caseSection('what-i-did', 'What I did', caseList(study.whatIDid))}${caseSection('physical-evidence', 'Physical evidence', caseParagraphs(study.physicalEvidence))}${caseSection('engineering-conclusion', 'Engineering conclusion', conclusions, 'case-study-callout')}</article>${caseFooter(c, project, related)}`;
}

function renderRangeExtenderCaseStudy(c, project, related) {
  const study = project.caseStudy;
  const constraints = `<div class="constraint-rail">${study.constraints.map((item, index) => `<section><span>${String(index + 1).padStart(2, '0')}</span><div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></div></section>`).join('')}</div>`;
  return `${caseHeader(c, project, study)}${c.media(project, true)}<article class="case-study case-study--range-extender">${caseSection('challenge', 'The challenge', caseParagraphs(study.challenge))}${caseSection('what-i-did', 'What I did', caseList(study.whatIDid), 'case-study-callout')}${caseSection('key-constraints', 'Key constraints', constraints)}${caseSection('outcome', 'Outcome', `<div class="release-outcome">${caseParagraphs(study.outcome)}</div>`, 'case-study-callout')}</article>${caseFooter(c, project, related)}`;
}

for (const p of data.projects) {
  const project = editorialProject(p);
  const projectPageTitle = project.caseStudy?.title || project.title;
  page(projectRoute(p), `${projectPageTitle} — ${project.organization}`, project.summary, c => {
    const details = project.details || detailLabels.filter(([id]) => project.sections[id]?.length).map(([id,title]) => ({ id, title, text: Array.isArray(project.sections[id]) ? null : project.sections[id], items: Array.isArray(project.sections[id]) ? project.sections[id] : null }));
    const essentials = [['problem','Engineering problem'],['contribution','My contribution'],['outcome','Outcome']].filter(([id]) => project.sections[id]);
    const related = data.projects.filter(other => other.id !== p.id && editorialProject(other).expertise.some(id => project.expertise.includes(id)));
    if (project.caseStudy?.kind === 'hydrogen') return renderHydrogenCaseStudy(c, project, related);
    if (project.caseStudy?.kind === 'hydrofoil') return renderHydrofoilCaseStudy(c, project, related);
    if (project.caseStudy?.kind === 'correlation') return renderCorrelationCaseStudy(c, project, related);
    if (project.caseStudy?.kind === 'range-extender') return renderRangeExtenderCaseStudy(c, project, related);
    if (project.caseStudy) {
      const study = project.caseStudy;
      const paragraphs = items => items.map(text => `<p>${esc(text)}</p>`).join('');
      const bulletList = (items, cls = 'case-study-list') => `<ul class="${cls}">${items.map(text => `<li>${esc(text)}</li>`).join('')}</ul>`;
      const studySection = (id, title, body, cls = '') => `<section class="case-study-section ${cls}" id="${id}"><h2>${esc(title)}</h2><div class="case-study-body">${body}</div></section>`;
      const comparisonRows = study.physicalTesting.comparisons.map(item => `<tr><th scope="row">${esc(item.name)}</th><td>${esc(item.measured)}</td><td>${esc(item.simulated)}</td><td>${esc(item.difference)}</td></tr>`).join('');
      const comparison = `<table class="test-comparison"><caption>Four-point bending test</caption><thead><tr><th scope="col">Configuration</th><th scope="col">Measured</th><th scope="col">FEA</th><th scope="col">Difference</th></tr></thead><tbody>${comparisonRows}</tbody></table>`;
      return `<nav class="breadcrumbs" aria-label="Breadcrumb">${c.link(route('work'), 'Work')}<span aria-hidden="true">/</span><span>${esc(project.organization)}</span></nav>${c.heading(project.organization, projectPageTitle, project.summary)}<dl class="project-meta"><div><dt>Organisation</dt><dd>${esc(project.organization)}</dd></div><div><dt>Year</dt><dd>${esc(study.year)}</dd></div><div><dt>Disciplines</dt><dd>${esc(study.disciplines.join(', '))}</dd></div></dl>${c.media(project, true)}<article class="case-study">${studySection('challenge', 'The challenge', paragraphs(study.challenge))}${studySection('what-i-did', 'What I did', bulletList(study.whatIDid))}${studySection('analysis-approach', 'Analysis approach', paragraphs(study.analysisApproach))}${studySection('physical-testing', 'Simulation vs physical testing', `<p>${esc(study.physicalTesting.intro)}</p>${comparison}`)}${studySection('outcome', 'Outcome', `<div class="release-outcome">${paragraphs(study.outcome)}</div>`, 'case-study-callout')}</article><section class="section"><h2>Related expertise</h2><div class="jump-links">${project.expertise.map(id => c.link(route('expertise') + '#' + id, data.expertise.find(e => e.id === id).name)).join(' ')}</div></section>${related.length ? `<section class="section"><h2>Continue exploring</h2>${c.projectLinks(related)}</section>` : ''}${c.cta()}`;
    }
    return `<nav class="breadcrumbs" aria-label="Breadcrumb">${c.link(route('work'), 'Work')}<span aria-hidden="true">/</span><span>${esc(project.organization)}</span></nav>${c.heading(project.organization, project.title, project.summary)}<div class="project-essentials">${essentials.map(([id,title]) => `<section id="${id}" class="${id === 'contribution' ? 'essential-contribution' : ''}"><h2>${title}</h2><p>${esc(project.sections[id])}</p></section>`).join('')}</div>${c.tags(project.tags)}${project.confidential ? '<p class="confidential-note">Project geometry and measurements are not displayed for confidentiality.</p>' : ''}${project.media?.src ? c.media(project, true) : ''}${details.length ? `<section class="section technical-details"><h2>Technical details</h2>${details.map(d => `<details id="${esc(d.id)}"><summary>${esc(d.title)}</summary><div class="detail-content">${d.text ? `<p>${esc(d.text)}</p>` : ''}${d.items?.length ? c.tags(d.items) : ''}${d.mediaBlocks ? c.mediaBlocks(d.mediaBlocks) : ''}</div></details>`).join('')}</section>` : ''}<section class="section"><h2>Related expertise</h2><div class="jump-links">${project.expertise.map(id => c.link(route('expertise') + '#' + id, data.expertise.find(e => e.id === id).name)).join(' ')}</div></section>${related.length ? `<section class="section"><h2>Continue exploring</h2>${c.projectLinks(related)}</section>` : ''}${c.cta()}`;
  }, 'work');
}
page('404.html', 'Page not found', 'Return to the engineering portfolio.', c => `${c.heading('404', 'This page could not be found.', 'Choose a destination to continue.')}<div class="actions">${c.link(route(), 'Back to home', 'button')}${c.link(route('work'), 'Explore work', 'button secondary')}</div>`);
for (const p of pages) {
  const dest = path.join(root, p.file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, p.html + '\n');
}
// Export only rendered pages and assets actually used by the current site.
// Never publish the repository root: it contains tools and working documents.
const dist = path.join(root, 'dist');
const allowed = new Set([...pages.map(p => p.file), ...publicAssets]);
function walk(dir) {
  return fs.existsSync(dir) ? fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.relative(dist,path.join(dir,e.name)).split(path.sep).join('/')]) : [];
}
const unexpected = walk(dist).filter(file => !allowed.has(file));
if (unexpected.length) throw new Error(`Unexpected files in dist; move these outside the publication folder before rebuilding: ${unexpected.join(', ')}`);
for (const file of allowed) {
  const target = path.join(dist,file);
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.copyFileSync(path.join(root,file),target);
}
console.log(`Built ${pages.length} static pages; public export: dist/ (${allowed.size} files).`);
