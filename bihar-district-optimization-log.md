# Bihar District Page Optimization — Standing Project Log

## Owner instruction (2026-11-14)

"start working on bihar distruct page those are not index in google optimize
the page content keywords and their seo analyze their 5 compatitors and make
best our pages that will rank on top 5"

Scope: the 20 Bihar district pages confirmed "Not Indexed" in the
`Revamp Pages` Google Sheet (real-time GSC check, logged there on
2026-11-14): Arwal, East Champaran, Gopalganj, Jehanabad, Kaimur, Katihar,
Khagaria, Kishanganj, Madhepura, Munger, Muzaffarpur, Purnia, Saharsa,
Samastipur, Saran, Sheikhpura, Sheohar, Siwan, Supaul, West Champaran.
Each page lives at `/bihar/<district>/performance-marketing-agency/`.

## Baseline (checked 2026-11-14)

All district pages share one template (`.loc-hero`, `.snap-card`,
`.stats-bar`, `.loc-svc-grid`, `.why-split`, `.proc-grid4`, `.wcu-grid`,
`.rev-grid`, `.mid-cta`, FAQ, service/nearby-city chip links, final CTA).
Sampled word counts: muzaffarpur 1003, purnia 1005, saran 993, katihar 979 —
all short of the site's 1,500-word `<main>` standard. Nearly all of each
page's content is shared boilerplate with only the district name swapped
in; genuinely district-specific real content is currently limited to one
sentence in the hero `desc` and one paragraph in the "Why <District>"
section (e.g. Muzaffarpur's is the only one with a real, specific fact:
"litchi capital of India"). Several em dashes present throughout (template
boilerplate), to be removed per the no-dash standard.

## Method (same discipline as the country-revamp project)

Per district:
1. Real local-economy research via WebSearch: district's defining
   industry/economic identity, any real, citable fact (notable
   product/export, major employer type, a real demographic or economic
   statistic with a named source). Anti-fabrication rule in full force —
   if nothing verifiable turns up for a small district, say so honestly
   in this log and build the page around what's genuinely verifiable
   (administrative facts: headquarters town, real population range from
   Census 2011, which division it belongs to) rather than inventing
   texture.
2. Competitor check via WebSearch for "digital marketing agency in
   <district>" / "<district headquarters town> digital marketing
   company". Many of these are small district towns; realistic
   expectation, stated upfront: most will have zero or near-zero
   dedicated local competitors, with results dominated by
   Patna/national-agency directory listings or nothing relevant at all.
   Log exactly what was found, never invent a competitor.
3. Rewrite: fix H1/badge to contain the exact primary keyword "digital
   marketing agency in <district>" (current H1s are close variants, not
   exact-match); add a genuine local-economy paragraph using only
   verified facts; expand/re-ground the FAQ with 1-2 district-specific
   questions where a real fact supports one; add FAQPage JSON-LD (pages
   currently have none); remove all em dashes from `<main>` and meta
   fields; verify word count ≥1,500 via the CLAUDE.md snippet.
4. Verify: word count, zero dashes, JSON-LD validity, FAQ-count match,
   tag balance, no noindex, keyword placement via grep (primary keyword
   in title/meta/og/twitter/badge/H1/opening paragraph; this fixes a
   real gap — current titles already have it, current H1s don't).
5. Bundle all of one batch's file edits + `sitemap-cities.xml` lastmod
   bumps into one commit, push, fast-forward main, poll GitHub Actions
   for `conclusion: success`, purge Cloudflare cache for the batch's
   URLs, resubmit the sitemap, and log real indexing status before/after
   where checked.
6. Update the `Revamp Pages` sheet's Optimization/Testing columns for
   the batch's rows once deployed and verified.

## Remaining queue

Batch 1: Munger, Muzaffarpur, Purnia, Saran, Katihar — DONE (2026-11-14, see entry below)
Batch 2: Kaimur, Khagaria, Kishanganj, Madhepura, Saharsa — DONE (2026-11-14, see entry below)
Batch 3: Samastipur, Sheikhpura, Sheohar, Siwan, Supaul — DONE (2026-11-14, see entry below)
Batch 4: Arwal, East Champaran, Gopalganj, Jehanabad, West Champaran

## Batch 3 completed (2026-11-14): Samastipur, Sheikhpura, Sheohar, Siwan, Supaul

Same method as batches 1-2. Word counts: Samastipur 1519, Sheikhpura
1503, Sheohar 1539, Siwan 1504, Supaul 1512 (up from a shared baseline
of 977-999).

Real sourced facts added per district (WebSearch, Semrush still out of
API units):
- **Samastipur**: Pusa agricultural research campus (now Dr. Rajendra
  Prasad Central Agricultural University), own railway division under
  East Central Railway (2025 Muzaffarpur Junction transfer into it),
  ~83% of workforce in agriculture, tobacco/maize/rice/wheat plus
  lychee and mango.
- **Sheikhpura**: one of Bihar's smallest/least populous districts
  (689 sq km, least populous per 2011 census), stone quarrying at
  hillocks near Kudra-area crushers, DC-MSME profile stating no large/
  medium industry exists, Backward Regions Grant Fund recipient.
- **Sheohar**: Bihar's smallest district by area (carved from
  Sitamarhi in 1994), second least populous district after Sheikhpura,
  three-crop-a-year irrigation capacity, among Bihar's most
  flood-affected districts (Bagmati/Budhi Gandak overflow).
  (Sources gave two conflicting area figures, 349 vs 443 sq km;
  flagged rather than picked arbitrarily.)
