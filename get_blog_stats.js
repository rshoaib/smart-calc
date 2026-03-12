require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStats() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('title, date')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    process.exit(1);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get Monday of current week
  const monday = new Date(today);
  const day = monday.getDay();
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  monday.setDate(diff);

  let publishedToday = 0;
  let publishedThisWeek = 0;
  const thisWeekTitles = [];

  posts.forEach(post => {
    const postDate = new Date(post.date);
    postDate.setHours(0, 0, 0, 0);

    if (postDate.getTime() === today.getTime()) {
      publishedToday++;
    }

    if (postDate.getTime() >= monday.getTime()) {
      publishedThisWeek++;
      thisWeekTitles.push(`- ${post.date} — ${post.title}`);
    }
  });

  console.log(JSON.stringify({
    total: posts.length,
    lastPublished: posts.length > 0 ? `${posts[0].date} — ${posts[0].title}` : 'None',
    today: publishedToday,
    thisWeek: publishedThisWeek,
    titles: thisWeekTitles
  }));
}

checkStats();
