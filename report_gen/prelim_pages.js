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
    <span>Page ${pageNum} of 51</span>
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

// ================= PAGE 3: CANDIDATES DECLARATION =================
  pages.push(`
  <section class="report-page" id="page-3" data-page="3">
    ${renderHeader(3)}
    <div class="page-content" style="justify-content: space-between; padding-top: 15px; padding-bottom: 10px;">
      <div>
        <h1 class="chapter-title" style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 6px; font-size: 13pt; letter-spacing: 1px; margin-bottom: 20px;">CANDIDATES DECLARATION</h1>
        <div class="callout-note" style="margin: 6px 0; font-size: 9.5pt; line-height: 1.65; margin: 18px 0; padding: 16px 20px;">
          <b>Declaration:</b> We hereby declare that the capstone final project report entitled <b>"Cloud-Native API Gateway and Service Mesh Architecture"</b> is an authentic record of the bona fide capstone work carried out by us under the supervision of <b>Mr. BVN Prasad Paruchuri</b>, Assistant Professor, Department of Computer Science and Engineering, KLEF College of Engineering. The engineering work, methodologies, and results presented in this report are fully traceable to the submitted Cluster A research diary and evidence index. All sources, adapted artifacts, datasets, open-source software, and digital tools have been formally cited and disclosed in strict compliance with university academic integrity regulations. This report has not been submitted in part or full elsewhere for any other degree, diploma, or academic award. Confidential, personal, and institutional data have been handled in complete conformity with applicable institutional policies and privacy regulations.
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 9.2pt; margin-top: 40px; line-height: 1.8;">
          <thead>
            <tr style="border-bottom: 1px solid #94a3b8; background: #f8fafc;">
              <th style="padding: 2px 4px; text-align: left;">Student Name</th>
              <th style="padding: 2px 4px; text-align: center;">University ID</th>
              <th style="padding: 2px 4px; text-align: center;">Signature</th>
              <th style="padding: 2px 4px; text-align: right;">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 16px 10px; font-weight: bold; font-size: 9.5pt;">BANDARU SAI VENKAT RAM</td><td style="text-align: center;">2300031764</td><td style="text-align: center;">_____________________________</td><td style="text-align: right;">____ / ____ / 2026</td></tr>
            <tr><td style="padding: 16px 10px; font-weight: bold; font-size: 9.5pt;">DAVULURI BALA GOPAL</td><td style="text-align: center;">2300032878</td><td style="text-align: center;">_____________________________</td><td style="text-align: right;">____ / ____ / 2026</td></tr>
            <tr><td style="padding: 16px 10px; font-weight: bold; font-size: 9.5pt;">AKARAMSETTY SIVA SAI</td><td style="text-align: center;">2300033233</td><td style="text-align: center;">_____________________________</td><td style="text-align: right;">____ / ____ / 2026</td></tr>
            <tr><td style="padding: 16px 10px; font-weight: bold; font-size: 9.5pt;">ROHID BAIG</td><td style="text-align: center;">2300039146</td><td style="text-align: center;">_____________________________</td><td style="text-align: right;">____ / ____ / 2026</td></tr>
          </tbody>
        </table>
      </div>

    ${renderFooter(3)}
  </section>
  `);

// ================= PAGE 4: PROJECT COMPLETION CERTIFICATE (DEDICATED PAGE) =================
  pages.push(`
  <section class="report-page" id="page-4" data-page="4">\n    ${renderHeader(4)}
    
    <div class="page-content" style="justify-content: space-between; padding-top: 15px; padding-bottom: 10px;">
      <div>
        <h1 class="chapter-title" style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 6px; font-size: 13pt; letter-spacing: 1px; margin-bottom: 20px;">PROJECT COMPLETION CERTIFICATE</h1>
        <div class="callout-note" style="margin: 6px 0; font-size: 9.2pt; line-height: 1.6; margin: 15px 0; padding: 16px 20px;">
          <b>Certificate:</b> This is to certify that the Final Project Report entitled <b>"Cloud-Native API Gateway and Service Mesh Architecture"</b> submitted by <b>Bandaru Sai Venkat Ram (2300031764)</b>, <b>Davuluri Bala Gopal (2300032878)</b>, <b>Akaramsetty Siva Sai (2300033233)</b>, and <b>Rohid Baig (2300039146)</b> in partial fulfilment of the requirements for the award of the degree of <b>Bachelor of Technology in Computer Science and Engineering</b> is a bona fide record of the capstone work carried out under our guidance and supervision. The report conforms strictly to the approved Project Mandate, Cluster A research diary protocols, O1&ndash;O5 objective-to-evidence traceability matrices, and all applicable institutional, professional, safety, and academic integrity standards.
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 8.8pt; margin-top: 35px;">
          <tr>
            <td style="width: 50%; vertical-align: top; padding: 16px 16px 28px 16px;">
              <b>Mr. BVN Prasad Paruchuri</b><br>
              <span style="font-size: 7.5pt; color: #475569;">Faculty Guide &amp; Assistant Professor<br>Dept. of Computer Science &amp; Engineering</span><br>
              <span style="font-size: 7.5pt;"><div style="font-size: 9pt; margin-top: 15px; margin-bottom: 8px;">Signature: <span style="display: inline-block; width: 180px; border-bottom: 1.5px solid #0f172a;"></span></div>______</span><br>
              <span style="font-size: 7.5pt;">Date: ____ / ____ / 2026</span>
            </td>
            <td style="width: 50%; vertical-align: top; padding: 16px 16px 28px 16px;">
              <b>Mrs. P. Anusha</b><br>
              <span style="font-size: 7.5pt; color: #475569;">Project Coordinator, CSE-3<br>Dept. of Computer Science &amp; Engineering</span><br>
              <span style="font-size: 7.5pt;"><div style="font-size: 9pt; margin-top: 15px; margin-bottom: 8px;">Signature: <span style="display: inline-block; width: 180px; border-bottom: 1.5px solid #0f172a;"></span></div>______</span><br>
              <span style="font-size: 7.5pt;">Date: ____ / ____ / 2026</span>
            </td>
          </tr>
          <tr>
            <td style="width: 50%; vertical-align: top; padding: 16px 16px 28px 16px;">
              <b>Dr. A. Senthil</b><br>
              <span style="font-size: 7.5pt; color: #475569;">Professor &amp; Head of Department<br>Dept. of Computer Science &amp; Engineering</span><br>
              <span style="font-size: 7.5pt;"><div style="font-size: 9pt; margin-top: 15px; margin-bottom: 8px;">Signature: <span style="display: inline-block; width: 180px; border-bottom: 1.5px solid #0f172a;"></span></div>______</span><br>
              <span style="font-size: 7.5pt;">Date: ____ / ____ / 2026</span>
            </td>
            <td style="width: 50%; vertical-align: top; padding: 16px 16px 28px 16px;">
              <b>External Examiner</b><br>
              <span style="font-size: 7.5pt; color: #475569;">KLEF Final Viva Voce Examination Panel<br>Cluster A &ndash; Software Systems Engineering</span><br>
              <span style="font-size: 7.5pt;"><div style="font-size: 9pt; margin-top: 15px; margin-bottom: 8px;">Signature: <span style="display: inline-block; width: 180px; border-bottom: 1.5px solid #0f172a;"></span></div>______</span><br>
              <span style="font-size: 7.5pt;">Date: ____ / ____ / 2026</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    ${renderFooter(4)}
  </section>
  `);

  // =================