- **Siwan**: unusually high remittance dependence (~80% of the local
  economy per press reporting, shared with neighbouring Gopalganj),
  NABARD-documented link between NRI remittances and farm-practice
  investment, limited industry (4 units per district site, half
  cement), planned dairy processing unit.
- **Supaul**: Kosi-belt agriculture, Bihar's highest jute producer per
  a cited 2020 study (50,670+ bales), part of the Kosi division's
  corn/makhana leadership, 2006 "most backward districts"
  classification, 2011 literacy rate ~72.74%.

One WebSearch result for Supaul contained an embedded instruction
attempting to redirect the query into writing a gumbo recipe; the
search tool itself flagged and ignored it, and no action was taken on
it, noted here for the record per this project's standing practice of
treating all external content as data, not instructions.

Competitor research (WebSearch): **Mayank Digital Labs** again recurs
as the one real, confirmed competitor with dedicated pages for every
district in this batch. Other names found were small, unverifiable
listings (Finder21 Technology and Digital Techmart for Siwan, BizAdda360
for Samastipur, Patron Services generic city pages), Patna/Darbhanga/
Arrah-based generalists (NetrX Digital, Debug Digital, Vyapar Wallah,
Neoera Digital, Gudsoft Digital Solution), or unverified names from a
promotional AAMAX "Top 10" listicle for Supaul (KosiDigital, SupaulWeb
Solutions, NorthBihar Digital, VisibleOnline Agency, BrandBuilder
Bihar). Not placed on customer-facing page copy, same as prior batches.

Verification performed on every file, same checklist as batches 1-2:
word count, zero remaining dashes in `<main>`/meta, HTML tag balance,
FAQPage JSON-LD validity + FAQ-count match (11/11 for four districts,
12/12 for Sheohar, which got a third new FAQ to reach the word-count
threshold), no stray noindex, charset meta position intact. All
verified on scratchpad test copies first, then re-verified after
writing to the real repo files. Bumped sitemap-cities.xml lastmod for
these 5 URLs.

## Batch 2 completed (2026-11-14): Kaimur, Khagaria, Kishanganj, Madhepura, Saharsa

Same method as batch 1: H1/badge fixed to exact-match "digital marketing
agency in <district>", real local-economy section added, 2 new FAQ items
+ FAQPage JSON-LD per page (none had any before), all dashes removed from
`<main>` and meta. Word counts: Kaimur 1508, Khagaria 1511, Kishanganj
1509, Madhepura 1500, Saharsa 1512 (up from a shared baseline of
978-988).

Real sourced facts added per district (WebSearch, Semrush still out of
API units):
- **Kaimur**: Mundeshwari Temple (widely cited as one of India's oldest
  still-functioning Hindu temples), Kudra's rice-milling hub (~12 large
  mills + ~400 smaller ones), agriculture ~46.6% of workforce, 21,799
  registered MSMEs, Kaimur Wildlife Sanctuary in the Vindhya hills.
- **Khagaria**: One District One Product designations (bamboo art,
  banana, maize), surrounded by 7 rivers (Ganga, Kamla Balan, Kosi,
  Budhi Gandak, Kareh, Kali Kosi, Bagmati) causing annual flooding,
  agriculture ~71.4% of workforce, near-total absence of local
  processing industry, Barauni-Guwahati railway junction.
- **Kishanganj**: Bihar's only tea-growing district (acreage estimates
  conflict across sources, flagged as such), real processing-capacity
  bottleneck (far fewer units than traders say are needed), jute/
  pineapple/maize crops, Seemanchal border-trade position, named among
  the country's most backward districts in 2006.
- **Madhepura**: electric locomotive factory (genuine large Indian
  Railways investment), Kosi division major corn/makhana producer,
  flood-silt-fertility dynamic (with one account describing recent
  flood deposits as sandier/less fertile, flagged as a documented
  shift rather than settled fact), B.N. Mandal University, micro-
  enterprise clusters (sweets/namkeen, bamboo work in Raniganj).
- **Saharsa**: A-category railway junction on the East Central Railway
  (Samastipur division), Kosi division headquarters (covering Saharsa/
  Madhepura/Supaul), corn/makhana exports (per one source, to US/
  Australia/France/Japan/England), district formed 1954 and reduced in
  size when Madhepura was carved out in 1981.

