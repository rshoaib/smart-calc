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

async function fixTaxArticle() {
  const { data: records, error: fetchError } = await supabase
    .from('blog_posts')
    .select('id, content')
    .eq('slug', 'how-to-calculate-2025-federal-income-tax');
    
  if (fetchError || !records || records.length === 0) {
    console.error('Failed to fetch post or post not found');
    return;
  }
  
  let content = records[0].content;
  
  // Replace the HTML image block with raw markdown
  const newContent = content.replace(
    /<div className="my-8">\s*<img\s*src="([^"]+)"\s*alt="([^"]+)"\s*className="[^"]+"\s*\/>\s*<\/div>/gim, 
    '![$2]($1)'
  );
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ content: newContent })
    .eq('slug', 'how-to-calculate-2025-federal-income-tax')
    .select('slug');

  if (error) {
    console.error('Error updating:', error.message);
  } else {
    console.log('Success! Updated post slug:', data[0].slug);
  }
}

fixTaxArticle();
