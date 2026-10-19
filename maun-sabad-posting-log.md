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
| 21 | Day 3 Post 1 | 1f-1dLmuVG1hhheCyowX8J2chqlBIHENk | drafted | — | — |
| 22 | Day 3 Post 2 | 1DrmZiXS0rSEOf39LM8JqBiC8iIQk3_2t | drafted | — | — |
| 23 | Day 3 Post 3 | 1CmyBkoq0suPdr5BEYulpKl280nOR7LcQ | drafted | — | — |
| 24 | Day 3 Post 4 | 1bls3iISYdnaM0tfON8hH2PPtygVA7GI- | drafted | — | — |
| 25 | Day 3 Post 5 | 1A1clh_K9M20FLoX3A_jYLfz5R-mQGhsH | drafted | — | — |
| 26 | Day 3 Post 6 | 1MSQYpWuCAoWFfch4dbWyFpuBBqZszVsm | drafted | — | — |
| 27 | Day 3 Post 7 | 1aH9_xmc8Q5WxGYMUmsYm31cRCdWHGerE | drafted | — | — |
| 28 | Day 3 Post 8 | 1tJBw6EkK9X9ifj8P3FYqknI4q5XcAv2t | drafted | — | — |
| 29 | Day 3 Post 9 | 1yd-HBP3pKZmeihQ0X-5wknRBr2vkJ6M9 | drafted | — | — |
| 30 | Day 3 Post 10 | 1mIW930Z9Gj9oJZ3HjSZWGv5Jykeg9_xI | drafted | — | — |
| 31 | Day 4 Post 1 | 1hWZtf0uQUSuLeTqEbYMZcxDpTOA7xMF9 | drafted | — | — |
| 32 | Day 4 Post 2 | 1lmWG86zVgYlRr-gsRjZ6SDk9tbx4OEeV | drafted | — | — |
| 33 | Day 4 Post 3 | 1SoNauBRMup8yBQDSdP5yaq506TT3WmCK | drafted | — | — |
| 34 | Day 4 Post 4 | 1_ij96Ex-y0h6Zmbkv5NV0eGniS15iPfc | drafted | — | — |
| 35 | Day 4 Post 5 | 1Znseb15cGIjWXxqI8jxbMNRaGTAqo2vG | drafted | — | — |
| 36 | Day 4 Post 6 | 1KeubTYFeXetILr9Po0tAJ5U6W1J8KiGS | drafted | — | — |
| 37 | Day 4 Post 7 | 1gtoIZUNXmhIs6FrD5upWt0c9gXsB_r-h | drafted | — | — |
| 38 | Day 4 Post 8 | 1Li917dJTYZiBP1SWLKR2MqT8K4IX9Oyi | drafted | — | — |
| 39 | Day 4 Post 9 | 1pcWv7AGGKXbuAeXU4hJV2iyrWHdwCcoi | drafted | — | — |
| 40 | Day 4 Post 10 | 1gJ2njb2j0GyMIL-gUqhEa30cJ6OnsYZL | drafted | — | — |

## Note on Day 2 Post 8/9
Ravan Dahan / Dussehra-themed (effigy burning imagery) — seasonal content.
User has not yet confirmed whether to post these on their normal queue slot,
skip, or hold for next year's Dussehra. Flagged 2026-10-18, still open.

## Day 3 + Day 4 Captions

