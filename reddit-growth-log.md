# Kryvex Media — Reddit Growth Log

Standing daily Routine (set 2026-09-30, per owner instruction), fully
autonomous, fires daily at ~16:57 IST. Tracks real Reddit account
`u/amankrshuklaa` growth and activity against the 4-week strategy agreed
with the owner. Anti-fabrication rule applies in full here too: every
number in this log (karma, subscriber counts, comment counts) is a live
Reddit API pull at the time of logging, never invented or assumed.

## Standing rules (apply every single day, no exceptions)

- **No spam, ever.** No link-only comments, no posting the same link/text
  across multiple subreddits, one account only, no vote manipulation, no
  unsolicited promotional DMs. Reddit's actual sitewide content policy
  bans spam and manipulation, not self-promotion itself — the line is
  genuine participation vs. promotion-only behavior.
- **Check each subreddit's own rules** (`REDDIT_GET_SUBREDDIT_RULES`)
  before posting in it for the first time that week — subreddit rules are
  stricter than sitewide policy and always win.
- **Read the actual post before replying.** Every comment must be a real,
  specific, substantive answer to what was actually asked — not a
  templated reply.
- **No fabricated results/case studies/client claims** in anything
  posted, matching this whole project's standing anti-fabrication rule.
- **Respect Reddit's rate limits and cooldowns.** If a `RATELIMIT` error
  comes back with a cooldown hint, honor it — don't retry through it.
- **Small daily volume, not mass posting.** A handful of genuine, well-
  considered comments/day beats a high volume of shallow ones, both for
  compliance and for actually building real standing.

## The 4-week plan

- **Week 1 (2026-09-30 to 2026-10-06): zero promotion.** Genuine,
  non-promotional comments only in r/AskMarketing, r/SEO, r/localseo,
  r/marketing — real expertise, no links, no mention of Kryvex at all.
  Goal: build real karma/account standing (starting point: 1 total
  karma, account created 2026-09-25) so later posts aren't auto-filtered
  as spam by low-karma-account automod rules.
- **Week 2 (2026-10-07 to 2026-10-13): establish expertise, still no
  links.** Continue daily participation; add 1-2 original substantive
  text posts/week (no links) — genuinely detailed, specific content,
  since that's what actually gets cited by Perplexity/Google AI
  Overviews (the reliable current channels — ChatGPT's Reddit citation
  share reportedly dropped ~86% in August 2026 per recent reporting, so
  that's not a channel to bank on).
- **Week 3 (2026-10-14 to 2026-10-20): selective, contextual mentions
  only.** Mention running Kryvex only when directly asked or where a
  subreddit's own rules explicitly carve out self-promotion (e.g. a
  weekly promo thread) — verified per subreddit, not assumed.
- **Week 4 (2026-10-21 to 2026-10-27): scale + review.** Expand to 2-3
  more subreddits based on what actually got real engagement in weeks
  1-3. End-of-month review: karma growth, what worked, whether to
  continue at this pace.

## Target subreddits (live subscriber counts pulled 2026-09-30)

| Subreddit | Subscribers (as of 2026-09-30) |
|---|---|
| r/marketing | 1,972,958 |
| r/smallbusiness | 2,546,597 |
| r/Entrepreneur | 5,286,675 |
| r/EntrepreneurRideAlong | 731,086 |
| r/SEO | 514,667 |
| r/DigitalMarketing | 467,639 |
| r/AskMarketing | 172,170 |
| r/localseo | 54,317 |
| r/web_design | 979,224 |
| r/webdev | 3,314,971 |
| r/DigitalMarketingIndia | 2,811 |

## Daily log

### 2026-09-30 — plan set, Week 1 starts tomorrow

Strategy agreed with owner, this log created, daily Routine scheduled
for ~16:57 IST going forward. No Reddit activity yet today — Week 1
(zero-promotion participation) begins with the first scheduled fire.
Baseline: `u/amankrshuklaa`, 1 total karma (1 link karma, 0 comment
karma), account created 2026-09-25.

### 2026-10-01 — Week 1, day 2: first real comments posted

Week 1 (2026-09-30 to 2026-10-06): zero promotion confirmed — no links,
no mention of Kryvex, in any of today's comments.

