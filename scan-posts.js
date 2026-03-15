require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function scanPosts() {
  const { data: posts, error } = await supabase.from('blog_posts').select('slug, content, title');
  
  if (error || !posts) {
    console.error('Failed to fetch posts:', error?.message);
    return;
  }
  
  let issuesFound = false;
  
  for (const post of posts) {
    const issues = [];
    
    // Check for leading H1 (accounting for possible whitespace or invisible characters)
    const first50Chars = post.content.substring(0, 50).trim();
    if (first50Chars.startsWith('# ')) {
      issues.push('Leading `# H1` header found.');
    }
    
    // Check for raw HTML tags that shouldn't be in Markdown
    if (/<div/i.test(post.content)) issues.push('`<div>` tag found.');
    if (/<img/i.test(post.content)) issues.push('`<img>` tag found.');
    if (/<p>/i.test(post.content)) issues.push('`<p>` tag found.');
    if (/<h[1-6]>/i.test(post.content)) issues.push('`<hX>` tag found.');
    
    // Check for raw script blocks
    if (/<script/i.test(post.content)) issues.push('`<script>` tag found.');
    
    if (issues.length > 0) {
      issuesFound = true;
      console.log(`\n❌ Issues in slug: ${post.slug}`);
      issues.forEach(i => console.log(`  - ${i}`));
    }
  }
  
  if (!issuesFound) {
    console.log('\n✅ All posts are clean! No HTML tags, scripts, or duplicate H1s found in the markdown.');
  }
  console.log(`\nTotal posts scanned: ${posts.length}`);
}

scanPosts();
