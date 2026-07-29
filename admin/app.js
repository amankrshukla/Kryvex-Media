/* Kryvex CRM — leads, projects, payments.
   Data lives in this browser's localStorage. Use Backup regularly.
   The passcode gate below deters casual access only; real protection
   comes from Cloudflare Access sitting in front of /admin (see README). */

/* ---------- config ---------- */
// SHA-256 of the passcode. Default passcode is "kryvex2026".
// To change it, run in any browser console:
//   crypto.subtle.digest('SHA-256',new TextEncoder().encode('YOUR-NEW-CODE'))
//     .then(b=>console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
// then paste the result here.
const PASS_HASH = '31e909060ea069462bb02e2a11e8d8b6f9e28b564bc48b58d146862e017f9054';

const KEY = 'kryvex_crm_v1';
const LEAD_STATUS = ['New', 'Contacted', 'Proposal Sent', 'Won', 'Lost'];
const PROJ_STATUS = ['Active', 'On Hold', 'Completed'];
const PAY_STATUS  = ['Received', 'Pending'];
const SERVICES = ['SEO', 'Local SEO', 'Google Ads', 'Meta Ads', 'Social Media',
                  'Web Design', 'Web Development', 'Content Marketing',
                  'Email Marketing', 'Graphics Design', 'Other'];
const SOURCES = ['Website form', 'Chat widget', 'Referral', 'WhatsApp', 'Call',
                 'Instagram', 'LinkedIn', 'Walk-in', 'Other'];

/* ---------- state ---------- */
let db = { leads: [], projects: [], payments: [], invoices: [] };
let view = 'dashboard';
let filters = {
  leads:    { q: '', status: '' },
  projects: { q: '', status: '' },
  payments: { q: '', status: '' },
  invoices: { q: '', status: '' }
};

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- storage ---------- */
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      db = { leads: p.leads || [], projects: p.projects || [],
             payments: p.payments || [], invoices: p.invoices || [] };
    }
  } catch (e) { console.warn('load failed', e); }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch (e) { toast('Could not save — storage may be full'); }
}
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- helpers ---------- */
const inr = n => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => new Date().toISOString().slice(0, 10);

function fmtDate(d) {
  if (!d) return '—';
  const dt = new Date(d + 'T00:00:00');
  if (isNaN(dt)) return '—';
  return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function daysFrom(d) {
  if (!d) return null;
  const a = new Date(d + 'T00:00:00'), b = new Date(today() + 'T00:00:00');
  return Math.round((a - b) / 86400000);
}
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 2400);
}

/* money per project */
const paidFor    = id => db.payments.filter(p => p.projectId === id && p.status === 'Received')
                                    .reduce((s, p) => s + Number(p.amount || 0), 0);
const pendingFor = id => db.payments.filter(p => p.projectId === id && p.status === 'Pending')
                                    .reduce((s, p) => s + Number(p.amount || 0), 0);
const projName   = id => { const p = db.projects.find(x => x.id === id); return p ? p.client : 'Unknown project'; };

/* a Pending payment whose date has passed is overdue */
const isOverdue = p => p.status === 'Pending' && p.date && daysFrom(p.date) < 0;

function statusPill(v) {
  const m = {
    'New': 'p-info', 'Contacted': 'p-warn', 'Proposal Sent': 'p-warn',
    'Won': 'p-good', 'Lost': 'p-mute',
    'Active': 'p-good', 'On Hold': 'p-warn', 'Completed': 'p-info',
    'Received': 'p-good', 'Pending': 'p-warn', 'Overdue': 'p-bad'
  };
  return `<span class="pill ${m[v] || 'p-mute'}">${esc(v)}</span>`;
}

/* ---------- login gate ---------- */
async function sha256(s) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}
function unlocked() { return sessionStorage.getItem('kryvex_crm_ok') === '1'; }

