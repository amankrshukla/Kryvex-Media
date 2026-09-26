# Kryvex Media — Daily Keyword Optimization Log

Tracks the daily on-page SEO optimization Routine (2 pages/day). Real
keyword data only — Semrush when available, WebSearch-informed fallback
when Semrush API units are exhausted (marked below). Never invent search
volume, difficulty, or CPC numbers.

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
11. `/about/`
12. `/contact/`
13. `/free-audit/`
14. `/usa/` (country hub)
15. `/uk/` (country hub)
16. `/india/performance-marketing-agency/` (country hub)
17. *(after core + hub pages: revisit and extend this list with the
    next-highest-value pages — top-population US states, then major
    metro county pages, then remaining country hubs)*

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
