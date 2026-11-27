const fs = require('fs');
const path = require('path');
const logosDir = path.join(__dirname, 'assets', 'logos');

const brandColors = {
  'docker.svg': '#2496ED',
  'kubernetes.svg': '#326CE5',
  'kong.svg': '#00B5E2',
  'istio.svg': '#466BB0',
  'envoyproxy.svg': '#F43F5E',
  'go.svg': '#00ADD8',
  'python.svg': '#38BDF8',
  'openjdk.svg': '#F97316',
  'nodedotjs.svg': '#22C55E',
  'mysql.svg': '#38BDF8',
  'redis.svg': '#EF4444',
  'prometheus.svg': '#F97316',
  'grafana.svg': '#FB923C',
  'jaeger.svg': '#67E8F9',
  'argo.svg': '#FB923C',
  'githubactions.svg': '#38BDF8',
  'raspberrypi.svg': '#F43F5E'
};

for (const [file, color] of Object.entries(brandColors)) {
  const filePath = path.join(logosDir, file);
  if (fs.existsSync(filePath)) {
    let svg = fs.readFileSync(filePath, 'utf8');
    // Inject fill into path or svg
    if (svg.includes('<path')) {
      svg = svg.replace(/<path\s/g, `<path fill="${color}" `);
    }
    // Also if there's no fill in the svg root
    if (!svg.includes('fill=')) {
      svg = svg.replace('<svg ', `<svg fill="${color}" `);
    }
    fs.writeFileSync(filePath, svg, 'utf8');
    console.log(`Colorized ${file} with ${color}`);
  }
}
