const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1]] = match[2].trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkStats() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('created_at, title')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Error:', error);
    return;
  }

  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  const day = now.getDay() || 7; 
  now.setHours(-24 * (day - 1)); 
  const monday = now.toISOString().split('T')[0];

  const publishedToday = data.filter(p => p.created_at.startsWith(today));
  const publishedThisWeek = data.filter(p => p.created_at >= monday);

  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  📊 Content Dashboard — dailysmartcalc.com           ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log(`║  📦 Total Articles       │ ${String(data.length).padEnd(24)}║`);
  console.log(`║  📅 Last Published       │ ${data[0]?.created_at.split('T')[0] || 'None'}           ║`);
  console.log('╠──────────────────────────┼──────────────────────────╣');
  console.log(`║  ✍️ Published Today      │ ${publishedToday.length} of 1 ${publishedToday.length >= 1 ? '⬛' : '⬜'}                 ║`);
  console.log(`║  📆 Published This Week  │ ${publishedThisWeek.length} of 3 ${'⬛'.repeat(publishedThisWeek.length)}${'⬜'.repeat(3 - publishedThisWeek.length)}               ║`);
  console.log('╚══════════════════════════════════════════════════════╝');
}

checkStats();