Checked subreddit rules before engaging (`REDDIT_GET_SUBREDDIT_RULES`):
r/SEO strictly auto-removes any comment with a link (confirmed real
rule, not assumed) — honored by not including any links. r/marketing
has a zero-tolerance policy on both self-promotion and AI-generated
content (permanent ban) — skipped r/marketing this run rather than risk
a comment that reads generic; no post there today had a strong enough
genuine-fit angle to justify the risk. r/AskMarketing requires posts to
be genuine marketing questions (not relevant to commenting). r/localseo
requires on-topic, civil engagement — no issue.

Searched r/AskMarketing, r/SEO, r/localseo, r/marketing (new posts,
`REDDIT_RETRIEVE_REDDIT_POST`) for real questions matching Kryvex's
actual expertise (SEO, PPC, social, web design, content, email). Read
each full post and its existing top comments (`REDDIT_RETRIEVE_POST_COMMENTS`)
before replying, to make sure each answer added something genuinely new
rather than repeating what was already said.

**4 real comments posted, each confirmed via the tool's own response
(not assumed) — real permalinks:**

1. r/SEO — ["Product page stuck on 'Discovered – currently not indexed'"](https://reddit.com/r/SEO/comments/1wuhv7j/product_page_stuck_on_discovered_currently_not/pd5zk4q/) —
   explained the real distinction between "Discovered" (never crawled)
   and "Crawled, not indexed" (a quality signal), and added crawl-depth
   and Crawl Stats checks not yet covered by existing replies.
2. r/SEO — ["Blocked Googlebot variants by mistake"](https://reddit.com/r/SEO/comments/1wu7n1c/blocked_googlebot_variants_by_mistake_need_help/pd5zkq7/) —
   added that Images and web search recrawl somewhat independently for
   an image-heavy site, and to check Crawl Stats response codes during
   the block window to actually confirm how long it really lasted.
3. r/localseo — ["Should a local business hide its address on Google Business Profile?"](https://reddit.com/r/localseo/comments/1wu7hya/should_a_local_business_hide_its_address_on/pd5zlcg/) —
   pointed to GBP's actual Service Area Business setting (not just
   "show vs hide"), and that profile-type/reality mismatches cause more
   real damage than the address field itself.
4. r/AskMarketing — ["How did you land your first few bigger clients as a freelancer or small agency?"](https://reddit.com/r/AskMarketing/comments/1wuasl2/how_did_you_land_your_first_few_bigger_clients_as/pd5zlzt/) —
   general, non-personal-claim advice (adjacent-vendor referrals over
   past-client referrals, narrow expert entry point over "full-service"
   pitching) — no fabricated client stories, consistent with the
   anti-fabrication rule.

**Karma check:** `REDDIT_GET_REDDIT_USER_ABOUT` (username "me") run
immediately after posting all 4 still shows 1 total karma (1 link, 0
comment) — unchanged from the 2026-09-30 baseline. Each individual
comment's own post-response showed `score: 1` (Reddit's default
self-upvote) at the moment of posting, but the aggregate user-karma
endpoint hadn't caught up yet when checked seconds later — a known
Reddit karma-aggregation lag, not a sign anything failed. Will show the
real number on tomorrow's check instead of re-polling today and
reporting a stale read as final.

No RATELIMIT errors hit. No subreddit blocked participation today.
Nothing posted to r/marketing or r/DigitalMarketing/r/Entrepreneur/etc.
today — stayed within the 4 Week-1 target subreddits per the plan.

### 2026-10-17 — Reddit API rate-limited all run; no activity possible

**Note: this run follows a 16-day session gap (2026-10-01 to
2026-10-17).** By calendar date, today falls in Week 3
(2026-10-14 to 2026-10-20 — selective contextual Kryvex mentions
allowed), but the account has had **zero real activity since
2026-10-01** (the 4 comments logged above), so its actual standing is
still effectively where Week 1 left it, not where a Week 3 account
with two weeks of real participation would be. Noting this honestly:
even if Reddit had been reachable today, the plan here would have been
to continue genuine non-promotional participation (no Kryvex mention)
rather than mechanically start self-promotion just because the
calendar advanced past a 16-day blind gap — a dormant, still-1-karma
account suddenly posting promotional content is exactly the pattern
the standing no-spam rule warns against.

That question is moot this run regardless: every Reddit call attempted
(`REDDIT_GET_REDDIT_USER_ABOUT`, `REDDIT_RETRIEVE_REDDIT_POST` against
r/AskMarketing, r/localseo, r/SEO) returned **HTTP 429 Too Many
Requests** from Reddit's own API. Retried the lightest call
(`REDDIT_GET_REDDIT_USER_ABOUT`) once more after a ~90s wait per the
standing "honor rate limits, don't retry through them" rule — still
429. Did not keep retrying beyond that, consistent with the same rule.

**No Reddit activity today.** No comments posted, no karma check
possible, nothing fabricated in place of a real result. This is a
real tool/connection block, not a skipped day — logging it plainly per
the standing instruction, rather than guessing at current karma or
inventing engagement. Next run should recheck the Composio Reddit
connection status in addition to retrying the rate-limited calls, in
case this is a connection-level issue rather than a transient
sitewide limit.

### 2026-10-18 — rate limit cleared; 3 real comments posted

By calendar date today still falls in Week 3 (2026-10-14 to
2026-10-20), but — same reasoning as yesterday's entry — the account's
real standing is still effectively Week 1 (last real activity was
2026-10-01). Continued genuine non-promotional participation, no
Kryvex mention, no links, same as every prior real posting day.

Confirmed the Composio Reddit connection first: `REDDIT_GET_REDDIT_USER_ABOUT`
succeeded cleanly this run (no 429) — yesterday's block was a
transient rate limit, not a connection-level issue.

Checked rules fresh this week before posting: r/SEO confirms links are
auto-removed in posts and comments (unchanged). r/localseo's current
rules require posts/comments stay on-topic for SEO and civil — no
explicit link ban found, but stayed link-free anyway per the Week-1-
equivalent standing. r/DigitalMarketing's rules explicitly prohibit
posting of services/seminars — self-promotion stayed off the table
there too, consistent with every other subreddit today.

**3 real comments posted, each confirmed via the tool's own response
(not assumed) — real permalinks:**

1. r/SEO — ["My website has been up for years... may 1 or 2 impressions per month max"](https://reddit.com/r/SEO/comments/1x8d1zn/my_website_has_been_up_for_years_tried_several/phgg4sz/) —
   existing comments focused on backlinks/authority/crawl budget; added
   the distinct point that "indexed" and "eligible to rank" aren't the
   same thing, and pointed at Search Console Performance (Queries tab)
   as the real diagnostic instead of another link-building push.
2. r/localseo — ["Google AI Overviews Are Recommending My Local SEO Client"](https://reddit.com/r/localseo/comments/1x8pewk/google_ai_overviews_are_recommending_my_local_seo/phgg4tv/) —
   existing comments said "just trust from reviews, give it 6 weeks";
   added a distinct angle (AI Overviews/AI Mode ground answers in
   specific verifiable claims, which geotagged completed-job videos
   supply unusually well) as a plausible mechanism, with a concrete
   test to tell the two explanations apart going forward.
3. r/DigitalMarketing — ["Any Performance marketer (Meta ads)... luxury real estate... lead quality"](https://reddit.com/r/DigitalMarketing/comments/1x8ut4a/any_performance_marketermeta_ads_here_who_has/phgg4sr/) —
   existing comment addressed the lead form itself; added the
   complementary offline-conversions/Conversions API feedback-loop
   tactic (tagging qualified vs. junk leads back to Meta) as the other
   real lever, not covered by the existing reply.

**Karma check:** `REDDIT_GET_REDDIT_USER_ABOUT` (username "me") run
immediately after posting all 3 still shows 1 total karma (1 link, 0
comment) — same aggregation-lag pattern as 2026-10-01: each comment's
own post-response showed `score: 1` (default self-upvote) at posting
time, but the aggregate endpoint hadn't caught up seconds later.
Logging honestly as unchanged rather than guessing a real increase.

No RATELIMIT errors hit this run. No subreddit blocked participation.
Nothing posted to r/marketing, r/smallbusiness, r/Entrepreneur,
r/EntrepreneurRideAlong, r/web_design, r/webdev, or
r/DigitalMarketingIndia today — 3 genuine opportunities found and used
across r/SEO, r/localseo and r/DigitalMarketing (a new subreddit for
this log, rules-checked before posting), consistent with "3-5 real
opportunities, never padded."
