# Kryvex Media — Daily Keyword Optimization Log

Tracks the daily on-page SEO optimization Routine (10 pages/day, raised
from 2 on 2026-09-28). Real keyword data only — Semrush when available,
WebSearch-informed fallback when Semrush API units are exhausted (marked
below). Never invent search volume, difficulty, or CPC numbers. Every page
gets an intent-match check against its real content before a keyword is
picked (see the 2026-09-28 entry below for why this matters).

## Priority queue (order to work through)

1. ~~Homepage (`/`)~~ — done 2026-09-26
2. ~~`/services/seo/`~~ — done 2026-09-26
3. ~~`/services/local-seo/`~~ — done 2026-09-26
4. ~~`/services/ppc/`~~ — done 2026-09-26
5. ~~`/services/social-media/`~~ — done 2026-09-26
6. ~~`/services/meta-ads/`~~ — done 2026-09-26
7. ~~`/services/content-marketing/`~~ — done 2026-09-26
8. ~~`/services/email-marketing/`~~ — done 2026-09-26
9. ~~`/services/web-design/`~~ — done 2026-09-26
10. ~~`/services/graphics-design/`~~ — done 2026-09-26
11. ~~`/about/`~~ — done 2026-09-27
12. ~~`/contact/`~~ — done 2026-09-27
13. ~~`/free-audit/`~~ — done 2026-09-28
14. ~~`/usa/`~~ — done 2026-09-28 (country hub)
15. ~~`/uk/`~~ — done 2026-09-28 (country hub)
16. ~~`/india/performance-marketing-agency/`~~ — done 2026-09-28 (country hub)
17. ~~`/industries/ecommerce/`~~ — done 2026-09-27 (out of order, per owner request)
18. ~~`/industries/healthcare/`~~ — done 2026-09-27 (out of order, per owner request)
19. ~~`/industries/real-estate/`~~ — done 2026-09-28
20. ~~`/industries/restaurants/`~~ — done 2026-09-28
21. ~~`/industries/legal/`~~ — done 2026-09-28
22. ~~`/industries/home-services/`~~ — done 2026-09-28
23. ~~`/industries/education/`~~ — done 2026-09-28
24. ~~`/industries/fitness/`~~ — done 2026-09-28
25. ~~`/industries/tours-travel/`~~ — done 2026-09-29
26. ~~`/california/`~~ — done 2026-09-29 (US state hub)
27. ~~`/texas/`~~ — done 2026-09-29 (US state hub)
28. ~~`/florida/`~~ — done 2026-09-29 (US state hub)
29. ~~`/new-york/`~~ — done 2026-09-29 (US state hub)
30. ~~`/pennsylvania/`~~ — done 2026-09-29 (US state hub)
31. ~~`/illinois/`~~ — done 2026-09-29 (US state hub)
32. ~~`/ohio/`~~ — done 2026-09-29 (US state hub)
33. ~~`/georgia/`~~ — done 2026-09-29 (US state hub)
34. ~~`/north-carolina/`~~ — done 2026-09-29 (US state hub)
35. ~~`/michigan/`~~ — done 2026-09-30 (US state hub)
36. ~~`/new-jersey/`~~ — done 2026-09-30 (US state hub)
37. ~~`/virginia/`~~ — done 2026-09-30 (US state hub)
38. ~~`/washington/`~~ — done 2026-09-30 (US state hub)
39. ~~`/arizona/`~~ — done 2026-09-30 (US state hub)
40. ~~`/massachusetts/`~~ — done 2026-09-30 (US state hub)
41. ~~`/tennessee/`~~ — done 2026-09-30 (US state hub)
42. ~~`/indiana/`~~ — done 2026-09-30 (US state hub)
43. ~~`/missouri/`~~ — done 2026-09-30 (US state hub)
44. ~~`/maryland/`~~ — done 2026-09-30 (US state hub)
45. ~~`/wisconsin/`~~ — done 2026-10-01 (US state hub)
46. ~~`/colorado/`~~ — done 2026-10-01 (US state hub)
47. ~~`/minnesota/`~~ — done 2026-10-01 (US state hub)
48. ~~`/south-carolina/`~~ — done 2026-10-01 (US state hub)
49. ~~`/alabama/`~~ — done 2026-10-01 (US state hub)
50. ~~`/louisiana/`~~ — done 2026-10-01 (US state hub)
51. ~~`/kentucky/`~~ — done 2026-10-01 (US state hub)
52. ~~`/oregon/`~~ — done 2026-10-01 (US state hub)
53. ~~`/oklahoma/`~~ — done 2026-10-01 (US state hub)
54. ~~`/connecticut/`~~ — done 2026-10-01 (US state hub)
55. *(after these: continue with the next-highest-population US states —
    Utah, Iowa, Nevada, Arkansas, Mississippi, Kansas, New Mexico,
    Nebraska, Idaho, West Virginia — then major metro county pages, then
    remaining country hubs)*