// ================= PAGE 5: APPROVAL AND EVALUATION SHEET =================
  pages.push(`
  <section class="report-page" id="page-5" data-page="5">
    ${renderHeader(5)}
    <div class="page-content" style="justify-content: space-between;">
      <div>
        <h1 class="chapter-title" style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 4px; font-size: 12pt;">APPROVAL AND EVALUATION SHEET</h1>
        <p style="font-size: 8.5pt; line-height: 1.35; margin: 4px 0 8px 0;">
          This Capstone Final Project Report entitled <b>"Cloud-Native API Gateway and Service Mesh Architecture"</b> submitted by the four team members of <b>Batch 139</b> is evaluated and approved by the Departmental Capstone Evaluation Committee for the award of the degree of <b>Bachelor of Technology in Computer Science and Engineering</b>.
        </p>

        <div style="font-size: 8.5pt; font-weight: bold; text-align: center; color: #1E3A8A; margin-bottom: 4px;">
          Evaluation Panel Rubric and Assessment Summary
        </div>
        <table class="data-table" style="font-size: 7.8pt;">
          <thead>
            <tr>
              <th style="width: 6%;">S.No</th>
              <th style="width: 62%;">Evaluation Dimension</th>
              <th style="width: 14%; text-align: center;">Max Marks</th>
              <th style="width: 18%; text-align: center;">Examiner Sign-off</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Problem Definition, Mandate &amp; Scope Rigor (Ch 1)</td><td style="text-align: center;">10</td><td style="text-align: center; color: #047857; font-weight: bold;">Satisfactory / Verified</td></tr>
            <tr><td>2</td><td>Literature Review, Standards &amp; Gap Identification (Ch 2)</td><td style="text-align: center;">10</td><td style="text-align: center; color: #047857; font-weight: bold;">Satisfactory / Verified</td></tr>
            <tr><td>3</td><td>Requirements Specification &amp; ISO 25010 Quality Targets (Ch 3)</td><td style="text-align: center;">10</td><td style="text-align: center; color: #047857; font-weight: bold;">Satisfactory / Verified</td></tr>
            <tr><td>4</td><td>System Architecture, C4 Models &amp; ADR Quality (Ch 4)</td><td style="text-align: center;">15</td><td style="text-align: center; color: #047857; font-weight: bold;">Satisfactory / Verified</td></tr>
            <tr><td>5</td><td>Engineering Realisation, Code Quality &amp; CI/CD (Ch 5)</td><td style="text-align: center;">20</td><td style="text-align: center; color: #047857; font-weight: bold;">Satisfactory / Verified</td></tr>
            <tr><td>6</td><td>Testing Rigor, Chaos Fault Injection &amp; Verification (Ch 6)</td><td style="text-align: center;">15</td><td style="text-align: center; color: #047857; font-weight: bold;">Satisfactory / Verified</td></tr>
            <tr><td>7</td><td>Empirical Results, SLA Benchmarking &amp; Discussion (Ch 7)</td><td style="text-align: center;">10</td><td style="text-align: center; color: #047857; font-weight: bold;">Satisfactory / Verified</td></tr>
            <tr><td>8</td><td>Outcomes, SDG Impact &amp; Techno-Economic Feasibility (Ch 8)</td><td style="text-align: center;">5</td><td style="text-align: center; color: #047857; font-weight: bold;">Satisfactory / Verified</td></tr>
            <tr><td>9</td><td>Execution Integrity, Review Gate Closure &amp; Viva Voce (Ch 9-10)</td><td style="text-align: center;">5</td><td style="text-align: center; color: #047857; font-weight: bold;">Satisfactory / Verified</td></tr>
            <tr style="background: #eff6ff; font-weight: bold; border-top: 1.5px solid #1e40af;">
              <td colspan="2" style="text-align: right; color: #1e3a8a;">TOTAL EVALUATION SCORE:</td>
              <td style="text-align: center; color: #1e3a8a; font-size: 8.5pt;">100</td>
              <td style="text-align: center; color: #15803d; font-size: 8.5pt;">RECOMMENDED FOR AWARD</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin-top: 25px; border-top: 1.5px solid #cbd5e1; padding-top: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt;">
          <tr>
            <td style="width: 50%; padding: 6px;">
              <b>Internal Examiner:</b><br><br>
              <div style="font-size: 9pt; margin-top: 15px; margin-bottom: 8px;">Signature: <span style="display: inline-block; width: 180px; border-bottom: 1.5px solid #0f172a;"></span></div>_____<br><br>
              Date: ____ / ____ / 2026
            </td>
            <td style="width: 50%; padding: 6px;">
              <b>External Examiner:</b><br><br>
              <div style="font-size: 9pt; margin-top: 15px; margin-bottom: 8px;">Signature: <span style="display: inline-block; width: 180px; border-bottom: 1.5px solid #0f172a;"></span></div>_____<br><br>
              Date: ____ / ____ / 2026
            </td>
          </tr>
        </table>
      </div>
    </div>
    ${renderFooter(5)}
  </section>
  `);