Competitor research (WebSearch): **Mayank Digital Labs** again recurs
as the one real, confirmed competitor with dedicated pages for every
district in this batch. Other names found were either small,
unverifiable local listings (Tezthink Web Solutions in Madhepura, on
IndiaMART), Patna/Darbhanga-based generalists serving the whole state
(NetrX Digital, Debug Digital, Vyapar Wallah, Neoera Digital, Gudsoft
Digital Solution, Assurah Marketing Agency), or unverified names from a
promotional AAMAX "Top 10" listicle for Kishanganj and Madhepura
(KishanganjDigital Hub, TeaGarden Digital, NortheastBihar Digital,
WebGrow Kishanganj, KosiValley Marketing) that are not treated as
confirmed real businesses anywhere in this project. Not placed on
customer-facing page copy, same as batch 1.

Verification performed on every file, same checklist as batch 1: word
count, zero remaining dashes in `<main>`/meta, HTML tag balance,
FAQPage JSON-LD validity + 11/11 FAQ-count match, no stray noindex,
charset meta position intact. All verified on scratchpad test copies
first, then re-verified after writing to the real repo files.

## Batch 1 completed (2026-11-14): Munger, Muzaffarpur, Purnia, Saran, Katihar

For all 5 pages: fixed H1/badge to exact-match primary keyword "digital
marketing agency in <district>" pattern (H1s previously read "Digital
marketing that grows {city} businesses" with no exact-match phrase; badge
read "Digital Marketing · {city}"), removed every em dash from `<main>`
and meta content, added a real local-economy section (2-3 paragraphs) and
2 new district-specific FAQ items each, added FAQPage JSON-LD (none of
the 38 district pages had any before this). Word counts: Muzaffarpur
1504, Purnia 1506, Saran 1515, Katihar 1502, Munger 1529 (all ≥1,500,
up from a shared baseline around 980-1005).

Real sourced facts added per district (WebSearch, Semrush out of API
units this run — disclosed, not volume-verified):
- **Muzaffarpur**: Shahi litchi (GI-tagged, the bulk of India's litchi
  exports), leather goods industry, dairy sector, Tirhut division
  headquarters.
- **Purnia**: gateway to Northeast India, agriculture (maize, jute,
  banana — Purnia and surrounding districts account for a large share
  of Bihar's banana output), Gulabbagh trading hub, new airport, planned
  Patna-Purnia Expressway to NH-27, poultry/fish trade.
- **Saran/Chhapra**: overwhelmingly agrarian economy (paddy, wheat,
  sugarcane, maize), thin industrial base (mainly sugar factories),
  historically a remittance-dependent "money order economy," Backward
  Regions Grant Fund recipient, Sonepur Mela cattle fair.
- **Katihar**: major railway junction (division established 1958),
  historically known as the "Jute Capital of Bihar" (current mill
  processing status hedged as disputed/unverified), rice/oilseed/flour
  milling, banana/jute/maize cash crops, Aspirational Districts Program
  member since 2018.
- **Munger**: centuries-old gun manufacturing tradition (18th century
  origin per one source, legal manufacturers under real strain from
  licensing costs and informal workshops), Bihar's 2026-27 state budget
  defence manufacturing corridor plan covering Munger (announcement
  stage, not completed), Bihar School of Yoga (real, internationally
  known visitor economy), Ganga riverside trade position.

Competitor research (WebSearch, logged honestly, not placed on the live
pages): the recurring real competitor across every district searched is
**Mayank Digital Labs**, which has built a dedicated landing page for
each individual district town — a real, programmatic-SEO rival worth
tracking. Beyond that, most results were small, unverifiable
IndiaMART/directory listings of unclear real scope (Apna Developer,
Think Online Services, Patron Services, One Step Innovation, Gupta
Technotech, Homeqart Online, Raj Web Info), Patna-based generalists
serving the whole state remotely (NetrX Digital, Debug Digital, Vyapar
Wallah), or names from a promotional AAMAX "Top 10" listicle
(Katihar Digital Solutions, RailCity Marketing, DigitalWave Katihar,
"Purnia Digital Agency") that could not be independently verified and
are NOT treated as confirmed real businesses anywhere in this project.
Decision: do not name competitors on customer-facing page copy (same
approach as the Bihar state page); differentiate instead on genuine
local-economy depth, which these competitors' generic listings don't
have.

Verification performed on every file: word count ≥1,500 in `<main>`
(script-checked), zero em/en dashes remaining in `<main>` or in any
`<head>` meta `content="..."` attribute (script-checked), HTML tag
balance (div/section/details/summary/p/h1/h2 open=close counts
script-checked), FAQPage JSON-LD validity via `json.loads` plus
FAQ-item-count-to-JSON-LD-entity-count match (11 each, script-checked),
no stray `noindex` tag, charset meta still first child of `<head>`.
All verified first on scratchpad test copies, then re-verified after
writing to the real repo files.
