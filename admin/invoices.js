/* Kryvex CRM — invoices + website enquiry inbox.
   Loads after app.js and extends it. */

/* ============================================================
   CONFIG — website enquiry inbox
   Paste your Apps Script /exec URL and the TOKEN you set in Code.gs.
   Leave INBOX_URL empty to hide the sync feature entirely.
   Safe to keep here: Cloudflare Access protects everything under /admin.
   ============================================================ */
const INBOX_URL   = '';
const INBOX_TOKEN = '';

/* Your details, printed on every invoice. Edit these. */
const BIZ = {
  name:    'Kryvex Media',
  tagline: 'Global Digital Marketing',
  address: 'House No. 01, Women\'s College Road\nMadhubani, Bihar - 847211\nIndia',
  email:   'info@kryvexmedia.com',
  phone:   '+91 9110170824',
  web:     'kryvexmedia.com',
  gstin:   '',                       // leave blank if not registered
  bank:    'Account name: Aman Kumar Shukla\nAccount no.: 68013501576\nIFSC: MAHB0001712\nUPI: 8292779933@ybl',
  terms:   'Payment due within 7 days. Late payments may pause active work.'
};

const INV_STATUS = ['Draft', 'Sent', 'Paid', 'Cancelled'];

/* Wordmark is two-tone, matching the site logo: "KRYVEX" solid, " MEDIA" lighter. */
const brandFirst = () => BIZ.name.split(' ')[0];
const brandRest  = () => BIZ.name.split(' ').slice(1).join(' ')
                            ? ' ' + BIZ.name.split(' ').slice(1).join(' ') : '';

/* ---------- helpers ---------- */
function invTotals(inv) {
  const items = inv.items || [];
  const sub = items.reduce((s, it) => s + (Number(it.qty || 0) * Number(it.rate || 0)), 0);
  const gst = sub * (Number(inv.gstRate || 0) / 100);
  return { sub: sub, gst: gst, total: sub + gst };
}

function nextInvNo() {
  const yr = new Date().getFullYear();
  const prefix = 'KM-' + yr + '-';
  let max = 0;
  (db.invoices || []).forEach(i => {
    const m = String(i.number || '').match(new RegExp('^' + prefix + '(\\d+)$'));
    if (m) max = Math.max(max, parseInt(m[1], 10));
  });
  return prefix + String(max + 1).padStart(3, '0');
}

const invStatusPill = v => {
  const m = { Draft: 'p-mute', Sent: 'p-warn', Paid: 'p-good', Cancelled: 'p-mute' };
  return `<span class="pill ${m[v] || 'p-mute'}">${esc(v)}</span>`;
};

