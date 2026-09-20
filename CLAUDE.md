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
- Florida's 67 county pages got a first real-content pass (real population +
  one sourced distinguishing fact per county) — brought `<main>` word count
  to ~650 words average. This is a first step, not the 1,500-word target.
- Next: expand Florida county pages to 1,500 words each with real,
  county-specific content (local economy/demographics, business landscape,
  locally-relevant FAQ), then scale the same approach to the remaining
  3,075 US counties, county × service pages, and international tiers.
