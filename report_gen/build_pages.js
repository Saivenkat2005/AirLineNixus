const fs = require('fs');
const decl = fs.readFileSync('report_gen/decl_raw.txt', 'utf8');
const cert = fs.readFileSync('report_gen/cert_raw.txt', 'utf8');
console.log('decl length:', decl.length, 'cert length:', cert.length);
