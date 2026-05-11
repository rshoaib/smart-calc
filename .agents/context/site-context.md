# dailysmartcalc.com — Site Context

> **URL**: https://dailysmartcalc.com
> **Stack**: Next.js + Markdown content
> **Niche**: Free everyday calculators — finance, health, productivity
> **Audience**: General consumer needing quick, accurate calculations

## 🎤 Brand Voice

- **Tone**: Friendly, plain-English, no-jargon. "Here's how to figure this out in 30 seconds."
- **Style**: Lead with a concrete scenario. Show worked numbers. Short paragraphs.
- **Address**: Second person ("you"). Audience is non-specialist.
- **Hard rule**: Never give personalized financial, medical, or legal advice. Always include disclaimer at the bottom.

## 🔗 Internal Link Map (Calculator Routes)

| Category | Examples | Path pattern |
|---|---|---|
| Finance | auto-loan, budget, debt-payoff, fire, mortgage, net-worth, retirement, savings-goal, tax | `/finance/<name>` |
| Health | bmi, body-fat, calories, heart-rate, macro-split, 1rm | `/health/<name>` |
| Productivity | (browse `app/productivity/`) | `/productivity/<name>` |

Every new post **must** include a `related_tool_link` pointing at the on-site calculator most relevant to the topic. Aim for 2–3 internal links total per post.

## 🎯 Content Pillars

| Pillar | Category | Topics |
|---|---|---|
| Finance | `Finance` | mortgage math, retirement planning, loan amortization, FIRE, debt payoff |
| Health | `Health` | BMI accuracy, calorie math, body composition, training math |
| Productivity | `Productivity` | time-management math, ROI, decision frameworks |

## 📝 Frontmatter Convention

```yaml
---
id: <integer; check existing max>
slug: <kebab-case-no-quotes>
title: <Title Case, primary keyword near front>
excerpt: "..."
date: YYYY-MM-DD
display_date: "Month DD, YYYY"
read_time: N min read
category: <Finance | Health | Productivity>
related_tool_link: /<category-path>/<calculator>
related_tool_name: <Display Name>
created_at: "ISO 8601"
---
```

Body is Markdown. Internal links to other posts use `/blog/<slug>`. Calculator links use the routes above.
