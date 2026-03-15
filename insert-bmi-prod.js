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

const contentDraft = fs.readFileSync('bmi-draft.md', 'utf-8');

const rawMarkdown = contentDraft + `\n\n<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How often should I check my BMI?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Checking your BMI once every 6 to 12 months is usually sufficient for adults. Unless you are actively on a weight loss or muscle-building program, your height is fixed, and your weight should ideally remain relatively stable."
    }
  }, {
    "@type": "Question",
    "name": "What is a healthy BMI for a woman over 50?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The official CDC and WHO BMI charts do not change based on age or gender for adults. The healthy range remains 18.5 to 24.9. However, many geriatric doctors argue that for older adults, aiming for the higher end of the normal range (or even slightly overweight) can provide a protective buffer against frailty and illness."
    }
  }, {
    "@type": "Question",
    "name": "Is BMI the exact same for men and women?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes. For adults 20 and over, the math formula and the category brackets are identical regardless of gender."
    }
  }]
}
</script>`;

async function updatePost() {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ content: rawMarkdown })
    .eq('slug', 'bmi-calculator-adults-2026')
    .select();

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Success! Updated Post ID:', data[0]?.id || 'Not Found');
  }
}

updatePost();
