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

const articleHtml = fs.readFileSync('bmi-draft.md', 'utf8')
  // extremely simple markdown to HTML conversion for the core tags used
  .replace(/^# (.*$)/gim, '<h1>$1</h1>')
  .replace(/^## (.*$)/gim, '<h2>$1</h2>')
  .replace(/^### (.*$)/gim, '<h3>$1</h3>')
  .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
  .replace(/\*(.*?)\*/gim, '<em>$1</em>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
  .replace(/^\* (.*$)/gim, '<li>$1</li>')
  .replace(/<\/li>\n<li>/gim, '</li><li>') // Not perfect for ul/ol wrappers but functional for basic rendering in our UI
  // The UI likely handles raw HTML or markdown if we just push the content as is, but we'll push the HTML structure we've been using.
  // Actually, wait, the previous script had hardcoded HTML. Let's just hardcode the HTML string to be perfectly safe.

const safeHtml = `
<p>When you step on a scale, the number staring back at you only tells a fraction of the story. Whether you weigh 150 lbs or 220 lbs means very little without understanding your height in proportion to that weight.</p>

<p>To get a true baseline of your physical health, you need to calculate your <strong>Body Mass Index (BMI)</strong>.</p>

<p>Our <a href="/health/bmi">free BMI calculator</a> gives you an instant, science-backed snapshot of your weight category. It is the exact same standard screening tool used by the Centers for Disease Control (CDC), the World Health Organization (WHO), and healthcare professionals worldwide.</p>

<h2>What is BMI and How is it Calculated?</h2>

<p>Body Mass Index (BMI) is a simple mathematical formula that divides your weight by the square of your height. It is not a direct measurement of your total body fat, but rather an indirect approximation that helps quickly categorize your risk for weight-related diseases.</p>

<p>If you don't want to use our <a href="/health/bmi">online calculator</a>, here is how the math works:</p>

<p><strong>Using Metric Units (Kilograms & Meters):</strong></p>
<ul>
  <li><strong>Formula:</strong> BMI = Weight (kg) / [Height (m) x Height (m)]</li>
  <li><strong>Example:</strong> If you weigh 75 kg and are 1.8 meters tall: 75 / (1.8 * 1.8) = 23.15 BMI</li>
</ul>

<p><strong>Using Imperial Units (Pounds & Inches):</strong></p>
<ul>
  <li><strong>Formula:</strong> BMI = [Weight (lbs) / (Height (in) x Height (in))] x 703</li>
  <li><strong>Example:</strong> If you weigh 165 lbs and are 71 inches tall: [165 / (71 * 71)] x 703 = 23.01 BMI</li>
</ul>

<h2>Understanding Adult BMI Categories</h2>

<p>Once you have your BMI number, it is time to see where you fall on the standard chart. For adults ages 20 and older, the CDC defines the following official weight categories:</p>

<h3>Underweight (BMI &lt; 18.5)</h3>
<p>A BMI below 18.5 indicates that you may be underweight. Being underweight can compromise your immune system, lead to bone density issues (osteoporosis), and cause anemia. If you fall into this category, it is highly recommended to consult a doctor or a registered dietitian to discuss safe weight-gain strategies.</p>

<h3>Normal / Healthy Weight (BMI 18.5 – 24.9)</h3>
<p>Congratulations! Statistically, falling into the "Normal" category means you have the lowest risk for weight-related chronic illnesses, such as heart disease and type 2 diabetes. The goal is to maintain this ratio through a balanced diet—perhaps tracking your daily calorie needs with our <a href="/health/calories">TDEE / Calorie Calculator</a>—and regular exercise.</p>

<h3>Overweight (BMI 25.0 – 29.9)</h3>
<p>If your BMI is in the overweight range, you face an elevated risk for high blood pressure, cholesterol issues, and cardiovascular disease. Even losing just 5% to 10% of your current body weight can drastically improve your biomarkers and push you back toward the healthy range.</p>

<h3>Obesity (BMI 30.0 and above)</h3>
<p>A BMI of 30 or higher falls into the obesity category. Obesity is heavily linked to severe health risks, including stroke, clinical depression, osteoarthritis, and sleep apnea.</p>

<p>The CDC further breaks this down into three classes to help doctors understand the severity:</p>
<ul>
  <li><strong>Class 1:</strong> BMI of 30 to &lt; 35</li>
  <li><strong>Class 2:</strong> BMI of 35 to &lt; 40</li>
  <li><strong>Class 3 (Severe):</strong> BMI of 40 or higher</li>
</ul>

<h2>Is BMI Actually Accurate? (The Limitations)</h2>

<p>BMI is a fantastic population-level screening tool because it is cheap, fast, and non-invasive. However, on an <em>individual</em> level, it is notoriously flawed.</p>

<p><strong>BMI does not distinguish between fat mass and muscle mass.</strong></p>

<p>Because muscle is much denser and heavier than fat, highly trained athletes, bodybuilders, and heavy lifters often register as "Overweight" or "Obese" on a BMI chart, despite having single-digit body fat percentages and excellent cardiovascular health.</p>

<p>Conversely, BMI can fail older adults. A senior citizen who has lost significant muscle mass due to aging (sarcopenia) might register a "Normal" BMI while simultaneously carrying a dangerous amount of visceral belly fat.</p>

<h3>Why Waist Circumference Matters</h3>
<p>If you want a more accurate picture of your metabolic health, use your BMI in conjunction with your <strong>waist circumference</strong>. Measuring just above your hip bones can reveal visceral fat levels (the dangerous fat that wraps around your internal organs). Health professionals usually recommend a waist circumference of under 40 inches for men and under 35 inches for non-pregnant women.</p>

<h2>Frequently Asked Questions</h2>

<p><strong>How often should I check my BMI?</strong><br>
Checking your BMI once every 6 to 12 months is usually sufficient for adults. Unless you are actively on a weight loss or muscle-building program, your height is fixed, and your weight should ideally remain relatively stable.</p>

<p><strong>What is a healthy BMI for a woman over 50?</strong><br>
The official CDC and WHO BMI charts do not change based on age or gender for adults. The healthy range remains 18.5 to 24.9. However, many geriatric doctors argue that for older adults, aiming for the higher end of the normal range (or even slightly overweight) can provide a protective buffer against frailty and illness.</p>

<p><strong>Is BMI the exact same for men and women?</strong><br>
Yes. For adults 20 and over, the math formula and the category brackets are identical regardless of gender.</p>

<h2>Take Control of Your Health</h2>

<p>Understanding your body mass index is step one. Step two is taking actionable data-driven steps to optimize your body.</p>

<p>Use our free <strong><a href="/health/bmi">BMI Calculator</a></strong> right now to find your baseline. If your goal is to lose weight, use our robust <strong><a href="/health/calories">Calorie Calculator</a></strong> to figure out exactly how much energy your body needs to burn fat efficiently while retaining muscle.</p>
`;

async function insertPost() {
  const newPost = {
    title: 'Free BMI Calculator for Adults: Check Your Body Mass Index (2026)',
    slug: 'bmi-calculator-for-adults',
    excerpt: 'Calculate your Body Mass Index (BMI) and understand exactly where you fall on the CDC adult weight chart. Learn the math, the limitations, and what it means for your health.',
    content: safeHtml,
    category: 'Health',
    date: new Date().toISOString(),
    display_date: 'March 12, 2026',
    read_time: '4 min read',
    image: '/images/blog/bmi-calculator-hero.png',
    related_tool_name: 'BMI Calculator',
    related_tool_link: '/health/bmi'
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([newPost])
    .select();

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Success! Inserted Post ID:', data[0].id);
  }
}

insertPost();
