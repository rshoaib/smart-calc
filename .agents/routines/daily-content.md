# dailysmartcalc.com — daily content routine

## Mission

Land **one** meaningful change per run that helps dailysmartcalc.com. Triage prioritizes refreshing existing posts over adding new ones (indexation pressure).

## Pre-flight

1. Read `.agents/context/site-context.md` for brand voice + calculator URL map.
2. Read `.agents/context/target-keywords.md` for the keyword backlog.
3. Today's date in YYYY-MM-DD. Posts dir: `content/blog/`. Branch: `main`.

**Frontmatter shape (existing posts):** `id`, `slug`, `title`, `excerpt`, `date`, `display_date`, `read_time`, `category`, `related_tool_link`, `related_tool_name`, `created_at`. Body is Markdown.

## Priority lanes — pick the FIRST lane with work to do

### Lane A — Refresh stuck content (highest priority)

For every `content/blog/*.md`, determine state. Heuristic: `date` ≥30 days old AND no edit in `git log --since="30 days ago" -- content/blog/<slug>.md`. Pick oldest. Expand 30–50% with worked examples, comparison tables, 3+ government/authoritative sources, and 2 new H2 sections matching specific long-tail queries (use WebSearch). Bump the post's date per the existing pattern. Don't change `slug`, `title`, `id`. Stop after one post.

### Lane B — Internal-link strengthening (medium priority)

Only if Lane A is clear. Add 1–2 contextual links from top-traffic posts into underexposed posts. Anchor text from `.agents/context/target-keywords.md`.

### Lane C — New post (lowest priority)

Only if Lanes A and B are clear AND no new post in 3 days. Inspect 2–3 existing posts first to learn the exact frontmatter + body shape. Always pair a new post with a `related_tool_link` to a calculator under `app/finance/`, `app/health/`, or `app/productivity/`.

## Hard constraints (all lanes)

- Never more than 1 lane per run. Never more than 1 post created.
- Never delete content. Never fabricate stats. Never force-push. Never `--no-verify`.

## After the change

1. `npm run lint`. If it fails, do not commit.
2. Stage only edited files.
3. Commit with repo's convention. Push to `origin/main`.
4. If auth fails, exit cleanly. One-paragraph report at end.

If all lanes clear: one-line skip report. Don't manufacture work.
