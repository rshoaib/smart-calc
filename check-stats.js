const SupabaseREST = require('./scripts/supabase_rest.cjs');

async function checkStats() {
  try {
    const db = new SupabaseREST();
    
    // Select all articles to get the count and dates
    const data = await db.select('blog_posts', 'date,title');
    
    // Sort by date descending
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    const now = new Date();
    // Offset for local timezone (approximate standard date strings to local)
    const today = now.toISOString().split('T')[0];
    
    // Calculate Monday
    const currentDayOfWeek = now.getDay() || 7; // 1-7 (Mon-Sun)
    const mondayDate = new Date(now);
    mondayDate.setDate(now.getDate() - currentDayOfWeek + 1);
    const mondayStr = mondayDate.toISOString().split('T')[0];

    const publishedToday = data.filter(p => p.date.startsWith(today));
    // Filter by greater than or equal to Monday
    const publishedThisWeek = data.filter(p => p.date >= mondayStr);

    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║  📊 Content Dashboard — dailysmartcalc.com           ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log(`║  📦 Total Articles       │ ${String(data.length).padEnd(24)}║`);
    console.log(`║  📅 Last Published       │ ${data.length > 0 ? data[0].date.split('T')[0] : 'None'.padEnd(24)} ║`);
    console.log('╠──────────────────────────┼──────────────────────────╣');
    console.log(`║  ✍️ Published Today       │ ${publishedToday.length} of 1 ${publishedToday.length >= 1 ? '⬛' : '⬜'}                 ║`);
    console.log(`║  📆 Published This Week  │ ${publishedThisWeek.length} of 3 ${'⬛'.repeat(publishedThisWeek.length)}${'⬜'.repeat(3 - publishedThisWeek.length)}               ║`);
    console.log('╠──────────────────────────┼──────────────────────────╣');
    console.log(`║  🟢 Today Slots Left     │ ${Math.max(0, 1 - publishedToday.length)}                        ║`);
    console.log(`║  🟢 Week Slots Left      │ ${Math.max(0, 3 - publishedThisWeek.length)}                        ║`);
    console.log('╚══════════════════════════════════════════════════════╝');
    
    if (publishedThisWeek.length > 0) {
        console.log(`  This week's articles:`);
        publishedThisWeek.forEach(p => console.log(`  • ${p.date.split('T')[0]} — ${p.title}`));
    }
  } catch (err) {
    console.error('Error fetching stats:', err.message);
  }
}

checkStats();