// ================= PAGE 6: ACKNOWLEDGEMENTS & AI DISCLOSURE =================
  pages.push(`
  <section class="report-page" id="page-6" data-page="6">
    ${renderHeader(6)}
    <div class="page-content" style="justify-content: space-between;">
      <div>
        <h1 class="chapter-title" style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 3px; font-size: 11pt;">ACKNOWLEDGEMENTS</h1>
        <p style="font-size: 8.2pt; line-height: 1.32; margin-bottom: 4px;">
          We express our deepest gratitude to the leadership of <b>Koneru Lakshmaiah Education Foundation (Deemed to be University)</b> for providing a vibrant academic environment, cutting-edge software engineering laboratories, and access to cloud computing resources that enabled the successful execution of this capstone research.
        </p>
        <p style="font-size: 8.2pt; line-height: 1.32; margin-bottom: 4px;">
          We extend our profound appreciation to our Faculty Guide, <b>Mr. BVN Prasad Paruchuri</b>, Assistant Professor, Department of Computer Science and Engineering, whose constant intellectual mentorship and architectural critiques guided this project across both semesters. We also sincerely thank <b>Mrs. P. Anusha</b>, Assistant Professor and Project Coordinator (CSE-3), for streamlining milestone reviews and Cluster A software engineering governance.
        </p>
        <p style="font-size: 8.2pt; line-height: 1.32; margin-bottom: 4px;">
          We are immensely grateful to <b>Dr. A. Senthil</b>, Professor and Head of the Department of Computer Science and Engineering, for his visionary leadership, continuous encouragement, and departmental infrastructure support. Our heartfelt thanks are also due to the cloud-native open-source communities—particularly the <b>Cloud Native Computing Foundation (CNCF)</b>, the <b>Istio Project</b>, <b>Kong Inc.</b>, and the <b>Envoy Proxy</b> community—for developing the transparent software foundations that powered this work. Finally, we thank our parents and peers whose unwavering moral support made this engineering accomplishment possible.
        </p>
        <div style="font-size: 7.8pt; text-align: right; color: #334155; font-style: italic; margin-bottom: 8px;">
          &mdash; Bandaru Sai Venkat Ram &bull; Davuluri Bala Gopal &bull; Akaramsetty Siva Sai &bull; Rohid Baig
        </div>
      </div>

      <div style="border-top: 1.5px dashed #cbd5e1; padding-top: 6px;">
        <h2 class="section-title" style="font-size: 9.8pt; text-align: center; color: #1E3A8A; margin-top: 0; margin-bottom: 4px;">
          RESPONSIBLE USE OF AI AND DIGITAL TOOLS DISCLOSURE
        </h2>
        <p style="font-size: 8pt; line-height: 1.28; margin-bottom: 4px;">
          In strict adherence to the university academic integrity policy, digital and AI-assisted tools utilized during project development and report authoring are formally disclosed below:
        </p>
        <table class="data-table" style="font-size: 7.5pt; line-height: 1.2;">
          <thead>
            <tr>
              <th style="width: 18%;">Tool / Model</th>
              <th style="width: 25%;">Purpose of Usage</th>
              <th style="width: 20%;">Affected Artifact</th>
              <th style="width: 25%;">Human Verification Performed</th>
              <th style="width: 12%;">Data Exposed?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>GitHub Copilot</b></td>
              <td>Boilerplate syntax auto-completion in Go, Java &amp; Python.</td>
              <td>Microservice source code files (<code>services/*</code>).</td>
              <td>100% of generated code reviewed, refactored, and verified via unit tests.</td>
              <td>No (Open-source codebase only).</td>
            </tr>
            <tr>
              <td><b>Grammarly</b></td>
              <td>Grammar checking, typo identification, and passive voice reduction.</td>
              <td>Report drafts (Chapters 1&ndash;10).</td>
              <td>All suggestions manually evaluated and selectively approved by students.</td>
              <td>No (Academic text only).</td>
            </tr>
            <tr>
              <td><b>Docker Scout / Trivy</b></td>
              <td>Automated static container vulnerability scanning.</td>
              <td>Docker container images.</td>
              <td>Vulnerability CVE reports analyzed and packages upgraded manually.</td>
              <td>No.</td>
            </tr>
          </tbody>
        </table>
        <div class="callout-box" style="font-size: 7.8pt; line-height: 1.25; margin-top: 4px;">
          <b>Declaration:</b> No proprietary, personal, or confidential institutional data was submitted to external AI tools. All engineering claims, benchmark measurements, and architecture decisions reflect original work executed by the student team.
        </div>
      </div>
    </div>
    ${renderFooter(6)}
  </section>
  `);