/* ---------- list view ---------- */
function viewInvoices() {
  const f = filters.invoices;
  const rows = (db.invoices || []).filter(i => {
    const hay = [i.number, i.client, i.business, i.notes].join(' ').toLowerCase();
    return (!f.q || hay.includes(f.q.toLowerCase())) && (!f.status || i.status === f.status);
  }).sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  const billed = rows.reduce((s, i) => s + (i.status === 'Cancelled' ? 0 : invTotals(i).total), 0);
  const unpaid = rows.filter(i => i.status === 'Sent').reduce((s, i) => s + invTotals(i).total, 0);

  return `
  <div class="page-head"><h1>Invoices</h1><span class="spacer"></span>
    <div class="filters">
      <input type="search" id="f-inv-q" placeholder="Search number, client…" value="${esc(f.q)}">
      <select id="f-inv-status">
        <option value="">All statuses</option>
        ${INV_STATUS.map(s => `<option ${f.status === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>
    <button class="btn btn-primary btn-sm" data-new="invoice">+ New invoice</button>
  </div>

  <div class="kpis" style="grid-template-columns:repeat(2,1fr);max-width:520px">
    <div class="kpi"><div class="kpi-rail"></div>
      <div class="kpi-label">Billed (filtered)</div><div class="kpi-val num">${inr(billed)}</div></div>
    <div class="kpi ${unpaid ? 'is-warn' : 'is-good'}"><div class="kpi-rail"></div>
      <div class="kpi-label">Sent, awaiting payment</div><div class="kpi-val num">${inr(unpaid)}</div></div>
  </div>

  <div class="card">
    ${rows.length ? `<div class="table-scroll"><table>
      <thead><tr>
        <th>Invoice</th><th>Client</th><th>Date</th><th>Due</th>
        <th class="right">Amount</th><th>Status</th><th class="right"></th>
      </tr></thead>
      <tbody>${rows.map(i => {
        const t = invTotals(i);
        const overdue = i.status === 'Sent' && i.due && daysFrom(i.due) < 0;
        return `<tr>
          <td class="cell-strong num">${esc(i.number)}</td>
          <td><div class="cell-strong">${esc(i.client)}</div>
              <div class="cell-sub">${esc(i.business || '')}</div></td>
          <td>${fmtDate(i.date)}</td>
          <td>${fmtDate(i.due)}${overdue ? `<div class="cell-sub" style="color:var(--bad)">${Math.abs(daysFrom(i.due))}d late</div>` : ''}</td>
          <td class="right num cell-strong">${inr(t.total)}</td>
          <td>${invStatusPill(i.status)}</td>
          <td class="right"><div class="row-actions">
            <button class="btn btn-sm" data-print-inv="${i.id}">Print / PDF</button>
            <button class="btn btn-sm" data-edit-inv="${i.id}">Edit</button>
          </div></td>
        </tr>`;
      }).join('')}
      </tbody></table></div>`
    : `<div class="empty"><b>No invoices match</b>${(db.invoices || []).length ? 'Try clearing the filters.' : 'Create your first invoice — line items, GST and totals are handled for you.'}</div>`}
  </div>`;
}

/* ---------- invoice form ---------- */
function itemRow(it = {}) {
  return `<tr class="inv-item">
    <td><input class="i-desc" placeholder="Service or deliverable" value="${esc(it.desc || '')}"></td>
    <td><input class="i-qty num" type="number" min="0" step="1" value="${esc(it.qty != null ? it.qty : 1)}"></td>
    <td><input class="i-rate num" type="number" min="0" step="100" value="${esc(it.rate != null ? it.rate : '')}"></td>
    <td class="right num i-line">₹0</td>
    <td><button type="button" class="btn btn-sm btn-danger i-del" aria-label="Remove line">×</button></td>
  </tr>`;
}

function fInvoice(inv = {}) {
  const items = (inv.items && inv.items.length) ? inv.items : [{ desc: '', qty: 1, rate: '' }];
  const projOpts = ['<option value="">— none —</option>'].concat(
    db.projects.map(p => `<option value="${p.id}" ${p.id === inv.projectId ? 'selected' : ''}>${esc(p.client)}${p.service ? ' — ' + esc(p.service) : ''}</option>`)
  ).join('');

  return `
  <div class="grid2">
    <div class="field"><label>Invoice no.</label><input name="number" value="${esc(inv.number || nextInvNo())}"></div>
    <div class="field"><label>Status</label><select name="status">${opts(INV_STATUS, inv.status || 'Draft')}</select></div>
    <div class="field"><label>Client name *</label><input name="client" required value="${esc(inv.client || '')}"></div>
    <div class="field"><label>Business</label><input name="business" value="${esc(inv.business || '')}"></div>
    <div class="field"><label>Invoice date</label><input name="date" type="date" value="${esc(inv.date || today())}"></div>
    <div class="field"><label>Due date</label><input name="due" type="date" value="${esc(inv.due || '')}"></div>
  </div>

  <div class="field">
    <label>Link to project <span style="font-weight:600;text-transform:none;letter-spacing:0">(optional)</span></label>
    <select name="projectId">${projOpts}</select>
    <span class="hint">Linking lets you record the payment against that project in one click.</span>
  </div>

  <div class="field">
    <label>Bill to (address)</label>
    <textarea name="billTo" placeholder="Client address, GSTIN…">${esc(inv.billTo || '')}</textarea>
  </div>

  <label style="font-size:11.5px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)">Line items</label>
  <div class="table-scroll" style="margin:8px 0 10px">
    <table class="inv-items-table" style="min-width:520px">
      <thead><tr><th>Description</th><th style="width:80px">Qty</th><th style="width:120px">Rate</th><th class="right" style="width:110px">Amount</th><th style="width:44px"></th></tr></thead>
      <tbody id="inv-items">${items.map(itemRow).join('')}</tbody>
    </table>
  </div>
  <button type="button" class="btn btn-sm" id="inv-add-item">+ Add line</button>

  <div class="grid2" style="margin-top:18px">
    <div class="field"><label>GST %</label>
      <input name="gstRate" id="inv-gst" type="number" min="0" step="0.5" value="${esc(inv.gstRate != null ? inv.gstRate : '')}">
      <span class="hint">Leave blank or 0 if not applicable.</span>
    </div>
    <div class="field"><label>Totals</label>
      <div id="inv-totals" class="inv-totals num">—</div>
    </div>
  </div>

  <div class="field"><label>Notes on invoice</label><textarea name="notes">${esc(inv.notes || '')}</textarea></div>`;
}

/* live totals + add/remove lines inside the modal */
function wireInvoiceForm() {
  const body = $('#modal-body');
  if (!body || !$('#inv-items')) return;

  function recalc() {
    let sub = 0;
    $$('#inv-items .inv-item').forEach(tr => {
      const q = Number(tr.querySelector('.i-qty').value || 0);
      const r = Number(tr.querySelector('.i-rate').value || 0);
      const line = q * r;
      sub += line;
      tr.querySelector('.i-line').textContent = inr(line);
    });
    const rate = Number(($('#inv-gst') || {}).value || 0);
    const gst = sub * rate / 100;
    $('#inv-totals').innerHTML =
      `<div>Subtotal <b>${inr(sub)}</b></div>` +
      (rate ? `<div>GST ${rate}% <b>${inr(gst)}</b></div>` : '') +
      `<div class="inv-total-big">Total <b>${inr(sub + gst)}</b></div>`;
  }

  body.addEventListener('input', e => {
    if (e.target.matches('.i-qty,.i-rate,#inv-gst')) recalc();
  });
  body.addEventListener('click', e => {
    if (e.target.id === 'inv-add-item') {
      $('#inv-items').insertAdjacentHTML('beforeend', itemRow());
      recalc();
    }
    if (e.target.classList.contains('i-del')) {
      const rows = $$('#inv-items .inv-item');
      if (rows.length > 1) e.target.closest('tr').remove();
      else { // keep one blank row rather than an empty table
        const tr = rows[0];
        tr.querySelector('.i-desc').value = '';
        tr.querySelector('.i-qty').value = 1;
        tr.querySelector('.i-rate').value = '';
      }
      recalc();
    }
  });
  recalc();
}

function readInvoiceForm() {
  const d = formData();
  d.items = $$('#inv-items .inv-item').map(tr => ({
    desc: tr.querySelector('.i-desc').value.trim(),
    qty:  tr.querySelector('.i-qty').value.trim(),
    rate: tr.querySelector('.i-rate').value.trim()
  })).filter(it => it.desc || it.rate);
  return d;
}

function newInvoice() {
  openModal('New invoice', fInvoice(), () => {
    const d = readInvoiceForm();
    if (!d.client) return toast('Client name is required');
    if (!d.items.length) return toast('Add at least one line item');
    db.invoices.push({ id: uid(), ...d });
    save(); closeModal(); view = 'invoices'; render(); toast('Invoice created');
  });
  wireInvoiceForm();
}

function editInvoice(id) {
  const inv = db.invoices.find(x => x.id === id);
  if (!inv) return;
  openModal('Edit invoice ' + (inv.number || ''), fInvoice(inv),
    () => {
      const d = readInvoiceForm();
      if (!d.items.length) return toast('Add at least one line item');
      Object.assign(inv, d);
      save(); closeModal(); render(); toast('Invoice updated');
    },
    () => { db.invoices = db.invoices.filter(x => x.id !== id); save(); closeModal(); render(); toast('Invoice deleted'); });
  wireInvoiceForm();

  // "Record as payment" shortcut for linked invoices
  if (inv.projectId) {
    const foot = $('#modal-foot-extra');
    if (foot) {
      foot.innerHTML = `<button type="button" class="btn btn-sm" id="inv-to-pay">Record as payment</button>`;
      $('#inv-to-pay').addEventListener('click', () => {
        const t = invTotals(inv);
        db.payments.push({
          id: uid(), projectId: inv.projectId, amount: String(Math.round(t.total)),
          status: 'Pending', date: inv.due || today(), method: 'Bank transfer',
          invoice: inv.number, notes: 'From invoice ' + inv.number
        });
        inv.status = 'Sent';
        save(); closeModal(); view = 'payments'; render();
        toast('Added as a pending payment');
      });
    }
  }
}

/* ---------- printable invoice ---------- */
function printInvoice(id) {
  const inv = db.invoices.find(x => x.id === id);
  if (!inv) return;
  const t = invTotals(inv);
  const nl = s => esc(s).replace(/\n/g, '<br>');

  $('#print-root').innerHTML = `
  <div class="inv-sheet">
    <div class="inv-head">
      <div>
        <div class="inv-brand">
          <span class="inv-mark">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
              <rect x="9" y="5" width="6" height="20" rx="1.5" fill="#3B1C6C"/>
              <path d="M15 12.5 L26 4 L20.5 14.5 Z" fill="#7046B6"/>
              <path d="M15 17.5 L26 26 L20.5 14.5 Z" fill="#A272F5"/>
            </svg>
          </span>
          <span class="inv-word">
            <b>${esc(brandFirst())}<span>${esc(brandRest())}</span></b>
            <small>${esc(BIZ.tagline)}</small>
          </span>
        </div>
        <div class="inv-from">${nl(BIZ.address)}</div>
        <div class="inv-from">${esc(BIZ.email)} · ${esc(BIZ.phone)}<br>${esc(BIZ.web)}
        ${BIZ.gstin ? '<br>GSTIN: ' + esc(BIZ.gstin) : ''}</div>
      </div>
      <div class="inv-meta">
        <h1>Invoice</h1>
        <table>
          <tr><td>Invoice no.</td><th class="num">${esc(inv.number || '—')}</th></tr>
          <tr><td>Date</td><th>${fmtDate(inv.date)}</th></tr>
          ${inv.due ? `<tr><td>Due</td><th>${fmtDate(inv.due)}</th></tr>` : ''}
          <tr><td>Status</td><th>${esc(inv.status || 'Draft')}</th></tr>
        </table>
      </div>
    </div>

    <div class="inv-billto">
      <div class="inv-label">Bill to</div>
      <div class="inv-client">${esc(inv.client)}</div>
      ${inv.business ? `<div>${esc(inv.business)}</div>` : ''}
      ${inv.billTo ? `<div class="inv-addr">${nl(inv.billTo)}</div>` : ''}
    </div>

    <table class="inv-lines">
      <thead><tr>
        <th>Description</th><th class="right">Qty</th>
        <th class="right">Rate</th><th class="right">Amount</th>
      </tr></thead>
      <tbody>
        ${(inv.items || []).map(it => `<tr>
          <td>${esc(it.desc)}</td>
          <td class="right num">${esc(it.qty)}</td>
          <td class="right num">${inr(it.rate)}</td>
          <td class="right num">${inr(Number(it.qty || 0) * Number(it.rate || 0))}</td>
        </tr>`).join('')}
      </tbody>
    </table>

    <div class="inv-sum">
      <table>
        <tr><td>Subtotal</td><td class="right num">${inr(t.sub)}</td></tr>
        ${Number(inv.gstRate) ? `<tr><td>GST ${esc(inv.gstRate)}%</td><td class="right num">${inr(t.gst)}</td></tr>` : ''}
        <tr class="inv-grand"><td>Total due</td><td class="right num">${inr(t.total)}</td></tr>
      </table>
    </div>

    ${inv.notes ? `<div class="inv-note"><div class="inv-label">Notes</div>${nl(inv.notes)}</div>` : ''}

    <div class="inv-foot">
      <div><div class="inv-label">Payment details</div>${nl(BIZ.bank)}</div>
      <div><div class="inv-label">Terms</div>${nl(BIZ.terms)}</div>
    </div>
    <div class="inv-thanks">Thank you for your business.</div>
    <div class="inv-privacy">Your data and account credentials are kept strictly confidential and are never shared with third parties.</div>
  </div>`;

  document.body.classList.add('printing');
  window.print();
  setTimeout(() => document.body.classList.remove('printing'), 400);
}

/* ---------- website enquiry inbox ---------- */
const inboxConfigured = () => !!(INBOX_URL && INBOX_TOKEN);

async function syncInbox(silent) {
  if (!inboxConfigured()) {
    if (!silent) toast('Inbox not configured — see admin/README.md');
    return;
  }
  const btn = $('#btn-sync');
  if (btn) { btn.disabled = true; btn.textContent = 'Syncing…'; }
  try {
    const r = await fetch(INBOX_URL + '?token=' + encodeURIComponent(INBOX_TOKEN));
    const j = await r.json();
    if (j.error) throw new Error(j.error);

    const seen = {};
    db.leads.forEach(l => { if (l.srcId) seen[l.srcId] = 1; });

    const fresh = (j.leads || []).filter(x => x.id && !seen[x.id]);
    fresh.forEach(x => {
      db.leads.push({
        id: uid(),
        srcId: x.id,
        created: (x.received || '').slice(0, 10) || today(),
        name: x.name || '(no name given)',
        business: '',
        phone: x.phone || '',
        email: x.email || '',
        city: '',
        service: '',
        source: x.source || 'Website form',
        value: '',
        status: 'New',
        followUp: today(),
        notes: (x.requirement || '') + (x.page ? '\n\nFrom: ' + x.page : '')
      });
    });

    if (fresh.length) {
      save();
      // tell the sheet these are imported so they don't come back
      const ids = fresh.map(x => x.srcId).join(',');
      fetch(INBOX_URL + '?token=' + encodeURIComponent(INBOX_TOKEN) + '&handled=' + encodeURIComponent(ids))
        .catch(() => {});
      render();
      toast(fresh.length + ' new enquir' + (fresh.length === 1 ? 'y' : 'ies') + ' imported');
    } else if (!silent) {
      toast('No new enquiries');
    }
  } catch (e) {
    if (!silent) toast('Could not reach the inbox');
  } finally {
    const b = $('#btn-sync');
    if (b) { b.disabled = false; b.textContent = 'Sync enquiries'; }
  }
}

/* auto-check once per session, quietly */
if (inboxConfigured() && sessionStorage.getItem('kryvex_crm_ok') === '1') {
  setTimeout(() => syncInbox(true), 800);
}
