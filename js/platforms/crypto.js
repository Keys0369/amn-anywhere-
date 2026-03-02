/* ===================================================
   AMN HUB - Crypto Trading Platform
   Live charts, portfolio, signals, trading
   =================================================== */

export const Crypto = {

  _priceHistory: {},
  _chart: null,
  _activePair: 'BTC/USDT',
  _tradeType: 'buy',
  _chartInterval: null,

  render(data) {
    const markets = data.crypto.markets;
    const holdings = data.portfolio.holdings;
    const signals = data.crypto.signals;

    const html = `
<div class="platform-page fade-in">

  <!-- Header Stats -->
  <div class="grid-4 mb-24">
    <div class="stat-card amber">
      <div class="stat-card-icon">&#x20BF;</div>
      <div class="stat-card-val">$${data.portfolio.total.toLocaleString('en',{maximumFractionDigits:0})}</div>
      <div class="stat-card-lbl">Total Portfolio</div>
      <div class="stat-card-change positive">&#9650; +${data.portfolio.dailyPct}% today</div>
    </div>
    <div class="stat-card green">
      <div class="stat-card-icon">&#128200;</div>
      <div class="stat-card-val">+$${data.portfolio.dailyGain.toLocaleString('en',{maximumFractionDigits:0})}</div>
      <div class="stat-card-lbl">Today's P&L</div>
      <div class="stat-card-change positive">&#9650; Best day this week</div>
    </div>
    <div class="stat-card cyan">
      <div class="stat-card-icon">&#128202;</div>
      <div class="stat-card-val">1,247</div>
      <div class="stat-card-lbl">Bot Trades Today</div>
      <div class="stat-card-change positive">94% win rate</div>
    </div>
    <div class="stat-card purple">
      <div class="stat-card-icon">&#9889;</div>
      <div class="stat-card-val">${signals.filter(s=>s.signal==='BUY').length}</div>
      <div class="stat-card-lbl">Active Buy Signals</div>
      <div class="stat-card-change">BTC, SOL signaled</div>
    </div>
  </div>

  <!-- Main Trading Interface -->
  <div class="grid-21 mb-24">

    <!-- Chart Area -->
    <div class="card" style="padding:0">
      <div class="chart-toolbar">
        <div>
          <div class="chart-pair" id="chart-pair-label">BTC/USDT</div>
          <div class="chart-price">
            <span style="font-size:22px;font-weight:800" id="chart-live-price">$67,420</span>
            <span class="positive" id="chart-live-change" style="margin-left:8px">+2.4%</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <div class="chart-period-btns">
            <button class="period-btn active" data-period="1H">1H</button>
            <button class="period-btn" data-period="4H">4H</button>
            <button class="period-btn" data-period="1D">1D</button>
            <button class="period-btn" data-period="1W">1W</button>
          </div>
        </div>
      </div>
      <div class="chart-container" style="height:300px;padding:16px;background:var(--bg3)">
        <canvas id="crypto-canvas" height="270"></canvas>
      </div>
      <!-- AI Signals Banner -->
      <div style="padding:12px 16px;border-top:1px solid var(--border);display:flex;gap:12px;flex-wrap:wrap">
        ${signals.map(s => `
          <div style="display:flex;align-items:center;gap:8px;padding:6px 12px;border-radius:8px;background:var(--glass);border:1px solid var(--border)">
            <span style="font-weight:700;font-size:13px">${s.coin}</span>
            <span class="tag ${s.signal==='BUY'?'tag-green':s.signal==='SELL'?'tag-red':'tag-amber'}">${s.signal}</span>
            <span style="font-size:11px;color:var(--text2)">${s.strength}% confidence</span>
            <span style="font-size:11px;color:var(--text3)">&#183; ${s.reason}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Trade Panel -->
    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- Order Form -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">&#128200; Place Order</div>
        </div>
        <div class="trade-form">
          <div class="trade-tabs">
            <button class="trade-tab buy active" id="trade-buy-btn">BUY</button>
            <button class="trade-tab sell" id="trade-sell-btn">SELL</button>
          </div>
          <div class="form-group">
            <label class="form-label">Asset</label>
            <select class="form-input" id="trade-asset">
              ${markets.map(m => `<option value="${m.symbol}">${m.symbol} — $${m.price.toLocaleString()}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Order Type</label>
            <select class="form-input" id="trade-type">
              <option>Market Order</option>
              <option>Limit Order</option>
              <option>Stop Loss</option>
              <option>Take Profit</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Amount (USDT)</label>
            <div class="form-input-wrap">
              <input class="form-input" id="trade-amount" type="number" placeholder="0.00" style="padding-right:56px">
              <span class="form-input-suffix">USDT</span>
            </div>
            <div class="amount-pct-btns">
              <button class="pct-btn" data-pct="25">25%</button>
              <button class="pct-btn" data-pct="50">50%</button>
              <button class="pct-btn" data-pct="75">75%</button>
              <button class="pct-btn" data-pct="100">MAX</button>
            </div>
          </div>
          <div id="limit-price-group" class="form-group" style="display:none">
            <label class="form-label">Limit Price</label>
            <div class="form-input-wrap">
              <input class="form-input" id="trade-limit-price" type="number" placeholder="0.00" style="padding-right:56px">
              <span class="form-input-suffix">USDT</span>
            </div>
          </div>
          <div style="background:var(--glass);border-radius:8px;padding:10px;font-size:12px;color:var(--text2)">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span>Available Balance</span><span style="color:var(--text);font-weight:600">$5,301.27 USDT</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span>Fee (0.1%)</span><span id="trade-fee">$0.00</span>
            </div>
            <div style="display:flex;justify-content:space-between">
              <span>Est. Received</span><span id="trade-received" style="color:var(--text);font-weight:600">0.00000 BTC</span>
            </div>
          </div>
          <button class="btn btn-primary btn-lg" id="execute-trade-btn" style="justify-content:center;width:100%">
            &#128200; Execute Buy Order
          </button>
        </div>
      </div>

      <!-- Quick AI Signal -->
      <div class="card" style="background:linear-gradient(135deg,rgba(124,58,237,0.1),rgba(6,182,212,0.05))">
        <div class="card-title" style="margin-bottom:12px">&#10022; AI Bot Recommendation</div>
        <div style="font-size:13px;line-height:1.6;color:var(--text2)">
          TradingBot Alpha recommends a <strong style="color:var(--green)">STRONG BUY</strong> on BTC/USDT. RSI is at 28 (oversold), MACD shows bullish crossover, and volume is 3x the 30-day average.
        </div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn btn-success" style="flex:1;justify-content:center">&#9650; Follow Signal</button>
          <button class="btn btn-secondary">Details</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Market Overview Table + Portfolio -->
  <div class="grid-2 mb-24">

    <!-- Market Table -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">&#127758; Market Overview</div>
        <span class="nav-badge live-badge">LIVE</span>
      </div>
      <div style="overflow-x:auto">
        <table class="hub-table">
          <thead>
            <tr>
              <th>Pair</th>
              <th class="td-right">Price</th>
              <th class="td-right">24h Change</th>
              <th class="td-right">Volume</th>
              <th class="td-right">Market Cap</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="market-table-body">
            ${markets.map(m => `
              <tr class="market-row" data-pair="${m.symbol}" style="cursor:pointer">
                <td><strong>${m.symbol}</strong></td>
                <td class="td-right" id="mkt-${m.symbol.replace('/','_')}">$${m.price.toLocaleString()}</td>
                <td class="td-right ${m.change >= 0 ? 'positive' : 'negative'}">${m.change >= 0 ? '+' : ''}${m.change}%</td>
                <td class="td-right">${m.volume}</td>
                <td class="td-right">${m.mcap}</td>
                <td class="td-right"><button class="btn btn-secondary btn-sm">Trade</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Portfolio Holdings -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">&#128188; My Holdings</div>
        <span class="tag tag-purple">$${data.portfolio.total.toLocaleString('en',{maximumFractionDigits:0})}</span>
      </div>
      <div style="overflow-x:auto">
        <table class="hub-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th class="td-right">Amount</th>
              <th class="td-right">Value</th>
              <th class="td-right">Alloc</th>
              <th class="td-right">P&L</th>
            </tr>
          </thead>
          <tbody>
            ${holdings.map(h => `
              <tr>
                <td>
                  <div style="font-weight:700">${h.coin}</div>
                  <div style="font-size:11px;color:var(--text2)">${h.name}</div>
                </td>
                <td class="td-right" style="font-size:12px">${h.amount} ${h.coin}</td>
                <td class="td-right"><strong>$${h.value.toLocaleString('en',{maximumFractionDigits:0})}</strong></td>
                <td class="td-right">
                  <div style="display:flex;align-items:center;gap:6px">
                    <div class="progress-bar" style="width:50px">
                      <div class="progress-fill fill-gradient" style="width:${h.alloc}%"></div>
                    </div>
                    <span style="font-size:11px">${h.alloc}%</span>
                  </div>
                </td>
                <td class="td-right ${h.pct >= 0 ? 'positive' : 'negative'}">${h.pct >= 0 ? '+' : ''}${h.pct}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Order Book -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">&#128213; Order Book — BTC/USDT</div>
      <div style="font-size:12px;color:var(--text2)">Spread: $12.40 (0.018%)</div>
    </div>
    <div class="grid-2">
      <div>
        <div class="section-title" style="color:var(--red)">ASKS (Sell Orders)</div>
        <div class="orderbook">
          <div class="orderbook-hdr"><span>Price (USDT)</span><span style="text-align:center">Amount (BTC)</span><span style="text-align:right">Total</span></div>
          <div id="ob-asks"></div>
        </div>
      </div>
      <div>
        <div class="section-title" style="color:var(--green)">BIDS (Buy Orders)</div>
        <div class="orderbook">
          <div class="orderbook-hdr"><span>Price (USDT)</span><span style="text-align:center">Amount (BTC)</span><span style="text-align:right">Total</span></div>
          <div id="ob-bids"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Trade notification area -->
  <div id="trade-notification" style="position:fixed;bottom:20px;right:20px;z-index:999;display:none">
    <div style="background:var(--bg2);border:1px solid var(--green);border-radius:12px;padding:14px 20px;display:flex;align-items:center;gap:10px;box-shadow:var(--shadow-lg)">
      <span style="font-size:20px">&#9989;</span>
      <div>
        <div style="font-weight:700;color:var(--green)" id="trade-notif-title">Order Executed</div>
        <div style="font-size:12px;color:var(--text2)" id="trade-notif-text"></div>
      </div>
    </div>
  </div>

</div>
    `;

    return { html, cleanup: () => this._cleanup() };
  },

  init(data) {
    this._initChart(data);
    this._initOrderBook();
    this._initTradeForm(data);
    this._initMarketTable(data);

    // Real-time chart + ticker hook
    window._cryptoTickUpdate = () => {
      this._updateChart(data);
      this._updateMarketTable(data);
      this._updateLivePrice(data);
    };
  },

  _generatePriceHistory(basePrice, points = 60) {
    const prices = [];
    let price = basePrice * 0.95;
    for (let i = 0; i < points; i++) {
      price *= 1 + (Math.random() - 0.48) * 0.012;
      prices.push(price);
    }
    return prices;
  },

  _drawChart(canvas, prices, isUp) {
    const ctx = canvas.getContext('2d');
    const W = canvas.clientWidth || 600;
    const H = canvas.height || 270;
    canvas.width = W;

    const min = Math.min(...prices) * 0.999;
    const max = Math.max(...prices) * 1.001;
    const range = max - min;

    ctx.clearRect(0, 0, W, H);

    // Background grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = (H - 30) * (i / 5) + 15;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Price labels on right
    ctx.fillStyle = 'rgba(148,163,184,0.6)';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const val = max - (range * i / 4);
      const y = (H - 30) * (i / 4) + 15;
      ctx.fillText('$' + val.toLocaleString('en', { maximumFractionDigits: 0 }), W - 4, y + 3);
    }

    // Build path
    const stepX = (W - 60) / (prices.length - 1);
    const points = prices.map((p, i) => ({
      x: i * stepX + 30,
      y: H - 30 - ((p - min) / range) * (H - 50) + 10
    }));

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    if (isUp) {
      grad.addColorStop(0, 'rgba(16,185,129,0.3)');
      grad.addColorStop(1, 'rgba(16,185,129,0)');
    } else {
      grad.addColorStop(0, 'rgba(239,68,68,0.3)');
      grad.addColorStop(1, 'rgba(239,68,68,0)');
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1], curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      ctx.bezierCurveTo(cpx, prev.y, cpx, curr.y, curr.x, curr.y);
    }
    ctx.lineTo(points[points.length - 1].x, H);
    ctx.lineTo(points[0].x, H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1], curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      ctx.bezierCurveTo(cpx, prev.y, cpx, curr.y, curr.x, curr.y);
    }
    ctx.strokeStyle = isUp ? '#10b981' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Current price dot
    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = isUp ? '#10b981' : '#ef4444';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  },

  _initChart(data) {
    const pair = data.crypto.markets[0];
    this._priceHistory[pair.symbol] = this._generatePriceHistory(pair.price);

    const canvas = document.getElementById('crypto-canvas');
    if (!canvas) return;

    const draw = () => {
      const prices = this._priceHistory[this._activePair] || this._priceHistory[pair.symbol];
      this._drawChart(canvas, prices, pair.change >= 0);
    };

    draw();

    // Period buttons
    document.querySelectorAll('.period-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const market = data.crypto.markets.find(m => m.symbol === this._activePair) || data.crypto.markets[0];
        const pts = btn.dataset.period === '1H' ? 30 : btn.dataset.period === '4H' ? 60 : btn.dataset.period === '1D' ? 90 : 120;
        this._priceHistory[this._activePair] = this._generatePriceHistory(market.price, pts);
        draw();
      });
    });

    // Live update tick
    this._chartInterval = setInterval(() => {
      const prices = this._priceHistory[this._activePair];
      if (!prices) return;
      const last = prices[prices.length - 1];
      prices.push(last * (1 + (Math.random() - 0.48) * 0.003));
      if (prices.length > 120) prices.shift();
      const market = data.crypto.markets.find(m => m.symbol === this._activePair) || data.crypto.markets[0];
      this._drawChart(canvas, prices, market.change >= 0);
    }, 2000);
  },

  _updateChart(data) {
    const canvas = document.getElementById('crypto-canvas');
    const market = data.crypto.markets.find(m => m.symbol === this._activePair) || data.crypto.markets[0];
    const prices = this._priceHistory[this._activePair];
    if (canvas && prices) this._drawChart(canvas, prices, market.change >= 0);
  },

  _updateLivePrice(data) {
    const market = data.crypto.markets.find(m => m.symbol === this._activePair) || data.crypto.markets[0];
    const priceEl = document.getElementById('chart-live-price');
    const changeEl = document.getElementById('chart-live-change');
    if (priceEl) priceEl.textContent = '$' + market.price.toLocaleString();
    if (changeEl) {
      changeEl.textContent = (market.change >= 0 ? '+' : '') + market.change + '%';
      changeEl.className = market.change >= 0 ? 'positive' : 'negative';
    }
  },

  _generateOrderBook(midPrice) {
    const asks = [], bids = [];
    for (let i = 0; i < 8; i++) {
      const askPx = midPrice + (i + 1) * midPrice * 0.0003;
      const bidPx = midPrice - (i + 1) * midPrice * 0.0003;
      const askAmt = +(Math.random() * 2).toFixed(4);
      const bidAmt = +(Math.random() * 3).toFixed(4);
      asks.push({ price: askPx.toFixed(2), amount: askAmt, total: (askPx * askAmt).toFixed(2) });
      bids.push({ price: bidPx.toFixed(2), amount: bidAmt, total: (bidPx * bidAmt).toFixed(2) });
    }
    return { asks, bids };
  },

  _initOrderBook() {
    const btcPrice = 67420;
    const { asks, bids } = this._generateOrderBook(btcPrice);

    const renderSide = (container, entries, side) => {
      container.innerHTML = entries.map((e, i) => {
        const maxTotal = Math.max(...entries.map(x => +x.total));
        const pct = (+e.total / maxTotal * 100).toFixed(1);
        return `
          <div class="ob-row ${side}">
            <div class="ob-fill" style="width:${pct}%"></div>
            <span>$${parseFloat(e.price).toLocaleString()}</span>
            <span style="text-align:center">${e.amount}</span>
            <span style="text-align:right">$${parseFloat(e.total).toLocaleString()}</span>
          </div>`;
      }).join('');
    };

    const asksEl = document.getElementById('ob-asks');
    const bidsEl = document.getElementById('ob-bids');
    if (asksEl && bidsEl) {
      renderSide(asksEl, asks, 'ask');
      renderSide(bidsEl, bids, 'bid');
    }
  },

  _initTradeForm(data) {
    const buyBtn = document.getElementById('trade-buy-btn');
    const sellBtn = document.getElementById('trade-sell-btn');
    const executeBtn = document.getElementById('execute-trade-btn');
    const amountInput = document.getElementById('trade-amount');
    const typeSelect = document.getElementById('trade-type');
    const limitGroup = document.getElementById('limit-price-group');

    if (buyBtn) {
      buyBtn.addEventListener('click', () => {
        this._tradeType = 'buy';
        buyBtn.classList.add('active');
        sellBtn.classList.remove('active');
        if (executeBtn) executeBtn.textContent = '📈 Execute Buy Order';
      });
    }
    if (sellBtn) {
      sellBtn.addEventListener('click', () => {
        this._tradeType = 'sell';
        sellBtn.classList.add('active');
        buyBtn.classList.remove('active');
        if (executeBtn) executeBtn.textContent = '📉 Execute Sell Order';
      });
    }

    if (typeSelect && limitGroup) {
      typeSelect.addEventListener('change', () => {
        limitGroup.style.display = typeSelect.value !== 'Market Order' ? 'flex' : 'none';
      });
    }

    // Percentage buttons
    document.querySelectorAll('.pct-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pct = parseInt(btn.dataset.pct);
        if (amountInput) amountInput.value = (5301.27 * pct / 100).toFixed(2);
        this._updateOrderCalc(data);
      });
    });

    if (amountInput) amountInput.addEventListener('input', () => this._updateOrderCalc(data));

    if (executeBtn) {
      executeBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput?.value || 0);
        if (!amount) { alert('Please enter an amount'); return; }
        const asset = document.getElementById('trade-asset')?.value || 'BTC/USDT';
        const market = data.crypto.markets.find(m => m.symbol === asset) || data.crypto.markets[0];
        const units = (amount / market.price).toFixed(6);

        const notif = document.getElementById('trade-notification');
        document.getElementById('trade-notif-title').textContent = `${this._tradeType === 'buy' ? 'Buy' : 'Sell'} Order Executed ✓`;
        document.getElementById('trade-notif-text').textContent = `${units} ${asset.split('/')[0]} @ $${market.price.toLocaleString()}`;

        if (notif) {
          notif.style.display = 'block';
          setTimeout(() => { notif.style.display = 'none'; }, 3000);
        }
      });
    }
  },

  _updateOrderCalc(data) {
    const amount = parseFloat(document.getElementById('trade-amount')?.value || 0);
    const asset = document.getElementById('trade-asset')?.value || 'BTC/USDT';
    const market = data.crypto.markets.find(m => m.symbol === asset) || data.crypto.markets[0];
    const fee = amount * 0.001;
    const received = (amount - fee) / market.price;
    const feeEl = document.getElementById('trade-fee');
    const recEl = document.getElementById('trade-received');
    if (feeEl) feeEl.textContent = '$' + fee.toFixed(2);
    if (recEl) recEl.textContent = received.toFixed(6) + ' ' + asset.split('/')[0];
  },

  _initMarketTable(data) {
    document.querySelectorAll('.market-row').forEach(row => {
      row.addEventListener('click', () => {
        const pair = row.dataset.pair;
        this._activePair = pair;
        document.getElementById('chart-pair-label').textContent = pair;
        const market = data.crypto.markets.find(m => m.symbol === pair);
        if (market) {
          this._priceHistory[pair] = this._generatePriceHistory(market.price);
          const canvas = document.getElementById('crypto-canvas');
          const prices = this._priceHistory[pair];
          if (canvas && prices) this._drawChart(canvas, prices, market.change >= 0);
          document.getElementById('chart-live-price').textContent = '$' + market.price.toLocaleString();
        }
      });
    });
  },

  _updateMarketTable(data) {
    data.crypto.markets.forEach(m => {
      const id = 'mkt-' + m.symbol.replace('/', '_');
      const el = document.getElementById(id);
      if (el) el.textContent = '$' + m.price.toLocaleString();
    });
  },

  _cleanup() {
    if (this._chartInterval) { clearInterval(this._chartInterval); this._chartInterval = null; }
    delete window._cryptoTickUpdate;
  }
};
