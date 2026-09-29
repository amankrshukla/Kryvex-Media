# Kryvex Media — Blog Indexing & Performance Log

Standing process (set 2026-09-29, per owner instruction): track real Google
indexing status and real Search Console performance for every blog post,
analyze trends, and use the findings to improve future posts. Anti-fabrication
rule applies without exception — every number here is a live GSC pull, never
invented. Absence of data (no clicks/impressions) is reported as-is, not
spun positive.

**What "A/B testing" means for a static blog:** this site has no traffic-
splitting infrastructure, so there is no live A/B test of two versions of
the same page. "Testing" here means comparing the real, already-published
posts against each other (topic, title pattern, structure, length, internal
linking) against their real indexing/performance outcomes, and applying
what's actually working to new posts and — where it's a real, non-cosmetic
fix — to existing underperforming ones. Any claim of "this worked better"
must trace to an actual GSC number, not a guess.

## Process (repeat roughly weekly, or when the daily blog Routine fires)

1. **Indexing check** — `GOOGLE_SEARCH_CONSOLE_INSPECT_URL` per post.
   Priority: (a) any post published in the last ~14 days that isn't yet
   "Submitted and indexed", (b) any post previously flagged stuck below.
   Don't re-check posts already confirmed indexed weeks ago every single
   day — that's wasted quota for no new signal.
2. **Performance pull** — `GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY`,
   dimension `page`, filtered to `/blog/`, trailing ~90 days. Compare
   against the last logged pull to see real trend direction (rising/flat/
   falling impressions, clicks, position) per post.
3. **Log** — dated entry below: indexing status changes, performance
   numbers, and any pattern worth acting on.
4. **Apply** — when a real pattern shows up (e.g. a topic/structure that's
   getting indexed fast vs. one that isn't, a title pattern that's pulling
   impressions vs. one that isn't), fold it into how the next post is
   written, and note the change and its rationale in the log.

## Baseline — 2026-09-29

### Indexing status (all 16 published posts, checked live via URL Inspection)

**Indexed ("Submitted and indexed"): 9 of 16**
- `10-local-seo-tactics-that-fill-your-calendar` — last crawled 2026-09-25
- `content-that-ranks-a-starter-framework` — last crawled 2026-09-10
- `email-flows-every-business-needs` — last crawled 2026-08-19
- `how-to-choose-an-seo-company-in-patna` — last crawled 2026-09-21
- `how-to-cut-wasted-ad-spend-in-30-days` — last crawled 2026-08-20
- `seo-company-hiring-guide` — last crawled 2026-09-21
- `small-business-guide-to-meta-ads` — last crawled 2026-08-19
- `website-mistakes-costing-you-customers` — last crawled 2026-09-26
- `what-is-digital-marketing` — last crawled 2026-09-22

**Too new to expect indexing yet (published within the last 3 days): 4**
- `google-ads-for-small-businesses` — published today (2026-09-29)
- `graphic-design-for-small-businesses` — published yesterday (2026-09-28)
- `social-media-marketing-for-small-businesses` — published 2026-09-27
- `google-business-profile-optimization-guide` — published 2026-09-26

**Genuinely stuck — real action items, not expected behavior:**
- ⚠️ `local-seo-vs-national-seo` (published 2026-09-10, 19 days ago) —
  **"Crawled - currently not indexed."** Google has fetched the page and
  chosen not to index it. This is a real quality/uniqueness signal, not a
  discovery delay — worth a content review (check for thin/overlapping
  content vs. `10-local-seo-tactics-that-fill-your-calendar`, which covers
  adjacent ground and IS indexed).
- ⚠️ `signs-seo-agency-not-working` (published 2026-09-10, 19 days ago) —
  **"Discovered - currently not indexed."** Google knows the URL exists
  (via sitemap) but still hasn't crawled it after 19 days.
- ⚠️ `website-designing-services-in-madhubani-bihar` (published 2026-08-22,
  **38 days ago**) — **"Discovered - currently not indexed."** Longest-
  stuck post on the site; still hasn't been crawled over a month later.

### Performance (90-day pull, `sc-domain:kryvexmedia.com`, pages containing `/blog/`)

Only 8 of 16 posts have ANY recorded impressions in the last 90 days.
**Zero clicks across every blog post, with no exception.** This is the real,
current state — reported as-is, not spun:

| Page | Impressions | Avg. position | Clicks |
|---|---|---|---|
| `how-to-cut-wasted-ad-spend-in-30-days` | 33 | 66.5 | 0 |
| `what-is-digital-marketing` | 4 | 3.0 | 0 |
| `email-flows-every-business-needs` | 4 | 20.5 | 0 |
| `10-local-seo-tactics-that-fill-your-calendar` | 2 | 1.0 | 0 |
| `how-to-choose-an-seo-company-in-patna` | 2 | 1.0 | 0 |
| `seo-company-hiring-guide` | 2 | 1.0 | 0 |
| `website-mistakes-costing-you-customers` | 1 | 14.0 | 0 |
| (8 posts: no impressions recorded at all in 90 days) | 0 | — | 0 |

**Reading this honestly:** the handful of "position 1.0" rows are 1-2
impressions each — almost certainly branded or exact-title queries, not a
real ranking signal yet. `how-to-cut-wasted-ad-spend-in-30-days` is the one
post with meaningful impression volume (33) but ranks at position ~66.5,
too low for clicks. The blog is not yet driving measurable organic traffic;
that's the real baseline this log will track movement against.

### Action items from this baseline
1. Review `local-seo-vs-national-seo` for content overlap/thinness — it's
   the only post Google crawled AND declined to index.
2. Nothing to "fix" on `signs-seo-agency-not-working` or
   `website-designing-services-in-madhubani-bihar` directly — they simply
   haven't been crawled. Re-check both next run; if
   `website-designing-services-in-madhubani-bihar` is still uncrawled past
   60 days, treat that as a stronger signal (e.g. internal-linking gap) and
   look at how many real inbound links each post has from elsewhere on
   the site.
3. `how-to-cut-wasted-ad-spend-in-30-days` is the one post with real
   impression volume — investigate why it sits at position ~66 (title/H1/
   meta match to the actual queries it's getting impressions for) as a
   template for what NOT to repeat.
4. Re-pull performance in ~1-2 weeks once more posts clear the "too new"
   window, to get a real trend instead of a single snapshot.
