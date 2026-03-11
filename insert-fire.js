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

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const contentDraft = fs.readFileSync(path.resolve(process.cwd(), 'fire-draft.md'), 'utf-8');

// extremely simple markdown to HTML conversion for the core tags used
const safeHtml = contentDraft
  .replace(/^# (.*$)/gim, '<h1>$1</h1>')
  .replace(/^## (.*$)/gim, '<h2>$1</h2>')
  .replace(/^### (.*$)/gim, '<h3>$1</h3>')
  .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
  .replace(/\*(.*?)\*/gim, '<em>$1</em>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
  .replace(/^\* (.*$)/gim, '<li>$1</li>')
  .replace(/<\/li>\n<li>/gim, '</li><li>')

async function insertPost() {
  const postData = {
    title: 'The Ultimate FIRE Calculator Guide: Find Your Independence Number',
    slug: 'fire-calculator-financial-independence-retire-early',
    category: 'Finance',
    excerpt: 'Calculate your exact FIRE number using the 4% Rule. Learn the difference between Lean FIRE, Fat FIRE, and Coast FIRE to map your early retirement strategy.',
    content: safeHtml,
    date: new Date().toISOString(),
    display_date: 'March 12, 2026',
    read_time: '6 min read',
    image: '/images/blog/fire-calculator-hero.png',
    related_tool_name: 'FIRE Calculator',
    related_tool_link: '/finance/fire'
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
