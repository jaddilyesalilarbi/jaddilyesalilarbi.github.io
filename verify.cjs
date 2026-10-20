// Static integrity checks; optional browser QA: node verify.cjs --browser
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');
const data = require('./content/site.cjs');
const root = __dirname;
assert(fs.existsSync(path.join(root, 'resume/index.html')), 'Missing generated Resume route');
const indexableFiles = ['index.html', '404.html', ...['work','expertise','services','resume','contact'].map(p => `${p}/index.html`), ...data.projects.map(p => `work/${p.id}/index.html`)];
const redirectFiles = ['about/index.html'];
const files = [...indexableFiles, ...redirectFiles];
const ids = items => new Set(items.map(i => i.id));
assert.equal(ids(data.projects).size, 5);
assert.equal(ids(data.expertise).size, 5);
assert(data.resumePage, 'Missing structured Resume content');
const resumeSkillIds = ids(data.resumePage.skills);
assert.equal(resumeSkillIds.size, 6, 'Resume must expose exactly six unique skills');
assert.deepEqual(data.resumePage.skills.map(skill => skill.id), ['mechanical-design', 'systems-integration', 'structural-fea', 'manufacturing-assembly', 'testing-instrumentation', 'leadership-teaching']);
const resumeMissions = data.resumePage.experiences.flatMap(experience => experience.missions);
assert.equal(ids(resumeMissions).size, resumeMissions.length, 'Resume mission IDs must be unique');
const expectedResumeSummaries = {
  'resume-navier': ['navier-hardware-ownership', 'navier-range-extender-integration', 'navier-hydrofoil-fea', 'navier-sim-test-correlation'],
  'resume-solar-boat': ['solar-lead-team', 'solar-full-vessel-fea', 'solar-composite-manufacturing', 'solar-hydrogen-integration'],
  'resume-teaching': ['teaching-theory', 'teaching-groups']
};
for (const mission of resumeMissions) {
  assert(['summary', 'detail'].includes(mission.visibility), `Invalid Resume visibility: ${mission.id}`);
  assert(mission.tags.length > 0, `Resume mission needs at least one skill: ${mission.id}`);
  mission.tags.forEach(tag => assert(resumeSkillIds.has(tag), `Unknown Resume skill tag ${tag}: ${mission.id}`));
}
assert.deepEqual(Object.fromEntries(data.resumePage.skills.map(skill => [skill.id, resumeMissions.filter(mission => mission.tags.includes(skill.id)).length])), {
  'mechanical-design': 11,
  'systems-integration': 15,
  'structural-fea': 11,
  'manufacturing-assembly': 10,
  'testing-instrumentation': 8,
  'leadership-teaching': 6
});
for (const experience of data.resumePage.experiences) {
  assert(experience.missions.some(mission => mission.visibility === 'summary'), `Resume experience needs summary missions: ${experience.id}`);
  assert(experience.missions.some(mission => mission.visibility === 'detail'), `Resume experience needs detail missions: ${experience.id}`);
  assert.deepEqual(experience.missions.filter(mission => mission.visibility === 'summary').map(mission => mission.id), expectedResumeSummaries[experience.id], `Incorrect Resume summary set: ${experience.id}`);
  (experience.relatedProjects || []).forEach(project => {
    assert(ids(data.projects).has(project.id), `Unknown Resume project: ${project.id}`);
    assert(project.label, `Resume project link needs an explicit label: ${project.id}`);
  });
}
assert.equal(data.resumePage.education.length, 2);
assert.equal(data.resumePage.distinction, 'Ranked 1st out of approximately 400 students in Mechanical Physics.');
assert.deepEqual(data.resumePage.toolset.map(group => group.name), ['CAD / CAE', 'Structural', 'Testing', 'Manufacturing', 'Engineering tools']);
for (const e of data.expertise) for (const proof of e.evidence) {
  assert(proof.project ? ids(data.projects).has(proof.project) : ids(data.experience).has(proof.experience));
}
for (const p of data.projects) {
  p.expertise.forEach(id => assert(ids(data.expertise).has(id), `Unknown expertise: ${id}`));
  (p.editorial?.expertise || []).forEach(id => assert(ids(data.expertise).has(id), `Unknown editorial expertise: ${id}`));
  assert(ids(data.experience).has(p.experience));
  assert(p.sections.contribution, `Missing contribution: ${p.id}`);
  if (p.confidential) assert(!p.media.src || p.media.representative || p.media.approvedPublic, `Restricted visual: ${p.id}`);
}
data.services.forEach(s => s.projects.forEach(id => assert(ids(data.projects).has(id))));
for (const file of indexableFiles) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Single H1: ${file}`);
  assert(html.includes('name="description"'));
  assert(!/being prepared|to be added|to be documented|in development|Visual in preparation|related projects|Four connected disciplines/i.test(html), `Editorial placeholder: ${file}`);
  assert(!/Structural Engineering|Validation &amp; Testing|Mechanical Development/.test(html), `Outdated expertise label: ${file}`);
  assert(html.includes('header-cv'));
  assert(html.includes('>Resume</a>'), `Resume navigation missing: ${file}`);
  const primaryNavigation = html.match(/<nav id="main-nav"[\s\S]*?<\/nav>/)?.[0] || '';
  assert(!primaryNavigation.includes('>About</a>'), `About must be removed from primary navigation: ${file}`);
  assert(primaryNavigation.indexOf('>Services</a>') < primaryNavigation.indexOf('>Resume</a>'), `Resume must follow Services: ${file}`);
  assert(primaryNavigation.indexOf('>Resume</a>') < primaryNavigation.indexOf('>Contact</a>'), `Resume must precede Contact: ${file}`);
  assert(!html.includes('Request CV'));
  assert(!/href="[^"]*about\/index\.html/.test(html), `Internal About link remains: ${file}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = match[1];
    if (/^(mailto:|tel:|https?:)/.test(ref)) continue;
    const [target, anchor] = ref.split('#');
    const destination = target ? path.resolve(root, path.dirname(file), target) : path.resolve(root, file);
    assert(fs.existsSync(destination), `Broken link ${file} → ${ref}`);
    if (anchor) assert(fs.readFileSync(destination, 'utf8').includes(`id="${anchor}"`), `Missing anchor ${ref}`);
  }
}
const resumePage = fs.readFileSync(path.join(root, 'resume/index.html'), 'utf8');
const siteCss = fs.readFileSync(path.join(root, 'site.css'), 'utf8');
assert(resumePage.includes('<h1>Resume</h1>'));
assert(resumePage.includes('Mechanical engineering across the hardware-development loop.'));
assert(resumePage.includes('Select a skill to highlight where I applied it.'));
assert.equal((resumePage.match(/data-skill="/g) || []).length, 6, 'Resume must render six skill controls');
assert.equal((resumePage.match(/<details class="resume-native-details" data-resume-details>/g) || []).length, 3, 'Each Resume experience needs a native collapsed fallback');
assert.equal((resumePage.match(/<details class="resume-native-details" data-resume-details open/g) || []).length, 0, 'Native Resume details must start collapsed');
for (const skill of data.resumePage.skills) {
  const count = resumeMissions.filter(mission => mission.tags.includes(skill.id)).length;
  assert(resumePage.includes(`data-skill="${skill.id}"`), `Missing Resume skill control: ${skill.id}`);
  assert(new RegExp(`<button[^>]+data-skill="${skill.id}"[\\s\\S]*?<span class="resume-skill-count">${count}</span>[\\s\\S]*?</button>`).test(resumePage), `Incorrect derived Resume skill count: ${skill.id}`);
}
for (const mission of resumeMissions) {
  assert(resumePage.includes(`id="${mission.id}"`), `Missing Resume mission: ${mission.id}`);
  assert(resumePage.includes(`data-visibility="${mission.visibility}"`), `Missing Resume visibility: ${mission.id}`);
}
for (const experience of data.resumePage.experiences) {
  assert(resumePage.includes(`id="${experience.id}"`), `Missing Resume experience: ${experience.id}`);
  for (const project of experience.relatedProjects || []) {
    assert(resumePage.includes(`href="../work/${project.id}/index.html"`), `Missing Resume related project link: ${project.id}`);
    assert(resumePage.includes(`>${project.label}</a>`), `Incorrect Resume project label: ${project.id}`);
  }
}
assert(resumePage.includes('>Download CV</a>'));
assert(resumePage.includes(`href="../${data.person.resume}"`));
assert(resumePage.includes(`href="${data.person.linkedin}"`));
assert(resumePage.includes('href="../contact/index.html"'));
const expectedResumeIntro = [
  'Mechanical engineer working across design, systems integration, structural analysis, manufacturing and testing.',
  'Most of my work has been on full-scale physical systems — composite boats, hydrofoil structures, propulsion hardware and integrated equipment — carried from CAD and analysis into manufacturing, assembly, instrumentation and validation.'
];
assert.deepEqual(data.resumePage.intro, expectedResumeIntro, 'Resume introduction must use the approved two-paragraph narrative');
assert.equal((resumePage.match(/class="resume-intro"/g) || []).length, 2, 'Resume hero must render two introduction paragraphs');
expectedResumeIntro.forEach(paragraph => assert(resumePage.includes(paragraph), `Missing Resume introduction paragraph: ${paragraph}`));
const navierSupport = 'Worked directly on boats and hardware alongside engineers, technicians and suppliers, using manufacturing, assembly and test feedback to inform design decisions.';
const solarBoatSupport = 'Progressed from hands-on propulsion and composite manufacturing into system integration and technical leadership.';
assert(resumePage.includes(`<p class="resume-experience-supporting">${navierSupport}</p>`), 'Missing Navier supporting context');
assert(resumePage.includes(`<p class="resume-experience-supporting">${solarBoatSupport}</p>`), 'Missing EPFL Solar Boat supporting context');
const renderedMissionLists = [...resumePage.matchAll(/<ul class="resume-missions"[^>]*>([\s\S]*?)<\/ul>/g)].map(match => match[1]);
assert(renderedMissionLists.every(list => !list.includes(navierSupport)), 'Navier supporting context must not become a mission');
assert(renderedMissionLists.every(list => !list.includes(solarBoatSupport)), 'Solar Boat supporting context must not become a mission');
assert(!/84%|range-extender power|battery capacit|Navier safety factor|confidential load|internal test value/i.test(resumePage), 'Restricted Resume value leaked into public copy');
assert(siteCss.includes(':focus-visible{outline:3px'), 'Visible keyboard focus styling must remain available');
assert(siteCss.includes('@media(prefers-reduced-motion:reduce)'), 'Reduced-motion support must remain available');
assert(resumePage.includes('<p class="resume-instruction" hidden>'), 'Interactive Resume instruction must stay hidden without JavaScript');
assert(resumePage.includes('<aside class="resume-skills" aria-labelledby="resume-skills-title" hidden>'), 'Inert Resume skill controls must stay hidden without JavaScript');
const aboutRedirect = fs.readFileSync(path.join(root, 'about/index.html'), 'utf8');
assert(/http-equiv="refresh" content="0; url=\.\.\/resume\/index\.html"/i.test(aboutRedirect), 'Legacy About route must immediately redirect to Resume');
assert(aboutRedirect.includes('<link rel="canonical" href="https://www.jadd-engineering.com/resume/">'), 'Legacy About route must canonicalize to Resume');
assert(aboutRedirect.includes('<meta name="robots" content="noindex, follow">'), 'Legacy About route must not remain indexable');
assert(aboutRedirect.includes('href="../resume/index.html"'), 'Legacy About redirect must provide a Resume fallback link');
assert(!aboutRedirect.includes('15+ mechanical components and subsystems'), 'Legacy About content must not remain duplicated');
assert(!aboutRedirect.includes('site-header'), 'Legacy About redirect must remain a minimal document');
const home = fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(home.includes('Mechanical engineering<br class="desktop-break"> from design to testing.'));
assert(home.includes('<h2>My Work</h2>'));
assert(home.includes('<h2>Areas of Expertise</h2>'));
assert(home.includes('<h2>Background</h2>'));
assert(home.includes('href="resume/index.html">View resume</a>'), 'Home Background must link directly to Resume');
assert(!home.includes('about/index.html'), 'Home must not retain an About link');
assert(home.includes('View all projects'));
assert(!/Selected work|Engineering in practice|Design, integration, analysis &amp; hands-on work|Working with physical systems|status-dot/.test(home));
assert.equal((home.match(/>Get CV</g) || []).length, 2);
assert(home.includes('<span class="brand-word">JIAL</span><span class="brand-period">.</span>'));
assert(home.includes('class="button tertiary hero-cv"'));
assert.equal((home.match(/class="text-link chapter-link"/g) || []).length, 3);
assert.equal((home.match(/class="expertise-module"/g) || []).length, 5);
assert.equal((home.match(/class="expertise-media expertise-media-placeholder"/g) || []).length, 0, 'Home expertise visuals must be populated');
assert.equal((home.match(/class="expertise-media expertise-media-contain"/g) || []).length, 5, 'Expertise visuals must preserve the complete technical image');
const expectedProjectVisuals = {
  'solar-boat-structural-fea': 'assets/composite-fea-1280.webp',
  'hydrogen-integration': 'assets/hydrogen-system-integration-1280.webp',
  'navier-structural-fea': 'assets/hydrofoil-structural-analysis-1280.webp',
  'navier-test-correlation': 'assets/simulation-test-correlation-1280.webp',
  'range-extender-integration': 'assets/range-extender-integration-1280.webp'
};
for (const [id, src] of Object.entries(expectedProjectVisuals)) {
  const project = data.projects.find(item => item.id === id);
  assert.equal(project.media.src, src, `Unexpected visual for ${id}`);
  assert.equal(project.media.srcset.length, 3, `Responsive variants missing for ${id}`);
  project.media.srcset.forEach(asset => assert(fs.existsSync(path.join(root, asset)), `Missing responsive asset: ${asset}`));
}
const representativeProjects = ['navier-structural-fea', 'navier-test-correlation', 'range-extender-integration'];
for (const id of representativeProjects) {
  const project = data.projects.find(item => item.id === id);
  assert(project.media.representative, `Representative flag missing: ${id}`);
  assert(project.media.detailCaption, `Detailed-page confidentiality caption missing: ${id}`);
}
const workVisuals = fs.readFileSync(path.join(root,'work/index.html'),'utf8');
assert(!workVisuals.includes('Representative geometry — project details modified for confidentiality.'), 'Work cards must not carry detailed-page NDA labels');
for (const id of representativeProjects) {
  const detail = fs.readFileSync(path.join(root,'work',id,'index.html'),'utf8');
  assert(detail.includes(data.projects.find(item => item.id === id).media.detailCaption), `Detailed-page representative label missing: ${id}`);
}
const hydrofoilDetail = fs.readFileSync(path.join(root,'work/navier-structural-fea/index.html'),'utf8');
assert(hydrofoilDetail.includes(' 941w'), 'Portrait hydrofoil source must expose its real maximum width');
assert(!hydrofoilDetail.includes('hydrofoil-structural-analysis-1920.webp 1920w'), 'Portrait hydrofoil must not advertise an upscaled width');
const publicProjectNames = [
  'Full-Vessel Composite Structural Analysis',
  'Hydrofoil Structural Analysis',
  'Hydrogen System Integration',
  'Simulation / Test Correlation',
  'Range Extender Integration'
];
assert.deepEqual(data.projects.map(project => project.title), publicProjectNames, 'Projects must expose one consistent public name');
for (const file of indexableFiles) {
  const html = fs.readFileSync(path.join(root,file),'utf8');
  assert(!html.includes('Swiss Solar Boat'), `Organisation naming must be consistent: ${file}`);
  assert(!html.includes('Structural FEA —'), `Old project title remains visible: ${file}`);
  assert(!html.includes('Structural Simulation / FEAMechanical Design'), `Concatenated expertise labels: ${file}`);
}
for (const section of ['work','expertise','services','resume','contact']) {
  const html = fs.readFileSync(path.join(root,section,'index.html'),'utf8');
  const heading = html.match(/<div class="page-heading[^"]*">([\s\S]*?)<\/div>/)?.[1] || '';
  assert(!heading.includes('<p class="meta">'), `Top page label must be removed: ${section}`);
  assert(heading.includes('<h1>'), `Main page heading must remain: ${section}`);
}
assert(home.includes('<h2><a class="" href="work/solar-boat-structural-fea/index.html">Full-Vessel Composite Structural Analysis</a></h2>'));
assert(!home.includes('Mechanical parts, assemblies and interfaces designed for real hardware.'), 'Expertise page copy must not leak into Home');
const expertisePage = fs.readFileSync(path.join(root,'expertise/index.html'),'utf8');
for (const expected of [
  'Mechanical parts, assemblies and interfaces designed for real hardware.',
  'Packaging equipment and mechanical systems within real space, structural and maintenance constraints.',
  'Structural analysis used to understand behaviour and support design decisions.',
  'Hands-on manufacturing, assembly and maintenance of full-scale hardware.',
  'Physical measurements used to understand real behaviour and challenge models.'
]) assert(expertisePage.includes(expected), `Missing Expertise positioning: ${expected}`);
assert.equal((expertisePage.match(/<h3>Methods &amp; work<\/h3>/g) || []).length, 5, 'Each expertise needs a compact methods block');

const servicesPage = fs.readFileSync(path.join(root,'services/index.html'),'utf8');
for (const service of ['Mechanical Design','Equipment &amp; Systems Integration','Structural Analysis','Test &amp; Simulation Correlation']) {
  assert(servicesPage.includes(`<h3>${service}</h3>`), `Missing service: ${service}`);
}
assert(servicesPage.includes('Engagements can cover a specific technical question or a defined part of the hardware-development process.'));
assert.equal((servicesPage.match(/class="service-examples"/g) || []).length, 4, 'Each service needs concrete examples');
assert.equal((servicesPage.match(/class="service-deliverables"/g) || []).length, 4, 'Each service needs possible deliverables');
assert(!servicesPage.includes('Manufacturing &amp; on-site work'), 'Defensive manufacturing block must be removed');
assert.equal((servicesPage.match(/<h4>Typical deliverables<\/h4>/g) || []).length, 4, 'Each service needs a direct deliverables heading');
assert.equal((servicesPage.match(/class="deliverable-list"/g) || []).length, 4, 'Deliverables must render as readable lists');
assert(!servicesPage.includes('Depending on the project'));

assert(expertisePage.includes('href="../resume/index.html#resume-solar-boat"'), 'Solar Boat expertise evidence must link to Resume');
assert(expertisePage.includes('href="../resume/index.html#resume-navier"'), 'Navier expertise evidence must link to Resume');

const contactPage = fs.readFileSync(path.join(root,'contact/index.html'),'utf8');
assert(contactPage.includes(data.person.email), 'Contact email must remain visible');
assert.equal(data.person.phone, '+33660908949', 'Phone number must live in the central content source');
assert(contactPage.includes('href="tel:+33660908949"'), 'Contact page must expose a direct phone link');
assert(contactPage.includes('href="https://wa.me/33660908949"'), 'Contact page must expose a direct WhatsApp link');
assert(contactPage.includes('I usually reply faster on WhatsApp.'), 'WhatsApp response note must remain visible');
assert(contactPage.includes('src="../assets/qr.png"'), 'Contact page must display the website QR code');
assert(contactPage.includes(data.person.linkedin), 'Contact page must use the central LinkedIn URL');
assert(!contactPage.includes('Paris, France'), 'Contact page must not display Paris, France');
for (const file of indexableFiles) {
  const html = fs.readFileSync(path.join(root,file),'utf8');
  const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] || '';
  assert(!footer.includes('Paris, France'), `Footer location must be removed: ${file}`);
  assert(footer.includes('Mechanical engineering'), `Footer discipline must remain: ${file}`);
}

const workFilters = data.expertise.map(expertise => ({
  name: expertise.name,
  count: data.projects.filter(project => (project.editorial?.expertise || project.expertise).includes(expertise.id)).length
}));
assert(workFilters.every(filter => filter.count > 0), `Every visible Work filter needs project evidence: ${JSON.stringify(workFilters)}`);
assert.equal(workFilters.find(filter => filter.name === 'Manufacturing & Assembly').count, 1, 'Manufacturing filter must resolve to a real Work project');
const workPageForFilters = fs.readFileSync(path.join(root,'work/index.html'),'utf8');
assert(!workPageForFilters.includes('filter-evidence'), 'Work filters must not fall back to About evidence');
{
  let filterHandler;
  const resultCount = { textContent: '' };
  const manufacturingButton = { dataset: { filter: 'manufacturing' }, setAttribute() {} };
  const filters = {
    hidden: true,
    addEventListener(event, handler) { if (event === 'click') filterHandler = handler; },
    querySelectorAll() { return [manufacturingButton]; }
  };
  const rows = [
    { hidden: false, dataset: { expertise: 'development integration' } },
    { hidden: false, dataset: { expertise: 'development integration manufacturing' } }
  ];
  const document = {
    documentElement: { classList: { add() {} } },
    querySelector(selector) {
      if (selector === '.filters') return filters;
      if (selector === '.result-count') return resultCount;
      return null;
    },
    querySelectorAll(selector) { return selector === '.project-row' ? rows : []; }
  };
  vm.runInNewContext(fs.readFileSync(path.join(root,'site.js'),'utf8'), { document });
  assert.doesNotThrow(() => filterHandler({ target: { closest: () => manufacturingButton } }), 'Manufacturing filter must not depend on a removed About fallback');
  assert.equal(resultCount.textContent, '1 project');
}
const lotOne = {
  'solar-boat-structural-fea': {
    card: 'Composite layup optimisation and structural assessment before manufacturing.',
    problem: 'Assess the composite boat structure under its defined load cases',
    contribution: 'Built the full-vessel model, optimised composite layups and checked the results against physical bending tests.',
    outcome: 'The resulting design progressed to manufacturing by NTPT and Swiss Solar Boat.'
  },
  'hydrogen-integration': {
    card: 'Fuel-cell integration combining equipment layout, composite supports and stability assessment.',
    problem: 'Integrate a fuel cell and hydrogen-storage system into a composite boat',
    contribution: 'Developed the equipment layout, composite supports and stability assessment while preserving routing, ventilation and access.',
    outcome: 'progressed to manufacturing following the structural and stability assessments.'
  },
  'navier-structural-fea': {
    card: 'Nonlinear structural analysis of hydrofoil appendages for increased payload requirements.',
    problem: 'Assess whether the hydrofoil appendages could accommodate higher payload requirements',
    contribution: 'Performed nonlinear composite analysis of the foil and strut assembly in 3DEXPERIENCE.',
    outcome: 'within the assessed cases and modelling assumptions.'
  },
  'navier-test-correlation': {
    card: 'Improved deflection predictions and identified the data gaps preventing a reliable safety-factor estimate.',
    problem: 'Compare predicted and measured structural behaviour',
    contribution: 'Compared predicted and measured deflection, improved the prediction method and traced the remaining uncertainty to model and test inputs.',
    outcome: 'Improved agreement between the deflection predictions and the measurements used in the comparison.',
    secondFinding: 'not sufficient to justify a precise structural safety factor'
  },
  'range-extender-integration': {
    card: 'Mechanical integration of a marine generator system, with components released for manufacturing.',
    problem: 'Integrate a range-extender generator into a constrained marine environment',
    contribution: 'Designed the mounting hardware and interfaces, released drawings and updated the design from supplier and assembly feedback.',
    outcome: 'Released integration components for manufacturing to support assembly of the range-extender system.'
  }
};
const work = fs.readFileSync(path.join(root,'work/index.html'),'utf8');
for (const [id, expected] of Object.entries(lotOne)) {
  assert(work.includes(expected.card), `Missing Work card summary: ${id}`);
  assert(work.includes(expected.contribution), `Missing Work card contribution: ${id}`);
  const projectHtml = fs.readFileSync(path.join(root,`work/${id}/index.html`),'utf8');
  if (data.projects.find(project => project.id === id)?.editorial?.caseStudy) continue;
  assert(projectHtml.includes(expected.problem), `Missing project problem: ${id}`);
  assert(projectHtml.includes(expected.contribution), `Missing personal contribution: ${id}`);
  assert(projectHtml.includes(expected.outcome), `Missing project outcome: ${id}`);
  if (expected.secondFinding) assert(projectHtml.includes(expected.secondFinding), `Missing second Navier correlation finding: ${id}`);
  assert(projectHtml.indexOf('id="problem"') < projectHtml.indexOf('id="contribution"'), `Problem must precede contribution: ${id}`);
  assert(projectHtml.indexOf('id="contribution"') < projectHtml.indexOf('id="outcome"'), `Contribution must precede outcome: ${id}`);
  assert(!projectHtml.includes('id="context"'), `Context must not displace the required opening triptych: ${id}`);
}
assert(!files.some(file => fs.readFileSync(path.join(root,file),'utf8').includes('Editorial working document.')));
const structuralCase = fs.readFileSync(path.join(root,'work/solar-boat-structural-fea/index.html'),'utf8');
assert(structuralCase.includes('class="case-study"'), 'Structural FEA must render as a substantial case study');
assert(structuralCase.includes('<h1>Full-Vessel Composite Structural Analysis</h1>'), 'Structural FEA needs a project-specific title');
for (const id of ['challenge','what-i-did','analysis-approach','physical-testing','outcome']) {
  assert(structuralCase.includes(`id="${id}"`), `Missing Structural FEA case-study section: ${id}`);
}
for (const fact of [
  'EPFL Solar Boat was developing a full-scale composite hydrofoil boat from detailed design through manufacturing.',
  'I was responsible for assessing the structure as a complete system and helping define laminate designs before production.',
  'Built and maintained a full-vessel composite model covering the hull, internal structure, floats, foil wells and appendages.',
  'Defined laminate zones and stacking sequences.',
  'Assessed planing, flight, crash, slamming and immersion load cases.',
  'Evaluated composite failure using Tsai-Wu criteria.',
  'Checked mesh convergence and investigated local numerical singularities.',
  'Iterated laminate and structural designs with the team before manufacturing.',
  'The model was used to evaluate global stiffness, load transfer and composite margins across the complete vessel rather than analysing isolated components independently.',
  'Local reinforcement, laminate definition and structural interfaces were updated as the design evolved.',
  'Four-point bending tests provided a direct comparison between simulation and physical measurements on two documented configurations.',
  '20.0 mm', '18.8 mm', '6.0%', '0.90 mm', '0.92 mm', '2.2%',
  'The resulting laminate and structural design progressed to manufacturing by EPFL Solar Boat and NTPT.'
]) {
  assert(structuralCase.includes(fact), `Missing Structural FEA evidence: ${fact}`);
}
assert(structuralCase.includes('<table class="test-comparison">'), 'Physical comparison must use a compact table');
for (const removed of ['What this project demonstrates', 'Load cases &amp; load transfer', 'Composite assessment &amp; numerical credibility', 'Project context &amp; engineering challenge']) {
  assert(!structuralCase.includes(removed), `Redundant Structural FEA section remains: ${removed}`);
}
assert(!/This wording is deliberate|colourful result plot|Reading the result therefore|required more than locating the highest contour/.test(structuralCase), 'Editorial or repetitive commentary leaked into public copy');
assert(!/281,000|120 composite surfaces|71 surfaces|50 structural volumes|48 volumes|120 laminates/.test(structuralCase), 'Disputed model-size metrics must remain unpublished');
const caseStudyHtml = structuralCase.match(/<article class="case-study">([\s\S]*?)<\/article>/)?.[1] || '';
const caseStudyText = caseStudyHtml.replace(/<[^>]+>/g, ' ').replace(/&(?:amp|lt|gt|quot|#39);/g, ' ').replace(/\s+/g, ' ').trim();
const caseStudyWords = caseStudyText.split(' ').filter(Boolean).length;
assert(caseStudyWords >= 180 && caseStudyWords <= 260, `Structural FEA CV-style depth: ${caseStudyWords} words`);
assert(!/did not validate every|rather than numerical artefacts|rather than adding material uniformly/.test(structuralCase), 'Structural FEA still contains defensive or heavy wording');
const remainingCaseStudies = {
  'hydrogen-integration': {
    title: 'Hydrogen Energy System Integration',
    variant: 'hydrogen',
    sections: ['challenge', 'what-i-did', 'main-tradeoffs', 'outcome'],
    evidence: [
      'EPFL Solar Boat needed to integrate a hydrogen energy system into an existing composite vessel without compromising structure, stability, installation or maintenance access.',
      'The fuel-cell system, storage, supports and surrounding equipment had to work as a single mechanical integration problem.',
      'Developed the equipment layout and mechanical integration architecture in 3DEXPERIENCE.',
      'Designed mounting supports and assessed stiffness and load transfer.',
      'Used MATLAB stability calculations to compare component positions and mass distribution.',
      'Integrated routing, ventilation and maintenance-access constraints.',
      'Iterated the layout across CAD, structural analysis, stability and installation requirements.',
      'Component position affected both available space and vessel balance.',
      'Mounting structures had to carry the equipment without blocking installation or maintenance.',
      'Cables, ventilation and surrounding systems had to coexist with structural interfaces.',
      'The final integration layout and support structures progressed to manufacturing.'
    ],
    minimumWords: 130,
    maximumWords: 210,
    forbidden: /230 kg|207 kg|63 kW|60 kW|340 L|350 bar|437\.5 bar|525 bar|787\.5 bar|commissioned|certified/i
  },
  'navier-structural-fea': {
    title: 'Hydrofoil Structural Analysis',
    variant: 'hydrofoil',
    sections: ['structural-question', 'what-i-did', 'analysis-approach', 'outcome'],
    evidence: [
      'Navier needed to determine whether the existing hydrofoil appendages could support an increased payload requirement.',
      'The assembly combines foils approximately 1.5 m wide with struts approximately 2 m long, so deformation and load transfer had to be assessed at assembly level.',
      'Prepared and ran nonlinear structural models in 3DEXPERIENCE.',
      'Analysed the foil, strut and mechanical interfaces as a complete assembly.',
      'Evaluated stiffness, deformation and composite response.',
      'Checked sensitivity to geometry, laminate properties, applied loads and boundary conditions.',
      'Interpreted the results to support the retain-or-redesign decision.',
      'Modelled the structural form and interfaces governing assembly stiffness.',
      'Used laminate properties and orientations to assess stiffness and structural response.',
      'Applied loads through the foil, strut and connections.',
      'Matched the constraints to the physical support of the assembly.',
      'The analysis supported retaining the existing appendage design for the increased payload requirement.'
    ],
    minimumWords: 145,
    maximumWords: 220,
    forbidden: /exact payload|certified|universally validated|proven safe under all conditions/i
  },
  'navier-test-correlation': {
    title: 'Simulation / Test Correlation',
    variant: 'correlation',
    sections: ['correlation-question', 'what-i-did', 'physical-evidence', 'engineering-conclusion'],
    evidence: [
      'Simulation and physical measurements showed a large discrepancy in hydrofoil deflection.',
      'The objective was to understand the source of the error, improve the prediction method and determine whether the available data supported a reliable structural safety-factor estimate.',
      'Reconstructed the calculation chain behind the predicted deflection.',
      'Improved the internal physics-based deflection method.',
      'Compared the revised prediction with physical measurements.',
      'Investigated uncertainty in geometry, material properties, applied loads, boundary conditions and measurements.',
      'Identified the additional inputs required for a reliable safety-factor estimate.',
      'The study combined structural testing with physical load and deflection measurements, strain gauges and data acquisition.',
      'The comparison between predicted and measured behaviour was used to distinguish modelling limitations from uncertainty in the available inputs.',
      'The revised method substantially improved agreement between predicted and measured deflection.',
      'The available measurements were insufficient to determine a precise structural safety factor.',
      'The study identified the geometry, material, load, boundary-condition and measurement data that required better characterisation before calculating one.'
    ],
    minimumWords: 145,
    maximumWords: 230,
    forbidden: /87%|84%|approximately 3%|general accuracy guarantee|proven safe|precise safety factor was obtained/i
  },
  'range-extender-integration': {
    title: 'Range Extender Integration',
    variant: 'range-extender',
    sections: ['challenge', 'what-i-did', 'key-constraints', 'outcome'],
    evidence: [
      'Navier needed to integrate a generator-based range extender into a constrained hydrofoil-boat architecture.',
      'The system had to fit within the available volume while maintaining structural interfaces, assembly access and protection from the marine environment.',
      'Developed packaging layouts and mechanical interfaces.',
      'Designed mounting and integration components in CAD.',
      'Defined environmental-protection and sealing concepts.',
      'Produced 2D drawings and manufacturing documentation.',
      'Coordinated sourcing and supplier follow-up.',
      'Incorporated manufacturing and assembly feedback into design updates.',
      'Fit the system within the available vessel envelope.',
      'Connect the generator package to the surrounding structure through defined mounting points and load paths.',
      'Maintain installation, service and maintenance access.',
      'Account for splash, humidity and salt through protection and sealing concepts.',
      'Released the integration components for manufacturing and supported their assembly into the range-extender system.'
    ],
    minimumWords: 120,
    maximumWords: 190,
    forbidden: /120 kW|160 hp|fully commissioned|finally validated|complete operational validation/i
  }
};
for (const [id, expected] of Object.entries(remainingCaseStudies)) {
  const html = fs.readFileSync(path.join(root, `work/${id}/index.html`), 'utf8');
  assert(html.includes(`<h1>${expected.title}</h1>`), `Missing case-study title: ${id}`);
  assert(html.includes(`class="case-study case-study--${expected.variant}"`), `Missing distinct case-study composition: ${id}`);
  assert(!html.includes('<details'), `Long-form case study must not use generic details: ${id}`);
  for (const section of expected.sections) assert(html.includes(`id="${section}"`), `Missing ${id} section: ${section}`);
  for (const fact of expected.evidence) assert(html.toLowerCase().includes(fact.toLowerCase()), `Missing ${id} evidence: ${fact}`);
  assert(!expected.forbidden.test(html), `Restricted or unsupported claim leaked into ${id}`);
  const article = html.match(/<article class="case-study [^"]+">([\s\S]*?)<\/article>/)?.[1] || '';
  const words = article.replace(/<[^>]+>/g, ' ').replace(/&(?:amp|lt|gt|quot|#39|rarr);/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
  assert(words >= expected.minimumWords, `${id} needs more technical depth: ${words} words`);
  if (expected.maximumWords) assert(words <= expected.maximumWords, `${id} remains too long: ${words} words`);
  if (expected.maximumWords) assert(words <= expected.maximumWords, `${id} remains too long and defensive: ${words} words`);
  assert(!/did not indicate|not a claim|evidence boundary|does not imply|intentionally stops|could support a decision|bounded that conclusion|universal properties|prevented the numerical output/.test(article), `Defensive editorial posture remains in ${id}`);
}
const rangeExtenderCase = fs.readFileSync(path.join(root, 'work/range-extender-integration/index.html'), 'utf8');
for (const removed of ['The development loop', 'Packaging, interfaces and protection', 'Drawings, suppliers and assembly feedback']) {
  assert(!rangeExtenderCase.includes(removed), `Redundant Range Extender section remains: ${removed}`);
}
const hydrofoilCase = fs.readFileSync(path.join(root, 'work/navier-structural-fea/index.html'), 'utf8');
for (const removed of ['My analysis responsibility', 'Nonlinear composite analysis', 'Reading the appendage as an assembly', 'Simulation to design decision']) {
  assert(!hydrofoilCase.includes(removed), `Redundant Hydrofoil section remains: ${removed}`);
}
const hydrogenCase = fs.readFileSync(path.join(root, 'work/hydrogen-integration/index.html'), 'utf8');
for (const removed of ['The integration challenge', 'A coupled constraint system', 'Layout and mechanical supports', 'Mass distribution and stability', 'Structural sizing of the supports', 'Integration trade-offs', 'Design iteration and manufacturing outcome']) {
  assert(!hydrogenCase.includes(removed), `Redundant Hydrogen section remains: ${removed}`);
}
const correlationCase = fs.readFileSync(path.join(root, 'work/navier-test-correlation/index.html'), 'utf8');
for (const removed of ['Improving the prediction method', 'What controlled the uncertainty?', 'Inputs needed for a safety-factor estimate']) {
  assert(!correlationCase.includes(removed), `Redundant Correlation section remains: ${removed}`);
}
const dist = path.join(root, 'dist');
const publicFiles = fs.readdirSync(dist,{recursive:true,withFileTypes:true}).filter(e => e.isFile()).map(e => path.relative(dist,path.join(e.parentPath || e.path,e.name)).split(path.sep).join('/'));
const assets = new Set(['site.css','site.js','CNAME','assets/qr.png','assets/solar-boat.png']);
for(const p of data.projects) {
  if(p.media?.src) {assets.add(p.media.src);(p.media.srcset||[]).forEach(s=>assets.add(s));}
  if(p.editorial?.caseStudy?.vesselVisual?.src) assets.add(p.editorial.caseStudy.vesselVisual.src);
}
for(const e of data.expertise) {
  if(e.media?.src) {assets.add(e.media.src);(e.media.srcset||[]).forEach(s=>assets.add(s));}
}
if(data.person.resume) assets.add(data.person.resume);
assert.deepEqual(publicFiles.sort(), [...files,...assets].sort(), 'Unexpected publication file');
for(const file of files) assert.equal(fs.readFileSync(path.join(root,file),'utf8'),fs.readFileSync(path.join(dist,file),'utf8'));
for (const p of data.projects) {
  const html = fs.readFileSync(path.join(root,`work/${p.id}/index.html`),'utf8');
  const sections = { ...p.sections, ...(p.editorial?.sections || {}) };
  if (p.editorial?.caseStudy) {
    assert(!html.includes('<details'), 'Long-form case study must not fall back to generic details');
    continue;
  }
  assert(html.indexOf('id="contribution"') < html.indexOf('<details'), 'Contribution must precede optional detail');
  if(!sections.outcome) assert(!html.includes('id="outcome"'));
  assert(!html.includes('<details open'));
}
console.log(`PASS: ${files.length} pages, local links, anchors, metadata, data relationships and confidential-media rules.`);
if (process.argv.includes('--browser')) {
  (async () => {
    const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
    const browser = await chromium.launch(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE, headless: true } : { channel: 'msedge', headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    for (const width of [320, 375, 768, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const file of indexableFiles) {
        await page.goto(pathToFileURL(path.join(root, file)).href);
        assert(await page.locator('h1').isVisible(), `H1 invisible: ${file}`);
        assert(await page.locator('.header-cv').isVisible(), `CV inaccessible: ${width} ${file}`);
        if (data.person.resume) {
          assert((await page.locator('.header-cv').getAttribute('href')).startsWith('../'.repeat(file.split('/').length-1) + data.person.resume));
          assert(await page.locator('.header-cv').getAttribute('download') !== null);
        } else {
          assert.equal(await page.locator('.header-cv').getAttribute('href'), null);
          assert.equal(await page.locator('.header-cv').getAttribute('aria-disabled'), 'true');
        }
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}: ${file}`);
        await page.locator('img').evaluateAll(async images => { await Promise.all(images.map(img => { img.loading='eager';return img.decode(); })); });
      }
    }
    await page.goto(pathToFileURL(path.join(root, 'work/index.html')).href);
    for (const e of data.expertise) {
      await page.locator(`[data-filter="${e.id}"]`).click();
      assert.equal(await page.locator('.project-row:visible').count(), data.projects.filter(p => (p.editorial?.expertise || p.expertise).includes(e.id)).length);
    }
    await page.locator('[data-filter="all"]').click();
    assert.equal(await page.locator('.project-row:visible').count(), 5);
    await page.setViewportSize({ width: 1600, height: 1000 });
    await page.goto(pathToFileURL(path.join(root, 'resume/index.html')).href);
    assert.equal(await page.locator('[data-skill]').count(), 6);
    assert.deepEqual(await page.locator('[data-experience]').evaluateAll(experiences => experiences.map(experience => experience.querySelectorAll('[data-mission]:not([hidden])').length)), [4, 4, 2], 'Resume must start with exactly 4/4/2 visible missions');
    assert.equal(await page.locator('[data-mission]:visible').count(), 10, 'Resume must expose ten missions by default');
    assert.equal(await page.locator('[data-visibility="detail"]:visible').count(), 0, 'Resume detail missions must start collapsed with JavaScript');
    assert.equal(await page.locator('[data-expand-experience]:visible').count(), 3);
    assert.deepEqual(await page.locator('[data-expand-experience]').allTextContents().then(items => items.map(item => item.trim())), ['Show 10 more missions', 'Show 10 more missions', 'Show 2 more missions']);
    const structuralSkill = page.locator('[data-skill="structural-fea"]');
    await structuralSkill.click();
    assert.equal(await structuralSkill.getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('[data-mission].is-match').count(), 11);
    assert.equal(await page.locator('[data-mission].is-muted').count(), resumeMissions.length - 11);
    assert(await page.locator('#navier-composite-verification').isVisible(), 'A matching detail mission must be revealed by the filter');
    assert(await page.locator('#navier-hardware-ownership').isVisible(), 'A non-matching summary mission must remain visible');
    const mutedMission = page.locator('[data-mission].is-muted:visible').first();
    await mutedMission.evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)));
    const mutedOpacity = Number(await mutedMission.evaluate(element => getComputedStyle(element).opacity));
    assert(mutedOpacity >= .35 && mutedOpacity <= .45, `Muted missions must remain readable at 35–45% opacity, got ${mutedOpacity}`);
    assert((await page.locator('.resume-filter-status').textContent()).includes('11 relevant missions'));
    assert(await page.locator('[data-clear-resume-filter]').isVisible());
    await structuralSkill.click();
    assert.equal(await structuralSkill.getAttribute('aria-pressed'), 'false');
    assert.equal(await page.locator('[data-mission].is-match').count(), 0);
    assert.equal(await page.locator('[data-visibility="detail"]:visible').count(), 0);
    for (const skill of data.resumePage.skills) {
      const button = page.locator(`[data-skill="${skill.id}"]`);
      await button.click();
      const expectedMatches = resumeMissions.filter(mission => mission.tags.includes(skill.id));
      assert.equal(await page.locator('[data-mission].is-match').count(), expectedMatches.length, `All ${skill.name} missions must be highlighted`);
      for (const mission of expectedMatches) assert(await page.locator(`#${mission.id}`).isVisible(), `Filtered Resume mission must be revealed: ${mission.id}`);
      await button.click();
    }
    const navierExpand = page.locator('#resume-navier [data-expand-experience]');
    await navierExpand.click();
    assert.equal(await navierExpand.getAttribute('aria-expanded'), 'true');
    assert.equal((await navierExpand.textContent()).trim(), 'Show less');
    assert.equal(await page.locator('#resume-navier [data-visibility="detail"]:visible').count(), 10);
    await navierExpand.click();
    assert.equal(await navierExpand.getAttribute('aria-expanded'), 'false');
    assert.equal((await navierExpand.textContent()).trim(), 'Show 10 more missions');
    await page.locator('[data-skill="testing-instrumentation"]').click();
    await page.locator('[data-clear-resume-filter]').click();
    assert.equal(await page.locator('[data-skill][aria-pressed="true"]').count(), 0);
    assert.equal((await page.locator('.resume-filter-status').textContent()).trim(), 'No skill selected.');
    assert.equal(await page.evaluate(() => document.activeElement?.dataset.skill), 'testing-instrumentation', 'Clear filter must restore focus to the active skill');
    await navierExpand.click();
    await structuralSkill.click();
    await page.locator('[data-clear-resume-filter]').click();
    assert.equal(await page.locator('#resume-navier [data-visibility="detail"]:visible').count(), 10, 'Clearing a filter must preserve manual expansion');
    await navierExpand.click();
    await structuralSkill.focus();
    assert(await structuralSkill.evaluate(element => element.matches(':focus')), 'Resume skill controls must accept keyboard focus');
    assert.equal(await page.locator('.resume-related ul').count(), 0, 'Related work must not use full-width list rows');
    assert.equal(await page.locator('.resume-related-links').count(), 2, 'Related work must render as compact inline links');
    const desktopResumeLayout = await page.locator('.resume-interactive').evaluate(element => {
      const experience = element.querySelector('.resume-experience-column').getBoundingClientRect();
      const skills = element.querySelector('.resume-skills').getBoundingClientRect();
      return { experienceX: experience.x, skillsX: skills.x, skillsPosition: getComputedStyle(element.querySelector('.resume-skills-sticky')).position };
    });
    assert(desktopResumeLayout.experienceX < desktopResumeLayout.skillsX);
    assert.equal(desktopResumeLayout.skillsPosition, 'sticky');
    const resumeSectionHeadingGaps = await page.locator('.resume-education, .resume-toolset').evaluateAll(sections => sections.map(section => {
      const heading = section.querySelector(':scope > h2').getBoundingClientRect();
      const content = section.querySelector(':scope > h2 + *').getBoundingClientRect();
      return content.top - heading.bottom;
    }));
    assert(resumeSectionHeadingGaps.every(gap => Math.abs(gap - 16) < 1), `Resume Education and Toolset heading gaps must both be 16px, got ${resumeSectionHeadingGaps}`);
    const desktopEducation = await page.locator('.resume-education-list article').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect()));
    assert(Math.abs(desktopEducation[0].y - desktopEducation[1].y) < 2, 'Education entries must sit side by side on desktop');
    const desktopToolset = await page.locator('.resume-toolset-grid article').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect()));
    assert(Math.abs(desktopToolset[0].y - desktopToolset[1].y) < 2, 'Toolset must use a compact two-column desktop layout');
    const resumeTop = await page.locator('.resume-interactive').evaluate(element => element.offsetTop);
    await page.evaluate(top => window.scrollTo(0, top + 420), resumeTop);
    await page.waitForFunction(() => Math.abs(document.querySelector('.resume-skills-sticky').getBoundingClientRect().top - 116) < 3);
    await page.setViewportSize({ width: 1440, height: 620 });
    await page.evaluate(top => window.scrollTo(0, top + 420), resumeTop);
    await page.waitForFunction(() => Math.abs(document.querySelector('.resume-skills-sticky').getBoundingClientRect().top - 116) < 3);
    const shortDesktopSidebar = await page.locator('.resume-skills-sticky').evaluate(element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        clientHeight: element.clientHeight,
        scrollHeight: element.scrollHeight,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        maxHeight: parseFloat(style.maxHeight),
        overflowX: style.overflowX,
        overflowY: style.overflowY,
        paddingRight: parseFloat(style.paddingRight),
        top: rect.top
      };
    });
    assert.equal(shortDesktopSidebar.overflowY, 'auto', 'Desktop Skills sidebar must scroll independently');
    assert.equal(shortDesktopSidebar.overflowX, 'hidden', 'Desktop Skills sidebar must not scroll horizontally');
    assert(shortDesktopSidebar.scrollHeight > shortDesktopSidebar.clientHeight, 'A short desktop viewport must constrain the Skills sidebar');
    assert(shortDesktopSidebar.scrollWidth <= shortDesktopSidebar.clientWidth + 1, 'Skills sidebar content must fit without horizontal overflow');
    assert(shortDesktopSidebar.maxHeight <= 620 - shortDesktopSidebar.top - 16, 'Skills sidebar must leave breathing room below the viewport');
    assert(shortDesktopSidebar.paddingRight >= 8, 'Skills sidebar must reserve space beside its scrollbar');
    const bodyScrollBeforeSidebar = await page.evaluate(() => window.scrollY);
    await page.locator('.resume-skills-sticky').evaluate(element => { element.scrollTop = element.scrollHeight; });
    const lastSkillVisibility = await page.locator('[data-skill]').last().evaluate(element => {
      const sidebar = element.closest('.resume-skills-sticky').getBoundingClientRect();
      const skill = element.getBoundingClientRect();
      return { skillBottom: skill.bottom, sidebarBottom: sidebar.bottom, scrollTop: element.closest('.resume-skills-sticky').scrollTop };
    });
    assert(lastSkillVisibility.scrollTop > 0, 'The Skills sidebar must reach its final item');
    assert(lastSkillVisibility.skillBottom <= lastSkillVisibility.sidebarBottom + 1, 'The final skill must be visible after scrolling');
    assert.equal(await page.evaluate(() => window.scrollY), bodyScrollBeforeSidebar, 'Scrolling the Skills sidebar must not scroll the page');
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const desktop1280Ratio = await page.locator('.resume-interactive').evaluate(element => {
      const experience = element.querySelector('.resume-experience-column').getBoundingClientRect();
      const skills = element.querySelector('.resume-skills').getBoundingClientRect();
      return experience.width / (experience.width + skills.width);
    });
    assert(desktop1280Ratio >= .68 && desktop1280Ratio <= .72, `Resume desktop ratio must stay near 70/30, got ${desktop1280Ratio}`);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForFunction(() => document.querySelector('[data-resume] > :first-child')?.classList.contains('resume-skills'));
    const mobileResumeLayout = await page.locator('.resume-interactive').evaluate(element => {
      const experience = element.querySelector('.resume-experience-column').getBoundingClientRect();
      const skills = element.querySelector('.resume-skills').getBoundingClientRect();
      const skillList = element.querySelector('.resume-skill-list');
      const sticky = getComputedStyle(element.querySelector('.resume-skills-sticky'));
      return { experienceY: experience.y, skillsY: skills.y, skillsPosition: sticky.position, skillsOverflowY: sticky.overflowY, skillsMaxHeight: sticky.maxHeight, skillOverflow: getComputedStyle(skillList).overflowX };
    });
    assert(mobileResumeLayout.skillsY < mobileResumeLayout.experienceY);
    assert.equal(mobileResumeLayout.skillsPosition, 'static');
    assert.equal(mobileResumeLayout.skillsOverflowY, 'visible');
    assert.equal(mobileResumeLayout.skillsMaxHeight, 'none');
    assert.equal(mobileResumeLayout.skillOverflow, 'auto');
    assert.equal(await page.locator('[data-resume] > *').first().getAttribute('class'), 'resume-skills', 'Mobile DOM order must match the visual skill-first order');
    assert.equal(await page.locator('[data-mission]:visible').count(), 10, 'Mobile must preserve the 4/4/2 default mission limit');
    await page.goto(pathToFileURL(path.join(root, 'about/index.html')).href);
    await page.waitForURL(url => url.pathname.replace(/\\/g, '/').endsWith('/resume/index.html'));
    assert.equal(await page.locator('h1').textContent(), 'Resume', 'Legacy About navigation must land on Resume');
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(pathToFileURL(path.join(root, 'index.html')).href);
    const heroCv = page.locator('.hero-cv');
    assert.equal(await heroCv.getAttribute('download'), '');
    assert((await heroCv.getAttribute('href')).endsWith(data.person.resume));
    assert.equal(await page.locator('.chapter-link').count(), 3);
    assert.equal(await page.locator('.expertise-module').count(), 5);
    const desktopModules = await page.locator('.expertise-module').evaluateAll(nodes => nodes.map(n => { const r=n.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width}; }));
    assert(desktopModules.every(m => Math.abs(m.w-desktopModules[0].w)<1));
    assert(desktopModules.slice(0,3).every(m => Math.abs(m.y-desktopModules[0].y)<1));
    assert(Math.abs(desktopModules[3].y-desktopModules[4].y)<1);
    assert(desktopModules[3].x > desktopModules[0].x && desktopModules[4].x < desktopModules[2].x + desktopModules[2].w);
    await page.setViewportSize({ width: 768, height: 1000 });
    const tabletModules = await page.locator('.expertise-module').evaluateAll(nodes => nodes.map(n => { const r=n.getBoundingClientRect(); return {x:r.x,w:r.width}; }));
    assert(tabletModules.every(m => Math.abs(m.w-tabletModules[0].w)<1));
    assert(tabletModules[4].x > tabletModules[0].x);
    await page.setViewportSize({ width: 375, height: 812 });
    const mobileModules = await page.locator('.expertise-module').evaluateAll(nodes => nodes.map(n => { const r=n.getBoundingClientRect(); return {x:r.x,w:r.width}; }));
    assert(mobileModules.every(m => Math.abs(m.w-mobileModules[0].w)<1 && Math.abs(m.x-mobileModules[0].x)<1));
    await page.locator('.menu-toggle').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    await page.locator('.menu-toggle').click();
    await page.locator('#main-nav').getByRole('link', { name: 'Services', exact: true }).click();
    assert(page.url().includes('/services/'));
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    await page.goto(pathToFileURL(path.join(root,'work/navier-test-correlation/index.html')).href);
    assert(await page.locator('#correlation-question').isVisible());
    assert.equal(await page.locator('details').count(), 0);
    const out = path.join(root, '..', 'tmp', 'portfolio-v1-qa');
    fs.mkdirSync(out, { recursive: true });
    for (const [file, width, name] of [['index.html',1440,'home-desktop'],['index.html',375,'home-mobile'],['resume/index.html',1440,'resume-desktop'],['resume/index.html',1280,'resume-desktop-1280'],['resume/index.html',390,'resume-mobile'],['work/navier-test-correlation/index.html',375,'case-mobile'],['work/navier-test-correlation/index.html',1440,'case-study'],['services/index.html',768,'services-tablet']]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(pathToFileURL(path.join(root, file)).href);
      await page.locator('img').evaluateAll(async images => { await Promise.all(images.map(img => { img.loading = 'eager'; return img.decode(); })); });
      await page.screenshot({ path: path.join(out, `${name}.png`), fullPage: true });
    }
    const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: {width:375,height:812} });
    const plain = await nojs.newPage();
    await plain.goto(pathToFileURL(path.join(root, 'index.html')).href);
    assert(await plain.locator('#main-nav').getByRole('link', {name:'Work',exact:true}).isVisible());
    assert.equal(await plain.locator('.project-row').count(), 3);
    assert(await plain.locator('.header-cv').isVisible());
    await plain.goto(pathToFileURL(path.join(root,'work/navier-test-correlation/index.html')).href);
    assert(await plain.locator('#correlation-question').isVisible());
    await plain.goto(pathToFileURL(path.join(root, 'resume/index.html')).href);
    assert.equal(await plain.locator('[data-mission]').count(), resumeMissions.length);
    assert.equal(await plain.locator('[data-mission]:visible').count(), 10, 'No-JS Resume must remain short by default');
    assert.equal(await plain.locator('[data-visibility="detail"]:visible').count(), 0, 'No-JS Resume details must start collapsed');
    assert.equal(await plain.locator('[data-resume-details]').count(), 3, 'No-JS Resume must retain native detail controls');
    await plain.locator('#resume-navier [data-resume-details] > summary').click();
    assert.equal(await plain.locator('#resume-navier [data-visibility="detail"]:visible').count(), 10, 'No-JS native control must reveal the complete experience detail');
    assert(await plain.locator('.resume-skills').isHidden(), 'Inert Resume skills must be hidden without JavaScript');
    assert(await plain.locator('.resume-instruction').isHidden(), 'Interactive instruction must be hidden without JavaScript');
    assert.deepEqual(errors, []);
    await browser.close();
    console.log('PASS: viewport/page checks, images, CV access, filters, Resume interactions, mobile menu, no-JS content and no browser exceptions. Screenshots: ' + out);
  })().catch(err => { console.error(err); process.exitCode = 1; });
}
