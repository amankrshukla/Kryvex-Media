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

## Automation scheduling: all IST, one combined daily report (set 2026-09-30, per owner instruction)

All standing Routines now fire clustered around 1pm IST (staggered by a
few minutes each so they don't collide, since they're all self-bound to
this same session and need to run in sequence, not simultaneously), and
none of them post an individual chat report anymore — they log to their
own durable `.md` file instead. A separate **Daily Combined Status
Report** Routine (`trig_01AvrxMDA8DeDGJvS8DmWUAt`, daily ~13:25 IST,
read-only/reporting-only) fires last, reads each log file's entry for
today, cross-checks against git log / GitHub Actions where relevant, and
posts ONE consolidated report — this is the "keep me posted every day,
one place" the owner asked for, replacing the four separate messages
that used to fire at different times.

Current schedule (all `CRON_TZ=Asia/Kolkata`):
- Blog auto-publish: daily ~12:55 IST → logs to `blog-publish-log.md`
  (new 2026-09-30) and `blog-performance-log.md`.
- SEO keyword optimization: daily ~13:03 IST → logs to
  `seo-keyword-optimization-log.md`.
- Reddit growth: daily ~13:08 IST → logs to `reddit-growth-log.md`.
- Backlink outreach: weekly Mondays ~13:13 IST → logs to
  `backlink-outreach-log.md`.
- **Daily Combined Status Report**: daily ~13:25 IST → reads all of the
  above and posts the one consolidated chat report.
- Instagram posting Routines remain disabled (paused 2026-09-29) — not
  part of this schedule change since they aren't running.