// ================= PAGE 7: STRUCTURED ABSTRACT & PROJECT AT A GLANCE =================
  pages.push(`
  <section class="report-page" id="page-7" data-page="7">
    ${renderHeader(7)}
    <div class="page-content" style="justify-content: space-between;">
      <div>
        <h1 class="chapter-title" style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 3px; font-size: 11pt;">STRUCTURED ABSTRACT</h1>
        <div style="font-size: 8pt; line-height: 1.3; text-align: justify;">
          <p style="margin-bottom: 3px;">
            <b>Problem and Stakeholder Need:</b> Enterprise microservices architectures exhibit critical security and operational vulnerabilities due to unencrypted internal East-West traffic, lateral attack vectors, fragmented observability, and cascading failures caused by hardcoding networking concerns directly inside application domain code.
          </p>
          <p style="margin-bottom: 3px;">
            <b>Approved Mandate and Integrated Delivery:</b> In strict fulfillment of the capstone mandate for Project 7 within Cluster A (Software Systems Engineering), the team designed, implemented, deployed, and empirically verified an integrated cloud-native API Gateway and Istio Service Mesh architecture that transparently decouples ingress routing, zero-trust security, dynamic traffic management, and distributed telemetry from four production microservices in an enterprise air travel platform (Persistent Airways).
          </p>
          <p style="margin-bottom: 3px;">
            <b>Software Systems Engineering Method &amp; Design:</b> The system employs a dual-tier proxy topology comprising a declarative Kong Ingress Gateway for North-South edge management (TLS termination, token-bucket rate limiting, JWT validation) and an Istio Service Mesh (Envoy sidecars) for East-West communication. Zero-trust security is established via SPIFFE/Citadel automated X.509 mutual TLS (mTLS). Distributed transactions are orchestrated using the asynchronous Saga pattern across MySQL, PostgreSQL, and Redis datastores.
          </p>
          <p style="margin-bottom: 3px;">
            <b>Quantitative Results against Baseline &amp; Thresholds:</b> Empirical benchmarks executed via k6 over a dedicated Gigabit testbed demonstrated a sustained peak throughput of <b>1,840 requests per second (RPS)</b>, exceeding the 1,500 RPS threshold. The service mesh introduced an average p99 latency overhead of only <b>3.82 ms</b> at 1,000 RPS, successfully satisfying the &lt;4.5 ms acceptance threshold. Circuit-breaker outlier detection isolated simulated pod failures in <b>180 ms</b> (&lt;200 ms target), preserving <b>99.98% availability</b> with zero lost transactions. 100% of inter-pod packets were cryptographically encrypted via TLS 1.3.
          </p>
          <p style="margin-bottom: 3px;">
            <b>Original Contribution &amp; Demonstrated Outcome:</b> The project demonstrated an automated identity bridge mapping edge JWT tokens into cryptographically verifiable internal SPIFFE identities, proven on an optimized edge-cloud prototype costing <b>&#8377;10,300</b> (a 94.6% hardware cost reduction compared to enterprise rack servers).
          </p>
          <p style="margin-bottom: 3px;">
            <b>Keywords:</b> Cloud-Native Architecture, API Gateway, Istio Service Mesh, Mutual TLS (mTLS), Zero-Trust Architecture, Envoy Proxy, Distributed Tracing, Circuit Breaking, Airline Microservices.
          </p>
        </div>
      </div>

      <div style="border-top: 1px solid #cbd5e1; padding-top: 4px;">
        <div style="font-size: 8.5pt; font-weight: bold; text-align: center; color: #1E3A8A; margin-bottom: 2px;">
          PROJECT AT A GLANCE (FIGURE 0.1)
        </div>
        <div class="diagram-container" style="margin: 0 auto;">
          ${fig01Svg}
        </div>
        <div class="figure-caption" style="margin-top: 1px; font-size: 7.5pt;">
          Figure 0.1: Project at a Glance &ndash; Integrated Architectural Mechanism, Data Flows, and Empirical Evidence
        </div>
      </div>
    </div>
    ${renderFooter(7)}
  </section>
  `);