function renderLogin() {
  document.querySelector('.top').style.display = 'none';
  $('#app').innerHTML = `
    <div style="max-width:380px;margin:8vh auto 0">
      <div class="card" style="box-shadow:var(--shadow)">
        <div style="padding:34px 30px">
          <div style="display:flex;align-items:center;gap:11px;margin-bottom:22px">
            <div class="brand-tile" style="width:38px;height:38px;border-radius:10px">
              <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
                <rect x="9" y="5" width="6" height="20" rx="1.5" fill="#fff" opacity=".55"/>
                <path d="M15 12.5 L26 4 L20.5 14.5 Z" fill="#fff"/>
                <path d="M15 17.5 L26 26 L20.5 14.5 Z" fill="#fff" opacity=".8"/>
              </svg>
            </div>
            <div>
              <div style="font-weight:800;font-size:16px;letter-spacing:-.01em">Kryvex CRM</div>
              <div style="font-size:12px;color:var(--muted);font-weight:600">Internal access only</div>
            </div>
          </div>
          <form id="login-form">
            <div class="field">
              <label for="pw">Passcode</label>
              <input type="password" id="pw" autocomplete="current-password" required autofocus>
            </div>
            <div id="login-err" style="display:none;color:var(--bad);font-size:12.5px;font-weight:700;margin-bottom:12px">
              Incorrect passcode.
            </div>
            <button class="btn btn-primary" type="submit" style="width:100%;justify-content:center">Unlock</button>
          </form>
        </div>
      </div>
      <p style="text-align:center;color:var(--muted);font-size:11.5px;margin-top:16px;font-weight:600;line-height:1.6">
        Authorised users only. All access is logged by Cloudflare.
      </p>
    </div>`;

  $('#login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const ok = (await sha256($('#pw').value)) === PASS_HASH;
    if (ok) {
      sessionStorage.setItem('kryvex_crm_ok', '1');
      document.querySelector('.top').style.display = '';
      render();
    } else {
      $('#login-err').style.display = 'block';
      $('#pw').value = '';
      $('#pw').focus();
    }
  });
}

