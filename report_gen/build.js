// Build Orchestrator for 51-Page Capstone Final Report
const fs = require('fs');
const { execSync } = require('child_process');

const styles = require('./styles');
const { getPrelimPages } = require('./prelim_pages');
const { getChapters1to3 } = require('./chapters_1_3');
const { getChapter4 } = require('./chapter_4');
const { getChapters5and6 } = require('./chapters_5_6');
const { getChapters7to10 } = require('./chapters_7_10');
const { getBackMatter } = require('./back_matter');

console.log('Gathering all 51 report pages...');

const prelim = getPrelimPages(); // 9 pages (p1 - p9)
const ch1to3 = getChapters1to3(); // 11 pages (p10 - p20)
const ch4 = getChapter4(); // 10 pages (p21 - p30)
const ch5to6 = getChapters5and6(); // 11 pages (p31 - p41)
const ch7to10 = getChapters7to10(); // 6 pages (p42 - p47)
const backMatter = getBackMatter(); // 4 pages (p48 - p51)

const allPages = [
  ...prelim,
  ...ch1to3,
  ...ch4,
  ...ch5to6,
  ...ch7to10,
  ...backMatter
];

console.log(`Total pages collected: ${allPages.length}`);
if (allPages.length !== 51) {
  console.error(`ERROR: Expected 51 pages, got ${allPages.length}!`);
  process.exit(1);
}

const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloud-Native API Gateway and Service Mesh Architecture - Capstone Final Report (51 Pages)</title>
  <style>
    ${styles}
  </style>
</head>
<body>

  <!-- Floating Screen Navigation Bar -->
  <div class="screen-nav">
    <span><b>Capstone Final Report</b> &bull; 51 Pages</span>
    <button onclick="window.print()">Print to PDF (Ctrl+P)</button>
  </div>

${allPages.join('\n')}

</body>
</html>
`;

const outputPath51 = 'C:\\Resume\\ECommerce\\Airline-Booking 2\\capstone_report_51pages.html';
const outputPath40 = 'C:\\Resume\\ECommerce\\Airline-Booking 2\\capstone_report_40pages.html';
fs.writeFileSync(outputPath51, htmlDocument, 'utf8');
fs.writeFileSync(outputPath40, htmlDocument, 'utf8');
console.log(`Successfully generated HTML: ${outputPath51}`);

// Compile to PDF with Headless Chrome (clean A4 print without local file:// URL watermark)
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const pdfPath51 = 'C:\\Resume\\ECommerce\\Airline-Booking 2\\capstone_report_51pages.pdf';
const pdfPath40 = 'C:\\Resume\\ECommerce\\Airline-Booking 2\\capstone_report_40pages.pdf';

function countPdfPages(filepath) {
  const data = fs.readFileSync(filepath);
  let count = 0;
  const content = data.toString('latin1');
  const regex = /\/Type\s*\/Page\b/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    count++;
  }
  return count;
}

console.log('Rendering 51-page PDF with Chrome (A4 portrait, default @page margins)...');
const cmdClean = `"${chromePath}" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer --print-to-pdf="${pdfPath51}" "${outputPath51}"`;
execSync(cmdClean, { stdio: 'pipe' });
const actualPages = countPdfPages(pdfPath51);

// Copy to 40pages.pdf path as well for backward compatibility
fs.copyFileSync(pdfPath51, pdfPath40);

// Verify default Chrome print mode (with browser headers/footers enabled)
const tmpBrowserPdf = 'C:\\Resume\\ECommerce\\Airline-Booking 2\\tmp_browser_default.pdf';
execSync(`"${chromePath}" --headless=new --disable-gpu --no-sandbox --print-to-pdf="${tmpBrowserPdf}" "${outputPath51}"`, { stdio: 'pipe' });
const browserDefaultPages = countPdfPages(tmpBrowserPdf);
fs.unlinkSync(tmpBrowserPdf);

// Verify pure unstyled default A4 margins (no @page margin CSS rule)
const tmpNoMarginHtml = 'C:\\Resume\\ECommerce\\Airline-Booking 2\\tmp_nomargin.html';
const tmpNoMarginPdf = 'C:\\Resume\\ECommerce\\Airline-Booking 2\\tmp_nomargin.pdf';
const noMarginDoc = htmlDocument.replace('margin: 12mm 14mm;', '');
fs.writeFileSync(tmpNoMarginHtml, noMarginDoc, 'utf8');
execSync(`"${chromePath}" --headless=new --disable-gpu --no-sandbox --print-to-pdf="${tmpNoMarginPdf}" "${tmpNoMarginHtml}"`, { stdio: 'pipe' });
const noMarginPages = countPdfPages(tmpNoMarginPdf);
fs.unlinkSync(tmpNoMarginHtml);
fs.unlinkSync(tmpNoMarginPdf);

console.log(`===============================================`);
console.log(`VERIFICATION RESULTS:`);
console.log(`Target Page Count:                     51`);
console.log(`Final PDF (clean A4, 12x14mm):         ${actualPages}`);
console.log(`Browser Print (headers/footers ON):    ${browserDefaultPages}`);
console.log(`Pure Browser Default A4 Margins:       ${noMarginPages}`);
console.log(`PDF File (Primary):     ${pdfPath51}`);
console.log(`PDF File (Legacy Ref):  ${pdfPath40}`);
console.log(`HTML File:              ${outputPath51}`);
console.log(`===============================================`);

if (actualPages === 51) {
  console.log('SUCCESS: Exactly 51 pages verified with zero overflow!');
} else {
  console.log(`WARNING: Page count mismatch detected! Expected 51, got ${actualPages}`);
  process.exitCode = 1;
}