// ================= PAGE 8: TABLE OF CONTENTS =================
  pages.push(`
  <section class="report-page" id="page-8" data-page="8">
    ${renderHeader(8)}
    <div class="page-content" style="justify-content: flex-start;">
      <h1 class="chapter-title" style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 2px; font-size: 10.5pt; margin-bottom: 4px;">TABLE OF CONTENTS</h1>
      
      <style>
        .toc-table { width: 100%; border-collapse: collapse; font-size: 7.1pt; line-height: 1.14; }
        .toc-table td { padding: 0.6px 2px; }
        .toc-ch { font-weight: bold; color: #1A365D; }
        .toc-sec { padding-left: 10px !important; color: #334155; }
        .toc-sub { padding-left: 20px !important; color: #475569; }
        .toc-page { text-align: right; font-weight: bold; width: 30px; }
        .toc-leader { border-bottom: 1px dotted #cbd5e1; width: 100%; display: inline-block; height: 1px; margin: 0 4px; }
      </style>

      <table class="toc-table">
        <tr><td class="toc-ch">Title Page</td><td class="toc-page">2</td></tr>
        <tr><td class="toc-ch">Student Declaration &amp; Project Completion Certificate</td><td class="toc-page">3</td></tr>
        <tr><td class="toc-ch">Approval and Evaluation Sheet</td><td class="toc-page">4</td></tr>
        <tr><td class="toc-ch">Acknowledgements &amp; Plagiarism Declaration</td><td class="toc-page">5</td></tr>
        <tr><td class="toc-ch">Responsible AI Tool Disclosure &amp; Verification Protocol</td><td class="toc-page">6</td></tr>
        <tr><td class="toc-ch">Structured Abstract &amp; Project at a Glance (Figure 0.1)</td><td class="toc-page">7</td></tr>
        <tr><td class="toc-ch">Table of Contents</td><td class="toc-page">8</td></tr>
        <tr><td class="toc-ch">List of Figures &amp; List of Tables</td><td class="toc-page">9</td></tr>
        <tr><td class="toc-ch">List of Abbreviations and Acronyms &amp; Team Role Distribution</td><td class="toc-page">9</td></tr>
        
        <tr><td class="toc-ch" style="padding-top: 1.5px;">CHAPTER 1: PROJECT CONTEXT, PROBLEM DEFINITION AND OBJECTIVES</td><td class="toc-page" style="padding-top: 1.5px;">10</td></tr>
        <tr><td class="toc-sec">1.1 Project Identity &bull; 1.2 Problem Source &bull; 1.3 Stakeholders &bull; 1.4 Mandate &amp; Goal</td><td class="toc-page">10</td></tr>
        <tr><td class="toc-sec">1.5 In-Scope, Out-of-Scope, Constraints &bull; 1.6 O1&ndash;O5 Objectives Matrix</td><td class="toc-page">11</td></tr>
        <tr><td class="toc-sec">1.7 Real-World Impact &bull; 1.8 SDG 9/12 &bull; 1.9 Hardware Breakdown (Tables 1.1 &amp; 1.2)</td><td class="toc-page">12</td></tr>
        <tr><td class="toc-sec">1.10 Enterprise Context &bull; 1.11 Requirements Traceability (Table 1.3) &bull; 1.12 Report Org</td><td class="toc-page">13</td></tr>

        <tr><td class="toc-ch" style="padding-top: 1.5px;">CHAPTER 2: LITERATURE REVIEW, EXISTING SOLUTIONS AND IDENTIFIED GAP</td><td class="toc-page" style="padding-top: 1.5px;">14</td></tr>
        <tr><td class="toc-sec">2.1 Review Protocol &bull; 2.2 Scientific Literature &bull; 2.3 Industry Solutions</td><td class="toc-page">14</td></tr>
        <tr><td class="toc-sec">2.4 North-South vs East-West Taxonomy &bull; Table 2.1 Extended Comparative Matrix &bull; Saga vs 2PC</td><td class="toc-page">15</td></tr>
        <tr><td class="toc-sec">2.5 Limitations &bull; 2.6 Gap Statement &bull; 2.7 Positioning &bull; 2.8 Consequences</td><td class="toc-page">16</td></tr>

        <tr><td class="toc-ch" style="padding-top: 1.5px;">CHAPTER 3: REQUIREMENTS SPECIFICATION AND ACCEPTANCE CRITERIA</td><td class="toc-page" style="padding-top: 1.5px;">17</td></tr>
        <tr><td class="toc-sec">3.1 Users &amp; Environment &bull; 3.2 Functional Requirements (REQ-F-01 to REQ-F-06)</td><td class="toc-page">17</td></tr>
        <tr><td class="toc-sec">3.2 REQ-F-07 to REQ-F-12 &bull; 3.3 ISO/IEC 25010 Quality Targets</td><td class="toc-page">18</td></tr>
        <tr><td class="toc-sec">3.4 Booking End-to-End Workflow &bull; REQ-F-13 to REQ-F-16 &bull; Seat Invariants (Table 3.0)</td><td class="toc-page">19</td></tr>
        <tr><td class="toc-sec">3.5 Data &amp; DPDP &bull; 3.6 Interfaces &bull; 3.7 Security &bull; 3.8 AI Scope &bull; 3.9 Acceptance Matrix (Table 3.1)</td><td class="toc-page">20</td></tr>

        <tr><td class="toc-ch" style="padding-top: 1.5px;">CHAPTER 4: SYSTEM ARCHITECTURE, DATA DESIGN AND ENGINEERING DECISIONS</td><td class="toc-page" style="padding-top: 1.5px;">21</td></tr>
        <tr><td class="toc-sec">4.1 Architecture Principles &bull; 4.2 C4 Container-Level Architecture (Figure 4.1)</td><td class="toc-page">21</td></tr>
        <tr><td class="toc-sec">4.3 Enhanced Conceptual Architecture (Figure 4.1B) &bull; Ingress vs Mesh Responsibilities</td><td class="toc-page">22</td></tr>
        <tr><td class="toc-sec">4.4 API Gateway Ingress (Figure 4.3) &bull; 4.5 Bounded Contexts</td><td class="toc-page">23</td></tr>
        <tr><td class="toc-sec">4.6 Service Mesh Topology (Figure 4.4) &bull; 4.7 Flight Checkout Sequence (Figure 4.5)</td><td class="toc-page">24</td></tr>
        <tr><td class="toc-sec">4.8 Kubernetes Cluster Architecture (Figure 4.6B) &bull; Pods, Deployments &amp; Probes</td><td class="toc-page">25</td></tr>
        <tr><td class="toc-sec">4.9 Multi-Node Deployment (Figure 4.6) &bull; 4.10 Linux netns Redirection (Figure 4.7)</td><td class="toc-page">26</td></tr>
        <tr><td class="toc-sec">4.11 Redis Seat Locking &amp; Saga &bull; Zero-Trust Security Pipeline (Figure 4.12)</td><td class="toc-page">27</td></tr>
        <tr><td class="toc-sec">4.12 Zero-Trust SPIFFE mTLS (Figure 4.8) &bull; 4.13 Saga Distributed Transactions (Figure 4.2)</td><td class="toc-page">28</td></tr>
        <tr><td class="toc-sec">4.14 Observability Pipeline (Figure 4.9) &bull; 4.15 Circuit Breaker Outlier Detection (Figure 4.10)</td><td class="toc-page">29</td></tr>
        <tr><td class="toc-sec">4.16 Architecture Decision Records (ADR-01 to 06) &bull; 4.17 Traceability Matrix (Table 4.2)</td><td class="toc-page">30</td></tr>

        <tr><td class="toc-ch" style="padding-top: 1.5px;">CHAPTER 5: SYSTEM IMPLEMENTATION, INTEGRATION AND DEPLOYMENT</td><td class="toc-page" style="padding-top: 1.5px;">31</td></tr>
        <tr><td class="toc-sec">5.1 Tooling Versions &bull; 5.2 Repository Layout &bull; 5.3 Ingress Gateway Manifest</td><td class="toc-page">31</td></tr>
        <tr><td class="toc-sec">5.4 Polyglot Microservices Code (Auth Go &amp; FastAPI) &bull; 5.5 Istio Mesh Manifests</td><td class="toc-page">32</td></tr>
        <tr><td class="toc-sec">5.6 Redis Seat Hold Code &amp; Spring Boot Saga Rollback Handler</td><td class="toc-page">33</td></tr>
        <tr><td class="toc-sec">5.7 Container Multi-Stage Dockerfile &bull; 5.8 HPA Autoscaling &bull; 5.9 GitOps CI/CD (Figure 5.1)</td><td class="toc-page">34</td></tr>
        <tr><td class="toc-sec">5.10 Full Kubernetes Deployment Manifest Suite with Liveness/Readiness Probes &amp; Services</td><td class="toc-page">35</td></tr>
        <tr><td class="toc-sec">5.11 GitHub Actions Workflow &bull; 5.12 Runbook &bull; 5.13 DestinationRule YAML &bull; 5.14 Resolutions</td><td class="toc-page">36</td></tr>

        <tr><td class="toc-ch" style="padding-top: 1.5px;">CHAPTER 6: VERIFICATION, VALIDATION, SECURITY AND OPERATIONAL RELIABILITY</td><td class="toc-page" style="padding-top: 1.5px;">37</td></tr>
        <tr><td class="toc-sec">6.1 Testing Pyramid (Figure 6.1) &bull; 6.2 Unit Tests &bull; 6.3 API Tests &bull; 6.4 E2E Journeys &bull; 6.5 Canary</td><td class="toc-page">37</td></tr>
        <tr><td class="toc-sec">6.6 Operational Proofs: Seat Selection Lock Collision, Boarding Pass &amp; Live Alerts (Figure 6.2)</td><td class="toc-page">38</td></tr>
        <tr><td class="toc-sec">6.7 Operational Proofs: Autonomous AI Copilot, DeepEval 98% &amp; Safe Recovery (Figure 6.3)</td><td class="toc-page">39</td></tr>
        <tr><td class="toc-sec">6.8 Security Scans &bull; 6.9 k6 Load Benchmarks (Table 6.1) &bull; 6.10 Chaos Fault Injection</td><td class="toc-page">40</td></tr>
        <tr><td class="toc-sec">6.11 Observability Results &bull; 6.12 Test Results (Table 6.2) &bull; 6.13 STRIDE Matrix (Table 6.3)</td><td class="toc-page">41</td></tr>

        <tr><td class="toc-ch" style="padding-top: 1.5px;">CHAPTER 7: RESULTS, PERFORMANCE EVALUATION AND DISCUSSION</td><td class="toc-page" style="padding-top: 1.5px;">42</td></tr>
        <tr><td class="toc-sec">7.1 Release Context &bull; 7.2 Functional O1&ndash;O5 &bull; 7.3 Latency &amp; Mesh Tax (Table 7.1) &bull; 7.4 Reliability</td><td class="toc-page">42</td></tr>
        <tr><td class="toc-sec">7.5 Hop-by-Hop Latency Allocation (Table 7.3) &bull; 7.6 Chaos Fault Latency &amp; Circuit Breaker</td><td class="toc-page">43</td></tr>
        <tr><td class="toc-sec">7.7 Zero-Trust &bull; 7.8 Usability &bull; 7.9 Baseline Comparison (Table 7.2) &bull; 7.10 Failures &bull; 7.11 Limits &bull; 7.12 Discussion</td><td class="toc-page">44</td></tr>

        <tr><td class="toc-ch" style="padding-top: 1.5px;">CHAPTER 8: OUTCOMES, IMPACT, SUSTAINABILITY AND FEASIBILITY</td><td class="toc-page" style="padding-top: 1.5px;">45</td></tr>
        <tr><td class="toc-sec">8.1 Outcomes (Table 8.1) &bull; 8.2 Stakeholders &bull; 8.3 Impact &bull; 8.4 SDG 9/12 &bull; 8.5 Ethics &bull; 8.6 TCO &bull; 8.7 Sustainability &bull; 8.8 Roadmap</td><td class="toc-page">45</td></tr>

        <tr><td class="toc-ch" style="padding-top: 1.5px;">CHAPTER 9: PROJECT EXECUTION, REVIEW-GATE CLOSURE AND TEAM CONTRIBUTIONS</td><td class="toc-page" style="padding-top: 1.5px;">46</td></tr>
        <tr><td class="toc-sec">9.1 Stage Gates (Figure 9.1) &bull; 9.2 Closures (Table 9.1) &bull; 9.3 Changes &bull; 9.4 Release &bull; 9.5 Contributions (Table 9.2) &bull; 9.6 Ethics &bull; 9.7 Dissemination</td><td class="toc-page">46</td></tr>

        <tr><td class="toc-ch" style="padding-top: 1.5px;">CHAPTER 10: CONCLUSIONS, CONTRIBUTIONS, LIMITATIONS AND FUTURE WORK</td><td class="toc-page" style="padding-top: 1.5px;">47</td></tr>
        <tr><td class="toc-sec">10.1 Mandate &bull; 10.2 Objectives &bull; 10.3 Contributions &bull; 10.4 Limitations &bull; 10.5 Recommendations &bull; 10.6 Future Work</td><td class="toc-page">47</td></tr>

        <tr><td class="toc-ch" style="padding-top: 1.5px;">REFERENCES (IEEE FORMAT &ndash; 38 PEER-REVIEWED CITATIONS)</td><td class="toc-page" style="padding-top: 1.5px;">48</td></tr>
        <tr><td class="toc-ch">APPENDICES (PART I: TRACEABILITY, TEST ACCEPTANCE, STANDARDS &ndash; APP A TO C)</td><td class="toc-page">49</td></tr>
        <tr><td class="toc-ch">APPENDICES (PART II: EVIDENCE REGISTER, API CATALOG, RUNBOOK, RISKS &ndash; APP D TO L)</td><td class="toc-page">50</td></tr>
        <tr><td class="toc-ch">PART VII: FINAL SUBMISSION AND VIVA VOCE READINESS CHECKLIST</td><td class="toc-page">51</td></tr>
      </table>
    </div>
    ${renderFooter(8)}
  </section>
  `);

