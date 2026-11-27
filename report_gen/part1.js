// Prelim Pages (Pages 1 to 9)
const fs = require('fs');
const svgs = JSON.parse(fs.readFileSync('report_gen/svg_assets.json', 'utf8'));
const fig01Svg = fs.readFileSync('report_gen/fig01.svg', 'utf8');

function renderHeader(pageNum) {
  if (pageNum === 1) return '';
  return `<div class="page-header">
    <span>Cloud-Native API Gateway and Service Mesh Architecture - Capstone Final Report</span>
    <span>KLEF CSE | Cluster A</span>
  </div>`;
}

function renderFooter(pageNum) {
  if (pageNum === 1) return '';
  return `<div class="page-footer">
    <span>KLEF College of Engineering (Deemed to be University) &bull; Nov 2026</span>
    <span>Page ${pageNum} of 40</span>
  </div>`;
}

function getPrelimPages() {
  const pages = [];

  // ================= PAGE 1: OUTER COVER =================
  pages.push(`
  <section class="report-page" id="page-1" data-page="1" style="justify-content: space-between; text-align: center; padding: 18mm 16mm 14mm 16mm;">
    <div>
      <div style="margin: 0 auto 8px auto; width: 220px; height: 70px;">
        ${svgs[0].replace('width="240" height="75"', 'width="210" height="65"')}
      </div>
      <div style="font-size: 13.5pt; font-weight: bold; color: #8B0000; letter-spacing: 0.5px; margin-top: 5px;">
        KONERU LAKSHMAIAH EDUCATION FOUNDATION
      </div>
      <div style="font-size: 9.5pt; font-weight: bold; color: #4B5563; margin-top: 1px;">
        (DEEMED TO BE UNIVERSITY)
      </div>
      <div style="font-size: 11pt; font-weight: bold; color: #1F2937; margin-top: 2px;">
        KLEF COLLEGE OF ENGINEERING
      </div>
      <div style="display: inline-block; background-color: #EFF6FF; border: 1px solid #BFDBFE; color: #1E40AF; font-size: 8.5pt; font-weight: bold; padding: 2px 12px; border-radius: 4px; margin-top: 8px;">
        CLUSTER A &ndash; SOFTWARE SYSTEMS ENGINEERING
      </div>
    </div>

    <div style="margin: 18px 0;">
      <div style="font-size: 11pt; font-weight: bold; color: #374151; letter-spacing: 1.5px;">FINAL PROJECT REPORT</div>
      <div style="font-size: 15.5pt; font-weight: bold; color: #1A365D; margin-top: 8px; line-height: 1.3;">
        CLOUD-NATIVE API GATEWAY AND SERVICE MESH ARCHITECTURE
      </div>
      <div style="font-size: 9.5pt; color: #374151; margin-top: 10px; line-height: 1.4;">
        A Final Project Report submitted in partial fulfilment of the requirements<br>
        for the award of the degree of
      </div>
      <div style="font-size: 10.5pt; font-weight: bold; color: #1F2937; margin-top: 4px;">
        BACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE AND ENGINEERING
      </div>
    </div>

    <div>
      <div style="font-size: 9.5pt; font-weight: bold; color: #374151; margin-bottom: 6px;">Submitted by</div>
      <table style="width: 100%; border-collapse: collapse; font-size: 9pt; margin: 0 auto; max-width: 520px;">
        <tr>
          <td style="padding: 2px 10px; text-align: left; font-weight: bold; color: #0f172a; width: 50%;">BANDARU SAI VENKAT RAM</td>
          <td style="padding: 2px 10px; text-align: left; color: #334155; width: 50%;">(2300031764)</td>
        </tr>
        <tr>
          <td style="padding: 2px 10px; text-align: left; font-weight: bold; color: #0f172a;">DAVULURI BALA GOPAL</td>
          <td style="padding: 2px 10px; text-align: left; color: #334155;">(2300032878)</td>
        </tr>
        <tr>
          <td style="padding: 2px 10px; text-align: left; font-weight: bold; color: #0f172a;">AKARAMSETTY SIVA SAI</td>
          <td style="padding: 2px 10px; text-align: left; color: #334155;">(2300033233)</td>
        </tr>
        <tr>
          <td style="padding: 2px 10px; text-align: left; font-weight: bold; color: #0f172a;">ROHID BAIG</td>
          <td style="padding: 2px 10px; text-align: left; color: #334155;">(2300039146)</td>
        </tr>
      </table>

      <div style="margin-top: 14px;">
        <div style="font-size: 9pt; font-style: italic; color: #4B5563;">Under the supervision of</div>
        <div style="font-size: 10.5pt; font-weight: bold; color: #0f172a; margin-top: 2px;">Mr. BVN Prasad Paruchuri</div>
        <div style="font-size: 8.5pt; color: #374151;">Assistant Professor, Department of Computer Science and Engineering</div>
      </div>
    </div>

    <div style="border: 1px solid #cbd5e1; background-color: #f8fafc; padding: 6px 12px; border-radius: 4px; font-size: 8pt; line-height: 1.4; margin: 10px auto; max-width: 560px;">
      <b>Project Identity:</b> Portal Use-case ID: <code>[KLCAP-2026-CN139]</code> | Team No.: <b>139</b> | Batch: <b>CSE-3</b> | Status: <b>Approved</b><br>
      <b>Approved Cluster:</b> Cluster A &ndash; Software Systems Engineering
    </div>

    <div>
      <div style="font-size: 9.5pt; font-weight: bold; color: #1F2937;">DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</div>
      <div style="font-size: 8.5pt; color: #4B5563;">Green Fields, Vaddeswaram &ndash; 522 502, Andhra Pradesh, India</div>
      <div style="font-size: 8.5pt; font-weight: bold; color: #1F2937; margin-top: 2px;">NOVEMBER 2026 | Academic Year 2026&ndash;2027</div>
    </div>
  </section>
  `);

  // ================= PAGE 2: INNER TITLE PAGE & METADATA =================
  pages.push(`
  <section class="report-page" id="page-2" data-page="2">
    ${renderHeader(2)}
    <div class="page-content" style="justify-content: space-between; text-align: center;">
      <div>
        <div style="margin: 0 auto 6px auto; width: 180px; height: 55px;">
          ${svgs[1].replace('width="240" height="75"', 'width="170" height="52"')}
        </div>
        <div style="font-size: 12pt; font-weight: bold; color: #8B0000;">KONERU LAKSHMAIAH EDUCATION FOUNDATION</div>
        <div style="font-size: 9pt; font-weight: bold; color: #4B5563;">(DEEMED TO BE UNIVERSITY)</div>
        <div style="font-size: 10pt; font-weight: bold; color: #1F2937; margin-top: 1px;">KLEF COLLEGE OF ENGINEERING</div>
        <div style="display: inline-block; background-color: #EFF6FF; border: 1px solid #BFDBFE; color: #1E40AF; font-size: 8pt; font-weight: bold; padding: 2px 10px; border-radius: 4px; margin-top: 4px;">
          CLUSTER A &ndash; SOFTWARE SYSTEMS ENGINEERING
        </div>
      </div>

      <div style="margin: 10px 0;">
        <div style="font-size: 14pt; font-weight: bold; color: #1A365D; line-height: 1.25;">
          CLOUD-NATIVE API GATEWAY AND SERVICE MESH ARCHITECTURE
        </div>
        <div style="font-size: 9pt; color: #374151; margin-top: 6px;">
          A Final Project Report submitted in partial fulfilment of the requirements for the award of the degree of
        </div>
        <div style="font-size: 10pt; font-weight: bold; color: #1F2937; margin-top: 2px;">
          BACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE AND ENGINEERING
        </div>
      </div>

      <div>
        <div style="font-size: 8.5pt; font-weight: bold; color: #374151; margin-bottom: 4px;">by</div>
        <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt; margin: 0 auto; max-width: 500px;">
          <tr>
            <td style="padding: 2px 8px; text-align: left; font-weight: bold;">BANDARU SAI VENKAT RAM</td>
            <td style="padding: 2px 8px; text-align: left;">(2300031764)</td>
            <td style="padding: 2px 8px; text-align: left; font-weight: bold;">DAVULURI BALA GOPAL</td>
            <td style="padding: 2px 8px; text-align: left;">(2300032878)</td>
          </tr>
          <tr>
            <td style="padding: 2px 8px; text-align: left; font-weight: bold;">AKARAMSETTY SIVA SAI</td>
            <td style="padding: 2px 8px; text-align: left;">(2300033233)</td>
            <td style="padding: 2px 8px; text-align: left; font-weight: bold;">ROHID BAIG</td>
            <td style="padding: 2px 8px; text-align: left;">(2300039146)</td>
          </tr>
        </table>
        <div style="margin-top: 8px;">
          <div style="font-size: 8.5pt; font-style: italic; color: #4B5563;">under the supervision of</div>
          <div style="font-size: 9.5pt; font-weight: bold; color: #0f172a;">Mr. BVN Prasad Paruchuri</div>
          <div style="font-size: 8pt; color: #374151;">Assistant Professor, Department of Computer Science and Engineering</div>
        </div>
      </div>

      <div style="margin: 8px auto; width: 100%; max-width: 540px;">
        <table class="data-table" style="font-size: 8pt; margin: 0 auto;">
          <thead>
            <tr><th style="width: 40%;">Project Identity Field</th><th style="width: 60%;">Approved University Entry</th></tr>
          </thead>
          <tbody>
            <tr><td><b>Portal Project Use-case ID</b></td><td><code>[KLCAP-2026-CN139]</code></td></tr>
            <tr><td><b>Project Domain &amp; Implementation</b></td><td>Enterprise Flight Booking &amp; Cloud-Native Mesh (Persistent Airways)</td></tr>
            <tr><td><b>Dominant Specialization</b></td><td>Cloud Native Software Engineering</td></tr>
            <tr><td><b>Approved Project Cluster</b></td><td>Cluster A &ndash; Software Systems Engineering</td></tr>
            <tr><td><b>Team / Group Number</b></td><td>Team 139</td></tr>
            <tr><td><b>Batch and Academic Year</b></td><td>CSE-3 | Academic Year 2026&ndash;2027</td></tr>
          </tbody>
        </table>
      </div>

      <div>
        <div style="font-size: 9pt; font-weight: bold; color: #1F2937;">DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</div>
        <div style="font-size: 8.5pt; font-weight: bold; color: #1F2937;">KLEF COLLEGE OF ENGINEERING</div>
        <div style="font-size: 8pt; color: #4B5563;">Green Fields, Vaddeswaram &ndash; 522 502, Andhra Pradesh, India | NOVEMBER 2026</div>
      </div>
    </div>
    ${renderFooter(2)}
  </section>
  `);

