// scripts/audit_site.js
const fs = require('fs');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');
const results = {
  pdfLinks: [],
  missingPdfs: [],
  htmlFiles: [],
  brokenHrefs: [],
  dataConsistency: {},
  mobileAudit: {}
};

// 1. Audit HTML files
const htmlFiles = ['index.html', 'dashboard_vagas.html', 'dashboard_people_analytics_interativo.html'];
results.htmlFiles = htmlFiles;

for (const htmlFile of htmlFiles) {
  const filePath = path.join(repoDir, htmlFile);
  if (!fs.existsSync(filePath)) {
    results.brokenHrefs.push({ file: htmlFile, error: 'File does not exist' });
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Check all hrefs
  const hrefRegex = /href=["']([^"']+)["']/g;
  let m;
  while ((m = hrefRegex.exec(content)) !== null) {
    const url = m[1];
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#') || url.startsWith('mailto:')) {
      continue;
    }
    const cleanUrl = url.split('?')[0].split('#')[0];
    const targetPath = path.join(repoDir, cleanUrl);
    if (!fs.existsSync(targetPath)) {
      results.brokenHrefs.push({ sourceFile: htmlFile, target: url });
    }
    if (url.endsWith('.pdf')) {
      results.pdfLinks.push({ sourceFile: htmlFile, target: url, exists: fs.existsSync(targetPath) });
      if (!fs.existsSync(targetPath)) {
        results.missingPdfs.push({ sourceFile: htmlFile, target: url });
      }
    }
  }
}

// 2. Audit Data Consistency between data.js and MELISSA_CAREER_OS
const careerOsDir = path.resolve(repoDir, '..', 'MELISSA_CAREER_OS');
const dataJsPath = path.join(repoDir, 'data.js');
const sandbox = { window: {} };
new Function('window', fs.readFileSync(dataJsPath, 'utf8'))(sandbox.window);
const data = sandbox.window.CAREER_DATA;

results.dataConsistency = {
  projetosCount: data.projetos ? data.projetos.length : 0,
  competenciasCount: data.competencias ? data.competencias.length : 0,
  historiasStarCount: data.historias_star ? data.historias_star.length : 0,
  radarAreasCount: data.radar_areas ? data.radar_areas.length : 0,
  hasCareerOsFolder: fs.existsSync(careerOsDir)
};

// Check local files in 03_PORTFOLIO_VIVO
const casesDir = path.join(careerOsDir, '03_PORTFOLIO_VIVO', 'CASES');
if (fs.existsSync(casesDir)) {
  results.dataConsistency.localCases = fs.readdirSync(casesDir);
}

// 3. Output results
console.log(JSON.stringify(results, null, 2));
