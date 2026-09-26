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
