import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_OG = path.join(ROOT, 'public', 'og');

// Source image maps pointing to real photos in the codebase
const SOURCES = {
  'og-mma.jpg': 'public/assets/images/other/seg-e74ca4429e.jpg',        // Real MMA Cage installation hero
  'og-padel.jpg': 'public/assets/images/other/img-853fb9b8b4.jpg',      // Real Panoramic Padel Court installation
  'og-rigs.jpg': 'public/assets/images/other/seg-d37a340a28.jpg',       // Real modular CrossFit Rig installation
  'og-wellness.jpg': 'public/assets/images/other/img-biopod.png',       // Real Alteon Biopod dry floatation chamber
  'og-weights.jpg': 'public/assets/images/other/img-23f50c3f30.jpg',     // Real commercial strength dumbbell range
  'og-aqua.jpg': 'public/assets/images/other/img-f8279c4249.jpg',        // Real SS316 underwater treadmill in hydrotherapy pool
  'og-cardio.jpg': 'public/assets/images/products/bh/bh-fitness-g669-run-mill.jpg',     // Real European commercial treadmill
  'og-flooring.jpg': 'public/assets/images/other/img-e2758a4938.jpg'     // Real deadlift platform rubber tiles
};

async function generateOgImages() {
  console.log('🖼  Starting Programmatic OG Image Generation...\n');

  // Create public/og directory if it doesn't exist
  if (!fs.existsSync(PUBLIC_OG)) {
    fs.mkdirSync(PUBLIC_OG, { recursive: true });
    console.log(`Created directory: ${PUBLIC_OG}`);
  }

  for (const [filename, relPath] of Object.entries(SOURCES)) {
    const srcPath = path.join(ROOT, relPath);
    const destPath = path.join(PUBLIC_OG, filename);

    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠ Warning: Source file not found: ${srcPath}. Skipping...`);
      continue;
    }

    try {
      console.log(`Processing: ${relPath} -> public/og/${filename}`);
      
      // Perform crop and resize to exactly 1200x630
      await sharp(srcPath)
        .resize(1200, 630, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 90 })
        .toFile(destPath);

      console.log(`✔ Successfully generated: public/og/${filename}`);
    } catch (err) {
      console.error(`❌ Error processing ${filename}:`, err.message);
    }
  }

  console.log('\n🎉 OG Image generation complete!');
}

generateOgImages();
