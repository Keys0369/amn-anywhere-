/* ===================================================
   AMN HUB - Global Network Platform
   World network visualization and management
   =================================================== */

export const Network = {

  render(data) {
    const net = data.network;

    const html = `
<div class="platform-page fade-in">

  <!-- KPIs -->
  <div class="grid-4 mb-24">
    <div class="stat-card blue">
      <div class="stat-card-icon">&#127760;</div>
      <div class="stat-card-val">${net.members.toLocaleString()}</div>
      <div class="stat-card-lbl">Total Members</div>
      <div class="stat-card-change positive">&#9650; +${net.monthlyGrowth}% this month</div>
    </div>
    <div class="stat-card cyan">
      <div class="stat-card-icon">&#127987;</div>
      <div class="stat-card-val">${net.countries}</div>
      <div class="stat-card-lbl">Countries Reached</div>
      <div class="stat-card-change positive">&#9650; 5 new this week</div>
    </div>
    <div class="stat-card purple">
      <div class="stat-card-icon">&#128200;</div>
      <div class="stat-card-val">${net.monthlyGrowth}%</div>
      <div class="stat-card-lbl">Monthly Growth Rate</div>
      <div class="stat-card-change positive">&#9650; Fastest growing region: SEA</div>
    </div>
    <div class="stat-card green">
      <div class="stat-card-icon">&#128101;</div>
      <div class="stat-card-val">94%</div>
      <div class="stat-card-lbl">Member Retention Rate</div>
      <div class="stat-card-change positive">&#9650; Industry best</div>
    </div>
  </div>

  <!-- World Map + Nodes -->
  <div class="grid-21 mb-24">

    <!-- Map -->
    <div class="card" style="padding:0">
      <div class="card-header" style="padding:16px 20px;border-bottom:1px solid var(--border)">
        <div class="card-title">&#127758; Global Network Map</div>
        <div style="display:flex;gap:10px;font-size:12px;color:var(--text2)">
          <span><span class="dot green" style="display:inline-block"></span> Active Node</span>
          <span><span class="dot" style="background:var(--cyan);display:inline-block;width:8px;height:8px;border-radius:50%"></span> Regional Hub</span>
        </div>
      </div>
      <div id="world-map" style="position:relative;background:var(--bg3);min-height:320px;overflow:hidden;padding:20px">

        <!-- SVG World Map Background -->
        <svg viewBox="0 0 800 400" style="width:100%;height:280px;opacity:0.15;position:absolute;inset:20px 0">
          <!-- Simplified continent shapes -->
          <!-- North America -->
          <path d="M 100 80 L 200 60 L 230 100 L 210 160 L 180 200 L 140 210 L 110 180 Z" fill="#475569" stroke="#64748b" stroke-width="1"/>
          <!-- South America -->
          <path d="M 175 220 L 220 210 L 240 280 L 230 340 L 190 360 L 165 320 L 160 260 Z" fill="#475569" stroke="#64748b" stroke-width="1"/>
          <!-- Europe -->
          <path d="M 360 60 L 440 50 L 460 90 L 430 120 L 390 110 L 360 100 Z" fill="#475569" stroke="#64748b" stroke-width="1"/>
          <!-- Africa -->
          <path d="M 370 130 L 440 120 L 470 180 L 460 280 L 420 320 L 380 290 L 360 210 L 360 160 Z" fill="#475569" stroke="#64748b" stroke-width="1"/>
          <!-- Asia -->
          <path d="M 460 60 L 620 50 L 660 100 L 640 160 L 560 180 L 500 150 L 470 110 Z" fill="#475569" stroke="#64748b" stroke-width="1"/>
          <!-- Australia -->
          <path d="M 590 250 L 680 240 L 700 300 L 650 320 L 590 300 Z" fill="#475569" stroke="#64748b" stroke-width="1"/>
        </svg>

        <!-- Network Nodes -->
        ${net.nodes.map(n => `
          <div class="network-node" style="left:${n.x}%;top:${n.y}%;position:absolute;transform:translate(-50%,-50%)">
            <div class="node-dot ${n.active ? 'active' : ''}" style="width:${Math.max(10, Math.min(24, n.members/200))}px;height:${Math.max(10, Math.min(24, n.members/200))}px"></div>
            <div class="node-label">${n.label}</div>
            <div style="font-size:9px;color:var(--cyan);text-align:center">${n.members.toLocaleString()}</div>
          </div>
        `).join('')}

        <!-- Connection Lines (SVG overlay) -->
        <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" id="connection-svg">
          ${net.nodes.slice(0,-1).map((n, i) => {
            const next = net.nodes[i+1];
            return `<line x1="${n.x}%" y1="${n.y}%" x2="${next.x}%" y2="${next.y}%"
              stroke="rgba(6,182,212,0.2)" stroke-width="1" stroke-dasharray="4,4"/>`;
          }).join('')}
        </svg>

        <!-- Pulse animations -->
        <style>
          @keyframes nodeRipple {
            0% { transform:translate(-50%,-50%) scale(1); opacity:0.8; }
            100% { transform:translate(-50%,-50%) scale(3); opacity:0; }
          }
          .node-ripple {
            position:absolute; width:20px; height:20px;
            border-radius:50%; border:1px solid var(--cyan);
            pointer-events:none;
            animation: nodeRipple 2s infinite;
          }
        </style>
        ${net.nodes.filter(n=>n.active).map(n => `
          <div class="node-ripple" style="left:${n.x}%;top:${n.y}%;animation-delay:${Math.random()*2}s"></div>
        `).join('')}

        <!-- Legend -->
        <div style="position:absolute;bottom:10px;left:16px;font-size:11px;color:var(--text2)">
          &#127760; ${net.nodes.length} active hubs &bull; ${net.members.toLocaleString()} members worldwide
        </div>
      </div>
    </div>

    <!-- Right: Regional Stats + Recent Joins -->
    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- Top Regions -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#127942; Top Regions</div>
        ${net.nodes.sort((a,b) => b.members - a.members).map((n, i) => `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="min-width:20px;font-size:14px;text-align:center">${['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'][i]}</div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;margin-bottom:3px">
                <span style="font-size:13px;font-weight:600">${n.label}</span>
                <span style="font-size:12px;color:var(--text2)">${n.members.toLocaleString()}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill fill-cyan" style="width:${Math.round(n.members/net.nodes[0].members*100)}%"></div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Recent Joins -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#128099; Recent Members</div>
        <div style="display:flex;flex-direction:column;gap:6px" id="recent-joins-list">
          ${net.recentJoins.map(j => `
            <div style="display:flex;align-items:center;gap:10px;padding:8px;background:var(--glass);border-radius:8px;border:1px solid var(--border)" class="slide-in">
              <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--cyan));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0">${j.name.slice(0,2)}</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600">${j.country} ${j.name}</div>
                <div style="font-size:11px;color:var(--text2)">${j.time}</div>
              </div>
              <span class="tag ${j.level==='Elite'?'tag-amber':j.level==='Pro'?'tag-purple':'tag-cyan'}">${j.level}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- NetworkBot -->
      <div class="card" style="background:linear-gradient(135deg,rgba(59,130,246,0.08),rgba(6,182,212,0.04))">
        <div class="card-title" style="margin-bottom:10px">&#129302; NetworkBot Activity</div>
        <div style="font-size:12px;color:var(--text2);display:flex;flex-direction:column;gap:6px">
          <div style="display:flex;justify-content:space-between"><span>New members today</span><strong style="color:var(--green)">+48</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Outreach messages</span><strong style="color:var(--text)">840 sent</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Events scheduled</span><strong style="color:var(--text)">3 this week</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Community posts</span><strong style="color:var(--cyan)">12.4K impressions</strong></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Network Growth Chart -->
  <div class="card mb-24">
    <div class="card-header">
      <div class="card-title">&#128200; Network Growth</div>
      <span class="tag tag-cyan">+${net.monthlyGrowth}% monthly</span>
    </div>
    <canvas id="network-chart" height="100" style="display:block;width:100%"></canvas>
  </div>

  <!-- Invite Section -->
  <div class="card" style="background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(124,58,237,0.05));text-align:center;padding:30px">
    <div style="font-size:24px;margin-bottom:10px">&#127760;</div>
    <div style="font-size:20px;font-weight:800;margin-bottom:8px">Grow Your Network</div>
    <div style="color:var(--text2);margin-bottom:20px;max-width:400px;margin-left:auto;margin-right:auto">Invite entrepreneurs, traders, and creators to join the AMN Hub ecosystem. Earn commissions on their activity!</div>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary btn-lg">&#128231; Send Invitations</button>
      <button class="btn btn-secondary btn-lg">&#128279; Copy Invite Link</button>
      <button class="btn btn-secondary btn-lg">&#128203; Download Flyer</button>
    </div>
  </div>

</div>
    `;

    return { html, cleanup: null };
  },

  init(data) {
    this._drawNetworkChart(data.network);

    // Simulate new member joins
    const joinInterval = setInterval(() => {
      const list = document.getElementById('recent-joins-list');
      if (!list) { clearInterval(joinInterval); return; }

      const names = ['Carlos G.', 'Yuki T.', 'Amara N.', 'Peter H.', 'Fatima A.', 'Ivan S.'];
      const flags = ['🇧🇷','🇯🇵','🇳🇬','🇩🇪','🇸🇦','🇷🇺'];
      const levels = ['Starter', 'Pro', 'Elite'];
      const idx = Math.floor(Math.random() * names.length);

      const el = document.createElement('div');
      el.className = 'slide-in';
      el.style.cssText = 'display:flex;align-items:center;gap:10px;padding:8px;background:var(--glass);border-radius:8px;border:1px solid var(--green);margin-bottom:6px';
      const lvl = levels[Math.floor(Math.random() * levels.length)];
      el.innerHTML = `
        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--cyan));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0">${names[idx].slice(0,2)}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600">${flags[idx]} ${names[idx]}</div>
          <div style="font-size:11px;color:var(--green)">just joined</div>
        </div>
        <span class="tag ${lvl==='Elite'?'tag-amber':lvl==='Pro'?'tag-purple':'tag-cyan'}">${lvl}</span>
      `;
      list.insertBefore(el, list.firstChild);
      if (list.children.length > 8) list.removeChild(list.lastChild);
    }, 10000);

    return () => clearInterval(joinInterval);
  },

  _drawNetworkChart(net) {
    const canvas = document.getElementById('network-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.clientWidth || 800;
    const H = 100;
    canvas.width = W;

    const months = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
    const values = [5200, 6800, 8100, 9400, 10800, 11900, 13200, 14892];
    const max = Math.max(...values) * 1.1;
    const pad = 40;
    const chartW = W - pad * 2;
    const chartH = H - 30;
    const stepX = chartW / (values.length - 1);

    ctx.clearRect(0, 0, W, H);

    const pts = values.map((v, i) => ({
      x: pad + i * stepX,
      y: H - 20 - (v / max) * chartH
    }));

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(59,130,246,0.4)');
    grad.addColorStop(1, 'rgba(59,130,246,0)');

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i-1].x + pts[i].x) / 2;
      ctx.bezierCurveTo(cpx, pts[i-1].y, cpx, pts[i].y, pts[i].x, pts[i].y);
    }
    ctx.lineTo(pts[pts.length-1].x, H - 20);
    ctx.lineTo(pts[0].x, H - 20);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i-1].x + pts[i].x) / 2;
      ctx.bezierCurveTo(cpx, pts[i-1].y, cpx, pts[i].y, pts[i].x, pts[i].y);
    }
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'center';
    pts.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(months[i], p.x, H - 4);
    });
  }
};
