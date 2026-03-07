/**
 * Bulk page migration script for Vite → Next.js
 * Transforms page files by:
 * 1. Adding "use client" directive
 * 2. Removing react-helmet-async and react-router-dom imports
 * 3. Updating component import paths to use @/ alias
 * 4. Removing <SEO .../> JSX blocks
 * 5. Replacing Link from react-router-dom with next/link
 */

const fs = require('fs');
const path = require('path');

const SRC = 'c:/Projects/dailysmartcalc/src/pages';
const DEST = 'c:/Projects/dailysmartcalc-next/app';

// Map of source file -> destination directory
const FILE_MAP = {
  // Top-level pages
  'Home.tsx': 'page-component.tsx', // Special: homepage
  'About.tsx': 'about/',
  'Contact.tsx': 'contact/',
  'Privacy.tsx': 'privacy/',
  'Terms.tsx': 'terms/',
  'Dashboard.tsx': 'dashboard/',
  'NotFound.tsx': 'not-found-component.tsx',

  // Finance
  'finance/FinanceLanding.tsx': 'finance/',
  'finance/MortgageCalculator.tsx': 'finance/mortgage/',
  'finance/InvestmentCalculator.tsx': 'finance/investment/',
  'finance/AutoLoanCalculator.tsx': 'finance/loan/',
  'finance/RetirementCalculator.tsx': 'finance/retirement/',
  'finance/DebtPayoffPlanner.tsx': 'finance/debt-payoff/',
  'finance/TimeToMillionaireCalculator.tsx': 'finance/time-to-millionaire/',
  'finance/RentVsBuyCalculator.tsx': 'finance/rent-vs-buy/',
  'finance/FireCalculator.tsx': 'finance/fire/',
  'finance/FreelanceRateCalculator.tsx': 'finance/freelance-rate/',
  'finance/ROICalculator.tsx': 'finance/roi/',
  'finance/SavingsGoalCalculator.tsx': 'finance/savings-goal/',
  'finance/FinancialFreedomPage.tsx': 'finance/freedom-guide/',
  'finance/EmergencyFundCalculator.tsx': 'finance/emergency/',

  // Health
  'health/HealthLanding.tsx': 'health/',
  'health/BMICalculator.tsx': 'health/bmi/',
  'health/CalorieCalculator.tsx': 'health/calories/',
  'health/MacroCalculator.tsx': 'health/macro-split/',
  'health/HeartRateCalculator.tsx': 'health/heart-rate/',
  'health/SleepCalculator.tsx': 'health/sleep/',
  'health/OneRepMaxCalculator.tsx': 'health/1rm/',
  'health/WellnessHubPage.tsx': 'health/wellness-guide/',

  // Productivity
  'productivity/ProductivityLanding.tsx': 'productivity/',
  'productivity/PomodoroTimer.tsx': 'productivity/pomodoro/',
  'productivity/SalaryHourlyConverter.tsx': 'productivity/salary-hourly/',
  'productivity/MeetingCostCalculator.tsx': 'productivity/meeting-cost/',
  'productivity/PercentageCalculator.tsx': 'productivity/percentage/',
  'productivity/GPACalculator.tsx': 'productivity/gpa/',
  'productivity/TypingSpeedTest.tsx': 'productivity/typing-speed/',
  'productivity/DateDifferenceCalculator.tsx': 'productivity/date-difference/',
  'productivity/UnitConverter.tsx': 'productivity/unit-converter/',
  'productivity/TipCalculator.tsx': 'productivity/tip-calculator/',
  'productivity/WordCounter.tsx': 'productivity/word-counter/',
  'productivity/AgeCalculator.tsx': 'productivity/age/',

  // Blog
  'blog/BlogList.tsx': 'blog/',
  'blog/BlogPost.tsx': 'blog/[slug]/',

  // SEO
  'seo/SeoRoutes.tsx': 'calculate/[slug]/',
  'seo/SeoCalculatorPage.tsx': null, // Will be copied as a component
};

