const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '../app');
const SUBDIRS = ['finance', 'health', 'productivity'];

function toTitleCase(str) {
  return str.split('-').map(word => Object.is(word, '') ? '' : word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

SUBDIRS.forEach((category) => {
  const categoryPath = path.join(APP_DIR, category);
  if (!fs.existsSync(categoryPath)) return;

  const tools = fs.readdirSync(categoryPath);
  
  tools.forEach((toolSlug) => {
    const toolPath = path.join(categoryPath, toolSlug);
    const clientPath = path.join(toolPath, 'ClientComponent.tsx');
    
    if (fs.existsSync(clientPath)) {
        let content = fs.readFileSync(clientPath, 'utf8');
        
        // Fix export default function () => export default function ToolNameClient()
        if (content.match(/export\s+default\s+function\s*\(/)) {
            const safeName = toTitleCase(toolSlug) + 'Client';
            content = content.replace(/export\s+default\s+function\s*\(/, `export default function ${safeName}(`);
            fs.writeFileSync(clientPath, content, 'utf8');
            console.log(`Fixed anonymous export in: ${toolSlug}`);
        }
    }
  });
});
