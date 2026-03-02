/* ===================================================
   AMN HUB - AI Bot Fleet Management
   10 specialized bots across all platforms
   =================================================== */

export const BotFleet = {

  _logIntervals: [],

  render(data) {
    const bots = data.bots;
    const activeBots = bots.filter(b => b.status === 'active').length;
    const busyBots   = bots.filter(b => b.status === 'busy').length;

    const html = `
<div class="platform-page fade-in">

  <!-- Fleet KPIs -->
  <div class="grid-4 mb-24">
    <div class="stat-card purple">
      <div class="stat-card-icon">&#129302;</div>
      <div class="stat-card-val">${activeBots}</div>
      <div class="stat-card-lbl">Bots Active</div>
      <div class="stat-card-change positive"><span class="dot green"></span> All systems nominal</div>
    </div>
    <div class="stat-card cyan">
      <div class="stat-card-icon">&#128200;</div>
      <div class="stat-card-val">1,247</div>
      <div class="stat-card-lbl">Actions Today</div>
      <div class="stat-card-change positive">&#9650; +18% vs yesterday</div>
    </div>
    <div class="stat-card green">
      <div class="stat-card-icon">&#9889;</div>
      <div class="stat-card-val">94.2%</div>
      <div class="stat-card-lbl">Avg Success Rate</div>
      <div class="stat-card-change positive">&#9650; All bots performing well</div>
    </div>
    <div class="stat-card amber">
      <div class="stat-card-icon">&#128176;</div>
      <div class="stat-card-val">$28,420</div>
      <div class="stat-card-lbl">Revenue Attributed</div>
      <div class="stat-card-change positive">&#9650; Bot-generated this month</div>
    </div>
  </div>

  <!-- Fleet Command Center -->
  <div class="card mb-24" style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(6,182,212,0.04))">
    <div class="card-header">
      <div class="card-title">&#9881; Fleet Command Center</div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-success" id="start-all-btn">&#9654; Start All</button>
        <button class="btn btn-secondary" id="pause-all-btn">&#9646;&#9646; Pause All</button>
        <button class="btn btn-danger" id="stop-all-btn">&#9632; Emergency Stop</button>
      </div>
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap">
      ${['TradingBot','SocialBot','ShopBot','NetworkBot','AffiliateBot','FunnelBot','ContentBot','AnalyticsBot','SecurityBot','SupportBot'].map((name, i) => `
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <div style="width:10px;height:10px;border-radius:50%;background:${i === 7 ? 'var(--amber)' : 'var(--green)'};box-shadow:0 0 8px ${i === 7 ? 'var(--amber)' : 'var(--green)'};animation:dotPulse 2s infinite"></div>
          <div style="font-size:10px;color:var(--text2);white-space:nowrap">${name}</div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border);display:flex;align-items:center;gap:20px;font-size:12px;flex-wrap:wrap">
      <div><span class="dot green" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--green);margin-right:4px"></span>${activeBots} Active</div>
      <div><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--amber);margin-right:4px"></span>${busyBots} Processing</div>
      <div style="color:var(--text2)">Total compute: <strong style="color:var(--text)">2.4 vCPUs / 8GB RAM</strong></div>
      <div style="color:var(--text2)">Uptime: <strong style="color:var(--green)">99.97%</strong></div>
      <div style="margin-left:auto">
        <span class="tag tag-green">All Connected to Hub Ecosystem</span>
      </div>
    </div>
  </div>

  <!-- Bot Cards Grid -->
  <div class="bot-grid" id="bot-grid">
    ${bots.map(b => `
      <div class="bot-card ${b.status === 'active' ? 'active-bot' : ''}" id="bot-card-${b.id}">
        <div class="bot-header">
          <div class="bot-avatar" style="background:${b.color}">${b.emoji}</div>
          <div class="bot-info">
            <div class="bot-name">${b.name}</div>
            <div class="bot-role">${b.role}</div>
          </div>
          <div class="bot-status-badge ${b.status === 'active' ? 'online' : 'busy'}">
            <div class="dot ${b.status === 'active' ? 'green' : 'amber'}"></div>
            ${b.status.toUpperCase()}
          </div>
        </div>

        <!-- Metrics -->
        <div class="bot-metrics">
          ${Object.entries(b.metrics).map(([k, v]) => `
            <div class="bot-metric">
              <div class="bot-metric-val">${v}</div>
              <div class="bot-metric-lbl">${k.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          `).join('')}
        </div>

        <!-- Live Activity Log -->
        <div class="bot-activity">
          <div class="bot-activity-title">&#9654; Live Activity Log</div>
          <div class="bot-log" id="log-${b.id}">
            ${b.logs.map(l => `
              <div class="bot-log-item">
                <span class="bot-log-time">${l.time}</span>
                <span>${l.msg}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Controls -->
        <div class="bot-controls">
          <button class="btn btn-success btn-sm bot-action-btn" data-bot="${b.id}" data-action="pause">&#9646;&#9646; Pause</button>
          <button class="btn btn-secondary btn-sm bot-action-btn" data-bot="${b.id}" data-action="config">&#9881; Config</button>
          <button class="btn btn-secondary btn-sm bot-action-btn" data-bot="${b.id}" data-action="logs">&#128196; Full Logs</button>
        </div>
      </div>
    `).join('')}
  </div>

  <!-- Fleet Performance Chart -->
  <div class="card mt-24" style="margin-top:24px">
    <div class="card-header">
      <div class="card-title">&#128200; Fleet Performance (Last 24h)</div>
      <span class="tag tag-green">Real-time monitoring</span>
    </div>
    <canvas id="fleet-chart" height="120" style="display:block;width:100%"></canvas>
  </div>

  <!-- Bot Interaction Network -->
  <div class="card mt-24" style="margin-top:24px">
    <div class="card-header">
      <div class="card-title">&#128279; Bot Interaction Network</div>
      <div style="font-size:12px;color:var(--text2)">How bots communicate and share data across platforms</div>
    </div>
    <div style="padding:20px;background:var(--bg3);border-radius:8px;position:relative;min-height:200px;overflow:hidden">
      <!-- Central hub node -->
      <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2;text-align:center">
        <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--cyan));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;box-shadow:var(--glow-purple),var(--glow-cyan);margin:0 auto">AMN</div>
        <div style="font-size:11px;color:var(--text2);margin-top:4px">Hub Core</div>
      </div>

      <!-- Bot nodes around center -->
      ${[
        { name: 'TradingBot', emoji: '₿', x: 15, y: 20, color: '#f59e0b' },
        { name: 'SocialBot',  emoji: '📡',x: 72, y: 15, color: '#ec4899' },
        { name: 'ShopBot',    emoji: '🛒',x: 85, y: 50, color: '#06b6d4' },
        { name: 'AffiliateBot',emoji: '🔗',x: 72, y: 78, color: '#10b981' },
        { name: 'FunnelBot',  emoji: '⚡',x: 25, y: 80, color: '#7c3aed' },
        { name: 'ContentBot', emoji: '✍️',x: 10, y: 50, color: '#8b5cf6' },
      ].map(n => `
        <div style="position:absolute;left:${n.x}%;top:${n.y}%;transform:translate(-50%,-50%);text-align:center;z-index:2">
          <div style="width:36px;height:36px;border-radius:50%;background:${n.color}22;border:2px solid ${n.color};display:flex;align-items:center;justify-content:center;font-size:16px;margin:0 auto">${n.emoji}</div>
          <div style="font-size:9px;color:var(--text2);margin-top:3px;white-space:nowrap">${n.name}</div>
        </div>
      `).join('')}

      <!-- Connection lines SVG -->
      <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="15" y1="20" x2="50" y2="50" stroke="rgba(124,58,237,0.3)" stroke-width="0.5" stroke-dasharray="2,2"/>
        <line x1="72" y1="15" x2="50" y2="50" stroke="rgba(236,72,153,0.3)" stroke-width="0.5" stroke-dasharray="2,2"/>
        <line x1="85" y1="50" x2="50" y2="50" stroke="rgba(6,182,212,0.3)" stroke-width="0.5" stroke-dasharray="2,2"/>
        <line x1="72" y1="78" x2="50" y2="50" stroke="rgba(16,185,129,0.3)" stroke-width="0.5" stroke-dasharray="2,2"/>
        <line x1="25" y1="80" x2="50" y2="50" stroke="rgba(124,58,237,0.3)" stroke-width="0.5" stroke-dasharray="2,2"/>
        <line x1="10" y1="50" x2="50" y2="50" stroke="rgba(139,92,246,0.3)" stroke-width="0.5" stroke-dasharray="2,2"/>
        <!-- Cross connections -->
        <line x1="72" y1="15" x2="85" y2="50" stroke="rgba(255,255,255,0.05)" stroke-width="0.3"/>
        <line x1="15" y1="20" x2="10" y2="50" stroke="rgba(255,255,255,0.05)" stroke-width="0.3"/>
        <line x1="72" y1="78" x2="85" y2="50" stroke="rgba(255,255,255,0.05)" stroke-width="0.3"/>
      </svg>

      <!-- Data flow animation hint -->
      <div style="position:absolute;bottom:10px;right:14px;font-size:11px;color:var(--text3)">
        &#8594; Data flows in real-time across all platforms
      </div>
    </div>
  </div>

  <!-- Config Modal -->
  <div id="bot-config-modal" class="hidden" style="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:600;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)">
    <div style="background:var(--bg2);border:1px solid var(--border2);border-radius:16px;padding:28px;max-width:450px;width:90%">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <div class="card-title" id="config-modal-title">Bot Configuration</div>
        <button id="config-modal-close" style="color:var(--text2);font-size:18px">&#10005;</button>
      </div>
      <div id="config-modal-body">
        <div style="display:flex;flex-direction:column;gap:12px">
          <div class="form-group">
            <label class="form-label">Update Frequency</label>
            <select class="form-input"><option>Every 30 seconds</option><option>Every 1 minute</option><option>Every 5 minutes</option></select>
          </div>
          <div class="form-group">
            <label class="form-label">Risk Level</label>
            <select class="form-input"><option>Conservative</option><option selected>Moderate</option><option>Aggressive</option></select>
          </div>
          <div class="form-group">
            <label class="form-label">Max Daily Actions</label>
            <input class="form-input" type="number" value="500">
          </div>
          <div class="form-group">
            <label class="form-label">Notifications</label>
            <select class="form-input"><option>All events</option><option>Important only</option><option>None</option></select>
          </div>
          <button class="btn btn-primary" style="justify-content:center;width:100%">&#9989; Save Configuration</button>
        </div>
      </div>
    </div>
  </div>

</div>
    `;

    return { html, cleanup: () => this._cleanup() };
  },

  init(data) {
    this._drawFleetChart();

    // Live log simulation for each bot
    data.bots.forEach(bot => {
      const newLogs = [
        `Executing scheduled task for ${bot.platform} platform`,
        `API call successful — response: 200ms`,
        `Data processed: ${Math.floor(Math.random()*100)} records`,
        `Task completed — efficiency: ${(92 + Math.random()*8).toFixed(1)}%`,
        `Syncing data with Hub Core...`,
        `Performance metrics updated`,
      ];

      let logIdx = 0;
      const interval = setInterval(() => {
        const logEl = document.getElementById('log-' + bot.id);
        if (!logEl) { clearInterval(interval); return; }

        const now = new Date();
        const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
        const msg = newLogs[logIdx % newLogs.length];
        logIdx++;

        const div = document.createElement('div');
        div.className = 'bot-log-item slide-in';
        div.innerHTML = `<span class="bot-log-time">${time}</span><span>${msg}</span>`;
        logEl.insertBefore(div, logEl.firstChild);
        if (logEl.children.length > 4) logEl.removeChild(logEl.lastChild);
      }, 8000 + Math.random() * 4000);

      this._logIntervals.push(interval);
    });

    // Bot action buttons
    document.querySelectorAll('.bot-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const botId  = btn.dataset.bot;
        const bot    = data.bots.find(b => b.id === botId);
        if (!bot) return;

        if (action === 'pause') {
          const card = document.getElementById('bot-card-' + botId);
          const badge = card?.querySelector('.bot-status-badge');
          if (badge) {
            if (badge.textContent.includes('ACTIVE')) {
              badge.className = 'bot-status-badge busy';
              badge.innerHTML = '<div class="dot amber"></div> PAUSED';
              btn.textContent = '▶ Resume';
            } else {
              badge.className = 'bot-status-badge online';
              badge.innerHTML = '<div class="dot green"></div> ACTIVE';
              btn.textContent = '⏸ Pause';
            }
          }
        }

        if (action === 'config') {
          const modal = document.getElementById('bot-config-modal');
          const title = document.getElementById('config-modal-title');
          if (modal && title) {
            title.textContent = `${bot.name} — Configuration`;
            modal.classList.remove('hidden');
          }
        }

        if (action === 'logs') {
          alert(`Full logs for ${bot.name}:\n\n${bot.logs.map(l => `${l.time} — ${l.msg}`).join('\n')}\n\n(In production: opens full log viewer)`);
        }
      });
    });

    // Config modal close
    document.getElementById('config-modal-close')?.addEventListener('click', () => {
      document.getElementById('bot-config-modal')?.classList.add('hidden');
    });

    // Fleet controls
    document.getElementById('start-all-btn')?.addEventListener('click', () => {
      document.querySelectorAll('.bot-status-badge').forEach(badge => {
        badge.className = 'bot-status-badge online';
        badge.innerHTML = '<div class="dot green"></div> ACTIVE';
      });
      document.querySelectorAll('.bot-action-btn[data-action="pause"]').forEach(btn => {
        btn.textContent = '⏸ Pause';
      });
    });

    document.getElementById('pause-all-btn')?.addEventListener('click', () => {
      document.querySelectorAll('.bot-status-badge').forEach(badge => {
        badge.className = 'bot-status-badge busy';
        badge.innerHTML = '<div class="dot amber"></div> PAUSED';
      });
    });

    document.getElementById('stop-all-btn')?.addEventListener('click', () => {
      if (!confirm('⚠️ Emergency stop all bots? This will halt all automated actions immediately.')) return;
      document.querySelectorAll('.bot-status-badge').forEach(badge => {
        badge.className = 'bot-status-badge busy';
        badge.innerHTML = '<div class="dot red" style="background:var(--red)"></div> STOPPED';
      });
    });
  },

  _drawFleetChart() {
    const canvas = document.getElementById('fleet-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.clientWidth || 800;
    const H = 120;
    canvas.width = W;

    const hours = Array.from({length: 24}, (_, i) => i);
    const actions = hours.map(h => {
      if (h < 6) return Math.floor(20 + Math.random() * 30);
      if (h < 9) return Math.floor(60 + Math.random() * 40);
      return Math.floor(80 + Math.random() * 80);
    });

    const max = Math.max(...actions) * 1.2;
    const pad = 35;
    const chartW = W - pad * 2;
    const chartH = H - 30;
    const stepX = chartW / (actions.length - 1);

    ctx.clearRect(0, 0, W, H);

    const pts = actions.map((v, i) => ({
      x: pad + i * stepX,
      y: H - 25 - (v / max) * chartH
    }));

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(124,58,237,0.4)');
    grad.addColorStop(0.5, 'rgba(6,182,212,0.2)');
    grad.addColorStop(1, 'rgba(6,182,212,0)');

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i-1].x + pts[i].x) / 2;
      ctx.bezierCurveTo(cpx, pts[i-1].y, cpx, pts[i].y, pts[i].x, pts[i].y);
    }
    ctx.lineTo(pts[pts.length-1].x, H - 25);
    ctx.lineTo(pts[0].x, H - 25);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i-1].x + pts[i].x) / 2;
      ctx.bezierCurveTo(cpx, pts[i-1].y, cpx, pts[i].y, pts[i].x, pts[i].y);
    }
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Hour labels every 3h
    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'center';
    hours.forEach((h, i) => {
      if (h % 3 === 0) ctx.fillText(h + ':00', pts[i].x, H - 4);
    });

    // Current time indicator
    const currentHour = new Date().getHours();
    if (currentHour < 24) {
      const x = pad + currentHour * stepX;
      ctx.strokeStyle = 'rgba(16,185,129,0.6)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H - 25);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#10b981';
      ctx.font = '10px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('NOW', x, 12);
    }
  },

  _cleanup() {
    this._logIntervals.forEach(id => clearInterval(id));
    this._logIntervals = [];
  }
};
