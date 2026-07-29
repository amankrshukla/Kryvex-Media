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

## Website enquiries → CRM leads (setup required)

Contact-form submissions can't reach the CRM on their own — the visitor is on
their browser, your CRM data is in yours. A shared inbox in the middle fixes
this: a Google Sheet, written to by the website and read by the CRM.

**One-time setup, about 10 minutes:**

1. Create a new Google Sheet (any name — this becomes your enquiry log).
2. In it: **Extensions → Apps Script**. Delete the placeholder code.
3. Paste in the contents of `admin/apps-script/Code.gs`.
4. Near the top, change `TOKEN` to any random string of your own, e.g.
   `kx-8f3d-inbox-2026`. Save.
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**  ← required, the public form must be able to post
   - Deploy, authorise when prompted, and **copy the `/exec` URL**.
6. Paste that URL into **two** files:
   - `contact/index.html` → `const KX_CRM_ENDPOINT = '…'`
   - `admin/invoices.js` → `const INBOX_URL = '…'`
7. In `admin/invoices.js`, set `INBOX_TOKEN` to the same random string from step 4.
8. Commit and push.

**Then:** every contact-form submission lands as a row in the Sheet *and* still
emails you as before. In the CRM, **Sync enquiries** pulls new ones in as leads
with status New and a follow-up date of today. It also runs automatically once
per session.

Imported enquiries are marked `handled` in the Sheet so they never import twice.
Nothing is deleted — the Sheet stays as a full audit trail.

**On the token:** it's stored in `admin/invoices.js`, which is publicly
downloadable in principle — but Cloudflare Access protects everything under
`/admin`, so unauthenticated requests never receive that file. The token only
guards *reading* enquiries; posting has to stay open for the form to work, and
is spam-filtered by the honeypot field.

---

## Invoices

**New invoice** auto-numbers as `KM-YYYY-NNN` (continuing from the highest
existing number that year). Add as many line items as you need — qty × rate,
with a running subtotal, optional GST, and total updating live as you type.

**Print / PDF** opens your browser's print dialog with a clean A4 invoice.
Choose "Save as PDF" to get a file to email. Everything else on the page is
hidden in print, so what you see is what you send.

**Linking to a project** is optional but useful: a linked invoice gets a
**Record as payment** button that creates a matching Pending payment on that
project, dated to the invoice due date, and marks the invoice Sent. That's the
one action that connects a document to your actual money tracking — invoices
alone never touch the payment figures, so nothing gets double-counted.

**Before sending your first real invoice**, edit the `BIZ` block at the top of
`admin/invoices.js`:

```js
const BIZ = {
  name: 'Kryvex Media',
  address: '…your address…',
  gstin: '',        // your GSTIN, or leave blank
  bank:  '…account name / number / IFSC / UPI…',
  terms: '…your payment terms…'
};
```

Those details print on every invoice. The bank block ships with placeholder
dashes — fill it in or clients won't know where to pay.

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
