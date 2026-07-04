# WebTech Core — Project Structure & Naming Convention

This is the single source of truth for how the WebTech Core site files are organised.
It exists so that a folder dump never happens again, and so that converting these
Canva `.dc.html` design exports into Next.js 14 App Router routes is a 1:1, mechanical
mapping at any scale (38 districts today → 30,000+ location pages later).

---

## 1. What these files actually are

The files in this project are **Canva Doc exports (`.dc.html`)** — design + copy source,
**not** deployable Next.js pages. Treat this folder as the *content/design layer*. The
folder tree below intentionally mirrors the **live URL architecture** so each design file
maps to exactly one future route.

---

## 2. The folder tree (mirrors the URL architecture)

```
WebTech Core - Organized/
├── 00_GLOBAL/          → site-wide pages: homepage, About, Contact, Legal, Sitemap, Resources, Case Studies
├── 01_SERVICES/        → service-pillar pages (no location): SEO, PPC, Email Marketing, Web Design, etc.
├── 02_INDUSTRIES/      → industry pages: Real Estate, Healthcare, Fitness, Education, Home Services, …
├── _LOCATIONS/
│   └── india/                          → /india/                       (country hub)
│       └── bihar/                      → /india/bihar/                 (state hub)
│           ├── araria/                 → /india/bihar/araria/          (district hub)
│           │   ├── Araria.dc.html              → district hub page
│           │   ├── Araria SEO.dc.html          → /india/bihar/araria/seo-services/
│           │   ├── Araria Web Development.dc.html
│           │   ├── Araria Google Ads.dc.html
│           │   ├── Araria Social Media.dc.html
│           │   └── Araria Graphics Design.dc.html
│           └── …38 districts
│   ├── usa/            → /usa/         (geo hub, future phase)
│   ├── uk/             → /uk/
│   └── singapore/      → /singapore/
├── _REVIEW/
│   ├── _duplicates/    → same page found twice (root vs sub-folder) — reconcile by hand
│   ├── _uncategorized/ → filename didn't match any known pattern — classify & re-run
│   └── _assets/        → Canva runtime junk (support.js, etc.) — safe to ignore/delete
├── manifest.csv        → every file: original path → category → target
└── coverage_matrix.csv → district × service grid (Y = built, - = missing) = your build gap
```

**Mapping rule (folder → route):** the folder path *is* the URL path. `_LOCATIONS/india/bihar/patna/`
becomes `/india/bihar/patna/`. A district-service file `Patna SEO.dc.html` becomes
`/india/bihar/patna/seo-services/`.

---

## 3. Naming convention (do not deviate)

| Page type          | Source filename pattern          | Lives in                                  | Future URL                                   |
|--------------------|----------------------------------|-------------------------------------------|----------------------------------------------|
| Country hub        | `Country.dc.html`                | `_LOCATIONS/india/`                        | `/india/`                                    |
| State hub          | `Bihar.dc.html`                  | `_LOCATIONS/india/bihar/`                  | `/india/bihar/`                              |
| District hub       | `<District>.dc.html`             | `_LOCATIONS/india/bihar/<district>/`       | `/india/bihar/<district>/`                   |
| District service   | `<District> <Service>.dc.html`   | `_LOCATIONS/india/bihar/<district>/`       | `/india/bihar/<district>/<service-slug>/`    |
| Service pillar     | `<Service>.dc.html`              | `01_SERVICES/`                             | `/services/<service-slug>/`                  |
| Industry           | `<Industry>.dc.html`             | `02_INDUSTRIES/`                           | `/industries/<industry-slug>/`               |
| Global             | `About Us.dc.html`, etc.         | `00_GLOBAL/`                               | `/about`, `/contact`, …                      |

**Recognised district-service suffixes** (current set, 5): `SEO`, `Web Development`,
`Google Ads`, `Social Media`, `Graphics Design`.

**Slug rule** for folders/URLs: lowercase, spaces → hyphens, `&` → `-and-`
(`East Champaran` → `east-champaran`).

> **Keep original filenames.** They preserve the Canva doc identity. The *folder path*
> carries the route meaning — don't rename files just to slug them.

---

## 4. How to re-run the organiser (when you add new pages)

The script is idempotent and non-destructive. Whenever you export new pages from Canva into
the `Webtech ` folder, just run it again.

```bash
# 1. Dry run — prints the plan, writes manifest.csv, moves nothing
bash organize_webtech.command

# 2. Review manifest.csv + coverage_matrix.csv, then commit for real (copies into the clean tree)
bash organize_webtech.command --go

# 3. (Optional, only once you trust it) physically MOVE instead of copy
bash organize_webtech.command --go --move
```

Place `organize_webtech.command` inside `Webtech Core Live Project/` (the folder that
*contains* the `Webtech ` sub-folder). It auto-detects the source folder despite the
trailing space in its name.

---

## 5. Open issues flagged during organisation (act on these)

1. **Duplicate district hubs.** Every district hub exists **twice** — once loose at the root
   and once inside `Bihar District Pages/`. The script keeps the sub-folder copy as canonical
   and quarantines the root copy to `_REVIEW/_duplicates/`. **Open both, confirm they're
   identical, delete the loser.** Drift between two copies of the same live page is a
   duplicate-content and maintenance risk.

2. **Service taxonomy mismatch.** The master context lists **6 core services**
   (SEO, PPC, Email Marketing, Website Development, Social Media, Content Writing), but the
   actual district pages use a **different set of 5** (SEO, Web Development, Google Ads,
   Social Media, Graphics Design). Decide on one canonical service list before scaling —
   inconsistent service slugs across districts will fracture your internal-linking template.

3. **Per-district coverage is thin.** `coverage_matrix.csv` shows which of the 5 services
   each district actually has. Most districts are missing most services. This is your build
   backlog — prioritise by district search demand, not alphabetically.

4. **`Legal.dc.html`** was classified as an *industry* page (Legal & Professional Services).
   If it's actually a legal/utility page, move it to `00_GLOBAL/`.

5. **`Country.dc.html`** is the India hub but is named generically. When you build the US
   phase you'll want explicit `India`, `USA` hubs — rename for clarity.

---

## 6. When you add a new district or service

- New district → it's already in the script's 38-district list; just export
  `<District>.dc.html` + the service pages and re-run.
- New **state** (beyond Bihar) → add its districts to the `DISTRICTS` list inside
  `organize_webtech.command` and add a state branch under `_LOCATIONS/india/<state>/`.
- New **service** → add the suffix to the `SERVICES` list in the script so
  `<District> <NewService>.dc.html` routes correctly.