function transformFile(content, srcFile) {
  let result = content;

  // 1. Add "use client" at the top if not present
  if (!result.includes("'use client'")) {
    result = "'use client';\n\n" + result;
  }

  // 2. Remove react-helmet-async imports
  result = result.replace(/import\s*\{[^}]*\}\s*from\s*['"]react-helmet-async['"];?\s*\n?/g, '');

  // 3. Replace react-router-dom imports
  // Handle: import { useParams, Navigate, Link } from 'react-router-dom';
  const rrdMatch = result.match(/import\s*\{([^}]*)\}\s*from\s*['"]react-router-dom['"];?\s*\n?/);
  if (rrdMatch) {
    const imports = rrdMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    const replacements = [];

    if (imports.includes('Link')) {
      replacements.push("import Link from 'next/link';");
    }
    if (imports.includes('useParams')) {
      replacements.push("import { useParams } from 'next/navigation';");
    }
    if (imports.includes('Navigate') || imports.includes('useNavigate')) {
      replacements.push("import { redirect } from 'next/navigation';");
    }
    if (imports.includes('useLocation')) {
      replacements.push("import { usePathname } from 'next/navigation';");
    }

    result = result.replace(rrdMatch[0], replacements.join('\n') + (replacements.length ? '\n' : ''));
  }

  // 4. Update component import paths (../../components/ -> @/components/)
  result = result.replace(/from\s*['"]\.\.\/\.\.\/components\//g, "from '@/components/");
  result = result.replace(/from\s*['"]\.\.\/components\//g, "from '@/components/");
  result = result.replace(/from\s*['"]\.\.\/\.\.\/\.\.\/components\//g, "from '@/components/");

  // 5. Update data import paths
  result = result.replace(/from\s*['"]\.\.\/\.\.\/data\//g, "from '@/data/");
  result = result.replace(/from\s*['"]\.\.\/data\//g, "from '@/data/");
  result = result.replace(/from\s*['"]\.\.\/\.\.\/\.\.\/data\//g, "from '@/data/");

  // 6. Update lib import paths
  result = result.replace(/from\s*['"]\.\.\/\.\.\/lib\//g, "from '@/lib/");
  result = result.replace(/from\s*['"]\.\.\/lib\//g, "from '@/lib/");

  // 7. Update store import paths
  result = result.replace(/from\s*['"]\.\.\/\.\.\/store\//g, "from '@/store/");
  result = result.replace(/from\s*['"]\.\.\/store\//g, "from '@/store/");

  // 8. Replace <Link to= with <Link href= 
  result = result.replace(/<Link\s+to=/g, '<Link href=');
  result = result.replace(/<Link\s+to\s*=/g, '<Link href=');

  // 9. Replace <Navigate to= with redirect() (will need manual review)
  // Simple pattern: <Navigate to="/path" replace />
  result = result.replace(/<Navigate\s+to=["']([^"']+)["']\s*replace\s*\/?>/g, '{ redirect("$1"); return null; }');

  // 10. Replace useLocation() with usePathname()
  result = result.replace(/const\s+location\s*=\s*useLocation\(\)/g, 'const pathname = usePathname()');
  result = result.replace(/location\.pathname/g, 'pathname');

  // 11. Remove SEO component import
  result = result.replace(/import\s*\{?\s*SEO\s*\}?\s*from\s*['"][^'"]*SEO['"];?\s*\n?/g, '');

  // 12. Remove <SEO ... /> JSX blocks (single-line and multi-line)
  // Single line: <SEO title="..." description="..." ... />
  result = result.replace(/<SEO\s[^>]*\/>\s*\n?/g, '');
  // Multi-line: <SEO\n  title="..."\n  ...\n/>
  result = result.replace(/<SEO\s*\n[\s\S]*?\/>\s*\n?/g, '');

  // 13. Handle relative imports for SEO page components (within seo/ dir)
  if (srcFile.includes('SeoRoutes')) {
    result = result.replace(/from\s*['"]\.\/SeoCalculatorPage['"];?/g, "from '@/components/SeoCalculatorPage'");
  }

  return result;
}

// Process each file
let count = 0;
for (const [src, dest] of Object.entries(FILE_MAP)) {
  if (dest === null) continue;

  const srcPath = path.join(SRC, src);
  if (!fs.existsSync(srcPath)) {
    console.warn(`SKIP (not found): ${srcPath}`);
    continue;
  }

  const content = fs.readFileSync(srcPath, 'utf-8');
  const transformed = transformFile(content, src);

  let destPath;
  if (dest.endsWith('/')) {
    destPath = path.join(DEST, dest, 'page.tsx');
  } else {
    destPath = path.join(DEST, dest);
  }

  // Ensure dest directory exists
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, transformed, 'utf-8');
  count++;
  console.log(`OK: ${src} -> ${destPath}`);
}

// Also copy SeoCalculatorPage as a component
const seoCalcSrc = path.join(SRC, 'seo/SeoCalculatorPage.tsx');
if (fs.existsSync(seoCalcSrc)) {
  let content = fs.readFileSync(seoCalcSrc, 'utf-8');
  content = transformFile(content, 'seo/SeoCalculatorPage.tsx');
  const seoCalcDest = 'c:/Projects/dailysmartcalc-next/components/SeoCalculatorPage.tsx';
  fs.writeFileSync(seoCalcDest, content, 'utf-8');
  count++;
  console.log(`OK: SeoCalculatorPage.tsx -> components/`);
}

console.log(`\nDone! Transformed ${count} files.`);