Transcribed and drafted 2026-10-19. No seasonal/festival-themed images found
in this batch (unlike Day 2 Post 8/9's Dussehra pair) — nothing additional
to flag for timing. Two images (Day 4 Post 5, Day 4 Post 7, Day 4 Post 9,
Day 4 Post 10) already self-attribute their on-image line to "— मौन शब्द";
kept as-is, not echoed as a sourced quote in the caption itself.

### Day 3 Post 1
**On-image text:** महादेव से कुछ नहीं माँगा, बस सब्र माँग लिया — बाक़ी सब मिल गया। 🔱
**Caption:** सब्र वो दुआ है जो हर मुश्किल को अपने वक़्त पर हल कर देती है। जो महादेव पर भरोसा रख लेता है, उसे बाक़ी कुछ माँगना नहीं पड़ता। 🔱

#maun_sabad #mahadev #harharmahadev #bholenath #sanatandharma #bhakti #spirituality

### Day 3 Post 2
**On-image text:** बड़े हो गए तो पता चला, माँ "मुझे भूख नहीं" क्यों कहती थी। 🥺
**Caption:** वो झूठ सबसे बड़ा प्यार था, जो हमें कभी समझ ही नहीं आया। माँ का हर त्याग चुपचाप था, कभी हिसाब के साथ नहीं। 🥺

#maun_sabad #maa #मातृत्व #emotionalquotes #hindiquotes #family #sacrifice

### Day 3 Post 3
**On-image text:** चाँद भी अधूरा है, फिर भी सबसे ख़ूबसूरत है। 🌙
**Caption:** पूरा होना ज़रूरी नहीं, असली होना काफ़ी है। अधूरा चाँद भी रात को रोशन कर देता है। 🌙

#maun_sabad #motivation #selflove #hindiquotes #innerpeace #nightsky #imperfection

### Day 3 Post 4
**On-image text:** जिसने बेज़ुबान से प्यार किया, उसने भगवान से बात कर ली। ❤️
**Caption:** जो ज़ुबान नहीं माँगते, उनकी दुआ सबसे सच्ची होती है। किसी बेज़ुबान को खिलाना, सीधे ऊपर तक पहुँचता है। ❤️

#maun_sabad #compassion #animallove #sanatandharma #bhakti #kindnessmatters #hindiquotes

### Day 3 Post 5
**On-image text:** बचपन में जल्दी बड़े होना था, अब बड़े होकर बचपन ढूंढ रहे हैं!
**Caption:** वो गलियाँ, वो शाम का खेल, वो बेफ़िक्री — अब सिर्फ़ यादों में बचे हैं। बड़े होकर समझ आया, बचपन ही असली दौलत थी।

#maun_sabad #nostalgia #bachpanyaadein #hindiquotes #lifelessons #childhoodmemories #sunsetthoughts

### Day 3 Post 6
**On-image text:** हर किसी को सफ़ाई देना ज़रुरी नहीं, कुछ लोग सिर्फ़ ग़लत समझने के लिए सुनते हैं।
**Caption:** जो समझना ही नहीं चाहते, उन्हें सफ़ाई देकर थकना बेकार है। अपनी ऊर्जा उन पर लगाइए जो सच में सुनते हैं।

#maun_sabad #selfrespect #hindiquotes #lifelessons #motivation #innerpeace #boundaries

### Day 3 Post 7
**On-image text:** शहर में सब कुछ मिला, बस माँ के हाथ की वो गरम रोटी नहीं मिली।
**Caption:** शहर कमाने के लिए सब कुछ देता है, बस वो घर जैसा सुकून नहीं दे पाता। माँ की रसोई की याद, हर टिफ़िन में आ ही जाती है।

#maun_sabad #maa #homesick #hindiquotes #emotionalquotes #citylife #maakakhana

### Day 3 Post 8
**On-image text:** रिश्ते टूटते नहीं, बस धीरे-धीरे बात करना छोड़ देते हैं। 💔
**Caption:** कोई रिश्ता एक दिन में ख़त्म नहीं होता, वो रोज़ थोड़ी-थोड़ी ख़ामोशी से घुलता है। बात करना बंद मत कीजिए, रिश्ते इसी से ज़िंदा रहते हैं। 💔

#maun_sabad #relationships #hindiquotes #emotionalquotes #communication #life #heartbreak

### Day 3 Post 9
**On-image text:** इंतज़ार भी अजीब है, जानते हैं नहीं आओगे, फिर भी दरवाज़ा खुला रखते हैं।
**Caption:** दिल कभी हिसाब नहीं समझता, वो बस उम्मीद में दरवाज़ा खुला छोड़ देता है। इंतज़ार तर्क से नहीं, प्यार से होता है।

#maun_sabad #waiting #hindiquotes #emotionalquotes #monsoonvibes #love #hope

### Day 3 Post 10
**On-image text:** अकेले चलना सीख लो, साथ वाले अक्सर मोड़ पर बदल जाते हैं।
**Caption:** रास्ता लंबा हो तो साथी बदल जाते हैं, पर जो अकेले चलना सीख लेता है, वो कभी रुकता नहीं। अपने पैरों पर भरोसा रखिए।

#maun_sabad #motivation #selfreliance #hindiquotes #lifelessons #strength #journey

### Day 4 Post 1
**On-image text:** मंदिर की घंटी से पहले, किसी भूखे की दुआ ले लो। 🙏
**Caption:** भगवान तक पहुँचने का सबसे छोटा रास्ता किसी भूखे का पेट भरना है। घंटी बजाने से पहले, एक दुआ कमा लीजिए। 🙏

#maun_sabad #seva #bhakti #sanatandharma #kindness #temple #spirituality

### Day 4 Post 2
**On-image text:** माँ रोती भी है तो प्याज़ का बहाना लेकर। 💔
**Caption:** माँ अपना दर्द भी इस तरह छुपाती है कि हमें शक तक नहीं होता। उसके आँसुओं का भी एक बहाना होता है, ताकि हम परेशान न हों। 💔

#maun_sabad #maa #मातृत्व #emotionalquotes #hindiquotes #sacrifice #family

### Day 4 Post 3
**On-image text:** सूरज रोज़ डूबता है, पर कभी उगना नहीं भूलता। ☀️
**Caption:** हर डूबते सूरज के पीछे एक नया सवेरा तय होता है। हार मानने से पहले सूरज से यही सीख लीजिए — वापसी पक्की है। ☀️

#maun_sabad #motivation #newbeginnings #hindiquotes #sunrise #hope #positivity

### Day 4 Post 4
**On-image text:** वफ़ा सीखनी हो तो, किसी गली के कुत्ते से सीखो। 💯
**Caption:** इंसान वफ़ा का दिखावा करते हैं, गली के कुत्ते उसे चुपचाप निभाते हैं। सबसे सच्चा प्यार अक्सर सबसे कम कीमती दिखता है। 💯

#maun_sabad #loyalty #animallove #streetdogs #hindiquotes #life #compassion

### Day 4 Post 5
**On-image text:** "भाई से लड़ाई भी ज़रूरी थी, वरना बचपन अधूरा लगता। 😄" — मौन शब्द
**Caption:** भाई-बहन की लड़ाई में भी उतना ही प्यार छुपा होता है जितना हँसी में। वो झगड़े आज सबसे प्यारी यादें बन चुके हैं। 😄

#maun_sabad #siblings #bachpanyaadein #hindiquotes #family #nostalgia #funmemories

### Day 4 Post 6
**On-image text:** सुकून चाहिए तो उम्मीदें कम कर दो। 🍃
**Caption:** जितनी उम्मीदें कम, उतनी शिकायतें कम। सुकून बाहर नहीं मिलता, वो उम्मीदों को हल्का करने से आता है। 🍃

#maun_sabad #peace #selfgrowth #hindiquotes #mindfulness #innerpeace #letgo

### Day 4 Post 7
**On-image text:** "जिस घर में माँ मुस्कुराती है, वहाँ भगवान को अलग से बुलाना नहीं पड़ता। ✨" — मौन शब्द
**Caption:** माँ की मुस्कान किसी भी घर की सबसे बड़ी पूजा है। जहाँ वो खुश है, वहाँ बरकत अपने आप चली आती है। ✨

#maun_sabad #maa #मातृत्व #sanatandharma #family #blessings #hindiquotes

### Day 4 Post 8
**On-image text:** जो वक़्त पर साथ न दे, उसका बाद में आना भी किस काम का।
**Caption:** साथ की असली क़ीमत उस पल में होती है जब उसकी सबसे ज़्यादा ज़रूरत हो। देर से आया साथ, अक्सर सिर्फ़ औपचारिकता रह जाता है।

#maun_sabad #relationships #hindiquotes #selfrespect #timing #lifelessons #emotionalquotes

### Day 4 Post 9
**On-image text:** "चाय ठंडी हो गई, पर तुम्हारी बातें आज भी गरम हैं। ☕" — मौन शब्द
**Caption:** कुछ बातचीत वक़्त के साथ ठंडी नहीं पड़तीं, वो यादों में उतनी ही गरम रहती हैं जितनी पहले दिन थीं। ☕

#maun_sabad #nostalgia #love #hindiquotes #memories #varanasi #emotionalquotes

### Day 4 Post 10
**On-image text:** "वक़्त बुरा है, मैं नहीं। 🔥" — मौन शब्द
**Caption:** हालात बदल सकते हैं, पर हिम्मत बदलनी नहीं चाहिए। बुरा वक़्त मेहमान है, आपकी पहचान नहीं। 🔥

#maun_sabad #motivation #strength #hindiquotes #resilience #selfbelief #fire

## Log
### 2026-10-19
- Posted #1 (Day 1 Post 1). Verified live via `INSTAGRAM_GET_IG_MEDIA`:
  permalink https://www.instagram.com/p/DesDPCZHcWC/, media_type IMAGE,
  caption matches drafted text exactly.
- User confirmed "start posting" and noted Day 4 batch now added to Drive
  (40 images total now, up from 20). Day 3 + Day 4 captions queued for
  drafting (2026-10-19).
- Day 3 + Day 4 captions (20 posts, rows 21-40) drafted same day. No
  seasonal/festival content found in this batch.
