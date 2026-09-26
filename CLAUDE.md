# Kryvex Media Website — Content Standards

## Standing requirement (set 2026-09-20)

**Every page on this site must carry at least 1,500 words of genuinely unique
content in `<main>`.** This applies to all page types — county pages, county ×
service pages, state/country hub pages, and every international tier (UK,
Canada, Russia, and the 187-country world-services set).

"1,500 words" means real, substantive, page-specific content — not padding,
not repeated boilerplate, not the same sentence with a city name swapped in.
Site-wide chrome (nav, footer, mega-menus) does not count toward this figure;
measure only `<main>` content, e.g.:

```python
import re
html = open(path, encoding="utf-8").read()
m = re.search(r'<main>(.*?)</main>', html, re.S)
text = re.sub(r'<[^>]+>', ' ', m.group(1))
text = re.sub(r'\s+', ' ', text).strip()
word_count = len(text.split())
```

## Anti-fabrication rule (standing, since early in this project)

Never invent facts, statistics, testimonials, reviews, case studies, or
client results. Every specific claim (population figures, local facts,
industry data, etc.) must trace to a real, verifiable source — cite it in
commit messages or research files. If a fact can't be verified, leave it out
rather than filling the gap with something plausible-sounding.

## Current status (as of 2026-09-20)

- Site audit completed: baseline was ~500-630 words `<main>` content per
  programmatic page, with 65-82% text similarity between sibling pages.
- **All 67 Florida county pages now meet the 1,500-word standard.**
  Each page carries a real local-economy section, a marketing-relevance
  section, and a locally grounded FAQ (avg 1,896 words, min 1,506, max
  2,038), built from real per-county research (named employers, industry
  employment figures, population/growth data). No fabricated facts.
- Working method (repeat for each new state/tier): split the county list
  into ~16-county batches, spawn one background research agent per batch
  to gather real facts via WebSearch and write `economy_html` /
  `relevance_html` / `faq` fields to a JSON file (see
  `inject_deep_content_v2.py` pattern in the working scratchpad), then run
  the injection script, verify word counts + HTML integrity, and top up
  any page still under 1,500 words before committing.
- Next: apply the same approach to the remaining 3,075 US counties
  (state by state), then county × service pages, then the UK/Canada/
  Russia/world-country tiers.

## Daily blog automation (set 2026-09-26, standing, no approval gate)

A recurring Routine publishes one new blog post per day, fully autonomously
(the owner explicitly opted out of an approval step for this one — unlike
the Instagram posting Routines, which stay approval-first). The
anti-fabrication and 1,500-word rules above still apply in full; removing
the approval step removes the human review checkpoint, not the content
integrity bar.

