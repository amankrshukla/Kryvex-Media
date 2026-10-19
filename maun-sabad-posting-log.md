# @maun_sabad — Instagram Posting Log

**Not part of the Kryvex Media website.** This is a separate personal/devotional
Instagram page (`@maun_sabad`), unrelated to Kryvex's business content. This file
lives in this repo only because it's the durable, cross-session storage available
in this environment — none of the standing CLAUDE.md content rules (word counts,
anti-fabrication for site content, etc.) apply to it. The anti-fabrication
principle itself still applies in spirit: captions reflect only what's actually
on each image, no invented attributions.

Source content: user's Google Drive folder "Maun Sabad"
(folder id `1XnDYb-OX3xFDiJd7aZLD0DoWV4mfWTze`), file naming `Day N Post M.png`.
Each image already has its own Hindi devotional text baked in.

Instagram account: `maun_sabad` (ig_user_id `39706309362316110`, Composio
connection `instagram_ocque-lawing`).

## Posting method (for the next run / next session)
1. Fetch the Drive file directly: `https://drive.google.com/uc?export=download&id=<file_id>`
   (confirmed working without auth for this folder's files — returns raw bytes).
2. Convert PNG → JPEG (white background for any transparency) via PIL in the
   Composio remote workbench (`mcp__compos_io__COMPOSIO_REMOTE_WORKBENCH`).
3. `upload_local_file(...)` in that same workbench → public `s3_url`.
4. `INSTAGRAM_POST_IG_USER_MEDIA` (ig_user_id, image_url=that s3_url, caption)
   → `creation_id`.
5. `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH` (ig_user_id, creation_id).
6. Verify via `INSTAGRAM_GET_IG_MEDIA` (real permalink) before logging as posted.
7. Append the result row below, commit, push to
   `claude/webtech-core-current-work-rsmbri`, fast-forward `main`.

Cadence: 1 post/day, in queue order below, unless the user says otherwise.
**Never post an item whose caption is still "pending drafting" below — stop and
flag it instead of guessing a caption.**

## Queue (Day 1 + Day 2 captions drafted 2026-10-18, full text in commit history
of this file / the original draft; Day 3 + Day 4 captions: see status column)