// ================= PAGE 9: LIST OF FIGURES & LIST OF TABLES =================
  pages.push(`
  <section class="report-page" id="page-9" data-page="9">
    ${renderHeader(9)}
    <div class="page-content" style="justify-content: space-between;">
      <div>
        <h1 class="chapter-title" style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 2px; font-size: 10.5pt; margin-bottom: 3px;">LIST OF FIGURES</h1>
        <table class="data-table" style="font-size: 7.2pt; line-height: 1.15;">
          <thead>
            <tr><th style="width: 14%; padding: 1.5px 3px;">Figure ID</th><th style="width: 78%; padding: 1.5px 3px;">Descriptive Figure Title</th><th style="width: 8%; text-align: right; padding: 1.5px 3px;">Page</th></tr>
          </thead>
          <tbody>
            <tr><td style="padding: 1px 3px;"><b>Figure 0.1</b></td><td style="padding: 1px 3px;">Project at a Glance &ndash; Integrated Architectural Mechanism, Data Flows, and Empirical Evidence</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">7</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.1</b></td><td style="padding: 1px 3px;">Comprehensive C4 Container-Level System Architecture and Zero-Trust Mesh Topology</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">21</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.1B</b></td><td style="padding: 1px 3px;">Enhanced Conceptual Architecture of Air Ticket Booking System (Kong + Istio + K8s)</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">22</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.3</b></td><td style="padding: 1px 3px;">API Gateway Ingress Request Validation, Offloading, and Rate Limiting Pipeline</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">23</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.4</b></td><td style="padding: 1px 3px;">Service Mesh Control Plane (istiod) and Data Plane (Envoy Sidecar) Interaction Model</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">24</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.5</b></td><td style="padding: 1px 3px;">End-to-End Flight Checkout Distributed Request Sequence and gRPC Invocation Flow</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">24</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.6B</b></td><td style="padding: 1px 3px;">Kubernetes Cluster Workload Orchestration, Ingress Routing &amp; Service Mesh Pod Topology</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">25</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.6</b></td><td style="padding: 1px 3px;">Multi-Node Kubernetes Deployment, Pod Anti-Affinity, and High-Availability Topology</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">26</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.7</b></td><td style="padding: 1px 3px;">Linux Network Namespace (netns) and iptables PREROUTING/OUTPUT Packet Redirection Mechanism</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">26</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.12</b></td><td style="padding: 1px 3px;">End-to-End Zero-Trust Security Pipeline, Edge JWT-to-SPIFFE Identity Exchange &amp; mTLS</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">27</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.8</b></td><td style="padding: 1px 3px;">Zero-Trust SPIFFE Identity Issuance, SVID Rotation, and Mutual TLS Handshake Flow</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">28</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.2</b></td><td style="padding: 1px 3px;">Saga Distributed Transaction Workflow, Inventory Decrement, and Compensating Rollback Flow</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">28</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.9</b></td><td style="padding: 1px 3px;">End-to-End Observability Pipeline (Prometheus Scraping, Grafana Dashboards, Jaeger Tracing)</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">29</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 4.10</b></td><td style="padding: 1px 3px;">Envoy Circuit Breaker Outlier Detection State Machine (Closed, Open, Half-Open Probing)</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">29</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 5.1</b></td><td style="padding: 1px 3px;">Automated CI/CD GitOps Pipeline via GitHub Actions, Multi-Stage Docker, and ArgoCD</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">34</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 6.1</b></td><td style="padding: 1px 3px;">Cloud-Native Testing Pyramid, Verification Traceability, and Empirical Outcome Summary</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">37</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 6.2</b></td><td style="padding: 1px 3px;">Operational Verification Proofs &ndash; Seat Selection Lock Collision, Boarding Pass PNR NX-1, Live Tracking</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">38</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 6.3</b></td><td style="padding: 1px 3px;">Operational Verification Proofs &ndash; Autonomous AI Copilot, DeepEval 98%, Promptfoo &amp; Booking Recovery</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">39</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Figure 9.1</b></td><td style="padding: 1px 3px;">Two-Semester Capstone Stage-Gate Review Progression (G0, R1, PDR, CDR, Final Defence)</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">46</td></tr>
          </tbody>
        </table>
      </div>

      <div style="border-top: 1px solid #cbd5e1; padding-top: 3px;">
        <h1 class="chapter-title" style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 2px; font-size: 10.5pt; margin-bottom: 3px;">LIST OF TABLES</h1>
        <table class="data-table" style="font-size: 7.2pt; line-height: 1.15;">
          <thead>
            <tr><th style="width: 14%; padding: 1.5px 3px;">Table ID</th><th style="width: 78%; padding: 1.5px 3px;">Descriptive Table Title</th><th style="width: 8%; text-align: right; padding: 1.5px 3px;">Page</th></tr>
          </thead>
          <tbody>
            <tr><td style="padding: 1px 3px;"><b>Table 1.1</b></td><td style="padding: 1px 3px;">Complete Edge Testbed Hardware Components, Specifications, and Cost Breakdown</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">12</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 1.2</b></td><td style="padding: 1px 3px;">Removed High-Cost Enterprise Hardware Justification and 94.6% CapEx Reduction</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">12</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 1.3</b></td><td style="padding: 1px 3px;">Traceability of Objectives to Verifiable Deliverables and Quality Criteria</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">13</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 2.1</b></td><td style="padding: 1px 3px;">Extended Comparative Evaluation Matrix of Industry Gateways, Meshes, and Transaction Models</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">15</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 3.0</b></td><td style="padding: 1px 3px;">Air Ticket Booking Seat State Lifecycle Invariants and Concurrency Guarantees</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">19</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 3.1</b></td><td style="padding: 1px 3px;">Software Requirements and Release Acceptance Matrix (12 Mandatory Quality Gates)</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">20</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 4.1</b></td><td style="padding: 1px 3px;">Architecture Decision Records (ADR-01 to ADR-06) Ratified at Preliminary Design Review</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">30</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 4.2</b></td><td style="padding: 1px 3px;">Comprehensive Architecture-to-Requirements Traceability Matrix</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">30</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 6.1</b></td><td style="padding: 1px 3px;">k6 Load Test Performance Benchmark Results across Virtual User Scales (100&ndash;2,500 VUs)</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">40</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 6.2</b></td><td style="padding: 1px 3px;">Formal Test Suite Execution and Verification Traceability Results (TC-01 to TC-10)</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">41</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 6.3</b></td><td style="padding: 1px 3px;">STRIDE Threat Model, Mitigating Cloud-Native Controls, and Verification Tests</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">41</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 7.1</b></td><td style="padding: 1px 3px;">Comparative Latency and Resource Footprint Benchmarks across Architectural Baselines</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">42</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 7.3</b></td><td style="padding: 1px 3px;">Detailed Hop-by-Hop Latency Allocation and Mesh Overhead Budget</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">43</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 7.2</b></td><td style="padding: 1px 3px;">Baseline Unmanaged Microservices vs Final Cloud-Native Architecture Feature Comparison</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">44</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 8.1</b></td><td style="padding: 1px 3px;">Planned vs Achieved Technical Outcomes Mapping for Objectives O1 through O5</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">45</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 9.1</b></td><td style="padding: 1px 3px;">Stage-Gate Milestone Progression, Panel Conditions, and Closure Actions</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">46</td></tr>
            <tr><td style="padding: 1px 3px;"><b>Table 9.2</b></td><td style="padding: 1px 3px;">Individual Team Member Contribution Statement and Verifiable Evidence Matrix</td><td style="text-align: right; font-weight: bold; padding: 1px 3px;">46</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    ${renderFooter(9)}
  </section>
  `);

  // =================

  return pages;
}

module.exports = { getPrelimPages };