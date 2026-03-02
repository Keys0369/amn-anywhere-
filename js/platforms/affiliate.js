/* ===================================================
   AMN HUB - Affiliate Marketing Hub
   Commissions, referrals, downline management
   =================================================== */

export const Affiliate = {

  render(data) {
    const aff = data.affiliate;

    const html = `
<div class="platform-page fade-in">

  <!-- KPIs -->
  <div class="grid-4 mb-24">
    <div class="stat-card green">
      <div class="stat-card-icon">&#128176;</div>
      <div class="stat-card-val">$${aff.totalCommissions.toLocaleString()}</div>
      <div class="stat-card-lbl">Total Commissions Earned</div>
      <div class="stat-card-change positive">&#9650; All-time earnings</div>
    </div>
    <div class="stat-card amber">
      <div class="stat-card-icon">&#128274;</div>
      <div class="stat-card-val">$${aff.pendingPayout.toLocaleString()}</div>
      <div class="stat-card-lbl">Pending Payout</div>
      <div class="stat-card-change">Next payout: Friday</div>
    </div>
    <div class="stat-card purple">
      <div class="stat-card-icon">&#128279;</div>
      <div class="stat-card-val">${aff.referrals.toLocaleString()}</div>
      <div class="stat-card-lbl">Total Referrals</div>
      <div class="stat-card-change positive">&#9650; ${aff.activeReferrals} active</div>
    </div>
    <div class="stat-card cyan">
      <div class="stat-card-icon">&#128200;</div>
      <div class="stat-card-val">${aff.conversionRate}%</div>
      <div class="stat-card-lbl">Conversion Rate</div>
      <div class="stat-card-change positive">&#9650; Industry avg: 8%</div>
    </div>
  </div>

  <!-- Referral Link -->
  <div class="card mb-24" style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(6,182,212,0.05))">
    <div class="card-header" style="margin-bottom:16px">
      <div class="card-title">&#128279; Your Referral Link</div>
      <span class="tag tag-green">Active</span>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <div style="flex:1;background:var(--glass);border:1px solid var(--border2);border-radius:8px;padding:10px 14px;font-family:monospace;font-size:13px;color:var(--cyan);min-width:200px" id="ref-link">${aff.referralLink}</div>
      <button class="btn btn-primary" id="copy-link-btn">&#128203; Copy Link</button>
      <button class="btn btn-secondary" id="share-link-btn">&#8627; Share</button>
      <button class="btn btn-secondary" id="qr-btn">&#9638; QR Code</button>
    </div>
    <div style="display:flex;gap:20px;margin-top:16px">
      <div>
        <div style="font-size:22px;font-weight:800;color:var(--green)">892</div>
        <div style="font-size:11px;color:var(--text2)">Link Clicks</div>
      </div>
      <div>
        <div style="font-size:22px;font-weight:800;color:var(--cyan)">221</div>
        <div style="font-size:11px;color:var(--text2)">Signups</div>
      </div>
      <div>
        <div style="font-size:22px;font-weight:800;color:var(--amber)">127</div>
        <div style="font-size:11px;color:var(--text2)">Paid Members</div>
      </div>
      <div>
        <div style="font-size:22px;font-weight:800">24.8%</div>
        <div style="font-size:11px;color:var(--text2)">CVR</div>
      </div>
    </div>
  </div>

  <!-- Commission Structure + Downline Tree -->
  <div class="grid-12 mb-24">

    <!-- Commission Tiers -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="card">
        <div class="card-title" style="margin-bottom:14px">&#127942; Commission Structure</div>
        ${aff.tiers.map(t => `
          <div style="margin-bottom:12px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
              <div style="display:flex;align-items:center;gap:8px">
                <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--cyan));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px">${t.level}</div>
                <div>
                  <div style="font-size:13px;font-weight:700">${t.name}</div>
                  <div style="font-size:11px;color:var(--text2)">${t.count} members</div>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-size:16px;font-weight:800;color:var(--green)">${t.pct}%</div>
                <div style="font-size:11px;color:var(--text2)">$${t.earnings.toLocaleString()}</div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill fill-gradient" style="width:${Math.round(t.earnings/aff.totalCommissions*100)}%"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Top Affiliates -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#128293; Top Affiliates</div>
        ${aff.topAffiliates.map((a, i) => `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <span style="font-size:16px">${['🥇','🥈','🥉','4️⃣','5️⃣'][i]}</span>
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--amber),var(--pink));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0">${a.name.slice(0,2)}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:700">${a.name}</div>
              <div style="font-size:11px;color:var(--text2)">${a.referrals} referrals &bull; ${a.tier}</div>
            </div>
            <div style="font-size:14px;font-weight:800;color:var(--green)">$${a.earnings.toLocaleString()}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Downline Tree Visualization -->
    <div class="card" style="overflow:auto">
      <div class="card-title" style="margin-bottom:16px">&#128203; Downline Network Tree</div>

      <!-- Level 0: You -->
      <div style="text-align:center;margin-bottom:20px;position:relative">
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--cyan));margin:0 auto;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;box-shadow:var(--glow-purple)">AM</div>
        <div style="font-size:12px;font-weight:700;margin-top:6px">You (Hub)</div>
        <div style="font-size:10px;color:var(--green)">$${aff.totalCommissions.toLocaleString()} total</div>
      </div>

      <!-- Connector -->
      <div style="display:flex;justify-content:center;height:20px;position:relative">
        <div style="width:2px;background:var(--border2);height:100%"></div>
      </div>

      <!-- Level 1: Direct Referrals -->
      <div style="font-size:11px;text-align:center;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Level 1 — 20% Commission</div>
      <div class="affiliate-tree">
        <div class="tree-level">
          ${['Alex R.','Maria C.','John D.','Lisa K.','Tom B.'].map(name => `
            <div class="tree-node">
              <div class="tree-dot" style="width:40px;height:40px">${name.slice(0,2)}</div>
              <div class="tree-name">${name}</div>
              <div class="tree-val">$${(Math.random()*2000+500).toFixed(0)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Connector row -->
      <div style="display:flex;justify-content:center;height:16px">
        <div style="width:2px;background:var(--border);height:100%"></div>
      </div>
      <div style="font-size:11px;text-align:center;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Level 2 — 10% Commission</div>

      <!-- Level 2: Sub-referrals -->
      <div class="affiliate-tree">
        <div class="tree-level">
          ${Array.from({length:8}, (_,i) => `
            <div class="tree-node">
              <div class="tree-dot" style="width:32px;height:32px;font-size:11px">${String.fromCharCode(65+i)}${String.fromCharCode(75+i)}</div>
              <div class="tree-name" style="font-size:10px">Member ${i+1}</div>
              <div class="tree-val" style="font-size:9px">$${(Math.random()*500+100).toFixed(0)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="text-align:center;margin-top:12px;padding-top:12px;border-top:1px solid var(--border);color:var(--text2);font-size:12px">
        ...and <strong style="color:var(--text)">${aff.referrals - 13}</strong> more members across 5 levels
      </div>
    </div>
  </div>

  <!-- Commission History -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">&#128338; Commission History</div>
      <button class="btn btn-secondary btn-sm">&#128229; Export CSV</button>
    </div>
    <div style="overflow-x:auto">
      <table class="hub-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>Product</th>
            <th>Level</th>
            <th class="td-right">Sale Amount</th>
            <th class="td-right">Commission</th>
            <th class="td-right">Status</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { date: 'Mar 2, 2025', from: 'Alex R.',   product: 'AI Trading Masterclass', level: 1, sale: 297,  comm: 59.40,  status: 'paid' },
            { date: 'Mar 2, 2025', from: 'Sarah M.',  product: 'Hub Pro Subscription',  level: 1, sale: 97,   comm: 19.40,  status: 'pending' },
            { date: 'Mar 1, 2025', from: 'Mark T.',   product: 'Crypto Bot License',    level: 2, sale: 497,  comm: 49.70,  status: 'paid' },
            { date: 'Mar 1, 2025', from: 'Emma W.',   product: 'Income Funnel Templates',level: 1, sale: 67,  comm: 13.40,  status: 'paid' },
            { date: 'Feb 28, 2025',from: 'James K.',  product: 'Affiliate Marketing Kit',level: 2, sale: 147, comm: 14.70,  status: 'paid' },
            { date: 'Feb 28, 2025',from: 'Anna P.',   product: 'Social Media Blueprint', level: 3, sale: 197, comm: 9.85,   status: 'paid' },
            { date: 'Feb 27, 2025',from: 'David L.',  product: 'Hub Pro Subscription',   level: 1, sale: 97,  comm: 19.40,  status: 'paid' },
          ].map(r => `
            <tr>
              <td style="font-size:12px;color:var(--text2)">${r.date}</td>
              <td><strong>${r.from}</strong></td>
              <td style="font-size:12px">${r.product}</td>
              <td><span class="tag tag-purple" style="font-size:10px">L${r.level}</span></td>
              <td class="td-right">$${r.sale}</td>
              <td class="td-right positive" style="font-weight:700">+$${r.comm.toFixed(2)}</td>
              <td class="td-right"><span class="tag ${r.status==='paid'?'tag-green':'tag-amber'}">${r.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Copy success toast -->
  <div id="copy-toast" style="position:fixed;bottom:20px;right:20px;z-index:999;display:none">
    <div style="background:var(--bg2);border:1px solid var(--green);border-radius:12px;padding:12px 20px;box-shadow:var(--shadow-lg)">
      <strong style="color:var(--green)">&#9989; Link Copied!</strong>
    </div>
  </div>

</div>
    `;

    return { html, cleanup: null };
  },

  init(data) {
    // Copy link
    document.getElementById('copy-link-btn')?.addEventListener('click', () => {
      const link = document.getElementById('ref-link')?.textContent;
      navigator.clipboard?.writeText(link || '').catch(() => {});
      const toast = document.getElementById('copy-toast');
      if (toast) { toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 2000); }
    });

    // QR Code (simulated)
    document.getElementById('qr-btn')?.addEventListener('click', () => {
      alert('QR Code feature: Would display a QR code for your referral link in production.');
    });

    // Share
    document.getElementById('share-link-btn')?.addEventListener('click', () => {
      const link = document.getElementById('ref-link')?.textContent;
      if (navigator.share) {
        navigator.share({ title: 'Join AMN Hub', text: 'Join the AMN Hub ecosystem!', url: link });
      } else {
        navigator.clipboard?.writeText(link || '').catch(() => {});
        alert('Share: Link copied! Share it with your network.');
      }
    });
  }
};
