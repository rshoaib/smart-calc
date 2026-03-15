require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function fixBmiPost() {
  const { data: records, error: fetchError } = await supabase
    .from('blog_posts')
    .select('id, content')
    .eq('slug', 'bmi-calculator-adults-2026');
    
  if (fetchError || !records || records.length === 0) {
    console.error('Failed to fetch post or post not found');
    return;
  }
  
  let content = records[0].content;
  
  // Cut off everything from <script type="application/ld+json"> onwards
  const scriptIndex = content.indexOf('<script type="application/ld+json">');
  if (scriptIndex !== -1) {
    content = content.substring(0, scriptIndex).trim();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ content })
      .eq('slug', 'bmi-calculator-adults-2026')
      .select('slug');

    if (error) {
      console.error('Error updating:', error.message);
    } else {
      console.log('Success! Removed <script> tags from:', data[0].slug);
    }
  } else {
    console.log('No <script> tag found in content.');
  }
}

fixBmiPost();
