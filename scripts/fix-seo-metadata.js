const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '../app');
const SUBDIRS = ['finance', 'health', 'productivity'];

function toTitleCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Minimal SEO mapping guess based on slugs
function getSeoForRoute(category, slug) {
  const name = toTitleCase(slug);
  return {
    title: `Free ${name} Calculator | SmartCalc`,
    description: `Calculate your ${name.toLowerCase()} instantly with our free online tool.`
  };
}

let count = 0;

SUBDIRS.forEach((category) => {
  const categoryPath = path.join(APP_DIR, category);
  if (!fs.existsSync(categoryPath)) return;

  const tools = fs.readdirSync(categoryPath);
  
  tools.forEach((toolSlug) => {
    const toolPath = path.join(categoryPath, toolSlug);
    const pagePath = path.join(toolPath, 'page.tsx');
    
    // Skip if not a directory or no page.tsx
    if (!fs.statSync(toolPath).isDirectory() || !fs.existsSync(pagePath)) return;
    
    // Check if it's already been split (doesn't start with "use client")
    const content = fs.readFileSync(pagePath, 'utf8');
    if (!content.includes("'use client'")) return;
    
    console.log(`Processing: ${category}/${toolSlug}`);
    
    // 1. Rename the existing page.tsx to ClientComponent.tsx
    const clientComponentPath = path.join(toolPath, 'ClientComponent.tsx');
    fs.renameSync(pagePath, clientComponentPath);
    
    // 2. Determine component name (naive approach: find "export default function X")
    let componentNameMatch = content.match(/export default function\s+([A-Za-z0-9_]+)/);
    let rawComponentName = componentNameMatch ? componentNameMatch[1] : 'CalculatorClient';
    
    // 3. Create the new Server Component page.tsx
    const seo = getSeoForRoute(category, toolSlug);
    
    const serverPageContent = `import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: '${seo.title}',
  description: '${seo.description}',
};

export default function Page() {
  return <ClientComponent />;
}
`;
    fs.writeFileSync(pagePath, serverPageContent, 'utf8');
    count++;
  });
});

console.log(`\nSuccessfully refactored ${count} tool routes!`);
