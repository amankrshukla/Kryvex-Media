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