## Log

### 2026-09-26

**Page 1: Homepage (`/`)**
- Primary keyword: `small business marketing agency` — Volume 3,600/mo,
  CPC $11.83, Keyword Difficulty 22 (US, Semrush `phrase_these`,
  verified live)
- Secondary keywords: `full service digital marketing agency` (Vol 4,400,
  KD 40), `digital marketing services` (Vol 40,500, KD 58 — used for
  semantic breadth, not primary target)
- Rationale: `digital marketing agency` (Vol 74,000, KD 82) was
  considered and rejected — unrealistic to rank for at the site's
  current Authority Score (2/100, per the site audit). KD 22 is a
  genuinely winnable target that still matches real commercial intent
  and the site's actual small-business positioning.
- Changes: `<title>`, meta description, og:title/description,
  twitter:title/description, added a `description` field to the
  Organization JSON-LD. Left the H1 and hero copy unchanged — already
  on-brand and not worth disrupting for marginal gain.
- Source: Semrush `phrase_these`, live API call, 2026-09-26.

**Page 2: `/services/seo/`**
- Primary keyword: `SEO agency for small businesses` — **not
  volume-verified this run**: Semrush API units hit zero
  (`ERROR 132 :: API UNITS BALANCE IS ZERO`) immediately after the
  homepage lookup, before a second Semrush call could run. This pick is
  WebSearch-informed (qualitative signal that "agency" phrasing carries
  stronger commercial intent than "services" or "company" for this
  category) and consistent with the homepage's real small-business
  positioning, not backed by a verified search-volume number today.
- Secondary keywords: `seo company`, `seo services` (both already
  naturally present in the existing page copy — left as-is).
- Changes: `<title>`, meta description, og:title/description,
  twitter:title/description. H1 and body left unchanged.
- **Action item**: revisit this page once Semrush units refresh to get
  a real, verified volume/difficulty number for the chosen keyword, and
  correct the choice if the real data doesn't support it.

### Correction — 2026-09-26 (same day, on-page follow-up)

The first pass above was **metadata-only**: `<title>`/meta/OG/Twitter carried
the target keyword, but `grep` confirmed **zero occurrences in visible
`<main>` content** on either page — no match in H1, H2s, or body copy. The
"secondary keywords already naturally present in the existing page copy"
claim for `/services/seo/` was also checked and was **wrong**: `grep -i "seo
compan|seo service"` returned no matches. That claim should never have been
logged without running the check.

Fixed both pages (verified by direct `grep`, not assumption, before and
after):
- **Homepage**: eyebrow badge changed to "SMALL BUSINESS MARKETING AGENCY";
  H1 changed to "The small business marketing agency that moves as fast as
  you do." (was "Digital marketing that moves..."). Primary keyword now
  appears in the visible badge + H1, not just `<head>`.
- **`/services/seo/`**: eyebrow badge changed to "SEO AGENCY FOR SMALL
  BUSINESSES"; H1 changed to "SEO agency for small businesses: rank higher,
  get found first." (was "Rank higher, get found first."); hero paragraph
  edited to naturally include "SEO company" and "SEO services" (the two
  secondary keywords that were previously — incorrectly — logged as already
  present).
- HTML integrity re-verified after edit: homepage div balance 202/202,
  `/services/seo/` 102/102.
- No H2 text was forced to contain the keyword — the existing H2 copy
  ("Every channel that brings you customers...") reads naturally and
  stuffing it would have degraded quality for a marginal signal gain.
  On-page SEO is satisfied by title + meta + H1 + first-paragraph placement;
  it does not require every heading to repeat the exact phrase.

### 2026-09-26 (same day) — remaining 8 service pages, at owner's request

Owner asked to optimize all remaining `/services/` pages same-day instead of
sticking to the 2/day cadence. Ran the full corrected process (established in
the correction above) on all 8 in one pass:

