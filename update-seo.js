const fs = require('fs');
const path = require('path');

const categories = ['finance', 'health', 'productivity'];
const baseDir = path.join(__dirname, 'app');

function formatTitle(slug) {
  const specialCases = {
    'bmi': 'BMI',
    '1rm': '1RM',
    'roi': 'ROI',
    'gpa': 'GPA',
  };

  if (specialCases[slug]) return specialCases[slug];

  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

categories.forEach(category => {
  const categoryPath = path.join(baseDir, category);
  if (!fs.existsSync(categoryPath)) return;

  const tools = fs.readdirSync(categoryPath);

  tools.forEach(tool => {
    const pagePath = path.join(categoryPath, tool, 'page.tsx');
    if (fs.existsSync(pagePath) && fs.statSync(path.join(categoryPath, tool)).isDirectory()) {
      const formattedName = formatTitle(tool);
      const url = `https://dailysmartcalc.com/${category}/${tool}`;
      
      const newPageContent = `import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: '${formattedName} Calculator | SmartCalc',
  description: 'Free online ${formattedName.toLowerCase()} calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: '${formattedName} Calculator | SmartCalc',
    description: 'Free online ${formattedName.toLowerCase()} calculator. Get accurate results instantly.',
    url: '${url}',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '${formattedName} Calculator | SmartCalc',
    description: 'Free online ${formattedName.toLowerCase()} calculator.',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: '${formattedName} Calculator',
            url: '${url}',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online ${formattedName.toLowerCase()} calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
`;
      fs.writeFileSync(pagePath, newPageContent);
      console.log(`Updated: ${category}/${tool}/page.tsx`);
    }
  });
});
