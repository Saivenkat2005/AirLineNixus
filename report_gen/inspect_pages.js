const fs = require('fs');
const path = require('path');

const files = [
  'prelim_pages.js',
  'chapters_1_3.js',
  'chapter_4.js',
  'chapters_5_6.js',
  'chapters_7_10.js',
  'back_matter.js'
];

let globalPage = 1;
files.forEach(f => {
  const mod = require('./' + f);
  const fn = Object.values(mod)[0];
  const pages = fn();
  console.log(`\n=== ${f} (${pages.length} pages) ===`);
  pages.forEach((p, idx) => {
    const text = p.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 140);
    const pageNumMatch = p.match(/Page\s+(\d+)\s+of\s+(\d+)/i);
    const pgNum = pageNumMatch ? pageNumMatch[1] : `[${globalPage}]`;
    console.log(`Page ${globalPage} (file p${idx+1}, marked: ${pgNum}): ${text}`);
    globalPage++;
  });
});
