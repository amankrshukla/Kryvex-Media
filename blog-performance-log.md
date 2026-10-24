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

## 2026-09-29 (same day, second entry) — fixed all 11 thin posts

Per owner instruction ("make sure all blog should index in a proper way,
don't write any piece of content that Google de-indexed"): the baseline
above found 11 of 16 blog posts under the site's own 1,500-word content
standard, several drastically so — almost certainly the real cause of
`local-seo-vs-national-seo` being crawled and declined for indexing.
Fixed all 11 today with genuine expansion (new H2 sections, real cited
sources, FAQ sections with FAQPage JSON-LD where missing), not padding.
Work was split across direct edits and 4 background agents (each result
independently re-verified against the file itself — word count, HTML tag
balance, JSON-LD validity — never taken on the agent's self-report alone).

| Post | Before | After |
|---|---|---|
| `local-seo-vs-national-seo` | 1,064 | 1,558 |
| `website-mistakes-costing-you-customers` | 465 | 1,514 |
| `seo-company-hiring-guide` | 1,351 | 1,968 |
| `what-is-digital-marketing` | 1,401 | 2,004 |
| `how-to-choose-an-seo-company-in-patna` | 1,263 | 1,678 |
| `signs-seo-agency-not-working` | 1,267 | 1,627 |
| `website-designing-services-in-madhubani-bihar` | 1,091 | 1,672 |
| `how-to-cut-wasted-ad-spend-in-30-days` | 544 | 1,970 |
| `small-business-guide-to-meta-ads` | 502 | 1,663 |
| `content-that-ranks-a-starter-framework` | 520 | 1,616 |
| `email-flows-every-business-needs` | 511 | 1,606 |

All real sources cited inline (WordStream, Meta's own ad documentation,
Flurry Analytics, Google Search Central, Backlinko, HubSpot, Litmus,
Omnisend, Google's mobile-speed research, ANA/4As tenure study, Google
Ads Help docs) — no invented statistics. Two agents explicitly reported
dropping candidate numbers where sources conflicted or couldn't be
traced to a primary source, per the anti-fabrication rule, and wrote
real practical/strategic content instead rather than guessing.

Deployed across 4 commits (run numbers 179-183; 180-182 show
`conclusion: cancelled` in GitHub Actions from the rapid-fire pushes
mid-batch — expected and harmless, since run #183 was built from the
final combined state of all 11 files and reached `conclusion: success`).
Sitemap resubmitted to GSC after the final push, confirmed:
"Sitemap 'https://kryvexmedia.com/sitemap.xml' successfully submitted
for site 'sc-domain:kryvexmedia.com'".

**What this does and doesn't fix immediately:** the content-thinness
cause is now fixed and live. Actual re-indexing is Google's decision on
Google's timeline — sitemap resubmission prompts a recrawl, it doesn't
guarantee immediate index inclusion. The next indexing-check pass
(per the standing process above) should re-inspect all 3 previously
"stuck" URLs plus spot-check a couple of the newly-expanded ones to see
whether the fix actually moved the needle, and log the real result
either way.

## 2026-09-30 — first re-check after the thin-content fix

Published today: `how-to-choose-a-web-design-company` (1,565 words).

**Indexing re-check (live URL Inspection):**
- The 3 previously-stuck posts are **unchanged** — `local-seo-vs-national-seo`
  still shows "Crawled - currently not indexed" with the same
  `lastCrawlTime` (2026-09-17) as the original baseline, meaning Google
  has not yet recrawled it since Monday's expansion. `signs-seo-agency-
  not-working` and `website-designing-services-in-madhubani-bihar` are
  both still "Discovered - currently not indexed." This is expected, not
  a failure: recrawl on Google's own schedule typically takes longer
  than 1-2 days, and no re-crawl means no new signal yet either way.
- 5 posts published in the last ~14 days (`google-ads-for-small-
  businesses`, `graphic-design-for-small-businesses`, `social-media-
  marketing-for-small-businesses`, `google-business-profile-optimization-
  guide`, `how-to-choose-a-web-design-company`) all still show "URL is
  unknown to Google" — also expected at this age.

**Performance re-pull (90-day window, page dimension, `/blog/`):**
Numbers are **identical** to the 2026-09-29 baseline pull, same 8 pages
with impressions, same impression counts, same positions, still zero
clicks everywhere. No real movement to report — genuinely too early
(1 day) for the content fixes to show up in either indexing or
performance data. Re-checking daily is still correct per the standing
process, but the next entry likely to show real movement is probably
several days out, once Google's next crawl pass actually reaches the
fixed URLs.

**Action item:** keep the 3 stuck URLs and the 5 new URLs on the daily
check list until they resolve one way or the other; no new action
needed today beyond today's publish.

## 2026-10-01 — second re-check

Published today: `google-ads-vs-meta-ads-small-business` (1,743 words).

**Indexing re-check (live URL Inspection):**
- `local-seo-vs-national-seo`: still **"Crawled - currently not
  indexed,"** `lastCrawlTime` still 2026-09-17 — unchanged since the
  thin-content fix, meaning Google has not yet recrawled this URL at
  all. No new signal either way.
- `signs-seo-agency-not-working`: still **"Discovered - currently not
  indexed."** Unchanged.
- `website-designing-services-in-madhubani-bihar`: now shows **"URL is
  unknown to Google"** — this is a change from the 2026-09-30 entry,
  which logged it as "Discovered - currently not indexed." Flagging
  this honestly rather than smoothing over it: this isn't an
  improvement, it reads as GSC's discovery record for this URL
  resetting or lapsing, not progress toward indexing. Keeping it on
  the watch list; if this state persists, it may need a fresh sitemap
  ping specifically for this URL or a manual indexing request.
- `google-ads-for-small-businesses` and `how-to-choose-a-web-design-
  company`: both still **"URL is unknown to Google"** — expected at
  their age (2 and 1 days old respectively).

**Performance re-pull (90-day window, page dimension, `/blog/`):**
8 pages now show impressions (vs. the same count in prior pulls), still
**zero clicks on every single one.** Real numbers this pull:
`how-to-cut-wasted-ad-spend-in-30-days` 33 impressions (position
~66.5, i.e. page 7+ of results — too low to expect clicks), `email-
flows-every-business-needs` 4 impressions (position 20.5), `what-is-
digital-marketing` 4 impressions (position 3 — worth watching, a top-3
position with zero clicks so far may just mean low query volume
rather than a problem), `/blog/` index 1, `10-local-seo-tactics-that-
fill-your-calendar` 2, `how-to-choose-an-seo-company-in-patna` 2,
`seo-company-hiring-guide` 2, `website-mistakes-costing-you-customers`
1. No fabricated trend claimed — real movement (if any) between this
pull and the 2026-09-30 baseline isn't something this entry can assert
precisely without the exact prior numbers side by side; stating today's
real pull plainly instead.

**Action item:** the `website-designing-services-in-madhubani-bihar`
discovery-state regression is the one real anomaly worth tracking
specifically — re-check it on the next pass and consider a direct
indexing request if it's still "unknown to Google" then.

## 2026-10-17 — first check after a 16-day session gap

**Note: this session was idle from 2026-10-01 to 2026-10-17.** No daily
checks ran during that gap — this entry is the first real check since
2026-10-01, not a daily cadence resumed without a break.

Published today: `what-a-free-website-audit-checks` (1,706 words).

**Indexing re-check (live URL Inspection, scoped to the previously
flagged/stuck URLs plus the most recent prior post, not every post —
per the standing "don't re-check confirmed-indexed posts daily" rule):**
- `local-seo-vs-national-seo`: still **"Crawled - currently not
  indexed,"** `lastCrawlTime` still 2026-09-17 — unchanged across the
  entire gap. Google has not recrawled this URL in exactly 30 days now.
- `signs-seo-agency-not-working`: still **"Discovered - currently not
  indexed."** Unchanged.
- `website-designing-services-in-madhubani-bihar`: still **"URL is
  unknown to Google"** — same state as the 2026-10-01 entry, persisting
  through the gap. This is now a real, longer-running anomaly (first
  flagged 2026-10-01), not a one-off blip — worth a manual indexing
  request or an internal-linking review next time this is touched.
- `google-ads-vs-meta-ads-small-business` (published 2026-10-01, now 16
  days old): **"URL is unknown to Google."** This is a new, real
  concern worth flagging honestly: at 16 days old this post should
  reasonably have moved past "unknown to Google" by now, unlike the
  2-3 day-old posts in earlier entries where that status was expected.
  Possible causes worth checking next pass: internal linking into this
  specific post, and whether the sitemap submission after its original
  publish actually registered it.

**Performance re-pull (90-day window, page dimension, `/blog/`,
2026-07-19 to 2026-10-14):** Real numbers this pull: `how-to-cut-wasted-
ad-spend-in-30-days` 33 impressions (position ~66.5, unchanged from
2026-10-01), `email-flows-every-business-needs` 4 impressions (position
20.5, unchanged), `what-is-digital-marketing` 4 impressions (position
3, unchanged), `seo-company-hiring-guide` 3 impressions (up from 2 on
2026-10-01 — a real but tiny movement, not a trend), `/blog/` index 2
(up from 1), `10-local-seo-tactics-that-fill-your-calendar` 2,
`how-to-choose-an-seo-company-in-patna` 2, `website-mistakes-costing-
you-customers` 1. **Zero clicks on every single post, still, with no
exception** — 16 days of additional time produced no real click
activity. Reporting this plainly rather than reading noise as a trend.

**Action items:** `website-designing-services-in-madhubani-bihar` and
now `google-ads-vs-meta-ads-small-business` are the two real anomalies
to prioritize next time blog work resumes — both stuck in "URL is
unknown to Google" well past the age where that's expected. The 3-week
gap with zero click movement across the board is itself a real signal:
the blog is not yet generating organic clicks at any post's current
age/position, consistent with every prior pull.

## 2026-10-18 — daily blog Routine run

Published today: `youtube-management-for-small-businesses` (1,937
words). Topic fallback again (GSC query data still almost entirely
hyper-local city queries) — real gap filled instead: no YouTube-related
post existed, and yesterday's new `/services/youtube-management/` page
had no supporting content linking to it. Also fixed, while updating the
blog index: `what-a-free-website-audit-checks` (2026-10-17) was in
sitemap-resources.xml but had never been added to the blog index grid
— no on-site discovery path for it until today.

**Indexing re-check (live URL Inspection, scoped to the two previously
flagged anomalies plus the most recent prior post, per the standing
rule):**
- `what-a-free-website-audit-checks` (1 day old): **"URL is unknown to
  Google."** Expected at this age — not a concern yet.
- `local-seo-vs-national-seo`: still **"Crawled - currently not
  indexed,"** `lastCrawlTime` still 2026-09-17 — unchanged.
- `signs-seo-agency-not-working`: still **"Discovered - currently not
  indexed."** Unchanged.
- `website-designing-services-in-madhubani-bihar`: **real movement** —
  now **"Discovered - currently not indexed"** (sitemap-listed), up
  from "URL is unknown to Google" on every check since 2026-10-01.
  First forward progress on this anomaly since it was first flagged.
- `google-ads-vs-meta-ads-small-business`: **real movement** — now
  also **"Discovered - currently not indexed,"** up from "URL is
  unknown to Google" on 2026-10-17. Same genuine progress.

**Performance re-pull (90-day window, page dimension, `/blog/`,
2026-07-20 to 2026-10-15):** `how-to-cut-wasted-ad-spend-in-30-days` 33
impressions (position ~66.5, unchanged), `email-flows-every-business-
needs` 4 (position 20.5, unchanged), `what-is-digital-marketing` 4
(position 3, unchanged), `seo-company-hiring-guide` 3 (unchanged from
the prior pull), `/blog/` index 2 (unchanged), `10-local-seo-tactics-
that-fill-your-calendar` 2, `how-to-choose-an-seo-company-in-patna` 2,
`website-mistakes-costing-you-customers` 1 — all unchanged from
2026-10-17. **Zero clicks on every post, still, with no exception.**
No new trend to report beyond the indexing-state movement above.

**Action items:** the two previously-stuck posts both moved forward a
stage (unknown → discovered) — worth a follow-up check in a few days to
see if either reaches "indexed." Zero-click pattern continues unchanged;
nothing new to act on there beyond what's already logged.

## 2026-10-19 — daily blog Routine run

Published today: `digital-marketing-for-home-services-businesses`
(2,148 words).

**Indexing re-check (live URL Inspection, scoped to the two most recent
prior posts plus the long-standing flagged-stuck URLs, per the standing
rule):**
- `youtube-management-for-small-businesses` (1 day old): **"URL is
  unknown to Google."** Expected at this age.
- `what-a-free-website-audit-checks` (2 days old): **"URL is unknown
  to Google."** Still expected at this age.
- `google-ads-vs-meta-ads-small-business`: **real regression** — back
  to **"URL is unknown to Google,"** down from "Discovered - currently
  not indexed" logged on 2026-10-18. Flagging this honestly rather than
  smoothing over it: this is a real step backward in GSC's own
  discovery record for this URL, not progress. This is the same
  pattern already seen once before with
  `website-designing-services-in-madhubani-bihar` (2026-10-01 entry) —
  GSC's discovery state for a URL can apparently lapse or reset rather
  than moving monotonically forward.
- `website-designing-services-in-madhubani-bihar`: still **"Discovered
  - currently not indexed."** Unchanged from 2026-10-18 — no further
  regression this time.
- `local-seo-vs-national-seo`: still **"Crawled - currently not
  indexed,"** `lastCrawlTime` still 2026-09-17 — now unchanged for
  over a month (32 days) without any recrawl.
- `signs-seo-agency-not-working`: still **"Discovered - currently not
  indexed."** Unchanged.

**Performance re-pull (90-day window, page dimension, `/blog/`,
2026-07-21 to 2026-10-18):** `how-to-cut-wasted-ad-spend-in-30-days` 33
impressions (position ~66.5, unchanged), `email-flows-every-business-
needs` 4 (position 20.5, unchanged), `what-is-digital-marketing` 4
(position 3, unchanged), `seo-company-hiring-guide` 3 (unchanged from
2026-10-18), `/blog/` index 2 (unchanged), `10-local-seo-tactics-that-
fill-your-calendar` 2, `how-to-choose-an-seo-company-in-patna` 2,
`website-mistakes-costing-you-customers` 1 — every number identical to
the 2026-10-18 pull. **Zero clicks on every post, still, with no
exception.** No new trend to report; the only real movement this
period is the indexing-state regression noted above.

**Action items:** keep watching `google-ads-vs-meta-ads-small-business`
specifically — if it oscillates between "unknown" and "discovered"
again on the next check, that's a real pattern (not noise) worth
treating as a signal in itself (e.g. internal-linking strength to that
specific URL) rather than just re-logging it each time. Everything
else is unchanged; the zero-click baseline across the whole blog
continues with no exception after 3 weeks of additional data.

## 2026-10-20 — daily blog Routine run

Published today: `digital-marketing-for-restaurants` (2,051 words).

**Indexing re-check (live URL Inspection, scoped to the two most recent
prior posts plus the long-standing flagged-stuck URLs, per the standing
rule — too new for the brand-new restaurants post to have a signal
yet, so it wasn't checked this run):**
- `digital-marketing-for-home-services-businesses` (1 day old):
  **"Discovered - currently not indexed."** Real forward movement —
  faster than the "URL is unknown to Google" this site's posts
  typically show at 1 day old.
- `youtube-management-for-small-businesses` (2 days old): **"URL is
  unknown to Google."** Expected at this age.
- `what-a-free-website-audit-checks` (3 days old): **"URL is unknown
  to Google."** Unchanged from 2026-10-19.
- `google-ads-vs-meta-ads-small-business`: **"Discovered - currently
  not indexed."** Real forward movement from the "URL is unknown to
  Google" regression logged 2026-10-19 — this specific URL has now
  oscillated unknown → discovered → unknown → discovered across the
  last several checks, so the oscillation itself (not just this one
  data point) is the real signal worth tracking, as flagged
  2026-10-19.
- `website-designing-services-in-madhubani-bihar`: still **"Discovered
  - currently not indexed."** Unchanged.
- `local-seo-vs-national-seo`: still **"Crawled - currently not
  indexed,"** `lastCrawlTime` still 2026-09-17 — now unchanged for 33
  days without any recrawl.
- `signs-seo-agency-not-working`: still **"Discovered - currently not
  indexed."** Unchanged.

**Performance re-pull (90-day window, page dimension, `/blog/`,
2026-07-22 to 2026-10-20):** `how-to-cut-wasted-ad-spend-in-30-days` 33
impressions (position ~66.5, unchanged), `email-flows-every-business-
needs` 4 (position 20.5, unchanged), `what-is-digital-marketing` 4
(position 3, unchanged), `seo-company-hiring-guide` 3 (position 1,
unchanged from 2026-10-19), `/blog/` index 2 (position 4, unchanged),
`10-local-seo-tactics-that-fill-your-calendar` 2 (position 1),
`how-to-choose-an-seo-company-in-patna` 2 (position 1),
`website-mistakes-costing-you-customers` 1 (position 14) — every
number identical to the 2026-10-19 pull, down to the position values
now visible in this pull's raw rows. **Zero clicks on every post,
still, with no exception.** None of the three most recent posts
(home-services, youtube-management, restaurants) show any impressions
yet, consistent with their not-yet-indexed status above.

**Action items:** `google-ads-vs-meta-ads-small-business`'s unknown/
discovered oscillation has now repeated enough times to treat as a
real pattern rather than noise — worth investigating whether it
correlates with internal-linking strength or crawl-budget allocation
rather than just re-logging it each check. Everything else is
unchanged; the zero-click baseline across the whole blog continues
with no exception after roughly a month of data.

## 2026-10-21 — daily blog Routine run

Published today: `ecommerce-marketing-that-actually-converts` (2,129
words). Too new for a URL Inspection signal yet, so not checked this
run, consistent with the standing pattern for brand-new posts.

**Indexing re-check (live URL Inspection, scoped to posts published in
the last ~14 days plus the long-standing flagged-stuck URLs):**
- `digital-marketing-for-restaurants` (1 day old): **"URL is unknown
  to Google."** Expected at this age, same pattern every post shows at
  day 1.
- `digital-marketing-for-home-services-businesses` (2 days old):
  **"Discovered - currently not indexed."** Unchanged from 2026-10-20.
- `youtube-management-for-small-businesses` (3 days old):
  **"Discovered - currently not indexed."** Real forward movement from
  "URL is unknown to Google" logged 2026-10-20.
- `what-a-free-website-audit-checks` (4 days old): **"Discovered -
  currently not indexed."** Real forward movement from "URL is unknown
  to Google" logged 2026-10-20.
- `google-ads-vs-meta-ads-small-business`: **"Discovered - currently
  not indexed."** Same as 2026-10-20 — no further oscillation this
  check, consistent with the prior reading rather than flipping again.
- `website-designing-services-in-madhubani-bihar`: still **"Discovered
  - currently not indexed."** Unchanged.
- `local-seo-vs-national-seo`: still **"Crawled - currently not
  indexed,"** `lastCrawlTime` still 2026-09-17T19:03:49Z — now
  unchanged for 34 days without any recrawl.
- `signs-seo-agency-not-working`: still **"Discovered - currently not
  indexed."** Unchanged.

**Performance re-pull (90-day window, page dimension, `/blog/`,
2026-07-23 to 2026-10-19):** `how-to-cut-wasted-ad-spend-in-30-days` 33
impressions (position ~66.5, unchanged), `email-flows-every-business-
needs` 4 (position 20.5, unchanged), `what-is-digital-marketing` 4
(position 3, unchanged), `seo-company-hiring-guide` 3 (position 1,
unchanged), `/blog/` index 2 (position 4, unchanged),
`10-local-seo-tactics-that-fill-your-calendar` 2 (position 1),
`how-to-choose-an-seo-company-in-patna` 2 (position 1),
`website-mistakes-costing-you-customers` 1 (position 14) — every
number identical to the 2026-10-20 pull. **Zero clicks on every post,
still, with no exception.** None of the four most recent posts
(home-services, youtube-management, what-a-free-website-audit-checks,
restaurants) show any impressions yet, consistent with their
not-yet-fully-indexed status above.

**Action items:** Two more previously-stuck posts
(`youtube-management-for-small-businesses`,
`what-a-free-website-audit-checks`) moved forward a stage this run
(unknown → discovered) — same pattern already seen with earlier posts,
so this looks like the site's normal discovery timeline (roughly
2-4 days to "Discovered") rather than anything unusual. The
`google-ads-vs-meta-ads-small-business` oscillation didn't repeat this
check (stayed at "discovered" rather than flipping back), so it may be
settling rather than being a persistent instability — worth one more
check before concluding either way. Zero-click baseline across the
whole blog continues unchanged after roughly five weeks of data.

## 2026-10-22 — daily blog Routine run

Published today: `digital-marketing-for-real-estate-agents` (2,375
words). Too new for a URL Inspection signal yet, so not checked this
run, consistent with the standing pattern for brand-new posts.

**Indexing re-check (live URL Inspection, scoped to posts published in
the last ~14 days plus the long-standing flagged-stuck URLs) — a real,
notable finding this run, reported honestly rather than smoothed over:**
several posts that had previously advanced to "Discovered - currently
not indexed" read back as **"URL is unknown to Google"** today —
`digital-marketing-for-restaurants` (2 days old, was already "unknown"
at day 1, so no change there), `youtube-management-for-small-businesses`
(was "Discovered" as of 2026-10-21), `what-a-free-website-audit-checks`
(was "Discovered" as of 2026-10-21), `ecommerce-marketing-that-actually-
converts` (1 day old — expected "unknown" at this age), and
`signs-seo-agency-not-working` (was "Discovered" and stable since the
2026-09-29 baseline — this one is the real anomaly, a long-stable
status reading backward). Two posts did NOT regress:
`digital-marketing-for-home-services-businesses` still reads
"Discovered - currently not indexed" (unchanged), and
`website-designing-services-in-madhubani-bihar` still reads "Discovered
- currently not indexed" (unchanged). `local-seo-vs-national-seo` is
unchanged at "Crawled - currently not indexed," `lastCrawlTime` still
2026-09-17T19:03:49Z — now 35 days without a recrawl.
This reads more like a real inconsistency/lag in the URL Inspection
API's own reporting than an actual drop from Google's index — Google's
own documentation notes Inspection data can lag and isn't always fully
in sync with live index state, and nothing else changed site-side that
would explain `signs-seo-agency-not-working` reverting after being
stable for three weeks. Logged as a genuine, unresolved finding per
the verify-don't-assume rule, not spun as either "a real regression" or
"nothing to worry about" — action item: re-check
`signs-seo-agency-not-working`,
`youtube-management-for-small-businesses` and
`what-a-free-website-audit-checks` again in a few days; if they're
still reading "unknown" at that point, it's a real regression worth
investigating further (e.g. against the 2026-10-20 noindex-tag
removal/sitemap resubmission activity on an unrelated page tier); if
they're back to "Discovered," this was API-reporting noise.

**Performance re-pull (90-day window, page dimension, `/blog/`,
2026-07-24 to 2026-10-20):** `how-to-cut-wasted-ad-spend-in-30-days` 33
impressions (position ~66.5, unchanged), `email-flows-every-business-
needs` 4 (position 20.5, unchanged), `what-is-digital-marketing` 4
(position 3, unchanged), `seo-company-hiring-guide` 3 (position 1,
unchanged), `/blog/` index 2 (position 4, unchanged),
`10-local-seo-tactics-that-fill-your-calendar` 2 (position 1,
unchanged), `how-to-choose-an-seo-company-in-patna` 2 (position 1,
unchanged), `website-mistakes-costing-you-customers` 1 (position 14,
unchanged) — every number identical to the 2026-10-21 pull, no change
in either direction. **Zero clicks on every post, still, with no
exception**, now roughly six weeks of flat zero-click data across the
whole blog. None of the four most recent posts (ecommerce, restaurants,
home-services, real-estate) show any impressions yet.

**Action items:** the indexing-status reversals above are the real
story this run — flagged for a focused re-check rather than assumed
away. Zero-click baseline continues unchanged; no new pattern to act on
for post structure/topic/length this run since nothing in the real
numbers moved.

## 2026-10-23 — daily blog Routine run

Published today: `digital-marketing-for-healthcare-providers` (2,184
words). Too new for a URL Inspection signal yet, so not checked this
run, consistent with the standing pattern for brand-new posts.

**Indexing re-check — follow-up on yesterday's flagged regression,
real finding this run: it was API-reporting lag, not a real drop.**
Per the 2026-10-22 action item, re-checked the three posts that had
reverted from "Discovered - currently not indexed" to "URL is unknown
to Google" on 2026-10-22: `signs-seo-agency-not-working`,
`youtube-management-for-small-businesses`, and
`what-a-free-website-audit-checks`. All three read back as
**"Discovered - currently not indexed" today** — i.e. all three
recovered to where they were before yesterday's dip. That supports the
2026-10-22 hypothesis (Google's own documentation that URL Inspection
data can lag live index state) over a real regression, and closes out
that action item as resolved: it was a reporting-lag blip, not an
actual drop. Also checked `digital-marketing-for-home-services-
businesses` (unchanged, still "Discovered - currently not indexed") and
three newer posts still too recent to have moved past "URL is unknown
to Google": `digital-marketing-for-restaurants` (3 days old),
`ecommerce-marketing-that-actually-converts` (2 days old), and
`digital-marketing-for-real-estate-agents` (1 day old) — all three
consistent with the normal several-day discovery timeline already
established for this site, not a new concern.

**Performance re-pull (90-day window, page dimension, `/blog/`,
2026-07-25 to 2026-10-21):** `how-to-cut-wasted-ad-spend-in-30-days` 33
impressions (position ~66.5, unchanged), `email-flows-every-business-
needs` 4 (position 20.5, unchanged), `what-is-digital-marketing` 4
(position 3, unchanged), `seo-company-hiring-guide` 3 (position 1,
unchanged), `/blog/` index 2 (position 4, unchanged),
`10-local-seo-tactics-that-fill-your-calendar` 2 (position 1,
unchanged), `how-to-choose-an-seo-company-in-patna` 2 (position 1,
unchanged), `website-mistakes-costing-you-customers` 1 (position 14,
unchanged) — every number identical to the 2026-10-22 pull, no change
in either direction. **Zero clicks on every post, still, with no
exception**, now roughly seven weeks of flat zero-click data across
the whole blog. None of the five most recent posts (ecommerce,
restaurants, home-services, real-estate, healthcare) show any
impressions yet.

**Action items:** none outstanding — yesterday's flagged regression is
resolved (reporting lag, recovered on its own). Zero-click baseline
continues unchanged; no new pattern to act on for post structure/topic/
length this run since nothing in the real numbers moved.

## 2026-10-24 — daily blog Routine run

Published today: `digital-marketing-for-law-firms` (2,620 words). Too
new (0 days old) for a URL Inspection signal yet, so not checked this
run, consistent with the standing pattern for brand-new posts.

**Indexing check (posts published in the last ~14 days plus the
long-standing flagged-stuck URL):**
- `digital-marketing-for-healthcare-providers` (1 day old): **"URL is
  unknown to Google."** Expected at this age.
- `digital-marketing-for-real-estate-agents` (2 days old): **"URL is
  unknown to Google."** Expected at this age.
- `ecommerce-marketing-that-actually-converts` (3 days old): **"URL is
  unknown to Google."** Real finding worth flagging — in the pattern
  established by `digital-marketing-for-home-services-businesses`
  (reached "Discovered - currently not indexed" within a few days),
  this is running a touch slower than that baseline, though still
  within the range already seen on other posts (e.g.
  `what-a-free-website-audit-checks` took longer than 3 days in an
  earlier check).
- `digital-marketing-for-restaurants` (4 days old): **"URL is unknown
  to Google,"** unchanged from yesterday's check at 3 days old. This
  is the real anomaly this run — 4 days with no movement off "unknown"
  is slower than `digital-marketing-for-home-services-businesses`
  (reached "Discovered" by a comparable age) and slower than this
  post's own age would suggest given other recent posts' pace.
  Flagging for a follow-up check rather than assuming it's fine or
  assuming it's broken.
- `digital-marketing-for-home-services-businesses` (5 days old):
  **"Discovered - currently not indexed."** Unchanged — consistent,
  expected progress for this age.
- `local-seo-vs-national-seo` (long-standing flagged-stuck post):
  **"Crawled - currently not indexed,"** `lastCrawlTime` still
  `2026-09-17T19:03:49Z` — now 37 days without a recrawl. Unchanged.

**Performance re-pull (90-day window, page dimension, `/blog/`,
2026-07-26 to 2026-10-22):** `how-to-cut-wasted-ad-spend-in-30-days` 33
impressions (position ~66.5, unchanged), `email-flows-every-business-
needs` 4 (position 20.5, unchanged), `what-is-digital-marketing` 4
(position 3, unchanged), `seo-company-hiring-guide` 3 (position 1,
unchanged), `10-local-seo-tactics-that-fill-your-calendar` 2 (position
1, unchanged), `how-to-choose-an-seo-company-in-patna` 2 (position 1,
unchanged), `website-mistakes-costing-you-customers` 1 (position 14,
unchanged) — all unchanged from the 2026-10-23 pull. One real,
small movement: the `/blog/` index itself went from 2 impressions
(position 4) to **3 impressions (position 5.67)** — a genuine change,
reported as-is; too small a sample to call a trend. **Zero clicks on
every post, still, with no exception**, now roughly seven weeks of
flat zero-click data across the whole blog. None of the five most
recent posts (ecommerce, restaurants, home-services, real-estate,
healthcare) show any impressions yet; the new law-firms post is too
new to appear.

**Action items:** re-check `digital-marketing-for-restaurants` (the
real anomaly this run — 4 days with no indexing movement) and
`ecommerce-marketing-that-actually-converts` again in the next check;
if restaurants is still "unknown" past ~6-7 days with home-services
and others having moved on by then, treat it as a real, worth-
investigating delay rather than normal variance. `/blog/` index's
small impressions uptick (2→3) is noted but not yet a trend — watch
next pull. `local-seo-vs-national-seo` remains genuinely stuck at 37
days uncrawled, no new information this run.
