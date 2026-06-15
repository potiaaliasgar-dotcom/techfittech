import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public/assets/images');
const MIN_SIZE_BYTES = 50 * 1024; // 50 KB

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        // Skip files that are already generated responsive sizes or formats
        if (!file.match(/-400\.|-800\.|-1600\./)) {
          results.push(filePath);
        }
      }
    }
  }
  return results;
}

async function processImage(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.size < MIN_SIZE_BYTES && !filePath.includes("img-7edcc2dfb4.png")) {
    return { skipped: true, size: stat.size };
  }

  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);

  const formats = [
    { ext: '.webp', format: 'webp', options: { quality: 82 } },
    { ext: '.avif', format: 'avif', options: { quality: 60 } }
  ];

  const widths = [400, 800, 1600];
  let processedCount = 0;
  let totalBytesGenerated = 0;

  for (const { ext: outExt, format, options } of formats) {
    // Generate sibling format with same name (e.g. image.webp)
    const siblingPath = path.join(dir, `${baseName}${outExt}`);
    if (!fs.existsSync(siblingPath)) {
      await sharp(filePath, { failOnError: false })
        .toFormat(format, options)
        .toFile(siblingPath);
      processedCount++;
      totalBytesGenerated += fs.statSync(siblingPath).size;
    }

    // Generate responsive widths
    for (const w of widths) {
      const outPath = path.join(dir, `${baseName}-${w}${outExt}`);
      if (!fs.existsSync(outPath)) {
        await sharp(filePath, { failOnError: false })
          .resize({ width: w, withoutEnlargement: true })
          .toFormat(format, options)
          .toFile(outPath);
        processedCount++;
        totalBytesGenerated += fs.statSync(outPath).size;
      }
    }
  }

  return { skipped: false, originalSize: stat.size, processedCount, totalBytesGenerated };
}

// Simple Promise-based worker pool for limit concurrency
async function runPool(items, limit, fn) {
  let index = 0;
  const results = [];
  const promises = [];

  async function worker() {
    while (index < items.length) {
      const currentIndex = index++;
      const item = items[currentIndex];
      try {
        const res = await fn(item);
        results[currentIndex] = { item, success: true, res };
      } catch (err) {
        console.error(`Error processing ${item}:`, err.message);
        results[currentIndex] = { item, success: false, error: err };
      }
    }
  }

  for (let i = 0; i < Math.min(limit, items.length); i++) {
    promises.push(worker());
  }

  await Promise.all(promises);
  return results;
}

async function main() {
  console.log(`Starting image optimization scanner in ${IMAGES_DIR}...`);
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log(`Directory ${IMAGES_DIR} not found. Skipping.`);
    return;
  }

  const files = getFilesRecursively(IMAGES_DIR);
  console.log(`Found ${files.length} base candidate images. Starting optimizations (concurrency limit: 4)...`);

  const startTime = Date.now();
  const results = await runPool(files, 4, processImage);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  let skippedCount = 0;
  let processedCount = 0;
  let totalOriginalSize = 0;
  let totalGeneratedSize = 0;
  let totalNewFiles = 0;

  for (const r of results) {
    if (r.success) {
      if (r.res.skipped) {
        skippedCount++;
      } else {
        processedCount++;
        totalOriginalSize += r.res.originalSize;
        totalGeneratedSize += r.res.totalBytesGenerated;
        totalNewFiles += r.res.processedCount;
      }
    }
  }

  const beforeMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const afterMB = (totalGeneratedSize / (1024 * 1024)).toFixed(2);
  const savedMB = ((totalOriginalSize - totalGeneratedSize) / (1024 * 1024)).toFixed(2);
  const pctSaved = totalOriginalSize > 0 ? ((totalOriginalSize - totalGeneratedSize) / totalOriginalSize * 100).toFixed(1) : 0;

  console.log(`\n🎉 Image Optimization complete in ${elapsed}s!`);
  console.log(`- Scanned base images: ${files.length}`);
  console.log(`- Skipped (under 50KB): ${skippedCount}`);
  console.log(`- Optimized/Processed: ${processedCount}`);
  console.log(`- New responsive files generated: ${totalNewFiles}`);
  console.log(`- Total original processed size: ${beforeMB} MB`);
  console.log(`- Total new sizes generated: ${afterMB} MB`);
  console.log(`- Net storage savings: ${savedMB} MB (${pctSaved}% reduction)`);
}

main().catch(err => {
  console.error('Fatal error running image optimization pass:', err);
  process.exit(1);
});
