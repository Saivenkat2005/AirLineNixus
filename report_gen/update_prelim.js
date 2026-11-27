const fs = require('fs');
const orig = fs.readFileSync('report_gen/prelim_pages.js', 'utf8');
const p3 = orig.indexOf('// ================= PAGE 3:');
const p4 = orig.indexOf('// ================= PAGE 4:');
const p5 = orig.indexOf('// ================= PAGE 5:');
const p6 = orig.indexOf('// ================= PAGE 6:');
const p7 = orig.indexOf('// ================= PAGE 7:');
console.log({p3, p4, p5, p6, p7});