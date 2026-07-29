# Kryvex CRM — `/admin`

Internal tool for tracking leads, client projects, and payments.
Lives at **https://kryvexmedia.com/admin/**

---

## Security — read this first

These files are part of a public repository and are served by GitHub Pages, so
**anyone can download `app.js` and read it.** The passcode screen deters casual
visitors, but it is not real access control on its own.

There is no client data in this repo — records are stored in your browser's
`localStorage`, on your device only. So the risk is not "someone downloads the
client list from the server"; there is no server copy. The risk is that the tool
is reachable and looks official.

**To make `/admin` genuinely private, put Cloudflare Access in front of it.**
Setup is below and takes about five minutes.

---

## Cloudflare Access setup (recommended)

This makes Cloudflare demand a real email login *before* the request ever
reaches the site. Free for up to 50 users.

1. Cloudflare dashboard → **Zero Trust** (left sidebar)
2. **Access → Applications → Add an application → Self-hosted**
3. Fill in:
   - **Application name**: `Kryvex CRM`
   - **Session duration**: 24 hours (or your preference)
   - **Public hostname**: subdomain blank, domain `kryvexmedia.com`, **path** `admin`
4. Next → **Add a policy**:
   - **Policy name**: `Owner only`
   - **Action**: Allow
   - **Include** → selector **Emails** → `amankrshuklaa@gmail.com`
     (add any team members who should get in)
5. Save. Visit `kryvexmedia.com/admin/` — Cloudflare now asks for your email,
   sends a one-time code, and only lets you through after you enter it.

After this is live you can leave the app passcode on as a second layer, or
remove it — Cloudflare is doing the real work.

---

## Change the app passcode

Default passcode: `kryvex2026` — **change it.**

1. Open any browser console (F12 → Console) and run:

   ```js
   crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR-NEW-CODE'))
     .then(b => console.log([...new Uint8Array(b)]
       .map(x => x.toString(16).padStart(2,'0')).join('')));
   ```

2. Copy the long hex string it prints.
3. In `admin/app.js`, replace the value of `PASS_HASH` (near the top) with it.
4. Commit and push.

The plain passcode never appears in the code — only its hash.

---

## Your data — where it lives and how to protect it

Records are saved in `localStorage` under the key `kryvex_crm_v1`.

**This means:**
- Data is tied to **one browser on one device**. Opening the CRM on your phone
  will show an empty CRM — it does not sync.
- Clearing browser data / "Clear cookies and site data" for kryvexmedia.com
  **will erase your CRM records.**

**So: use the Backup button regularly.** It downloads a `.json` file with
everything in it. Restore re-imports that file (replacing current contents).
Keep backups somewhere safe — Google Drive, or wherever you keep business files.

If you want real multi-device sync, that needs a database behind it. Ask and it
can be added — the app is structured so the storage layer swaps out cleanly.

---

## Using it

**Dashboard** — outstanding money, received this month, overdue payment count,
open leads. Plus three action lists: payments to chase, follow-ups due, and
active projects with payment progress.

**Leads** — pipeline from New → Contacted → Proposal Sent → Won / Lost. Set a
follow-up date and it surfaces on the dashboard when due (and turns red when
overdue). **Convert** marks the lead Won and opens a pre-filled new project.

**Projects** — client, service, total value, paid, balance, and a progress bar.
**+ Payment** records money against that project directly.

**Payments** — every payment in or expected. Set status **Pending** with a date
to record something as due; once that date passes it shows as **Overdue** and
appears on the dashboard. **Mark received** settles it in one click.

Totals are derived, never typed: a project's paid amount is always the sum of
its Received payments, so the numbers can't drift out of sync.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Page shell, nav, modal container |
| `styles.css` | All styling, light + dark themes |
| `app.js` | Data model, views, storage, login gate |

No build step, no dependencies. Edit and push.