| # | File | Drive file ID | Caption status | Posted | Permalink |
|---|------|---------------|-----------------|--------|-----------|
| 1 | Day 1 Post 1 | 1EKjseU1yniGCBGoTWhs1najvrkoo_WHi | drafted | **2026-10-19** | https://www.instagram.com/p/DesDPCZHcWC/ |
| 2 | Day 1 Post 2 | 1lYU4l8dBmEGZWbZlGXGmVVNsixGOS5yR | drafted | — | — |
| 3 | Day 1 Post 3 | 16Ivfrx0tLs9ZS3EtegKoonuCozkZALzu | drafted | — | — |
| 4 | Day 1 Post 4 | 1dk503VSFl-JQCGebOSJBeuwsFi_wX4LT | drafted | — | — |
| 5 | Day 1 Post 5 | 1LTHJP3Fe_yHbuiMgzrx_9pWgyRPlFXRR | drafted | — | — |
| 6 | Day 1 Post 6 | 1yb5sEX090TTBn88JMECTXpQGUvbiJ8Oq | drafted | — | — |
| 7 | Day 1 Post 7 | 1SY--MMTVYMW3Yn_OAYAldbF34NPjWyie | drafted | — | — |
| 8 | Day 1 Post 8 | 1MOS18pus-k0okT4NlMoRNpcki19QkzZN | drafted | — | — |
| 9 | Day 1 Post 9 | 1O_EsQ092xot-qKIFrWLisaKSR5mdw-6K | drafted | — | — |
| 10 | Day 1 Post 10 | 1VMzDy8GO7EkCKMg3q9Z4zx_83SIml24B | drafted | — | — |
| 11 | Day 2 Post 1 | 1P1w0AQMAUPzsu5pxH4Fcl5dxtcHX43sT | drafted | — | — |
| 12 | Day 2 Post 2 | 1vp0eU8E9mwLKhTgZQQzMgJk279yn2FNM | drafted | — | — |
| 13 | Day 2 Post 3 | 1-IxeafLY0ZkPeUT-Ww_eSSC3ZZLodDbU | drafted | — | — |
| 14 | Day 2 Post 4 | 1iwByzkYUbTTJj230jDo2-g5UnfMGqMEf | drafted | — | — |
| 15 | Day 2 Post 5 | 13n79bupYM5i8B-xMD-5XmtksMBmZqtXU | drafted | — | — |
| 16 | Day 2 Post 6 | 1t9Lil_NowWgCLKPWVEvgQJeAlceeoJd9 | drafted | — | — |
| 17 | Day 2 Post 7 | 17jqO5p7N4hlDvM8E8oPbo3nV0J6dgtoN | drafted | — | — |
| 18 | Day 2 Post 8 | 1zQyBqcE8hI2cLqGje0_okk7oVa-ySjx1 | drafted (Dussehra-themed — see note) | — | — |
| 19 | Day 2 Post 9 | 16180ks5FjEEKo4UY3OmwEyOWnMlCqLAO | drafted (Dussehra-themed — see note) | — | — |
| 20 | Day 2 Post 10 | 1UZ16_xIL1So4rmcTYGUvCJ_1Z8BUX_V0 | drafted | — | — |
| 21 | Day 3 Post 1 | 1f-1dLmuVG1hhheCyowX8J2chqlBIHENk | **pending drafting** | — | — |
| 22 | Day 3 Post 2 | 1DrmZiXS0rSEOf39LM8JqBiC8iIQk3_2t | **pending drafting** | — | — |
| 23 | Day 3 Post 3 | 1CmyBkoq0suPdr5BEYulpKl280nOR7LcQ | **pending drafting** | — | — |
| 24 | Day 3 Post 4 | 1bls3iISYdnaM0tfON8hH2PPtygVA7GI- | **pending drafting** | — | — |
| 25 | Day 3 Post 5 | 1A1clh_K9M20FLoX3A_jYLfz5R-mQGhsH | **pending drafting** | — | — |
| 26 | Day 3 Post 6 | 1MSQYpWuCAoWFfch4dbWyFpuBBqZszVsm | **pending drafting** | — | — |
| 27 | Day 3 Post 7 | 1aH9_xmc8Q5WxGYMUmsYm31cRCdWHGerE | **pending drafting** | — | — |
| 28 | Day 3 Post 8 | 1tJBw6EkK9X9ifj8P3FYqknI4q5XcAv2t | **pending drafting** | — | — |
| 29 | Day 3 Post 9 | 1yd-HBP3pKZmeihQ0X-5wknRBr2vkJ6M9 | **pending drafting** | — | — |
| 30 | Day 3 Post 10 | 1mIW930Z9Gj9oJZ3HjSZWGv5Jykeg9_xI | **pending drafting** | — | — |
| 31 | Day 4 Post 1 | 1hWZtf0uQUSuLeTqEbYMZcxDpTOA7xMF9 | **pending drafting** | — | — |
| 32 | Day 4 Post 2 | 1lmWG86zVgYlRr-gsRjZ6SDk9tbx4OEeV | **pending drafting** | — | — |
| 33 | Day 4 Post 3 | 1SoNauBRMup8yBQDSdP5yaq506TT3WmCK | **pending drafting** | — | — |
| 34 | Day 4 Post 4 | 1_ij96Ex-y0h6Zmbkv5NV0eGniS15iPfc | **pending drafting** | — | — |
| 35 | Day 4 Post 5 | 1Znseb15cGIjWXxqI8jxbMNRaGTAqo2vG | **pending drafting** | — | — |
| 36 | Day 4 Post 6 | 1KeubTYFeXetILr9Po0tAJ5U6W1J8KiGS | **pending drafting** | — | — |
| 37 | Day 4 Post 7 | 1gtoIZUNXmhIs6FrD5upWt0c9gXsB_r-h | **pending drafting** | — | — |
| 38 | Day 4 Post 8 | 1Li917dJTYZiBP1SWLKR2MqT8K4IX9Oyi | **pending drafting** | — | — |
| 39 | Day 4 Post 9 | 1pcWv7AGGKXbuAeXU4hJV2iyrWHdwCcoi | **pending drafting** | — | — |
| 40 | Day 4 Post 10 | 1gJ2njb2j0GyMIL-gUqhEa30cJ6OnsYZL | **pending drafting** | — | — |

## Note on Day 2 Post 8/9
Ravan Dahan / Dussehra-themed (effigy burning imagery) — seasonal content.
User has not yet confirmed whether to post these on their normal queue slot,
skip, or hold for next year's Dussehra. Flagged 2026-10-18, still open.

## Log
### 2026-10-19
- Posted #1 (Day 1 Post 1). Verified live via `INSTAGRAM_GET_IG_MEDIA`:
  permalink https://www.instagram.com/p/DesDPCZHcWC/, media_type IMAGE,
  caption matches drafted text exactly.
- User confirmed "start posting" and noted Day 4 batch now added to Drive
  (40 images total now, up from 20). Day 3 + Day 4 captions queued for
  drafting (2026-10-19).