**Semrush units check**: called `phrase_these` again before starting —
still `403 ERROR 132 :: API UNITS BALANCE IS ZERO` (non-retryable). All 8
picks below are **WebSearch-informed, not Semrush-volume-verified**. No
volume/CPC/KD number is claimed for any of them.

**Pattern used for all 8** (grounded in real WebSearch research, not
assumption): each page's existing title was a bare category label ("Content
Marketing", "Email Marketing", etc.) with no positioning and no keyword a
buyer would actually type. Research for each category confirmed "[service]
agency for small businesses" is a real, commonly-used phrase in the small
business segment (see sources per page below), and it matches the exact
positioning already established sitewide on the homepage and `/services/seo/`
today — so every service page now carries the same consistent "agency for
small businesses" framing instead of 8 inconsistent generic titles.

For every page: `<title>` + meta description + og:title/description +
twitter:title/description rewritten around the keyword, eyebrow badge
rewritten to the keyword, and the opening hero paragraph rewritten to
naturally include "As a/an [keyword], we...". Grep-verified after editing:
every page shows **8 total occurrences, 6 in `<head>`, 2 in visible `<main>`**
(badge + opening paragraph) — confirmed via `grep -c` before logging, not
assumed. HTML integrity re-verified: all 8 pages show equal open/close `<div>`
counts (102/102 each), and each page's JSON-LD blocks (0 on these pages) were
checked to parse — none present, none broken.

1. **`/services/local-seo/`** → `local SEO agency for small businesses`.
   Source: WebSearch confirmed "agency" framing fits small businesses needing
   coordinated Google Business Profile + local-intent work, distinct from
   broader enterprise SEO packages.
2. **`/services/ppc/`** → `PPC agency for small businesses`. Source: WebSearch
   found real small-business PPC ad groups using phrasing like "affordable
   PPC management" and "small business Google Ads," and agencies (vs. bare
   "management") were described as the more comprehensive, small-business-
   fit model.
3. **`/services/social-media/`** → `social media marketing agency for small
   businesses`. Source: WebSearch directly confirmed this as a common real
   search category, citing "over 735 social media marketing agencies
   globally that specifically cater to small business needs."
4. **`/services/meta-ads/`** → `Meta ads agency for small businesses`.
   Source: WebSearch found "Meta ads agency" and "Facebook ads agency" used
   interchangeably industry-wide; picked "Meta" as Meta's current official
   branding, kept "Facebook ads agency" as a natural secondary (page already
   covers Facebook & Instagram).
5. **`/services/content-marketing/`** → `content marketing agency for small
   businesses`. Source: WebSearch confirmed this as a standard, widely-used
   category term (Clutch.co, Semrush agency directories, etc. all list
   agencies under this exact category).