/* ---------- dashboard ---------- */
function viewDashboard() {
  const openLeads = db.leads.filter(l => !['Won', 'Lost'].includes(l.status));
  const active    = db.projects.filter(p => p.status === 'Active');
  const overdue   = db.payments.filter(isOverdue);

  const outstanding = db.projects.reduce((s, p) => s + Math.max(0, Number(p.value || 0) - paidFor(p.id)), 0);
  const thisMonth = db.payments.filter(p =>
    p.status === 'Received' && p.date && p.date.slice(0, 7) === today().slice(0, 7)
  ).reduce((s, p) => s + Number(p.amount || 0), 0);

  const followUps = db.leads
    .filter(l => l.followUp && !['Won', 'Lost'].includes(l.status))
    .sort((a, b) => a.followUp.localeCompare(b.followUp))
    .slice(0, 6);

  const isEmpty = !db.leads.length && !db.projects.length && !db.payments.length;

  return `
  <div class="page-head"><h1>Dashboard</h1><span class="spacer"></span>
    <button class="btn btn-primary btn-sm" data-new="lead">+ New lead</button>
  </div>

  <div class="kpis">
    <div class="kpi ${outstanding > 0 ? 'is-warn' : 'is-good'}"><div class="kpi-rail"></div>
      <div class="kpi-label">Outstanding</div>
      <div class="kpi-val num">${inr(outstanding)}</div>
      <div class="kpi-sub">across ${db.projects.length} project${db.projects.length === 1 ? '' : 's'}</div>
    </div>
    <div class="kpi is-good"><div class="kpi-rail"></div>
      <div class="kpi-label">Received this month</div>
      <div class="kpi-val num">${inr(thisMonth)}</div>
      <div class="kpi-sub">${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</div>
    </div>
    <div class="kpi ${overdue.length ? 'is-bad' : ''}"><div class="kpi-rail"></div>
      <div class="kpi-label">Overdue payments</div>
      <div class="kpi-val num">${overdue.length}</div>
      <div class="kpi-sub">${overdue.length ? inr(overdue.reduce((s, p) => s + Number(p.amount || 0), 0)) + ' unpaid' : 'nothing overdue'}</div>
    </div>
    <div class="kpi"><div class="kpi-rail"></div>
      <div class="kpi-label">Open leads</div>
      <div class="kpi-val num">${openLeads.length}</div>
      <div class="kpi-sub">${active.length} active project${active.length === 1 ? '' : 's'}</div>
    </div>
  </div>

  ${isEmpty ? `
  <div class="card"><div class="empty">
    <b>Nothing here yet</b>
    Add your first lead, or load a few sample rows to see how it works.
    <div style="margin-top:18px;display:flex;gap:9px;justify-content:center">
      <button class="btn btn-primary btn-sm" data-new="lead">+ New lead</button>
      <button class="btn btn-sm" id="btn-seed">Load sample data</button>
    </div>
  </div></div>` : ''}

  ${overdue.length ? `
  <div class="card">
    <div class="card-head"><h2>Needs chasing</h2><span class="spacer"></span>
      <button class="btn btn-sm" data-goto="payments">View all payments</button>
    </div>
    <div class="table-scroll"><table>
      <thead><tr><th>Client</th><th>Invoice</th><th class="right">Amount</th><th>Was due</th><th class="right"></th></tr></thead>
      <tbody>${overdue.sort((a, b) => a.date.localeCompare(b.date)).map(p => `
        <tr>
          <td class="cell-strong">${esc(projName(p.projectId))}</td>
          <td>${esc(p.invoice || '—')}</td>
          <td class="right num cell-strong">${inr(p.amount)}</td>
          <td><span class="pill p-bad">${Math.abs(daysFrom(p.date))}d late · ${fmtDate(p.date)}</span></td>
          <td class="right"><button class="btn btn-sm btn-primary" data-paid="${p.id}">Mark received</button></td>
        </tr>`).join('')}
      </tbody>
    </table></div>
  </div>` : ''}

  ${followUps.length ? `
  <div class="card">
    <div class="card-head"><h2>Follow-ups due</h2><span class="spacer"></span>
      <button class="btn btn-sm" data-goto="leads">View all leads</button>
    </div>
    <div class="table-scroll"><table>
      <thead><tr><th>Lead</th><th>Service</th><th>Status</th><th>Follow up</th><th class="right"></th></tr></thead>
      <tbody>${followUps.map(l => {
        const d = daysFrom(l.followUp);
        const cls = d < 0 ? 'p-bad' : d === 0 ? 'p-warn' : 'p-mute';
        const lbl = d < 0 ? `${Math.abs(d)}d overdue` : d === 0 ? 'today' : `in ${d}d`;
        return `<tr>
          <td><div class="cell-strong">${esc(l.name)}</div>
              <div class="cell-sub">${esc(l.business || l.phone || '')}</div></td>
          <td>${esc(l.service || '—')}</td>
          <td>${statusPill(l.status)}</td>
          <td><span class="pill ${cls}">${lbl} · ${fmtDate(l.followUp)}</span></td>
          <td class="right"><button class="btn btn-sm" data-edit-lead="${l.id}">Open</button></td>
        </tr>`;
      }).join('')}
      </tbody>
    </table></div>
  </div>` : ''}

  ${active.length ? `
  <div class="card">
    <div class="card-head"><h2>Active projects</h2><span class="spacer"></span>
      <button class="btn btn-sm" data-goto="projects">View all</button>
    </div>
    <div class="table-scroll"><table>
      <thead><tr><th>Client</th><th>Service</th><th class="right">Value</th><th class="right">Paid</th><th>Progress</th></tr></thead>
      <tbody>${active.map(p => {
        const paid = paidFor(p.id), val = Number(p.value || 0);
        const pct = val ? Math.min(100, Math.round(paid / val * 100)) : 0;
        const cls = pct >= 100 ? '' : pct > 0 ? 'part' : 'none';
        return `<tr>
          <td><div class="cell-strong">${esc(p.client)}</div>
              <div class="cell-sub">${esc(p.business || '')}</div></td>
          <td>${esc(p.service || '—')}</td>
          <td class="right num">${inr(val)}</td>
          <td class="right num">${inr(paid)}</td>
          <td><div style="display:flex;align-items:center;gap:9px">
              <div class="prog ${cls}"><i style="width:${pct}%"></i></div>
              <span class="num" style="font-size:11.5px;font-weight:700;color:var(--muted)">${pct}%</span>
          </div></td>
        </tr>`;
      }).join('')}
      </tbody>
    </table></div>
  </div>` : ''}`;
}

