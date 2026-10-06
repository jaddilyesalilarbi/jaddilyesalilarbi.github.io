// Static integrity checks; optional browser QA: node verify.cjs --browser
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');
const data = require('./content/site.cjs');
const root = __dirname;
const files = ['index.html', '404.html', ...['work','expertise','services','about','contact'].map(p => `${p}/index.html`), ...data.projects.map(p => `work/${p.id}/index.html`)];
const ids = items => new Set(items.map(i => i.id));
assert.equal(ids(data.projects).size, 5);
assert.equal(ids(data.expertise).size, 5);
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
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Single H1: ${file}`);
  assert(html.includes('name="description"'));
  assert(!/being prepared|to be added|to be documented|in development|Visual in preparation|related projects|Four connected disciplines/i.test(html), `Editorial placeholder: ${file}`);
  assert(!/Structural Engineering|Validation &amp; Testing|Mechanical Development/.test(html), `Outdated expertise label: ${file}`);
  assert(html.includes('header-cv'));
  assert(!html.includes('Request CV'));
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = match[1];
    if (/^(mailto:|tel:|https?:)/.test(ref)) continue;
    const [target, anchor] = ref.split('#');
    const destination = target ? path.resolve(root, path.dirname(file), target) : path.resolve(root, file);
    assert(fs.existsSync(destination), `Broken link ${file} → ${ref}`);
    if (anchor) assert(fs.readFileSync(destination, 'utf8').includes(`id="${anchor}"`), `Missing anchor ${ref}`);
  }
}
const home = fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(home.includes('Mechanical engineering<br class="desktop-break"> from design to testing.'));
assert(home.includes('<h2>My Work</h2>'));
assert(home.includes('<h2>Areas of Expertise</h2>'));
assert(home.includes('<h2>Background</h2>'));
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
for (const file of files) {
  const html = fs.readFileSync(path.join(root,file),'utf8');
  assert(!html.includes('Swiss Solar Boat'), `Organisation naming must be consistent: ${file}`);
  assert(!html.includes('Structural FEA —'), `Old project title remains visible: ${file}`);
  assert(!html.includes('Structural Simulation / FEAMechanical Design'), `Concatenated expertise labels: ${file}`);
}
for (const section of ['work','expertise','services','about','contact']) {
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

const aboutPage = fs.readFileSync(path.join(root,'about/index.html'),'utf8');
assert(aboutPage.includes('15+ mechanical components and subsystems'));
assert(aboutPage.includes('Alameda, California'));
assert(aboutPage.includes('managed a 12-person technical team'));
assert(aboutPage.includes('Master of Science in Mechanical Engineering'));
assert(aboutPage.includes('Bachelor of Science in Mechanical Engineering'));
assert(aboutPage.includes('independently taught groups of up to 50 students'));
for (const section of ['navier','solar-boat','education','teaching']) assert(aboutPage.includes(`id="${section}"`), `Missing About section: ${section}`);
assert(aboutPage.indexOf('id="navier"') < aboutPage.indexOf('id="solar-boat"'));
assert(aboutPage.indexOf('id="solar-boat"') < aboutPage.indexOf('id="education"'));
assert(aboutPage.indexOf('id="education"') < aboutPage.indexOf('id="teaching"'));
assert(!aboutPage.includes('Engineering approach.'), 'About must not end as a generic manifesto');
assert(!aboutPage.includes('I am a mechanical engineer trained at EPFL'), 'About opening must not repeat the hero positioning');

const contactPage = fs.readFileSync(path.join(root,'contact/index.html'),'utf8');
assert(contactPage.includes(data.person.email), 'Contact email must remain visible');
assert.equal(data.person.phone, '+33660908949', 'Phone number must live in the central content source');
assert(contactPage.includes('href="tel:+33660908949"'), 'Contact page must expose a direct phone link');
assert(contactPage.includes('href="https://wa.me/33660908949"'), 'Contact page must expose a direct WhatsApp link');
assert(contactPage.includes('I usually reply faster on WhatsApp.'), 'WhatsApp response note must remain visible');
assert(contactPage.includes('src="../assets/qr.png"'), 'Contact page must display the website QR code');
assert(contactPage.includes(data.person.linkedin), 'Contact page must use the central LinkedIn URL');
assert(!contactPage.includes('Paris, France'), 'Contact page must not display Paris, France');
for (const file of files) {
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
for (const id of ['challenge','responsibility','approach','load-cases','composite-assessment','physical-testing','manufacturing-outcome','takeaways']) {
  assert(structuralCase.includes(`id="${id}"`), `Missing Structural FEA case-study section: ${id}`);
}
for (const fact of ['planing', 'flight', 'crash', 'slamming', 'immersion', 'pseudo-strut', 'pseudo-rudder', 'Tsai-Wu', '18.8 mm', '0.90 mm', '0.92 mm', 'NTPT']) {
  assert(structuralCase.includes(fact), `Missing Structural FEA evidence: ${fact}`);
}
for (const fact of ['approximately 7 m', '20.0 mm', '6.0%', 'What this project demonstrates']) {
  assert(structuralCase.includes(fact), `Missing Structural FEA refinement: ${fact}`);
}
assert(structuralCase.includes('<table class="test-comparison">'), 'Physical comparison must use a compact table');
assert.equal((structuralCase.match(/class="project-proof"/g) || []).length, 3, 'Project synthesis must contain three compact proofs');
assert(!/This wording is deliberate|colourful result plot|Reading the result therefore|required more than locating the highest contour/.test(structuralCase), 'Editorial or repetitive commentary leaked into public copy');
assert(!/281,000|120 composite surfaces|71 surfaces|50 structural volumes|48 volumes|120 laminates/.test(structuralCase), 'Disputed model-size metrics must remain unpublished');
const caseStudyHtml = structuralCase.match(/<article class="case-study">([\s\S]*?)<\/article>/)?.[1] || '';
const caseStudyText = caseStudyHtml.replace(/<[^>]+>/g, ' ').replace(/&(?:amp|lt|gt|quot|#39);/g, ' ').replace(/\s+/g, ' ').trim();
const caseStudyWords = caseStudyText.split(' ').filter(Boolean).length;
assert(caseStudyWords >= 700 && caseStudyWords <= 850, `Structural FEA refinement depth: ${caseStudyWords} words`);
assert(!/did not validate every|rather than numerical artefacts|rather than adding material uniformly/.test(structuralCase), 'Structural FEA still contains defensive or heavy wording');
const remainingCaseStudies = {
  'hydrogen-integration': {
    title: 'Hydrogen Energy System Integration',
    variant: 'hydrogen',
    sections: ['integration-challenge', 'integration-constraints', 'layout-supports', 'stability-workflow', 'support-sizing', 'integration-tradeoffs', 'manufacturing-outcome'],
    evidence: ['3DEXPERIENCE', 'MATLAB', 'Tsai-Wu', 'centre of gravity', 'cable routing', 'ventilation', 'maintenance access', 'I iterated the component layout', 'The final integration design and support structures progressed to manufacturing.'],
    minimumWords: 400,
    forbidden: /230 kg|207 kg|63 kW|60 kW|340 L|350 bar|437\.5 bar|525 bar|787\.5 bar|commissioned|certified/i
  },
  'navier-structural-fea': {
    title: 'Hydrofoil Structural Analysis',
    variant: 'hydrofoil',
    sections: ['structural-question', 'analysis-responsibility', 'nonlinear-analysis', 'assembly-interpretation', 'design-decision'],
    evidence: ['approximately 1.5 m', 'approximately 2 m', '3DEXPERIENCE', 'nonlinear', 'composite', 'boundary conditions', 'increased payload requirement', 'The analysis supported retaining the existing appendage design for the increased payload requirement.'],
    minimumWords: 300,
    maximumWords: 430,
    forbidden: /exact payload|certified|universally validated|proven safe under all conditions/i
  },
  'navier-test-correlation': {
    title: 'Simulation / Test Correlation',
    variant: 'correlation',
    sections: ['correlation-question', 'prediction-method', 'uncertainty', 'testing-context', 'engineering-conclusion', 'next-evidence'],
    evidence: ['I improved the deflection prediction and identified the data gaps preventing a reliable safety-factor estimate.', 'The available measurements were insufficient to determine a precise structural safety factor.', 'geometry', 'material properties', 'applied loads', 'boundary conditions', 'measurement', 'strain gauges', 'load cells', 'DAQ', 'waterproof sensor housings'],
    minimumWords: 400,
    forbidden: /87%|84%|approximately 3%|general accuracy guarantee/i
  },
  'range-extender-integration': {
    title: 'Range Extender Integration',
    variant: 'range-extender',
    sections: ['integration-brief', 'marine-constraints', 'development-loop', 'interface-design', 'production-feedback', 'manufacturing-outcome'],
    evidence: ['packaging', 'mechanical interfaces', 'splash', 'humidity', 'salt', '2D drawings', 'supplier', 'assembly feedback', 'released for manufacturing', 'I designed the mounting and integration components, released the drawings for manufacturing and updated the design from assembly feedback.'],
    minimumWords: 380,
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
  if (expected.maximumWords) assert(words <= expected.maximumWords, `${id} remains too long and defensive: ${words} words`);
  assert(!/did not indicate|not a claim|evidence boundary|does not imply|intentionally stops|could support a decision|bounded that conclusion|universal properties|prevented the numerical output/.test(article), `Defensive editorial posture remains in ${id}`);
}
const dist = path.join(root, 'dist');
const publicFiles = fs.readdirSync(dist,{recursive:true,withFileTypes:true}).filter(e => e.isFile()).map(e => path.relative(dist,path.join(e.parentPath || e.path,e.name)).split(path.sep).join('/'));
const assets = new Set(['site.css','site.js','CNAME','assets/qr.png']);
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
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    for (const width of [320, 375, 768, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const file of files) {
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
    assert(await page.locator('#contribution').isVisible());
    assert.equal(await page.locator('details[open]').count(),0);
    const summary = page.locator('summary').first();
    await summary.focus();
    assert.notEqual(await summary.evaluate(el=>getComputedStyle(el).outlineStyle),'none');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('details[open]').count(),1);
    await summary.click();
    assert.equal(await page.locator('details[open]').count(),0);
    const out = path.join(root, '..', 'tmp', 'portfolio-v1-qa');
    fs.mkdirSync(out, { recursive: true });
    for (const [file, width, name] of [['index.html',1440,'home-desktop'],['index.html',375,'home-mobile'],['work/navier-test-correlation/index.html',375,'case-mobile'],['work/navier-test-correlation/index.html',1440,'case-study'],['services/index.html',768,'services-tablet'],['about/index.html',1440,'about-desktop']]) {
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
    await plain.locator('summary').first().click();
    assert.equal(await plain.locator('details[open]').count(),1);
    assert.deepEqual(errors, []);
    await browser.close();
    console.log('PASS: 60 viewport/page checks, images, CV access, filters, mobile menu, keyboard/touch details, no-JS navigation/details, no browser exceptions. Screenshots: ' + out);
  })().catch(err => { console.error(err); process.exitCode = 1; });
}