6. **`/services/email-marketing/`** → `email marketing agency for small
   businesses`. Source: WebSearch distinguished "email marketing agency"
   (hands-on, full-service — matches Kryvex's actual model) from "email
   marketing services" (often refers to SaaS platforms like Mailchimp) —
   "agency" is the accurate term for what Kryvex actually offers.
7. **`/services/web-design/`** → `web design agency for small businesses`.
   Source: WebSearch found both "agency" and "company" used interchangeably,
   with "agency" implying the broader strategy+design+dev scope Kryvex
   actually provides (vs. a narrower product-only "company").
8. **`/services/graphics-design/`** → `graphic design agency for small
   businesses`. Source: WebSearch confirmed "graphic design" (not "graphics
   design/designing") is the real industry term — fixed a genuine
   grammar/terminology error on this page in the process, not just added a
   keyword. WebSearch also confirmed "agency" signals a coordinated,
   team-based service, matching Kryvex's actual multi-format offering.

**Action item**: none of these 8 have a Semrush-verified volume/CPC/KD
number yet. Once Semrush API units refresh, run `phrase_these` for all 8
primary keywords (plus the still-outstanding `/services/seo/` pick from the
first correction) and update this log with real numbers — correct any pick
the real data doesn't support.

### Correction — 2026-09-26 (same day, second follow-up): H1 + secondary keywords were missing

Owner asked directly whether H1, body and secondary keywords were actually
covered. Checked with `grep`, not assumption, and found two real gaps in the
batch above:

- **H1 tags were untouched on all 8 pages.** Only the eyebrow badge and
  opening paragraph carried the primary keyword; every H1 still read the
  original tagline with no keyword at all (e.g. `<h1>Own your local
  market.</h1>`). This technically satisfied the Routine's own written rule
  at the time ("H1 **or** the badge"), but was inconsistent with the fuller
  treatment already given to the homepage and `/services/seo/` earlier today
  (badge **and** H1 both). Inconsistent execution, not a deliberate choice.
- **Secondary keywords were not systematically placed.** Only 2 of 8 pages
  (`local-seo`, `ppc`) had a real secondary keyword in body copy; the other
  6 had none — `grep` for the secondary keyword named in each page's
  rationale above returned zero matches on `meta-ads`, `social-media`,
  `content-marketing`, `email-marketing`, `web-design`, `graphics-design`.

**Fixed, grep-verified after editing** (all 8 pages now show: primary
keyword present in the H1 text itself, one real secondary keyword present in
`<main>` body copy, div-tag balance 102/102 intact):

- `local-seo`: H1 → "Local SEO agency for small businesses: own your local
  market." Secondary `local SEO services` already present (1 match).
- `ppc`: H1 → "PPC agency for small businesses: profitable ads, not just
  clicks." Secondary `PPC management` already present (1 match).
- `social-media`: H1 → "Social media marketing agency for small businesses:
  build a brand people follow." Secondary `social media management` added
  to the opening paragraph (1 match).
- `meta-ads`: H1 → "Meta ads agency for small businesses: scale with
  Facebook & Instagram." Secondary `Facebook ads agency` added — phrased as
  "also known as a Facebook ads agency," grounded in the WebSearch finding
  that the two terms are used interchangeably/synonymously industry-wide,
  not an invented claim (1 match).
- `content-marketing`: H1 → "Content marketing agency for small businesses:
  work that earns trust & ranks." (changed "Content that" to "Work that" to
  avoid repeating "content" twice in one line.) Secondary `content marketing
  services` added (1 match).
- `email-marketing`: H1 → "Email marketing agency for small businesses: turn
  subscribers into revenue." Secondary `email marketing services` added
  (1 match).
- `web-design`: H1 → "Web design agency for small businesses: websites that
  convert visitors." Secondary `website development` added (1 match).
- `graphics-design`: H1 → "Graphic design agency for small businesses:
  visuals that make you look pro." Secondary `graphic design services`
  added (1 match).

**Standing checklist from here on (added to CLAUDE.md and the Routine's
prompt as a hard requirement, not "H1 or badge"):** every page optimization
must place the **primary** keyword in `<title>` + meta description +
og/twitter tags + the **H1 tag itself** + the opening body paragraph, AND
place at least one **secondary** keyword naturally in body copy (not
stuffed into meta tags — that reads as spam). Verify all of it with `grep`
before logging anything as done, the same discipline already established
for the metadata-only gap earlier today.

### 2026-09-27

Semrush API units had refreshed overnight — checked live before starting
(not assumed): `phrase_these` call succeeded, real volume/CPC/KD data for
both pages below.

**Page 1: `/about/`**
- Primary keyword: `digital marketing agency team` — Volume 90/mo, CPC $0,
  Keyword Difficulty 36 (US, Semrush `phrase_these`, verified live).
- Secondary keyword: `trusted digital marketing agency` — Volume 40/mo,
  CPC $0, KD 37 (same live call).
- Rationale: `digital marketing agency reviews` (Vol 140, KD 37) was
  considered first as it scored highest, but rejected — it's a
  reviews/testimonials search intent, and the About page has no genuine
  reviews content to show. Ranking for it would mean disappointing
  intent-matched visitors, and manufacturing review-style content to match
  would violate the standing anti-fabrication rule. `digital marketing
  agency team` genuinely matches what the page is about (team/company
  story) and `trusted digital marketing agency` is a positioning descriptor
  the page's real content (transparent pricing, no bloated retainers)
  actually supports, not an invented trust claim.
- Changes: `<title>`, meta description, og:title/description,
  twitter:title/description, eyebrow badge, H1, opening paragraph.
- Grep-verified: primary `digital marketing agency team` — 8 total
  occurrences, confirmed present inside the actual `<h1>` text. Secondary
  `trusted digital marketing agency` — 2 occurrences (meta description +
  opening body paragraph, i.e. present in `<main>`, not meta-only).
  Div balance 129/129 intact. No JSON-LD blocks on this page.

**Page 2: `/contact/`**
- Primary keyword: `free marketing consultation` — Volume 170/mo, CPC $0,
  Keyword Difficulty 0 (essentially uncontested) (US, Semrush
  `phrase_these`, verified live).
- Secondary keyword: `digital marketing agency contact` — Volume 30/mo,
  CPC $0, competitive density 0.33 (same live call).
- Rationale: KD 0 at Vol 170 is a genuinely easy, real-intent target that
  matches exactly what this page already offers (a free consultation/audit
  booking flow) — no intent mismatch, no fabricated claim needed.
- Changes: `<title>`, meta description, og:title/description,
  twitter:title/description, eyebrow badge, H1, opening paragraph.
- Grep-verified: primary `free marketing consultation` — 8 total
  occurrences, confirmed present inside the actual `<h1>` text. Secondary
  `digital marketing agency contact` — 2 occurrences (meta description +
  opening body paragraph, present in `<main>`). Div balance 94/94 intact.
  No JSON-LD blocks on this page.

Next up in the queue: `/free-audit/`, then the `/usa/`, `/uk/`, and
`/india/performance-marketing-agency/` country hubs.

### 2026-09-27 (continued) — `/industries/ecommerce/`, at owner's request

Semrush units hit zero again this call (checked live, non-retryable). WebSearch
fallback used.

- Primary: `ecommerce marketing agency` — WebSearch confirmed this is the
  specialized term (vs. broader "ecommerce digital marketing"), matching what
  Kryvex actually offers on this page.
- Secondary: `ecommerce digital marketing` — the broader variant, added
  naturally in the opening paragraph.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 9 occurrences (incl. inside `<h1>`), secondary 1
  occurrence in body. Div balance 133/133.
- Action item: not volume-verified, revisit once Semrush units refresh.

### 2026-09-27 (continued) — `/industries/healthcare/`, at owner's request

Semrush units still zero (checked live). WebSearch fallback used.

- Primary: `healthcare marketing agency` — broader umbrella term, matches
  the page's actual scope (clinics, dental, wellness), per WebSearch.
- Secondary: `medical marketing agency` — the more specialized term for
  clinics/dental specifically, added naturally in the opening paragraph.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 9 occurrences (incl. inside `<h1>`), secondary 1
  occurrence in body. Div balance 133/133.
- Action item: not volume-verified, revisit once Semrush units refresh.

### 2026-09-28

Semrush units zero again (checked live). WebSearch fallback used for both pages.

**Page 1: `/free-audit/`**
- Note: original keyword idea ("free marketing audit") was checked against
  the page's actual content and rejected — this page is a real-time
  Lighthouse-based website audit tool (performance/SEO/mobile scores in
  30 seconds), not a marketing-strategy audit form. Picked keywords that
  match what the page actually does instead.
- Primary: `free website audit` — WebSearch confirmed this is a real,
  commonly-used lead-magnet term and matches the page's actual function.
- Secondary: `free SEO audit` — the page's Lighthouse test includes an SEO
  score, so this is a genuine secondary match, not a stretch.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 9 occurrences (incl. inside `<h1>`), secondary 4
  occurrences with at least one confirmed inside `<main>` (opening
  paragraph, line 442). Div balance 93/93. JSON-LD still valid.

**Page 2: `/usa/`**
- Primary: `digital marketing agency USA` — WebSearch-informed; matches
  the page's real positioning (all 50 states).
- Secondary: `digital marketing company USA` — WebSearch confirmed
  "agency" and "company" are used interchangeably for this query, added
  naturally in the opening paragraph.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 8 occurrences (incl. inside `<h1>`), secondary 1
  occurrence in body. Div balance 177/177. JSON-LD still valid.
- Action item: neither page volume-verified this run, revisit once
  Semrush units refresh.

### 2026-09-28 (continued) — cadence raised to 10 pages/day per owner instruction

Owner instruction: "increase the frequency in a day total 10 pages try to
optimize with proper guidelines." Standing Routine (`trig_018kXGKGYidUcjnAJpLAmLWR`)
updated to target 10 pages/day going forward (was 2/day); CLAUDE.md updated
to match. Same per-page rigor as always — full checklist, intent-match
check, grep-verification — just more pages per run. Semrush units zero
again (checked live) for all 6 pages below; WebSearch fallback used
throughout, explicitly disclosed. Intent-match check run against each
page's real title/badge/H1/desc before picking a keyword — no mismatches
found; all 6 genuinely support an "[industry] marketing agency" /
"[country] digital marketing agency" positioning.

**Page 3: `/uk/`**
- Primary: `digital marketing agency UK` — WebSearch confirmed standard
  query pattern, matches page's real positioning (UK businesses).
- Secondary: `digital marketing company UK` — interchangeable variant,
  added naturally in the opening paragraph.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 8 occurrences (incl. inside `<h1>`), secondary 1
  occurrence confirmed in `<main>` (line 446). Div balance 177/177.

**Page 4: `/india/performance-marketing-agency/`**
- Page was already well-optimized from earlier site work (primary
  "performance marketing agency in India" already had 8 occurrences incl.
  H1). Only edit needed: worked secondary keyword into the existing hero
  paragraph.
- Primary: `performance marketing agency in India` (pre-existing, 11
  occurrences total this run).
- Secondary: `digital marketing agency india` — added naturally into the
  existing hero paragraph.
- Changes: opening paragraph only (title/meta/OG/Twitter/badge/H1 already
  correct from prior work).
- Grep-verified: primary 11 occurrences, secondary 1 occurrence confirmed
  in `<main>` (line 446). Div balance 176/176. JSON-LD valid (1 block).

**Page 5: `/industries/real-estate/`**
- Primary: `real estate marketing agency` — WebSearch confirmed standard
  term, matches page's real positioning (listings/closings).
- Secondary: `real estate digital marketing` — broader variant, added
  naturally in body copy.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 8 occurrences (incl. inside `<h1>`), secondary 4
  occurrences in `<main>`. Div balance 133/133.

**Page 6: `/industries/restaurants/`**
- Primary: `restaurant marketing agency` — WebSearch confirmed standard
  term, matches page's real positioning (covers/table turnover).
- Secondary: `restaurant digital marketing` — broader variant, added
  naturally in body copy.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 8 occurrences (incl. inside `<h1>`), secondary 4
  occurrences in `<main>`. Div balance 133/133.

**Page 7: `/industries/legal/`**
- Primary: `legal marketing agency` — WebSearch confirmed standard term.
- Secondary: `law firm marketing agency` — more specific variant (firms
  specifically), added naturally in body copy.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 8 occurrences (incl. inside `<h1>`), secondary 2
  occurrences in `<main>`. Div balance 133/133.

**Page 8: `/industries/home-services/`**
- Primary: `home services marketing agency` — WebSearch confirmed standard
  umbrella term (plumbers/HVAC/electricians/contractors).
- Secondary: `contractor marketing agency` — narrower variant, added
  naturally in body copy.
- Changes: meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 7 occurrences (incl. inside `<h1>`), secondary 2
  occurrences in `<main>`. Div balance 133/133.

**Page 9: `/industries/education/`**
- Primary: `education marketing agency` — WebSearch confirmed standard
  term, matches page's real positioning (schools/course creators/edtech).
- Secondary: `school marketing agency` — WebSearch confirmed the two terms
  are used interchangeably, "school" emphasizes K-12; added naturally in
  the opening paragraph.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 8 occurrences (incl. inside `<h1>`), secondary 1
  occurrence confirmed in `<main>` (line 396). Div balance 133/133.

**Page 10: `/industries/fitness/`**
- Primary: `fitness marketing agency` — WebSearch confirmed standard term,
  matches page's real positioning (gyms/studios/coaches).
- Secondary: `gym marketing agency` — WebSearch confirmed interchangeable,
  "gym" is more facility-specific; added naturally in the opening
  paragraph.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 8 occurrences (incl. inside `<h1>`), secondary 1
  occurrence confirmed in `<main>` (line 396). Div balance 133/133.

- Action item: none of today's 8 new pages volume-verified (Semrush units
  exhausted all day) — revisit once units refresh.
