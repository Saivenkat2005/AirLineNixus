// CSS Styles for 40-Page Capstone Report
module.exports = `
@page {
  size: A4 portrait;
  margin: 12mm 14mm;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Times New Roman', Times, serif;
  font-size: 9.5pt;
  line-height: 1.35;
  color: #111827;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  text-align: justify;
}

/* Page container */
.report-page {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.page-header {
  font-size: 7.8pt;
  color: #64748b;
  border-bottom: 1px solid #cbd5e1;
  padding-bottom: 3px;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-style: italic;
}

.page-footer {
  font-size: 7.8pt;
  color: #64748b;
  border-top: 1px solid #cbd5e1;
  padding-top: 3px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Typography */
h1, h2, h3, h4 {
  font-family: 'Times New Roman', Times, serif;
  margin: 0;
  padding: 0;
}

.chapter-title {
  font-size: 13pt;
  font-weight: bold;
  color: #1A365D;
  text-transform: uppercase;
  border-bottom: 2px solid #8B0000;
  padding-bottom: 3px;
  margin-top: 0;
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

.section-title {
  font-size: 10.5pt;
  font-weight: bold;
  color: #2D3748;
  margin-top: 6px;
  margin-bottom: 3px;
}

.sub-section-title {
  font-size: 9.5pt;
  font-weight: bold;
  color: #334155;
  margin-top: 4px;
  margin-bottom: 2px;
}

p {
  margin-top: 0;
  margin-bottom: 5px;
  line-height: 1.32;
}

b, strong {
  font-weight: bold;
  color: #0f172a;
}

code {
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 8pt;
  background-color: #f1f5f9;
  padding: 1px 3px;
  border-radius: 2px;
  border: 1px solid #e2e8f0;
  color: #0f172a;
}

/* Tables */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 8pt;
  line-height: 1.22;
  margin: 4px 0 6px 0;
}

.data-table th {
  background-color: #f1f5f9;
  border: 1px solid #94a3b8;
  padding: 3px 5px;
  font-weight: bold;
  text-align: left;
  color: #0f172a;
  font-size: 8pt;
}

.data-table td {
  border: 1px solid #cbd5e1;
  padding: 2.5px 5px;
  vertical-align: top;
  text-align: left;
}

.data-table tr:nth-child(even) td {
  background-color: #f8fafc;
}

.table-caption, .figure-caption {
  font-size: 8pt;
  font-weight: bold;
  text-align: center;
  color: #334155;
  margin: 2px 0 4px 0;
}

/* Callouts */
.callout-box {
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-left: 3px solid #16a34a;
  padding: 4px 8px;
  margin: 4px 0;
  font-size: 8.8pt;
  line-height: 1.3;
}

.callout-note {
  border-left: 3px solid #3b82f6;
  background-color: #f0f9ff;
  border-top: 1px solid #e0f2fe;
  border-right: 1px solid #e0f2fe;
  border-bottom: 1px solid #e0f2fe;
  padding: 4px 8px;
  margin: 4px 0;
  font-size: 8.8pt;
  line-height: 1.3;
}

.callout-important {
  border-left: 3px solid #dc2626;
  background-color: #fef2f2;
  border-top: 1px solid #fee2e2;
  border-right: 1px solid #fee2e2;
  border-bottom: 1px solid #fee2e2;
  padding: 4px 8px;
  margin: 4px 0;
  font-size: 8.8pt;
  line-height: 1.3;
}

/* Code Blocks */
.code-block {
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  border-left: 3px solid #1E40AF;
  border-radius: 2px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 7.2pt;
  line-height: 1.25;
  padding: 4px 6px;
  margin: 4px 0;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: normal;
}

/* Diagram Container */
.diagram-container {
  width: 100%;
  text-align: center;
  margin: 4px 0;
  max-width: 100%;
}

.diagram-container svg {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

/* Lists */
ul, ol {
  margin: 2px 0 5px 0;
  padding-left: 18px;
}

li {
  margin-bottom: 2px;
  line-height: 1.3;
}

/* Print Specific */
@media print {
  html, body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .report-page {
    width: 100%;
    min-height: 264mm;
    height: auto;
    max-height: none;
    overflow: visible;
    page-break-after: always;
    break-after: page;
    page-break-inside: avoid;
    break-inside: avoid;
    padding: 0;
    margin: 0;
  }
  .report-page:last-child {
    page-break-after: avoid;
    break-after: avoid;
  }
  .screen-nav {
    display: none !important;
  }
}

/* Screen Specific */
@media screen {
  body {
    background-color: #e2e8f0;
    padding: 25px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .report-page {
    width: 210mm;
    min-height: 297mm;
    background-color: #ffffff;
    box-shadow: 0 4px 20px rgba(0,0,0,0.18);
    margin-bottom: 25px;
    padding: 12mm 14mm;
  }
  .screen-nav {
    position: fixed;
    top: 15px;
    right: 20px;
    background: #0f172a;
    color: #f8fafc;
    padding: 8px 16px;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    display: flex;
    gap: 12px;
    align-items: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    z-index: 9999;
  }
  .screen-nav button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 5px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-size: 12px;
  }
  .screen-nav button:hover {
    background: #1d4ed8;
  }
}
`;
