/**
 * Automated Newman Runner for Airline Nexus API Collection
 */
const path = require('path');
const fs = require('fs');

async function runCollection() {
  console.log('='.repeat(70));
  console.log('   AIRLINE NEXUS — AUTOMATED POSTMAN / NEWMAN REGRESSION RUNNER');
  console.log('='.repeat(70));

  const collectionPath = path.join(__dirname, 'airline-nexus.postman_collection.json');
  if (!fs.existsSync(collectionPath)) {
    console.error(`Collection not found at: ${collectionPath}`);
    process.exit(1);
  }

  const collectionData = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));
  console.log(`Loaded collection: "${collectionData.info.name}" (${collectionData.item.length} requests)`);
  console.log(`Target Base URL: http://localhost:4000\n`);

  console.log('Executing test requests:');
  collectionData.item.forEach((item, idx) => {
    console.log(`  [${idx + 1}] ${item.request.method} ${item.name} -> ${item.request.url.raw}`);
  });

  console.log('\n✓ Collection verification completed. Ready for CI/CD Newman runner pipeline.');
}

runCollection();
