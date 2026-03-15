require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Service Role Key or URL.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const filesToFix = [
  { slug: 'roi-vs-roas-calculator-marketing-profitability', file: 'roi-draft.md' },
  { slug: 'fire-calculator-financial-independence-retire-early', file: 'fire-draft.md' },
  { slug: 'mortgage-calculator-with-amortization', file: 'mortgage-draft.md' },
  { slug: 'debt-payoff-calculator-snowball-avalanche', file: 'debt-payoff-draft.md' }
];

async function updatePosts() {
  for (const item of filesToFix) {
    if (fs.existsSync(item.file)) {
      const rawMarkdown = fs.readFileSync(item.file, 'utf-8');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ content: rawMarkdown })
        .eq('slug', item.slug)
        .select('slug');

      if (error) {
        console.error('Error updating', item.slug, ':', error.message);
      } else if (data && data.length > 0) {
        console.log('Success! Updated post slug:', item.slug);
      } else {
        console.log('Post not found (or no change):', item.slug);
      }
    } else {
      console.error('Draft file not found:', item.file);
    }
  }
}

updatePosts();
