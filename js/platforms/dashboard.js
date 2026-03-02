/* ===================================================
   AMN HUB - Dashboard Platform
   Central command center for all platforms
   =================================================== */

export const Dashboard = {

  render(data) {
    const portfolio  = data.portfolio;
    const streams    = data.incomeStreams;
    const totalMonthly = streams.reduce((s, i) => s + i.monthly, 0);
    const activity   = data.notifications;

    const html = `
<div class="platform-page fade-in">

  <!-- Welcome Banner -->
  <div class="dashboard-welcome">
    <div class="welcome-title">Welcome back, ${data.user.name} &#128075;</div>
    <div class="welcome-sub">Your AMN Hub is fully operational. 9 platforms active &bull; 10 AI bots running &bull; $${totalMonthly.toLocaleString()}/month generating across 7 income streams.</div>
  </div>

  <!-- Top KPIs -->
  <div class="grid-4 mb-24">
    <div class="stat-card purple">
      <div class="stat-card-icon">&#128200;</div>
      <div class="stat-card-val">$${portfolio.total.toLocaleString('en', {maximumFractionDigits: 0})}</div>
      <div class="stat-card-lbl">Total Portfolio Value</div>
      <div class="stat-card-change positive">&#9650; +$${portfolio.dailyGain.toLocaleString('en',{maximumFractionDigits:0})} today (${portfolio.dailyPct}%)</div>
    </div>
    <div class="stat-card cyan">
      <div class="stat-card-icon">&#9889;</div>
      <div class="stat-card-val">$${totalMonthly.toLocaleString()}</div>
      <div class="stat-card-lbl">Monthly Revenue (All Streams)</div>
      <div class="stat-card-change positive">&#9650; 7 active income streams</div>
    </div>
    <div class="stat-card amber">
      <div class="stat-card-icon">&#127760;</div>
      <div class="stat-card-val">${data.network.members.toLocaleString()}</div>
      <div class="stat-card-lbl">Global Network Members</div>
      <div class="stat-card-change positive">&#9650; ${data.network.countries} countries reached</div>
    </div>
    <div class="stat-card green">
      <div class="stat-card-icon">&#128279;</div>
      <div class="stat-card-val">$${data.affiliate.totalCommissions.toLocaleString()}</div>
      <div class="stat-card-lbl">Total Affiliate Commissions</div>
      <div class="stat-card-change positive">&#9650; ${data.affiliate.referrals} active referrals</div>
    </div>
  </div>

  <!-- Platform Tiles -->
  <div class="section-title">Live Platform Status</div>
  <div class="platform-grid mb-24" id="platform-tiles">
    <div class="platform-tile" data-goto="crypto" style="--tile-color:#f59e0b">
      <div class="pt-icon">&#x20BF;</div>
      <div class="pt-name">Crypto Trading</div>
      <div class="pt-val">$${portfolio.holdings.slice(0,4).reduce((s,h)=>s+h.value,0).toLocaleString('en',{maximumFractionDigits:0})}</div>
      <div class="pt-sub">Portfolio value</div>
      <div class="pt-status"><span class="dot green"></span> Live trading</div>
    </div>
    <div class="platform-tile" data-goto="social" style="--tile-color:#ec4899">
      <div class="pt-icon">&#128241;</div>
      <div class="pt-name">Social Network</div>
      <div class="pt-val">${(data.social.totalFollowers/1000).toFixed(1)}K</div>
      <div class="pt-sub">Total followers</div>
      <div class="pt-status"><span class="dot green"></span> 6 platforms</div>
    </div>
    <div class="platform-tile" data-goto="ecommerce" style="--tile-color:#06b6d4">
      <div class="pt-icon">&#128722;</div>
      <div class="pt-name">E-Commerce</div>
      <div class="pt-val">$${data.ecommerce.revenue.today.toLocaleString()}</div>
      <div class="pt-sub">Today&apos;s revenue</div>
      <div class="pt-status"><span class="dot green"></span> ${data.ecommerce.orders.pending} pending orders</div>
    </div>
    <div class="platform-tile" data-goto="network" style="--tile-color:#3b82f6">
      <div class="pt-icon">&#127760;</div>
      <div class="pt-name">Global Network</div>
      <div class="pt-val">${data.network.members.toLocaleString()}</div>
      <div class="pt-sub">Members worldwide</div>
      <div class="pt-status"><span class="dot green"></span> +${data.network.recentJoins.length} today</div>
    </div>
    <div class="platform-tile" data-goto="affiliate" style="--tile-color:#10b981">
      <div class="pt-icon">&#128279;</div>
      <div class="pt-name">Affiliate Hub</div>
      <div class="pt-val">$${data.affiliate.pendingPayout.toLocaleString()}</div>
      <div class="pt-sub">Pending payout</div>
      <div class="pt-status"><span class="dot green"></span> ${data.affiliate.conversionRate}% conversion</div>
    </div>
    <div class="platform-tile" data-goto="funnels" style="--tile-color:#7c3aed">
      <div class="pt-icon">&#9889;</div>
      <div class="pt-name">Income Funnels</div>
      <div class="pt-val">48.2K</div>
      <div class="pt-sub">Monthly visitors</div>
      <div class="pt-status"><span class="dot green"></span> 2.6% conversion</div>
    </div>
    <div class="platform-tile" data-goto="ai-station" style="--tile-color:#8b5cf6">
      <div class="pt-icon">&#10022;</div>
      <div class="pt-name">AI Creator Station</div>
      <div class="pt-val">20</div>
      <div class="pt-sub">AI tools available</div>
      <div class="pt-status"><span class="dot green"></span> All tools online</div>
    </div>
    <div class="platform-tile" data-goto="bots" style="--tile-color:#06b6d4">
      <div class="pt-icon">&#129302;</div>
      <div class="pt-name">Bot Fleet</div>
      <div class="pt-val">10</div>
      <div class="pt-sub">Bots active</div>
      <div class="pt-status"><span class="dot green"></span> 24/7 automation</div>
    </div>
  </div>

  <!-- Income Streams + Activity -->
  <div class="grid-21 mb-24">

    <!-- Income Streams -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">&#9889; Monthly Income Streams</div>
        <div class="tag tag-green">$${totalMonthly.toLocaleString()}/mo</div>
      </div>
      <div id="income-streams-list">
        ${streams.map(s => `
          <div class="income-stream-row" style="margin-bottom:14px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:18px">${s.icon}</span>
                <span style="font-size:13px;font-weight:600">${s.name}</span>
                <span class="tag tag-green" style="font-size:10px">+${s.growth}%</span>
              </div>
              <span style="font-weight:700;font-size:14px">$${s.monthly.toLocaleString()}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${Math.round(s.monthly/totalMonthly*100)}%;background:${s.color}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Activity Feed -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">&#128288; Live Activity</div>
        <span class="tag tag-purple">Real-time</span>
      </div>
      <div class="activity-feed" id="activity-feed">
        ${activity.map(n => `
          <div class="activity-item">
            <div class="activity-icon">${n.icon}</div>
            <div class="activity-text">
              <div style="font-weight:600;font-size:13px">${n.title}</div>
              <div style="font-size:12px;color:var(--text2)">${n.text}</div>
            </div>
            <div class="activity-time">${n.time}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <!-- Bot Fleet Overview & Crypto Markets -->
  <div class="grid-2">

    <!-- Bot Status -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">&#129302; Bot Fleet Overview</div>
        <span class="tag tag-green">10 Active</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${data.bots.map(b => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--glass);border-radius:8px;border:1px solid var(--border)">
            <div style="width:32px;height:32px;border-radius:8px;background:${b.color};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${b.emoji}</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:12px;font-weight:700">${b.name}</div>
              <div style="font-size:11px;color:var(--text2)">${b.role}</div>
            </div>
            <div class="bot-status-badge ${b.status === 'active' ? 'online' : 'busy'}">
              <span class="dot ${b.status === 'active' ? 'green' : 'amber'}"></span>
              ${b.status.toUpperCase()}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Crypto Markets -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">&#x20BF; Crypto Markets</div>
        <span class="nav-badge live-badge">LIVE</span>
      </div>
      <table class="hub-table" id="dash-market-table">
        <thead>
          <tr>
            <th>Pair</th>
            <th class="td-right">Price</th>
            <th class="td-right">24h</th>
          </tr>
        </thead>
        <tbody id="dash-market-body">
          ${data.crypto.markets.map(m => `
            <tr>
              <td><strong>${m.symbol}</strong></td>
              <td class="td-right" id="dp-${m.symbol.replace('/','_')}">$${m.price.toLocaleString()}</td>
              <td class="td-right ${m.change >= 0 ? 'positive' : 'negative'}">${m.change >= 0 ? '+' : ''}${m.change}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

</div>
    `;

    return { html, cleanup: null };
  },

  init(data, { navigate }) {
    // Platform tiles click navigation
    document.querySelectorAll('.platform-tile[data-goto]').forEach(tile => {
      tile.addEventListener('click', () => {
        navigate(tile.dataset.goto);
      });
    });

    // Real-time price updates in dashboard table
    window._dashPriceUpdate = () => {
      data.crypto.markets.forEach(m => {
        const id = 'dp-' + m.symbol.replace('/', '_');
        const el = document.getElementById(id);
        if (el) el.textContent = '$' + m.price.toLocaleString();
      });
    };

    // Simulate live activity feed additions
    const activityTexts = [
      { icon: '₿', title: 'Trade Executed', text: 'BotAlpha bought 0.02 BTC @ $67,420' },
      { icon: '📱', title: 'New Follower Milestone', text: 'Instagram: 28,500 followers reached' },
      { icon: '🛒', title: 'New Purchase', text: 'Crypto Bot License sold — $497' },
      { icon: '🔗', title: 'Referral Conversion', text: 'New Pro member via Alex R.' },
    ];

    let actIdx = 0;
    const actInterval = setInterval(() => {
      const feed = document.getElementById('activity-feed');
      if (!feed) { clearInterval(actInterval); return; }
      const item = activityTexts[actIdx % activityTexts.length];
      actIdx++;
      const el = document.createElement('div');
      el.className = 'activity-item slide-in';
      el.innerHTML = `
        <div class="activity-icon">${item.icon}</div>
        <div class="activity-text">
          <div style="font-weight:600;font-size:13px">${item.title}</div>
          <div style="font-size:12px;color:var(--text2)">${item.text}</div>
        </div>
        <div class="activity-time">just now</div>
      `;
      feed.insertBefore(el, feed.firstChild);
      if (feed.children.length > 8) feed.removeChild(feed.lastChild);
    }, 8000);

    return () => {
      clearInterval(actInterval);
      delete window._dashPriceUpdate;
    };
  }
};
