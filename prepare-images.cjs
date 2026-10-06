// Optional asset preparation. Generated WebP files are deployed; Sharp is not a site dependency.
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');

const assets = [
  { name: 'composite-fea', lossless: true },
  { name: 'hydrogen-system-integration', lossless: true },
  { name: 'hydrofoil-structural-analysis', lossless: true },
  { name: 'simulation-test-correlation', lossless: true },
  { name: 'range-extender-integration', lossless: true },
  { name: 'solar-boat', lossless: false }
];
const widths = [640, 1280, 1920];

Promise.all(assets.flatMap(asset => widths.map(width => sharp(path.join(__dirname, `assets/${asset.name}.png`))
  .resize({ width, withoutEnlargement: true })
  .webp(asset.lossless ? { lossless: true, effort: 6 } : { quality: 92, smartSubsample: true, effort: 6 })
  .toFile(path.join(__dirname, `assets/${asset.name}-${width}.webp`)))))
  .then(() => console.log('Prepared responsive project images. Originals retained.'))
  .catch(error => { console.error(error); process.exitCode = 1; });
