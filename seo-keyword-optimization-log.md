# Kryvex Media — Daily Keyword Optimization Log

Tracks the daily on-page SEO optimization Routine (2 pages/day). Real
keyword data only — Semrush when available, WebSearch-informed fallback
when Semrush API units are exhausted (marked below). Never invent search
volume, difficulty, or CPC numbers.

## Priority queue (order to work through)

1. ~~Homepage (`/`)~~ — done 2026-09-26
2. ~~`/services/seo/`~~ — done 2026-09-26
3. `/services/local-seo/`
4. `/services/ppc/`
5. `/services/social-media/`
6. `/services/meta-ads/`
7. `/services/content-marketing/`
8. `/services/email-marketing/`
9. `/services/web-design/`
10. `/services/graphics-design/`
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
