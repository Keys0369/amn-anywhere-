/* ===================================================
   AMN HUB - Income Funnels & Traffic Platform
   Multiple income streams, funnel analytics
   =================================================== */

export const Funnels = {

  render(data) {
    const streams = data.incomeStreams;
    const funnel  = data.funnels[0];
    const totalMonthly = streams.reduce((s, i) => s + i.monthly, 0);

    const html = `
<div class="platform-page fade-in">

  <!-- KPIs -->
  <div class="grid-4 mb-24">
    <div class="stat-card purple">
      <div class="stat-card-icon">&#9889;</div>
      <div class="stat-card-val">$${totalMonthly.toLocaleString()}</div>
      <div class="stat-card-lbl">Total Monthly Revenue</div>
      <div class="stat-card-change positive">&#9650; 7 active income streams</div>
    </div>
    <div class="stat-card cyan">
      <div class="stat-card-icon">&#128101;</div>
      <div class="stat-card-val">48,200</div>
      <div class="stat-card-lbl">Monthly Visitors</div>
      <div class="stat-card-change positive">&#9650; +24% vs last month</div>
    </div>
    <div class="stat-card green">
      <div class="stat-card-icon">&#128200;</div>
      <div class="stat-card-val">2.6%</div>
      <div class="stat-card-lbl">Overall Conversion Rate</div>
      <div class="stat-card-change positive">&#9650; +0.4% from A/B test win</div>
    </div>
    <div class="stat-card amber">
      <div class="stat-card-icon">&#127919;</div>
      <div class="stat-card-val">$247</div>
      <div class="stat-card-lbl">Avg Revenue Per User</div>
      <div class="stat-card-change positive">&#9650; +$12 from upsells</div>
    </div>
  </div>

  <!-- Main Funnel + Income Streams -->
  <div class="grid-12 mb-24">

    <!-- Sales Funnel Visualization -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">&#9670; ${funnel.name}</div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-secondary btn-sm" id="edit-funnel-btn">&#9998; Edit</button>
          <button class="btn btn-primary btn-sm">&#43; New Funnel</button>
        </div>
      </div>
      <div class="funnel-visual" id="funnel-visual">
        ${funnel.stages.map((stage, i) => {
          const width = 100 - (i * 10);
          return `
            <div class="funnel-stage" style="width:${width}%;background:${stage.color};color:#fff;margin:0 auto 6px" data-stage="${i}">
              <div class="funnel-stage-title">${stage.name}</div>
              <div class="funnel-stage-val">${stage.value.toLocaleString()}</div>
              <div class="funnel-stage-pct">${stage.pct}% of traffic</div>
              ${i > 0 ? `<div style="font-size:11px;margin-top:4px;opacity:0.8">Drop: ${(funnel.stages[i-1].pct - stage.pct).toFixed(1)}%</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>
      <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border)">
        <div style="font-size:12px;color:var(--text2);margin-bottom:8px;font-weight:600">Funnel Health Score</div>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="flex:1;background:var(--glass2);border-radius:8px;height:12px;overflow:hidden">
            <div style="width:74%;height:100%;background:linear-gradient(90deg,var(--red),var(--amber),var(--green));border-radius:8px"></div>
          </div>
          <span style="font-weight:700;color:var(--amber)">74/100</span>
        </div>
        <div style="font-size:11px;color:var(--text2);margin-top:6px">&#128161; Optimize Stage 3→4 transition to improve score</div>
      </div>
    </div>

    <!-- Income Streams -->
    <div style="display:flex;flex-direction:column;gap:14px">
      ${streams.map(s => `
        <div class="card" style="padding:14px;border-left:3px solid ${s.color}">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:20px">${s.icon}</span>
              <div>
                <div style="font-size:13px;font-weight:700">${s.name}</div>
                <div style="font-size:11px;color:var(--green)">&#9650; +${s.growth}% growth</div>
              </div>
            </div>
            <div style="text-align:right">
              <div style="font-size:18px;font-weight:800">$${s.monthly.toLocaleString()}</div>
              <div style="font-size:10px;color:var(--text2)">/month</div>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${Math.round(s.monthly/totalMonthly*100)}%;background:${s.color}"></div>
          </div>
          <div style="font-size:10px;color:var(--text2);margin-top:4px">${Math.round(s.monthly/totalMonthly*100)}% of total revenue</div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Traffic Sources + Conversion Chart -->
  <div class="grid-2 mb-24">

    <!-- Traffic Sources -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">&#127760; Traffic Sources</div>
        <span class="tag tag-cyan">48,200 visitors/mo</span>
      </div>
      ${[
        { source: 'TikTok',            icon: '🎵', visitors: 18400, pct: 38.2, color: '#010101', badge: 'Organic' },
        { source: 'YouTube',           icon: '▶',  visitors: 9840,  pct: 20.4, color: '#FF0000', badge: 'Organic' },
        { source: 'Google Search',     icon: '🔍', visitors: 7200,  pct: 14.9, color: '#4285F4', badge: 'SEO'     },
        { source: 'Instagram',         icon: '📸', visitors: 5820,  pct: 12.1, color: '#E1306C', badge: 'Social'  },
        { source: 'Paid Ads',          icon: '💰', visitors: 3840,  pct: 8.0,  color: '#f59e0b', badge: 'Paid'    },
        { source: 'Email Marketing',   icon: '📧', visitors: 2100,  pct: 4.4,  color: '#7c3aed', badge: 'Email'   },
        { source: 'Direct / Referral', icon: '🔗', visitors: 1000,  pct: 2.1,  color: '#10b981', badge: 'Direct'  },
      ].map(t => `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <span style="font-size:18px;min-width:22px;text-align:center">${t.icon}</span>
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-size:13px;font-weight:600">${t.source}</span>
              <div style="display:flex;align-items:center;gap:6px">
                <span class="tag" style="font-size:10px;background:var(--glass2);color:var(--text2)">${t.badge}</span>
                <span style="font-size:12px;color:var(--text2)">${t.visitors.toLocaleString()}</span>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${t.pct}%;background:${t.color}"></div>
            </div>
          </div>
          <span style="font-size:12px;font-weight:700;min-width:38px;text-align:right">${t.pct}%</span>
        </div>
      `).join('')}
    </div>

    <!-- A/B Tests & Optimizations -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#127381; Active A/B Tests</div>
        ${[
          { name: 'Landing Page Headline', varA: '48% CVR', varB: '62% CVR', winner: 'B', status: 'Running' },
          { name: 'CTA Button Color',      varA: 'Purple: 3.2%', varB: 'Cyan: 4.1%', winner: 'B', status: 'Winner Found' },
          { name: 'Pricing Display',       varA: '$297/mo', varB: '$9.90/day', winner: '?', status: 'Running' },
          { name: 'Exit Intent Popup',     varA: '12% save rate', varB: '18% save rate', winner: 'B', status: 'Winner Found' },
        ].map(t => `
          <div style="padding:10px;background:var(--glass);border-radius:8px;border:1px solid var(--border);margin-bottom:8px">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">
              <span style="font-size:13px;font-weight:700">${t.name}</span>
              <span class="tag ${t.status.includes('Winner') ? 'tag-green' : 'tag-amber'}" style="font-size:10px">${t.status}</span>
            </div>
            <div style="display:flex;gap:8px">
              <div style="flex:1;background:var(--glass2);border-radius:6px;padding:6px 10px;font-size:11px">
                <div style="color:var(--text3);margin-bottom:2px">Variant A</div>
                <div style="font-weight:600">${t.varA}</div>
              </div>
              <div style="flex:1;background:${t.winner==='B'?'rgba(16,185,129,0.1)':'var(--glass2)'};border-radius:6px;padding:6px 10px;font-size:11px;border:1px solid ${t.winner==='B'?'rgba(16,185,129,0.3)':'transparent'}">
                <div style="color:var(--text3);margin-bottom:2px">Variant B ${t.winner==='B'?'&#9989;':''}</div>
                <div style="font-weight:600">${t.varB}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- FunnelBot Status -->
      <div class="card" style="background:linear-gradient(135deg,rgba(124,58,237,0.1),rgba(6,182,212,0.05))">
        <div class="card-title" style="margin-bottom:10px">&#129302; FunnelBot Traffic</div>
        <div style="font-size:12px;color:var(--text2);display:flex;flex-direction:column;gap:6px">
          <div style="display:flex;justify-content:space-between"><span>Traffic monitored</span><strong style="color:var(--text)">48.2K/mo</strong></div>
          <div style="display:flex;justify-content:space-between"><span>A/B tests running</span><strong style="color:var(--text)">4 active</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Funnel optimizations</span><strong style="color:var(--green)">+0.4% CVR</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Revenue attributed</span><strong style="color:var(--cyan)">$2,341 today</strong></div>
        </div>
      </div>

      <!-- ROI Calculator -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#128200; ROI Calculator</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div class="form-group">
            <label class="form-label">Monthly Ad Spend</label>
            <div class="form-input-wrap">
              <input class="form-input" id="roi-spend" type="number" value="2000" style="padding-right:40px">
              <span class="form-input-suffix">$</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Conversion Rate</label>
            <div class="form-input-wrap">
              <input class="form-input" id="roi-cvr" type="number" value="2.6" style="padding-right:40px">
              <span class="form-input-suffix">%</span>
            </div>
          </div>
          <div style="background:var(--glass);border-radius:8px;padding:12px;margin-top:4px">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">
              <span style="font-size:12px">Estimated Monthly Revenue</span>
              <strong id="roi-revenue" style="color:var(--cyan)">$12,480</strong>
            </div>
            <div style="display:flex;justify-content:space-between">
              <span style="font-size:12px">ROI</span>
              <strong id="roi-result" style="color:var(--green)">+524%</strong>
            </div>
          </div>
          <button class="btn btn-primary" id="calc-roi-btn" style="justify-content:center">Calculate ROI</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Revenue Projection Chart -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">&#128201; 12-Month Revenue Projection</div>
      <div style="display:flex;gap:8px">
        <span style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--text2)"><span style="width:12px;height:3px;background:var(--purple);display:inline-block;border-radius:2px"></span> Actual</span>
        <span style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--text2)"><span style="width:12px;height:3px;background:var(--cyan);display:inline-block;border-radius:2px;border-bottom:1px dashed var(--cyan)"></span> Projected</span>
      </div>
    </div>
    <canvas id="projection-chart" height="130" style="display:block;width:100%"></canvas>
  </div>

</div>
    `;

    return { html, cleanup: null };
  },

  init(data) {
    this._drawProjectionChart();
    this._initROICalc();
  },

  _initROICalc() {
    const calcBtn = document.getElementById('calc-roi-btn');
    if (!calcBtn) return;
    calcBtn.addEventListener('click', () => {
      const spend = parseFloat(document.getElementById('roi-spend')?.value || 2000);
      const cvr   = parseFloat(document.getElementById('roi-cvr')?.value || 2.6);
      const visitors = spend * 0.8; // $0.80 CPC roughly
      const conversions = visitors * (cvr / 100);
      const revenue = conversions * 247; // avg order value
      const roi = ((revenue - spend) / spend * 100).toFixed(0);
      const revEl = document.getElementById('roi-revenue');
      const roiEl = document.getElementById('roi-result');
      if (revEl) revEl.textContent = '$' + revenue.toLocaleString('en', { maximumFractionDigits: 0 });
      if (roiEl) roiEl.textContent = '+' + roi + '%';
    });
  },

  _drawProjectionChart() {
    const canvas = document.getElementById('projection-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.clientWidth || 800;
    const H = 130;
    canvas.width = W;

    const labels  = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
    const actual   = [34000,42000,51000,58000,67000,78000,89000,98000,null,null,null,null];
    const projected = [null,null,null,null,null,null,null,98000,112000,128000,145000,165000];

    const all = [...actual.filter(Boolean), ...projected.filter(Boolean)];
    const max = Math.max(...all) * 1.1;
    const pad = 45;
    const chartW = W - pad * 2;
    const chartH = H - 30;
    const stepX = chartW / (labels.length - 1);

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (H - 25) * (i / 4) + 5;
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(W - pad, y); ctx.stroke();
      const val = max - (max * i / 4);
      ctx.fillStyle = 'rgba(148,163,184,0.5)';
      ctx.font = '10px system-ui';
      ctx.textAlign = 'right';
      ctx.fillText('$' + (val/1000).toFixed(0) + 'K', pad - 4, y + 3);
    }

    const toXY = (i, v) => ({
      x: pad + i * stepX,
      y: H - 25 - (v / max) * chartH
    });

    const drawLine = (pts, color, dashed) => {
      ctx.beginPath();
      ctx.setLineDash(dashed ? [6, 4] : []);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      let first = true;
      pts.forEach(p => {
        if (!p) return;
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const gradFill = (pts, color) => {
      const validPts = pts.filter(Boolean);
      if (!validPts.length) return;
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, color + '44');
      grad.addColorStop(1, color + '00');
      ctx.beginPath();
      ctx.moveTo(validPts[0].x, validPts[0].y);
      validPts.forEach((p, i) => { if (i > 0) ctx.lineTo(p.x, p.y); });
      ctx.lineTo(validPts[validPts.length-1].x, H - 25);
      ctx.lineTo(validPts[0].x, H - 25);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const actualPts   = actual.map((v, i) => v !== null ? toXY(i, v) : null);
    const projectedPts = projected.map((v, i) => v !== null ? toXY(i, v) : null);

    gradFill(actualPts, '#7c3aed');
    gradFill(projectedPts, '#06b6d4');
    drawLine(actualPts, '#7c3aed', false);
    drawLine(projectedPts, '#06b6d4', true);

    // Month labels
    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'center';
    labels.forEach((l, i) => {
      ctx.fillText(l, pad + i * stepX, H - 5);
    });

    // Dots
    actualPts.forEach(p => {
      if (!p) return;
      ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
      ctx.fillStyle = '#7c3aed'; ctx.fill();
    });
    projectedPts.forEach(p => {
      if (!p) return;
      ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
      ctx.fillStyle = '#06b6d4'; ctx.fill();
    });
  }
};
