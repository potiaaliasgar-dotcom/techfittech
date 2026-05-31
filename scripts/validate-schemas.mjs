import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');

function getHtmlFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFilesRecursively(filePath));
    } else {
      if (path.extname(file).toLowerCase() === '.html') {
        results.push(filePath);
      }
    }
  }
  return results;
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(DIST_DIR, filePath);
  
  // Extract all JSON-LD script blocks
  const scriptRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  let blocksParsed = 0;
  let totalEntities = 0;
  
  while ((match = scriptRegex.exec(content)) !== null) {
    const rawJson = match[1].trim();
    if (!rawJson) continue;
    
    blocksParsed++;
    let parsed;
    try {
      parsed = JSON.parse(rawJson);
    } catch (err) {
      console.error(`\n❌ JSON-LD PARSE ERROR in [${relativePath}]:`);
      console.error(err.message);
      console.error('--- BAD JSON CONTENT ---');
      console.error(rawJson);
      console.error('------------------------');
      process.exit(1);
    }
    
    // Check structured data shape
    const checkEntity = (entity) => {
      totalEntities++;
      if (!entity['@type']) {
        console.error(`\n❌ SCHEMA VALIDATION ERROR in [${relativePath}]: Missing '@type' property in entity.`);
        console.log(entity);
        process.exit(1);
      }
    };
    
    if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
      if (!parsed['@context']) {
        console.error(`\n❌ SCHEMA VALIDATION ERROR in [${relativePath}]: Missing '@context' in root JSON-LD block.`);
        process.exit(1);
      }
      parsed['@graph'].forEach(checkEntity);
    } else if (Array.isArray(parsed)) {
      parsed.forEach(checkEntity);
    } else {
      if (!parsed['@context']) {
        console.error(`\n❌ SCHEMA VALIDATION ERROR in [${relativePath}]: Missing '@context' in entity.`);
        process.exit(1);
      }
      checkEntity(parsed);
    }
  }
  
  return { relativePath, blocksParsed, totalEntities };
}

async function main() {
  console.log(`🔍 Starting build-time JSON-LD Schema Validator in ${DIST_DIR}...`);
  const files = getHtmlFilesRecursively(DIST_DIR);
  
  if (files.length === 0) {
    console.error(`❌ No compiled HTML files found in ${DIST_DIR}. Ensure you build before running validation.`);
    process.exit(1);
  }
  
  console.log(`Found ${files.length} HTML pages to scan. Processing...\n`);
  
  let totalBlocks = 0;
  let totalEntities = 0;
  const reports = [];
  
  for (const file of files) {
    const report = validateFile(file);
    reports.push(report);
    totalBlocks += report.blocksParsed;
    totalEntities += report.totalEntities;
  }
  
  // Print validation report table
  console.log('---------------------------------------------------------------------------------');
  console.log(String('PAGE ROUTE').padEnd(50) + String('BLOCKS').padStart(10) + String('ENTITIES').padStart(15));
  console.log('---------------------------------------------------------------------------------');
  
  // Sort reports alphabetically
  reports.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  
  for (const r of reports) {
    const name = r.relativePath === 'index.html' ? '/' : r.relativePath.replace('/index.html', '');
    console.log(name.padEnd(50) + String(r.blocksParsed).padStart(10) + String(r.totalEntities).padStart(15));
  }
  
  console.log('---------------------------------------------------------------------------------');
  console.log(`🎉 Schema Validation Successful!`);
  console.log(`- Scanned pages: ${files.length}`);
  console.log(`- Total valid JSON-LD schema blocks: ${totalBlocks}`);
  console.log(`- Total active structured-data entities: ${totalEntities}\n`);
}

main().catch(err => {
  console.error('Fatal error running build-time schema validator:', err);
  process.exit(1);
});
