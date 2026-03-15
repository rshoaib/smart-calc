require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function removeDuplicateH1s() {
  const { data: posts, error } = await supabase.from('blog_posts').select('id, slug, content');
  
  if (error || !posts) {
    console.error('Failed to fetch posts');
    return;
  }
  
  for (const post of posts) {
    // Check if the content starts with an H1 tag (e.g. "# Title text\n")
    // Some might have leading whitespace
    const trimmedContent = post.content.trimStart();
    
    if (trimmedContent.startsWith('# ')) {
      // Find the end of the first line
      const firstNewlineIndex = trimmedContent.indexOf('\n');
      
      let newContent = post.content;
      if (firstNewlineIndex !== -1) {
        newContent = trimmedContent.substring(firstNewlineIndex).trimStart();
      } else {
        // The whole post is just a title (unlikely, but safe cover)
        newContent = '';
      }
      
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ content: newContent })
        .eq('id', post.id);
        
      if (updateError) {
        console.error(`Failed to update ${post.slug}:`, updateError.message);
      } else {
        console.log(`Successfully removed H1 from: ${post.slug}`);
      }
    } else {
      console.log(`No leading H1 found in: ${post.slug}`);
    }
  }
}

removeDuplicateH1s();