Process each run follows:
1. Pull real query data via the Composio `google_search_console` connection
   (`GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY`, site
   `sc-domain:kryvexmedia.com`) and pick one real, unused, relevant query as
   the day's topic. Never invent a topic ungrounded in real data or the
   site's actual service scope. If query data doesn't cleanly map to a new
   blog topic (as of 2026-09-26, most volume is hyper-local "agency in
   [city]" queries already served by the programmatic geo pages), fall back
   to a real, unaddressed topic within Kryvex's actual service scope and say
   so in the commit message.
2. Write a genuine 1,500+ word post at `blog/<slug>/index.html`, matching
   the existing post template/design, linking out to 3-5 real existing
   pages on the site (verify each URL exists before linking).
3. Commit (citing the real query or fallback method used), push to
   `claude/webtech-core-current-work-rsmbri`, fast-forward `main` to deploy.
4. Add the new URL to `sitemap-resources.xml` with today's `lastmod`, then
   actually resubmit the sitemap via Composio's `google_search_console`
   connection (`GOOGLE_SEARCH_CONSOLE_SUBMIT_SITEMAP`, site
   `sc-domain:kryvexmedia.com`, feedpath `https://kryvexmedia.com/sitemap.xml`).
   **This is real and confirmed working** (2026-09-26: "Sitemap
   'https://kryvexmedia.com/sitemap.xml' successfully submitted for site
   'sc-domain:kryvexmedia.com'") — do not fall back to a lastmod-only claim.
5. Post a short status report in chat afterward (topic, URL, word count,
   sitemap resubmission confirmation) — informational, not a request for
   approval.

## Publish verification rule (standing, set 2026-09-26)

**Never report a page as "live" without confirming the exact GitHub Actions
deploy for that commit actually succeeded.** On 2026-09-26 two rapid-fire
pushes (post file, then a separate sitemap-only push, then a separate
CLAUDE.md push) each cancelled GitHub Pages' in-progress build from the
previous push before it finished — the middle two deploys silently show
`conclusion: cancelled`, not `success`, and the new page briefly 404'd
while being reported as live.

Fix, applies to every publish from here on, not just the blog automation:
- Bundle related file changes (new page + sitemap update) into **one commit
  and one push**, not several in quick succession.
- After pushing, look up the `pages-build-deployment` run whose `head_sha`
  matches the commit (`mcp__github__actions_list`,
  method `list_workflow_runs`), then poll
  `mcp__github__actions_get` (`get_workflow_run`) on that exact run until
  `status: completed`. Only report something live once `conclusion` reads
  `success` — if it reads `cancelled` or `failure`, say so and re-deploy
  before claiming anything is live.
- `kryvexmedia.com` is blocked by this environment's network egress proxy,
  so WebFetch can't double-check live content directly — the GitHub Actions
  deploy-success check above is the real, available verification, and it
  must be used every time, not only when something looks wrong.

## Daily keyword-optimization automation (set 2026-09-26, standing, no approval gate)

A recurring Routine (`trig_018kXGKGYidUcjnAJpLAmLWR`, daily 02:30 UTC,
self-bound to the main working session) optimizes 2 pages/day for target
keywords, fully autonomously — same no-approval-gate model as the blog
Routine above. Goal: improve Google ranking and organic traffic across the
whole site, page by page.

Process each run follows:
1. Read `seo-keyword-optimization-log.md`'s priority queue and take the next
   2 not-yet-done pages (extend the queue with the next-highest-value pages
   — top US states, major metro counties, remaining country hubs — once it
   runs out).
2. Real keyword research per page via the direct Semrush MCP
   (`keyword_research` → `get_report_schema` → `execute_report`,
   `phrase_these`-style lookup) for a primary + 2-3 secondary keywords, with
   real volume/CPC/KD numbers. Semrush API units are a real, finite,
   sometimes-zero resource — when exhausted, fall back to WebSearch-informed
   selection, explicitly disclosed as not volume-verified in the log, with
   an action item to revisit once units refresh. The anti-fabrication rule
   applies here without exception: never invent a volume/CPC/KD number.
3. Conservative on-page optimization: `<title>`, meta description,
   og:title/description, twitter:title/description, relevant JSON-LD
   description fields. H1/body copy left alone unless there's a clear,
   non-disruptive case.
4. `seo-keyword-optimization-log.md` is the durable tracking file — priority
   queue + a dated log entry per page (keywords, data source, rationale,
   exact changes) every run.
5. Same bundling + deploy-verification rules as below: both pages' edits +
   the log update go in **one commit**, one push, then poll GitHub Actions
   for that commit's deploy to reach `conclusion: success` before reporting
   anything live.
6. End-of-day chat report: which 2 pages, which keywords (flagging any
   WebSearch fallback), what changed, live-verified URLs.

First live run (2026-09-26, done manually ahead of the Routine's first
scheduled fire): homepage → `small business marketing agency` (Semrush-
verified, Vol 3,600/mo, KD 22); `/services/seo/` → `SEO agency for small
businesses` (WebSearch fallback, Semrush units exhausted mid-run — flagged
for revisit). Both deployed and verified live (run #164,
conclusion: success). Full detail in `seo-keyword-optimization-log.md`.

### Fixed 2026-09-26: credential durability + real indexing submission

The original setup stored GSC OAuth credentials as a file in the session's
ephemeral scratchpad (`google_tokens.json`), which does not survive a
container reset — it was lost partway through 2026-09-26 and the first
test-run post had to fall back to a non-GSC topic as a result. **Fixed**:
use the Composio-managed `google_search_console` connection instead —
Composio stores it server-side, so it survives container resets. That
connection also turned out to have `siteOwner` permission (unlike the old
manually-scoped token, which was `webmasters.readonly`), so real sitemap
resubmission via `GOOGLE_SEARCH_CONSOLE_SUBMIT_SITEMAP` actually works now
— confirmed live, not just theoretically available.
