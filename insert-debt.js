import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

// Initialize Supabase admin client (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const contentDraft = fs.readFileSync(path.resolve(process.cwd(), 'debt-payoff-draft.md'), 'utf-8');

// extremely simple markdown to HTML conversion for the core tags used
const safeHtml = contentDraft
  .replace(/^# (.*$)/gim, '<h1>$1</h1>')
  .replace(/^## (.*$)/gim, '<h2>$1</h2>')
  .replace(/^### (.*$)/gim, '<h3>$1</h3>')
  .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
  .replace(/\*(.*?)\*/gim, '<em>$1</em>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
  .replace(/^\* (.*$)/gim, '<li>$1</li>')
  .replace(/<\/li>\n<li>/gim, '</li><li>') // Not perfect for ul/ol wrappers but functional for basic rendering in our UI

async function insertPost() {
  
  const postData = {
    title: 'Debt Payoff Calculator | Snowball vs. Avalanche Method',
    slug: 'debt-payoff-calculator-snowball-avalanche',
    category: 'Finance',
    excerpt: 'Calculate the fastest way to become debt-free. Compare the popular Debt Snowball vs Debt Avalanche repayment strategies mathematically.',
    content: safeHtml,
    date: new Date().toISOString(),
    display_date: 'March 12, 2026',
    read_time: '5 min read',
    image: '/images/blog/debt-payoff-hero.png',
    related_tool_name: 'Debt Payoff Planner',
    related_tool_link: '/finance/debt-payoff'
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .upsert(postData, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error("Error inserting post:", error);
  } else {
    console.log("Success! Inserted Post ID:", data[0]?.id || 'Upserted Successfully');
  }
}

insertPost();