/* ---------- leads ---------- */
function viewLeads() {
  const f = filters.leads;
  const rows = db.leads.filter(l => {
    const hay = [l.name, l.business, l.phone, l.email, l.city, l.service, l.source].join(' ').toLowerCase();
    return (!f.q || hay.includes(f.q.toLowerCase())) && (!f.status || l.status === f.status);
  }).sort((a, b) => (b.created || '').localeCompare(a.created || ''));

  return `
  <div class="page-head"><h1>Leads</h1><span class="spacer"></span>
    <div class="filters">
      <input type="search" id="f-leads-q" placeholder="Search name, phone, city…" value="${esc(f.q)}">
      <select id="f-leads-status">
        <option value="">All statuses</option>
        ${LEAD_STATUS.map(s => `<option ${f.status === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>
    <button class="btn btn-primary btn-sm" data-new="lead">+ New lead</button>
  </div>

  <div class="card">
    ${rows.length ? `<div class="table-scroll"><table>
      <thead><tr>
        <th>Name</th><th>Contact</th><th>Service</th><th>Source</th>
        <th class="right">Est. value</th><th>Status</th><th>Follow up</th><th class="right"></th>
      </tr></thead>
      <tbody>${rows.map(l => {
        const d = l.followUp ? daysFrom(l.followUp) : null;
        const fu = l.followUp
          ? `<span class="pill ${d < 0 ? 'p-bad' : d === 0 ? 'p-warn' : 'p-mute'}">${fmtDate(l.followUp)}</span>`
          : '<span style="color:var(--muted)">—</span>';
        return `<tr>
          <td><div class="cell-strong">${esc(l.name)}</div>
              <div class="cell-sub">${esc(l.business || '')}${l.city ? ' · ' + esc(l.city) : ''}</div></td>
          <td><div>${esc(l.phone || '—')}</div>
              <div class="cell-sub">${esc(l.email || '')}</div></td>
          <td>${esc(l.service || '—')}</td>
          <td>${esc(l.source || '—')}</td>
          <td class="right num">${l.value ? inr(l.value) : '—'}</td>
          <td>${statusPill(l.status)}</td>
          <td>${fu}</td>
          <td class="right"><div class="row-actions">
            ${l.status !== 'Won' ? `<button class="btn btn-sm btn-primary" data-convert="${l.id}" title="Create a project from this lead">Convert</button>` : ''}
            <button class="btn btn-sm" data-edit-lead="${l.id}">Edit</button>
          </div></td>
        </tr>`;
      }).join('')}
      </tbody></table></div>`
    : `<div class="empty"><b>No leads match</b>${db.leads.length ? 'Try clearing the filters.' : 'Add your first lead to get started.'}</div>`}
  </div>`;
}

/* ---------- projects ---------- */
function viewProjects() {
  const f = filters.projects;
  const rows = db.projects.filter(p => {
    const hay = [p.client, p.business, p.service, p.city].join(' ').toLowerCase();
    return (!f.q || hay.includes(f.q.toLowerCase())) && (!f.status || p.status === f.status);
  }).sort((a, b) => (b.start || '').localeCompare(a.start || ''));

  return `
  <div class="page-head"><h1>Projects</h1><span class="spacer"></span>
    <div class="filters">
      <input type="search" id="f-proj-q" placeholder="Search client, service…" value="${esc(f.q)}">
      <select id="f-proj-status">
        <option value="">All statuses</option>
        ${PROJ_STATUS.map(s => `<option ${f.status === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>
    <button class="btn btn-primary btn-sm" data-new="project">+ New project</button>
  </div>

  <div class="card">
    ${rows.length ? `<div class="table-scroll"><table>
      <thead><tr>
        <th>Client</th><th>Service</th><th>Started</th><th class="right">Value</th>
        <th class="right">Paid</th><th class="right">Balance</th><th>Progress</th><th>Status</th><th class="right"></th>
      </tr></thead>
      <tbody>${rows.map(p => {
        const val = Number(p.value || 0), paid = paidFor(p.id), bal = Math.max(0, val - paid);
        const pct = val ? Math.min(100, Math.round(paid / val * 100)) : 0;
        const cls = pct >= 100 ? '' : pct > 0 ? 'part' : 'none';
        return `<tr>
          <td><div class="cell-strong">${esc(p.client)}</div>
              <div class="cell-sub">${esc(p.business || '')}${p.city ? ' · ' + esc(p.city) : ''}</div></td>
          <td>${esc(p.service || '—')}</td>
          <td>${fmtDate(p.start)}</td>
          <td class="right num">${inr(val)}</td>
          <td class="right num" style="color:var(--good);font-weight:700">${inr(paid)}</td>
          <td class="right num" style="font-weight:700${bal > 0 ? ';color:var(--bad)' : ''}">${inr(bal)}</td>
          <td><div style="display:flex;align-items:center;gap:9px">
              <div class="prog ${cls}"><i style="width:${pct}%"></i></div>
              <span class="num" style="font-size:11.5px;font-weight:700;color:var(--muted)">${pct}%</span>
          </div></td>
          <td>${statusPill(p.status)}</td>
          <td class="right"><div class="row-actions">
            <button class="btn btn-sm btn-primary" data-addpay="${p.id}">+ Payment</button>
            <button class="btn btn-sm" data-edit-project="${p.id}">Edit</button>
          </div></td>
        </tr>`;
      }).join('')}
      </tbody></table></div>`
    : `<div class="empty"><b>No projects match</b>${db.projects.length ? 'Try clearing the filters.' : 'Create a project, or convert a won lead.'}</div>`}
  </div>`;
}

/* ---------- payments ---------- */
function viewPayments() {
  const f = filters.payments;
  const rows = db.payments.filter(p => {
    const hay = [projName(p.projectId), p.invoice, p.method, p.notes].join(' ').toLowerCase();
    const st = isOverdue(p) ? 'Overdue' : p.status;
    return (!f.q || hay.includes(f.q.toLowerCase())) && (!f.status || st === f.status);
  }).sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  const received = rows.filter(p => p.status === 'Received').reduce((s, p) => s + Number(p.amount || 0), 0);
  const pending  = rows.filter(p => p.status === 'Pending').reduce((s, p) => s + Number(p.amount || 0), 0);

  return `
  <div class="page-head"><h1>Payments</h1><span class="spacer"></span>
    <div class="filters">
      <input type="search" id="f-pay-q" placeholder="Search client, invoice…" value="${esc(f.q)}">
      <select id="f-pay-status">
        <option value="">All</option>
        ${['Received', 'Pending', 'Overdue'].map(s => `<option ${f.status === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>
    <button class="btn btn-primary btn-sm" data-new="payment">+ Record payment</button>
  </div>

  <div class="kpis" style="grid-template-columns:repeat(2,1fr);max-width:520px">
    <div class="kpi is-good"><div class="kpi-rail"></div>
      <div class="kpi-label">Received (filtered)</div><div class="kpi-val num">${inr(received)}</div></div>
    <div class="kpi is-warn"><div class="kpi-rail"></div>
      <div class="kpi-label">Pending (filtered)</div><div class="kpi-val num">${inr(pending)}</div></div>
  </div>

  <div class="card">
    ${rows.length ? `<div class="table-scroll"><table>
      <thead><tr>
        <th>Client / project</th><th>Invoice</th><th class="right">Amount</th>
        <th>Date</th><th>Method</th><th>Status</th><th class="right"></th>
      </tr></thead>
      <tbody>${rows.map(p => {
        const od = isOverdue(p);
        return `<tr>
          <td><div class="cell-strong">${esc(projName(p.projectId))}</div>
              ${p.notes ? `<div class="cell-sub">${esc(p.notes)}</div>` : ''}</td>
          <td>${esc(p.invoice || '—')}</td>
          <td class="right num cell-strong">${inr(p.amount)}</td>
          <td>${fmtDate(p.date)}${od ? `<div class="cell-sub" style="color:var(--bad)">${Math.abs(daysFrom(p.date))}d late</div>` : ''}</td>
          <td>${esc(p.method || '—')}</td>
          <td>${statusPill(od ? 'Overdue' : p.status)}</td>
          <td class="right"><div class="row-actions">
            ${p.status === 'Pending' ? `<button class="btn btn-sm btn-primary" data-paid="${p.id}">Mark received</button>` : ''}
            <button class="btn btn-sm" data-edit-payment="${p.id}">Edit</button>
          </div></td>
        </tr>`;
      }).join('')}
      </tbody></table></div>`
    : `<div class="empty"><b>No payments match</b>${db.payments.length ? 'Try clearing the filters.' : 'Record a payment against a project.'}</div>`}
  </div>`;
}

/* ---------- render ---------- */
function render() {
  if (!unlocked()) return renderLogin();
  $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.view === view));
  $('#app').innerHTML =
    view === 'leads'    ? viewLeads() :
    view === 'projects' ? viewProjects() :
    view === 'payments' ? viewPayments() :
    view === 'invoices' ? viewInvoices() : viewDashboard();
  wireFilters();
}

function wireFilters() {
  const bind = (sel, obj, key, ev = 'input') => {
    const el = $(sel);
    if (!el) return;
    el.addEventListener(ev, () => {
      obj[key] = el.value;
      const pos = el.selectionStart;
      render();
      const el2 = $(sel);
      if (el2 && ev === 'input') { el2.focus(); try { el2.setSelectionRange(pos, pos); } catch (e) {} }
    });
  };
  bind('#f-leads-q', filters.leads, 'q');
  bind('#f-leads-status', filters.leads, 'status', 'change');
  bind('#f-proj-q', filters.projects, 'q');
  bind('#f-proj-status', filters.projects, 'status', 'change');
  bind('#f-pay-q', filters.payments, 'q');
  bind('#f-pay-status', filters.payments, 'status', 'change');
  bind('#f-inv-q', filters.invoices, 'q');
  bind('#f-inv-status', filters.invoices, 'status', 'change');
}

/* ---------- modal ---------- */
let modalSubmit = null, modalDelete = null;

function openModal(title, bodyHTML, onSubmit, onDelete) {
  $('#modal-title').textContent = title;
  $('#modal-body').innerHTML = bodyHTML;
  modalSubmit = onSubmit;
  modalDelete = onDelete || null;
  $('#modal-delete').hidden = !onDelete;
  const extra = $('#modal-foot-extra');
  if (extra) extra.innerHTML = '';
  $('#modal-bg').hidden = false;
  const first = $('#modal-body input, #modal-body select, #modal-body textarea');
  if (first) first.focus();
}
function closeModal() {
  $('#modal-bg').hidden = true;
  modalSubmit = modalDelete = null;
}
function formData() {
  const o = {};
  $$('#modal-body [name]').forEach(el => o[el.name] = el.value.trim());
  return o;
}
const opts = (list, sel) => list.map(v => `<option ${v === sel ? 'selected' : ''}>${v}</option>`).join('');

function fLead(l = {}) {
  return `
  <div class="grid2">
    <div class="field"><label>Name *</label><input name="name" required value="${esc(l.name || '')}"></div>
    <div class="field"><label>Business</label><input name="business" value="${esc(l.business || '')}"></div>
    <div class="field"><label>Phone</label><input name="phone" value="${esc(l.phone || '')}"></div>
    <div class="field"><label>Email</label><input name="email" type="email" value="${esc(l.email || '')}"></div>
    <div class="field"><label>City</label><input name="city" value="${esc(l.city || '')}"></div>
    <div class="field"><label>Service interest</label><select name="service">${opts(SERVICES, l.service)}</select></div>
    <div class="field"><label>Source</label><select name="source">${opts(SOURCES, l.source)}</select></div>
    <div class="field"><label>Est. value (₹)</label><input name="value" type="number" min="0" step="1000" value="${esc(l.value || '')}"></div>
    <div class="field"><label>Status</label><select name="status">${opts(LEAD_STATUS, l.status || 'New')}</select></div>
    <div class="field"><label>Next follow-up</label><input name="followUp" type="date" value="${esc(l.followUp || '')}"></div>
  </div>
  <div class="field"><label>Notes</label><textarea name="notes">${esc(l.notes || '')}</textarea></div>`;
}

function fProject(p = {}) {
  return `
  <div class="grid2">
    <div class="field"><label>Client name *</label><input name="client" required value="${esc(p.client || '')}"></div>
    <div class="field"><label>Business</label><input name="business" value="${esc(p.business || '')}"></div>
    <div class="field"><label>City</label><input name="city" value="${esc(p.city || '')}"></div>
    <div class="field"><label>Service</label><select name="service">${opts(SERVICES, p.service)}</select></div>
    <div class="field"><label>Total value (₹) *</label><input name="value" type="number" min="0" step="1000" required value="${esc(p.value || '')}"></div>
    <div class="field"><label>Start date</label><input name="start" type="date" value="${esc(p.start || today())}"></div>
    <div class="field"><label>Status</label><select name="status">${opts(PROJ_STATUS, p.status || 'Active')}</select></div>
  </div>
  <div class="field"><label>Notes</label><textarea name="notes">${esc(p.notes || '')}</textarea></div>`;
}

function fPayment(y = {}) {
  if (!db.projects.length) {
    return `<div class="empty"><b>No projects yet</b>Create a project first — payments are recorded against a project.</div>`;
  }
  const list = db.projects.map(p =>
    `<option value="${p.id}" ${p.id === y.projectId ? 'selected' : ''}>${esc(p.client)}${p.service ? ' — ' + esc(p.service) : ''}</option>`
  ).join('');
  return `
  <div class="field"><label>Project *</label><select name="projectId" required>${list}</select></div>
  <div class="grid2">
    <div class="field"><label>Amount (₹) *</label><input name="amount" type="number" min="0" step="500" required value="${esc(y.amount || '')}"></div>
    <div class="field"><label>Status</label><select name="status">${opts(PAY_STATUS, y.status || 'Received')}</select></div>
    <div class="field">
      <label>Date</label><input name="date" type="date" value="${esc(y.date || today())}">
      <span class="hint">For pending payments, this is the due date.</span>
    </div>
    <div class="field"><label>Method</label>
      <select name="method">${opts(['UPI', 'Bank transfer', 'Cash', 'Cheque', 'Razorpay', 'Other'], y.method)}</select>
    </div>
    <div class="field"><label>Invoice no.</label><input name="invoice" value="${esc(y.invoice || '')}"></div>
  </div>
  <div class="field"><label>Notes</label><textarea name="notes">${esc(y.notes || '')}</textarea></div>`;
}

/* open helpers */
function newLead() {
  openModal('New lead', fLead(), d => {
    if (!d.name) return toast('Name is required');
    db.leads.push({ id: uid(), created: today(), ...d });
    save(); closeModal(); render(); toast('Lead added');
  });
}
function editLead(id) {
  const l = db.leads.find(x => x.id === id); if (!l) return;
  openModal('Edit lead', fLead(l),
    d => { Object.assign(l, d); save(); closeModal(); render(); toast('Lead updated'); },
    () => { db.leads = db.leads.filter(x => x.id !== id); save(); closeModal(); render(); toast('Lead deleted'); });
}
function newProject(seed = {}) {
  openModal('New project', fProject(seed), d => {
    if (!d.client) return toast('Client name is required');
    db.projects.push({ id: uid(), ...d });
    save(); closeModal(); view = 'projects'; render(); toast('Project created');
  });
}
function editProject(id) {
  const p = db.projects.find(x => x.id === id); if (!p) return;
  openModal('Edit project', fProject(p),
    d => { Object.assign(p, d); save(); closeModal(); render(); toast('Project updated'); },
    () => {
      const n = db.payments.filter(x => x.projectId === id).length;
      if (n && !confirm(`This project has ${n} payment${n === 1 ? '' : 's'}. Delete the project and its payments?`)) return;
      db.projects = db.projects.filter(x => x.id !== id);
      db.payments = db.payments.filter(x => x.projectId !== id);
      save(); closeModal(); render(); toast('Project deleted');
    });
}
function newPayment(projectId) {
  openModal('Record payment', fPayment(projectId ? { projectId } : {}), d => {
    if (!d.projectId) return toast('Create a project first');
    if (!d.amount) return toast('Amount is required');
    db.payments.push({ id: uid(), ...d });
    save(); closeModal(); render(); toast('Payment recorded');
  });
}
function editPayment(id) {
  const y = db.payments.find(x => x.id === id); if (!y) return;
  openModal('Edit payment', fPayment(y),
    d => { Object.assign(y, d); save(); closeModal(); render(); toast('Payment updated'); },
    () => { db.payments = db.payments.filter(x => x.id !== id); save(); closeModal(); render(); toast('Payment deleted'); });
}
function convertLead(id) {
  const l = db.leads.find(x => x.id === id); if (!l) return;
  l.status = 'Won'; save();
  newProject({ client: l.name, business: l.business, city: l.city, service: l.service, value: l.value });
}

/* ---------- backup / restore ---------- */
function doExport() {
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `kryvex-crm-backup-${today()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Backup downloaded');
}
function doImport(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const p = JSON.parse(r.result);
      if (!p || typeof p !== 'object') throw new Error('bad file');
      const n = (p.leads || []).length + (p.projects || []).length +
                (p.payments || []).length + (p.invoices || []).length;
      if (!confirm(`Restore ${n} record(s)? This replaces everything currently in the CRM.`)) return;
      db = { leads: p.leads || [], projects: p.projects || [],
             payments: p.payments || [], invoices: p.invoices || [] };
      save(); render(); toast('Backup restored');
    } catch (e) { toast('That file could not be read'); }
  };
  r.readAsText(file);
}

function seed() {
  const p1 = uid(), p2 = uid();
  db.leads.push(
    { id: uid(), created: today(), name: 'Rahul Verma', business: 'Verma Dental Clinic', phone: '98765 43210',
      email: '', city: 'Patna', service: 'Local SEO', source: 'Website form', value: '35000',
      status: 'Contacted', followUp: today(), notes: 'Wants map pack visibility for 2 clinics.' },
    { id: uid(), created: today(), name: 'Sneha Iyer', business: 'Iyer Interiors', phone: '90123 45678',
      email: 'sneha@example.com', city: 'Pune', service: 'Meta Ads', source: 'Referral', value: '60000',
      status: 'Proposal Sent', followUp: '', notes: 'Sent 3-month proposal.' }
  );
  db.projects.push(
    { id: p1, client: 'Anand Sharma', business: 'Sharma Motors', city: 'Nagpur', service: 'Google Ads',
      value: '90000', start: today(), status: 'Active', notes: 'Retainer, 3 months.' },
    { id: p2, client: 'Kiran Nair', business: 'Nair Fitness', city: 'Kochi', service: 'Web Development',
      value: '55000', start: today(), status: 'Active', notes: '' }
  );
  const past = new Date(Date.now() - 9 * 86400000).toISOString().slice(0, 10);
  db.payments.push(
    { id: uid(), projectId: p1, amount: '30000', status: 'Received', date: today(), method: 'UPI', invoice: 'KM-001', notes: 'Advance' },
    { id: uid(), projectId: p1, amount: '30000', status: 'Pending', date: past, method: 'Bank transfer', invoice: 'KM-002', notes: 'Month 2' },
    { id: uid(), projectId: p2, amount: '25000', status: 'Received', date: today(), method: 'Bank transfer', invoice: 'KM-003', notes: '50% upfront' }
  );
  save(); render(); toast('Sample data loaded');
}

/* ---------- events ---------- */
$('#tabs').addEventListener('click', e => {
  const b = e.target.closest('button[data-view]');
  if (b) { view = b.dataset.view; render(); }
});

$('#app').addEventListener('click', e => {
  const t = e.target.closest('[data-new],[data-goto],[data-paid],[data-edit-lead],[data-edit-project],[data-edit-payment],[data-edit-inv],[data-print-inv],[data-addpay],[data-convert],#btn-seed');
  if (!t) return;
  const d = t.dataset;
  if (t.id === 'btn-seed') return seed();
  if (d.new === 'lead')     return newLead();
  if (d.new === 'project')  return newProject();
  if (d.new === 'payment')  return newPayment();
  if (d.new === 'invoice')  return newInvoice();
  if (d.editInv)            return editInvoice(d.editInv);
  if (d.printInv)           return printInvoice(d.printInv);
  if (d.goto)               { view = d.goto; return render(); }
  if (d.addpay)             return newPayment(d.addpay);
  if (d.convert)            return convertLead(d.convert);
  if (d.editLead)           return editLead(d.editLead);
  if (d.editProject)        return editProject(d.editProject);
  if (d.editPayment)        return editPayment(d.editPayment);
  if (d.paid) {
    const y = db.payments.find(x => x.id === d.paid);
    if (y) { y.status = 'Received'; y.date = today(); save(); render(); toast('Marked as received'); }
  }
});

$('#modal-form').addEventListener('submit', e => { e.preventDefault(); if (modalSubmit) modalSubmit(formData()); });
$('#modal-cancel').addEventListener('click', closeModal);
$('#modal-x').addEventListener('click', closeModal);
$('#modal-delete').addEventListener('click', () => {
  if (modalDelete && confirm('Delete this record permanently?')) modalDelete();
});
$('#modal-bg').addEventListener('click', e => { if (e.target.id === 'modal-bg') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal-bg').hidden) closeModal(); });

$('#btn-export').addEventListener('click', doExport);
$('#btn-import').addEventListener('click', () => $('#file-import').click());
$('#file-import').addEventListener('change', e => {
  if (e.target.files[0]) doImport(e.target.files[0]);
  e.target.value = '';
});

$('#btn-theme').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const next = dark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('kryvex_crm_theme', next);
});

/* ---------- boot ---------- */
const savedTheme = localStorage.getItem('kryvex_crm_theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
load();
render();