Each routine still has an exception: if something is badly broken (a
tool unreachable, a deploy that won't succeed, etc.) it can still post a
brief chat note directly, rather than letting a real failure sit silent
until the combined report — but routine successful runs log only, they
don't chat.

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

## Blog indexing & performance tracking (set 2026-09-29, standing, per owner instruction)

In addition to publishing, keep tracking whether posts actually get indexed
and how they actually perform, and use real findings to improve future
posts. Full process, baseline, and dated log entries live in
`blog-performance-log.md` — read that file for the method in detail. Summary:

- **Indexing**: `GOOGLE_SEARCH_CONSOLE_INSPECT_URL` per post. Check posts
  published in the last ~14 days until they resolve to "Submitted and
  indexed," plus any post previously flagged stuck. Don't re-check
  long-indexed posts every day — no new signal, wasted quota.
- **Performance**: `GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY`,
  dimension `page` filtered to `/blog/`, ~90-day window, compared against
  the last logged pull for real trend direction.
- **"A/B testing" on a static site**: there's no traffic-splitting
  infrastructure here, so this means comparing real outcomes across
  already-published posts (topic, title pattern, structure, length,
  internal links) and applying what's actually working to new posts —
  never a claim of "this performed better" without a real GSC number
  behind it.
- Anti-fabrication rule applies in full: log real numbers only, including
  when the real number is zero. The 2026-09-29 baseline is honest about
  this — 9 of 16 posts indexed, 3 posts genuinely stuck (one Google
  crawled and declined to index, two still uncrawled after 19-38 days),
  and zero recorded clicks across every blog post so far. See the log
  file for the full baseline and action items.

## Instagram posting paused (set 2026-09-29, standing, per owner instruction)

The owner said to stop creating social media posts. All three daily
Instagram posting Routines (`Kryvex IG Post #1/#2/#3` — morning/afternoon/
evening) are disabled (`enabled: false`), not deleted. **Do not draft,
generate, or publish Instagram content from here on** unless the owner
explicitly re-enables this or asks for a specific post. This was also the
right call independent of the request: image generation had been blocked
all session across every path tried (Gamma unreachable, direct OpenAI
image gen blocked, Canva needs re-auth, Porter `creative.generate` returns
`action_blocked`/`NOT_IN_CATALOG`), so no post had actually been
publishable anyway.

## Daily Reddit growth Routine (set 2026-09-30, standing, no approval gate)

A recurring Routine (`trig_01LgfZynFwWGnByFdwVptLwB`, daily ~16:57 IST,
self-bound to the main working session) grows Kryvex's real Reddit
presence (`u/amankrshuklaa`) toward brand visibility and AI-search
citation (Perplexity/Google AI Overviews cite Reddit heavily; ChatGPT's
Reddit citation share dropped sharply in August 2026 per reporting, so
that's not a channel to rely on). Full strategy, standing rules, target
subreddit list, and the dated activity log live in
`reddit-growth-log.md` at the repo root — read that file for the real
method and history.

Non-negotiable every single day: no spam (no link-only comments, no
posting the same content across multiple subreddits, one account only,
no vote manipulation, no unsolicited promotional DMs), check each
subreddit's own rules before posting in it, read the actual post before
replying so every comment is a real specific answer, no fabricated
results/case studies/client claims, honor any Reddit rate-limit cooldown
rather than retrying through it. The 4-week plan front-loads pure
non-promotional participation (Week 1) before any brand mention appears
at all (Week 3+), because the account started at 1 total karma and a
low-karma account posting links gets auto-filtered as spam by most
subreddits regardless of intent.

Same log-then-commit pattern as the other daily routines: append a dated
entry to `reddit-growth-log.md` with real permalinks and real karma
numbers (never a claim without having actually checked it that run),
commit, push, fast-forward main. Reports status in chat daily —
informational, not a request for approval.

## Weekly backlink/guest-post outreach Routine (set 2026-09-30, standing, no approval gate)

A recurring Routine (`trig_014Z1XWCVXosm6TAVS9f5ZoX`, weekly Mondays
~09:47 IST, self-bound to the main working session) finds real guest-
post/resource-page/"best of" list opportunities and sends proposal
emails via Gmail (`amansukla307@gmail.com`, display name "Kryvex Media"
— switched from Outlook 2026-09-30, per owner instruction) — fully
autonomous, no per-email review, per explicit owner instruction given
after being shown the real risks (CAN-SPAM legal requirements, sender-
reputation risk, and that this is the one channel where a human directly
reads what gets sent, unlike a website edit). Full method, CAN-SPAM requirements,
the real physical address, the permanent opt-out list, and the dated
send history live in `backlink-outreach-log.md` — read that file for
the real method and history.

**Explicitly rejected as a first version of this request: a daily,
volume-driven "create a backlink every day" automation.** That pattern
is what Google's spam policies name directly as a link-manipulation
violation, and it was flagged to the owner before building anything —
this Routine is the legitimate version: weekly, target up to **10 real
opportunities/week** (raised from 2-5 on 2026-09-30, per owner
instruction — reflects Kryvex's real global footprint), real-
opportunity-only, never padded to hit a quota.

Non-negotiable every run: every target must be in Kryvex's real
industry/service scope (SEO, local SEO, PPC, social, Meta ads, content
marketing, email marketing, web design, graphics design, or one of
Kryvex's 9 real industry pages — ecommerce, education, fitness,
healthcare, home services, legal, real estate, restaurants,
tours/travel — off-topic niches are out of scope even if reachable);
**global, not US-only** — Kryvex has real country hub pages for most of
the world, so opportunities are sourced from any real country/region,
scope is about topic fit, not geography; **no paid links, ever** —
Kryvex never pays for a backlink or guest post and never offers payment
in an outreach email, every pitch leads with genuine collaboration and
quality-content-for-quality-placement framing instead of a link request,
and any target that states it charges for placements is disqualified
and skipped; every opportunity is a real, currently-live page found via
WebSearch that run (never invented or reused unverified); every contact
email is a real address actually published on the target site (never a
guessed/pattern-matched address — skip and log if no real contact
exists); every email is CAN-SPAM compliant (accurate sender,
non-deceptive subject, the real physical address `Kryvex Media, Women's
College Road, Madhubani, India` in every footer, clear opt-out
language); the permanent opt-out list in the log is checked before every
send and never violated; no fabricated claims (client counts, case
studies, "as featured in") in any email; every pitch is specific to the
real opportunity found, never generic templated copy blasted to
multiple targets. Same log-then-commit-then-verify pattern as the other
routines, with sends confirmed via the actual tool response before
logging "sent."

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
self-bound to the main working session) optimizes **10 pages/day** (raised
from 2 on 2026-09-28, per owner instruction — same per-page rigor, just more
pages) for target keywords, fully autonomously — same no-approval-gate model
as the blog Routine above. Goal: improve Google ranking and organic traffic
across the whole site, page by page.

Process each run follows:
1. Read `seo-keyword-optimization-log.md`'s priority queue and take the next
   10 not-yet-done pages (extend the queue with the next-highest-value pages
   — top US states, major metro counties, remaining country hubs — once it
   runs out).
1a. **Intent-match check, every page, before picking a keyword.** Read the
    page's actual current title/H1/hero copy first and confirm what it
    genuinely offers. A real gap was caught on 2026-09-28: `/free-audit/`
    was almost targeted with "free marketing audit" when the page is
    actually a Lighthouse website-scan tool — caught by checking real
    content first, retargeted to "free website audit" instead. Do this for
    every page, not just ones that look ambiguous.
2. Real keyword research per page via the direct Semrush MCP
   (`keyword_research` → `get_report_schema` → `execute_report`,
   `phrase_these`-style lookup) for a primary + 2-3 secondary keywords, with
   real volume/CPC/KD numbers. Semrush API units are a real, finite,
   sometimes-zero resource — when exhausted, fall back to WebSearch-informed
   selection, explicitly disclosed as not volume-verified in the log, with
   an action item to revisit once units refresh. The anti-fabrication rule
   applies here without exception: never invent a volume/CPC/KD number.
3. **Mandatory placement checklist — both primary AND secondary keyword,
   H1 required (not "H1 or badge").** This was tightened twice on 2026-09-26
   after two real gaps: a first pass that placed the keyword only in
   `<head>` tags with zero body/H1 matches, then a batch of 8 pages where
   the H1 itself was skipped in favor of just the badge, and secondary
   keywords were only added to 2 of 8 pages. The checklist now:
   - **Primary keyword** goes in ALL of: `<title>`, meta description,
     og:title/description, twitter:title/description, relevant JSON-LD
     description fields, the eyebrow/badge label, **the `<h1>` tag's own
     text** (not just the badge next to it), and the opening paragraph of
     visible body copy.
   - **Secondary keyword**: at least one real secondary keyword naturally
     present somewhere in visible body copy. Keep it out of meta tags —
     stuffing both primary and secondary into a meta description reads as
     spam; body copy is the right place for secondary/semantic keywords.
   - Don't force either keyword into every H2 — one natural fit for the
     primary is enough; stuffing subheadings for a marginal signal gain
     degrades copy quality.
   - After editing, verify EVERY item above with `grep -c -i "<keyword>"
     <file>` — confirm the primary sits inside the actual `<h1>...</h1>`
     text (not just nearby), and the secondary has at least 1 match in
     `<main>`. Never assume placement worked or that a keyword was "already
     present" — check it every time, every page, before logging anything.
4. `seo-keyword-optimization-log.md` is the durable tracking file — priority
   queue + a dated log entry per page (keywords, data source, rationale,
   exact changes, and the grep-verified placement locations/counts) every
   run. Never log a claim ("keyword already present in body", "placement
   verified") without having actually run the check that turn.
5. Same bundling + deploy-verification rules as below: both pages' edits +
   the log update go in **one commit**, one push, then poll GitHub Actions
   for that commit's deploy to reach `conclusion: success` before reporting
   anything live.
6. End-of-day chat report: which 2 pages, which keywords (flagging any
   WebSearch fallback), what changed and where the keyword was placed, live-
   verified URLs.

**Verify-don't-assume rule (added 2026-09-26, same day):** the first live run
below shipped metadata-only optimization — title/meta/OG/Twitter carried the
keyword, but a `grep` afterward found **zero occurrences in visible `<main>`
content** on either page (no H1, no H2, no body match). A logged claim that
secondary keywords for `/services/seo/` were "already naturally present in
the existing page copy" was also checked retroactively and was **wrong** —
they weren't there. Both were fixed same-day: keyword worked into the badge/
H1 and opening paragraph on both pages, verified by `grep` before logging
anything, log entries corrected. This Routine's standing rule from here on:
run the verification command, don't narrate an assumed result — applies to
keyword placement, "already present" claims, and any other checkable fact
in this Routine's output.

First live run (2026-09-26, done manually ahead of the Routine's first
scheduled fire, same-day corrected per above): homepage → `small business
marketing agency` (Semrush-verified, Vol 3,600/mo, KD 22), placed in badge +
H1 + title/meta; `/services/seo/` → `SEO agency for small businesses`
(WebSearch fallback, Semrush units exhausted mid-run — flagged for revisit),
placed in badge + H1 + opening paragraph + title/meta, secondary keywords
`SEO company`/`SEO services` worked into the same paragraph. Both deployed
and verified live (run #164, conclusion: success). Full detail in
`seo-keyword-optimization-log.md`.

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