- Total done today: 10 pages (`/free-audit/`, `/usa/`, `/uk/`,
  `/india/performance-marketing-agency/`, `/industries/real-estate/`,
  `/industries/restaurants/`, `/industries/legal/`,
  `/industries/home-services/`, `/industries/education/`,
  `/industries/fitness/`) — first day at the new 10-page/day cadence.

### 2026-09-29

Semrush units zero again (checked live, `phrase_these`, batch call for all
20 candidate keywords across today's 10 pages returned `403 ERROR 132 ::
API UNITS BALANCE IS ZERO`, non-retryable). WebSearch fallback used for
all 10 pages, explicitly disclosed below. Intent-match check run against
each page's real title/H1/hero copy before picking a keyword — the
`/industries/tours-travel/` page genuinely covers both tour operators and
travel agencies, and all 9 US state hubs already carried "Digital
Marketing Agency in [State]" in title/meta/OG/Twitter from earlier site
work, confirming the primary keyword choice was already the intended
positioning, not a new guess.

The `/industries/` queue ran out after today (`tours-travel` was the last
unoptimized industries page), so the priority queue was extended with the
next-highest-value pages per the standing instruction: the 9 next
top-population US state hubs (California, Texas, Florida, New York,
Pennsylvania, Illinois, Ohio, Georgia, North Carolina — real US Census
population ranking, not invented), added as items 26-34 above, with items
35+ (Michigan, New Jersey, Virginia, Washington, Arizona, Massachusetts)
queued next.

**Page 1: `/industries/tours-travel/`**
- Primary: `travel marketing agency` — WebSearch confirmed this is a
  real, commonly used term (e.g. Bird Marketing's "Travel Digital
  Marketing Agency", Digital Agency Network's "Travel & Tourism Marketing
  Agencies" category) that covers both tour operators and travel
  agencies, matching the page's actual scope.
- Secondary: `tour operator marketing` — narrower variant specific to
  tour operators, also WebSearch-confirmed as a real term (TOMIS,
  AAMP, Tour Marketing Suite all use this framing); added naturally in
  the opening paragraph.
- Changes: title, meta, OG/Twitter, badge, H1, opening paragraph.
- Grep-verified: primary 8 occurrences (incl. inside `<h1>`), secondary 1
  occurrence confirmed in `<main>`. Div balance 141/141. JSON-LD valid (3
  blocks).

**Pages 2-10: US state hubs (`/california/`, `/texas/`, `/florida/`,
`/new-york/`, `/pennsylvania/`, `/illinois/`, `/ohio/`, `/georgia/`,
`/north-carolina/`)**
- These use a shared template (funnel-stage layout, not the industries
  badge/H1 pattern) and each already carried the primary keyword
  `digital marketing agency in [state]` in title, meta description,
  og:title/description, twitter:title/description, and the page's
  Service JSON-LD `name` field from earlier site work — confirmed by
  reading each page's actual head block before editing, not assumed.
  The only checklist gap on all 9 was the H1 (generic "Your [State]
  customers are searching right now") and no secondary keyword in body.
- Primary (all 9): `digital marketing agency in [state]` — already the
  site's established positioning for this page type, reused rather than
  reselected, consistent with `/usa/`'s earlier optimization.
- Secondary (all 9): `digital marketing company in [state]` — the same
  agency/company interchangeable-term pattern already WebSearch-confirmed
  and used for `/usa/`, `/uk/`, and `/india/performance-marketing-agency/`
  earlier this week; added naturally into the opening `sub` paragraph
  beneath the H1.
- Changes per page: H1 rewritten to include the primary keyword directly
  (was generic, now `Digital marketing agency in [State]: your customers
  are searching right now...`); opening paragraph rewritten to open with
  the secondary keyword (`As a digital marketing company in [State],
  we know...`). Title/meta/OG/Twitter/JSON-LD were already correct and
  left unchanged.
- Grep-verified per page: primary 5 total occurrences (incl. inside
  `<h1>`), secondary 1 occurrence confirmed in `<main>` (the `sub`
  paragraph immediately under the H1). Div balance 127/127 on all 9.
  JSON-LD valid (1 block each).

- Action item: none of today's 10 pages volume-verified (Semrush units
  exhausted) — revisit once units refresh.
- Total done today: 10 pages (`/industries/tours-travel/`, `/california/`,
  `/texas/`, `/florida/`, `/new-york/`, `/pennsylvania/`, `/illinois/`,
  `/ohio/`, `/georgia/`, `/north-carolina/`).

### 2026-09-30

Semrush units zero again (checked live, `phrase_these` batch call for all
20 candidate keywords across today's 10 state hubs returned `403 ERROR
132 :: API UNITS BALANCE IS ZERO`, non-retryable). WebSearch fallback
used — same `digital marketing agency in [state]` / `digital marketing
company in [state]` pattern already established and WebSearch-confirmed
for the prior 9 state hubs, reused for consistency rather than
reselected from scratch.

The queue was extended with the next 10 top-population US states (real
Census ranking): Michigan, New Jersey, Virginia, Washington, Arizona,
Massachusetts, Tennessee, Indiana, Missouri, Maryland — items 35-44
above, with Wisconsin/Colorado/Minnesota/South Carolina/Alabama/
Louisiana queued next.

**Pages 1-10: US state hubs (`/michigan/`, `/new-jersey/`, `/virginia/`,
`/washington/`, `/arizona/`, `/massachusetts/`, `/tennessee/`,
`/indiana/`, `/missouri/`, `/maryland/`)**
- Intent-match check: confirmed on all 10 by reading each page's actual
  title before editing — all already carried "Digital Marketing Agency
  in [State]" in title/meta/OG/Twitter/JSON-LD from earlier site work,
  same gap as the prior 9 states (generic H1, no secondary keyword in
  body).
- Primary (all 10): `digital marketing agency in [state]` — reused the
  site's established positioning for this page type.
- Secondary (all 10): `digital marketing company in [state]` — same
  agency/company interchangeable pattern used for all prior state hubs
  and `/usa/`, `/uk/`, `/india/performance-marketing-agency/`.
- Changes per page: H1 rewritten to include the primary keyword directly
  (was generic "Your [State] customers are searching..."); opening `sub`
  paragraph rewritten to open with the secondary keyword. Title/meta/
  OG/Twitter/JSON-LD already correct, left unchanged.
- Grep-verified per page: primary 5 total occurrences (incl. inside
  `<h1>`), secondary 1 occurrence confirmed in `<main>`. Div balance
  127/127 on all 10. JSON-LD valid (1 block each).

- Action item: none of today's 10 pages volume-verified (Semrush units
  exhausted) — revisit once units refresh.
- Total done today: 10 pages (`/michigan/`, `/new-jersey/`, `/virginia/`,
  `/washington/`, `/arizona/`, `/massachusetts/`, `/tennessee/`,
  `/indiana/`, `/missouri/`, `/maryland/`).

### 2026-10-01

Semrush checked live first (`mcp__Semrush__keyword_research` with no
params, to surface available toolkits) — returned `no_api_units`
(`403`-equivalent, non-retryable), same as every prior check this
project. WebSearch fallback used — reused the same `digital marketing
agency in [state]` / `digital marketing company in [state]` pattern
already established and WebSearch-confirmed for the prior 19 state
hubs, for consistency.

Queue extended with the next 10 top-population US states (real Census
ranking) — items 45-54 above: Wisconsin, Colorado, Minnesota, South
Carolina, Alabama, Louisiana, Kentucky, Oregon, Oklahoma, Connecticut.
Next queued: Utah, Iowa, Nevada, Arkansas, Mississippi, Kansas, New
Mexico, Nebraska, Idaho, West Virginia.

**Pages 1-10: US state hubs (`/wisconsin/`, `/colorado/`, `/minnesota/`,
`/south-carolina/`, `/alabama/`, `/louisiana/`, `/kentucky/`,
`/oregon/`, `/oklahoma/`, `/connecticut/`)**
- Intent-match check: read each page's actual `<title>` and H1 before
  editing — all 10 already carried "Digital Marketing Agency in
  [State]" in title/meta/OG/Twitter/JSON-LD from earlier site
  generation, same real gap as every prior state hub: generic H1
  ("Your [State] customers are searching right now...") and zero
  occurrences of any secondary keyword phrase anywhere in the page
  (confirmed via grep before editing, not assumed).
- Primary (all 10): `digital marketing agency in [state]`.
- Secondary (all 10): `digital marketing company in [state]`.
- Changes per page: H1 rewritten to open with the primary keyword
  directly; opening `sub` paragraph rewritten to open with the
  secondary keyword. Title/meta/OG/Twitter/JSON-LD were already correct
  from earlier work, left unchanged.
- Grep-verified per page, after editing, every page: primary keyword
  confirmed inside the actual `<h1>...</h1>` text (not just nearby) —
  1/1 on all 10; primary keyword total occurrences (title/meta/OG/
  Twitter/JSON-LD/H1) — 5/5 on all 10; secondary keyword confirmed
  present inside `<main>` — 1/1 on all 10; div-tag balance — 127/127 on
  all 10; JSON-LD — valid (1 block each) on all 10.
- Action item: none of today's 10 pages volume-verified (Semrush units
  exhausted) — revisit once units refresh.
- Deploy: commit bundled with this log update, pushed to
  `claude/webtech-core-current-work-rsmbri`, fast-forwarded to `main`;
  GitHub Actions run conclusion recorded below once confirmed.
- Total done today: 10 pages (`/wisconsin/`, `/colorado/`,
  `/minnesota/`, `/south-carolina/`, `/alabama/`, `/louisiana/`,
  `/kentucky/`, `/oregon/`, `/oklahoma/`, `/connecticut/`).
