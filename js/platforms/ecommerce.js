/* ===================================================
   AMN HUB - E-Commerce Platform
   Product management, orders, revenue analytics
   =================================================== */

export const Ecommerce = {

  render(data) {
    const ec = data.ecommerce;
    const products = ec.products;

    const html = `
<div class="platform-page fade-in">

  <!-- Revenue KPIs -->
  <div class="grid-4 mb-24">
    <div class="stat-card cyan">
      <div class="stat-card-icon">&#128176;</div>
      <div class="stat-card-val">$${ec.revenue.today.toLocaleString()}</div>
      <div class="stat-card-lbl">Today's Revenue</div>
      <div class="stat-card-change positive">&#9650; ${ec.orders.pending} orders pending</div>
    </div>
    <div class="stat-card green">
      <div class="stat-card-icon">&#128201;</div>
      <div class="stat-card-val">$${ec.revenue.week.toLocaleString()}</div>
      <div class="stat-card-lbl">This Week</div>
      <div class="stat-card-change positive">&#9650; +18.1% vs last week</div>
    </div>
    <div class="stat-card purple">
      <div class="stat-card-icon">&#128116;</div>
      <div class="stat-card-val">${ec.orders.total.toLocaleString()}</div>
      <div class="stat-card-lbl">Total Orders</div>
      <div class="stat-card-change positive">&#9650; $${ec.avgOrderValue} avg order</div>
    </div>
    <div class="stat-card amber">
      <div class="stat-card-icon">&#128293;</div>
      <div class="stat-card-val">${ec.conversionRate}%</div>
      <div class="stat-card-lbl">Conversion Rate</div>
      <div class="stat-card-change positive">&#9650; Industry avg: 1.8%</div>
    </div>
  </div>

  <!-- Order Status Row -->
  <div class="card mb-24">
    <div class="card-header">
      <div class="card-title">&#128116; Order Pipeline</div>
      <button class="btn btn-primary btn-sm">&#43; New Order</button>
    </div>
    <div style="display:flex;gap:0">
      ${[
        { label: 'Pending',    val: ec.orders.pending,    color: 'var(--amber)',  pct: Math.round(ec.orders.pending/ec.orders.total*100)    },
        { label: 'Processing', val: ec.orders.processing,  color: 'var(--cyan)',   pct: Math.round(ec.orders.processing/ec.orders.total*100) },
        { label: 'Completed',  val: ec.orders.completed,  color: 'var(--green)',  pct: Math.round(ec.orders.completed/ec.orders.total*100)  },
        { label: 'Refunded',   val: ec.orders.refunded,   color: 'var(--red)',    pct: Math.round(ec.orders.refunded/ec.orders.total*100)   },
      ].map(o => `
        <div style="flex:1;text-align:center;padding:16px;border-right:1px solid var(--border)">
          <div style="font-size:28px;font-weight:800;color:${o.color}">${o.val}</div>
          <div style="font-size:12px;color:var(--text2);margin:4px 0">${o.label}</div>
          <div style="font-size:11px;color:var(--text3)">${o.pct}% of total</div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Products + Orders -->
  <div class="grid-21 mb-24">

    <!-- Products -->
    <div>
      <div class="card-header mb-16">
        <div class="section-title" style="margin:0">Products</div>
        <div style="display:flex;gap:8px">
          <input type="text" placeholder="Search products..." id="product-search" style="background:var(--glass);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:13px;color:var(--text);outline:none;width:180px">
          <select id="product-filter" style="background:var(--glass);border:1px solid var(--border);border-radius:8px;padding:6px 10px;font-size:13px;color:var(--text);outline:none">
            <option>All Categories</option>
            <option>Digital Course</option>
            <option>Software</option>
            <option>SaaS</option>
            <option>Templates</option>
          </select>
        </div>
      </div>
      <div class="product-grid" id="product-grid">
        ${products.map(p => `
          <div class="product-card" data-product-id="${p.id}">
            <div class="product-img">${p.emoji}</div>
            <div class="product-body">
              <div class="product-name">${p.name}</div>
              <div class="product-category">${p.category}</div>
              <div class="product-price">$${p.price}</div>
              <div class="product-footer">
                <div class="product-stock">
                  <span class="dot green"></span>
                  ${p.sold.toLocaleString()} sold
                </div>
                <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">Add</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Right Panel: Cart + Revenue + Recent Orders -->
    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- Cart -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#128722; Cart (0 items)</div>
        <div id="cart-items" style="display:flex;flex-direction:column;gap:8px;min-height:60px">
          <div style="text-align:center;color:var(--text3);font-size:13px;padding:20px 0" id="cart-empty">No items in cart</div>
        </div>
        <div style="border-top:1px solid var(--border);padding-top:12px;margin-top:8px">
          <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:700;margin-bottom:10px">
            <span>Total</span><span id="cart-total">$0.00</span>
          </div>
          <button class="btn btn-primary" style="width:100%;justify-content:center" id="checkout-btn">&#9654; Checkout</button>
        </div>
      </div>

      <!-- Revenue Breakdown -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#128200; Revenue by Product</div>
        ${products.slice(0,5).map((p, i) => {
          const rev = p.price * p.sold;
          const maxRev = products[0].price * products[0].sold;
          return `
            <div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:13px">${p.emoji} ${p.name}</span>
                <span style="font-size:13px;font-weight:700">$${rev.toLocaleString()}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill fill-gradient" style="width:${Math.round(rev/maxRev*100)}%"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Recent Orders -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#128338; Recent Orders</div>
        <div style="display:flex;flex-direction:column;gap:6px" id="recent-orders-list">
          ${[
            { id: '1847', customer: 'John D.',  product: 'AI Trading Masterclass', amount: 297, status: 'paid',       time: '2 min ago' },
            { id: '1846', customer: 'Sarah M.', product: 'Hub Pro Subscription',  amount: 97,  status: 'paid',       time: '18 min ago' },
            { id: '1845', customer: 'Alex K.',  product: 'Crypto Bot License',    amount: 497, status: 'processing', time: '1 hr ago' },
            { id: '1844', customer: 'Emma W.',  product: 'Income Funnel Templates',amount: 67, status: 'paid',       time: '2 hrs ago' },
            { id: '1843', customer: 'Tom B.',   product: 'Affiliate Kit',          amount: 147, status: 'refunded',  time: '3 hrs ago' },
          ].map(o => `
            <div style="padding:8px 10px;background:var(--glass);border-radius:8px;border:1px solid var(--border)">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:12px;font-weight:700">#${o.id} ${o.customer}</span>
                <span class="tag ${o.status==='paid'?'tag-green':o.status==='processing'?'tag-amber':'tag-red'}" style="font-size:10px">${o.status}</span>
              </div>
              <div style="font-size:11px;color:var(--text2);margin-top:2px">${o.product} &bull; <strong style="color:var(--text)">$${o.amount}</strong> &bull; ${o.time}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ShopBot Status -->
      <div class="card" style="background:linear-gradient(135deg,rgba(6,182,212,0.08),rgba(124,58,237,0.04))">
        <div class="card-title" style="margin-bottom:10px">&#129302; ShopBot Commerce</div>
        <div style="font-size:12px;color:var(--text2);display:flex;flex-direction:column;gap:6px">
          <div style="display:flex;justify-content:space-between"><span>Orders processed today</span><strong style="color:var(--green)">23</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Upsells triggered</span><strong style="color:var(--text)">8</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Abandoned cart emails</span><strong style="color:var(--text)">12 sent</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Revenue generated</span><strong style="color:var(--cyan)">$4,820</strong></div>
        </div>
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border);display:flex;align-items:center;gap:6px;font-size:12px;color:var(--green)">
          <span class="dot green"></span> ShopBot running — 24/7 automation active
        </div>
      </div>
    </div>
  </div>

  <!-- Monthly Revenue Chart -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">&#128201; Monthly Revenue — $${ec.revenue.month.toLocaleString()}</div>
      <span class="tag tag-green">+18.1% this month</span>
    </div>
    <canvas id="revenue-chart" height="120" style="display:block;width:100%"></canvas>
  </div>

  <!-- Checkout Success -->
  <div id="checkout-toast" style="position:fixed;bottom:20px;right:20px;z-index:999;display:none">
    <div style="background:var(--bg2);border:1px solid var(--cyan);border-radius:12px;padding:14px 20px;box-shadow:var(--shadow-lg)">
      <strong style="color:var(--cyan)">&#9989; Order Placed Successfully!</strong>
      <div style="font-size:12px;color:var(--text2);margin-top:4px" id="checkout-toast-text"></div>
    </div>
  </div>

</div>
    `;

    return { html, cleanup: null };
  },

  init(data) {
    this._cart = [];
    this._drawRevenueChart();

    // Add to cart
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id    = parseInt(btn.dataset.id);
        const name  = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        this._addToCart(id, name, price);
      });
    });

    // Checkout
    document.getElementById('checkout-btn')?.addEventListener('click', () => {
      if (!this._cart.length) { alert('Your cart is empty!'); return; }
      const total = this._cart.reduce((s, i) => s + i.price, 0);
      const toast = document.getElementById('checkout-toast');
      document.getElementById('checkout-toast-text').textContent =
        `${this._cart.length} item(s) — $${total.toFixed(2)} — Order #${1848 + Math.floor(Math.random()*10)}`;
      this._cart = [];
      this._renderCart();
      if (toast) { toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 3000); }
    });

    // Search
    const search = document.getElementById('product-search');
    const filter = document.getElementById('product-filter');
    const grid   = document.getElementById('product-grid');
    const filterProducts = () => {
      const q = search?.value?.toLowerCase() || '';
      const cat = filter?.value || 'All Categories';
      document.querySelectorAll('.product-card').forEach(card => {
        const name = card.querySelector('.product-name')?.textContent?.toLowerCase() || '';
        const category = card.querySelector('.product-category')?.textContent || '';
        const matchQ = !q || name.includes(q);
        const matchC = cat === 'All Categories' || category.includes(cat);
        card.style.display = matchQ && matchC ? '' : 'none';
      });
    };
    search?.addEventListener('input', filterProducts);
    filter?.addEventListener('change', filterProducts);
  },

  _cart: [],

  _addToCart(id, name, price) {
    this._cart.push({ id, name, price });
    this._renderCart();
  },

  _renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl   = document.getElementById('cart-total');
    const emptyEl   = document.getElementById('cart-empty');
    if (!container) return;

    if (!this._cart.length) {
      container.innerHTML = '<div style="text-align:center;color:var(--text3);font-size:13px;padding:20px 0">No items in cart</div>';
      if (totalEl) totalEl.textContent = '$0.00';
      return;
    }

    container.innerHTML = this._cart.map((item, i) => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--glass);border-radius:8px;font-size:13px">
        <span style="font-weight:600">${item.name}</span>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="color:var(--cyan);font-weight:700">$${item.price}</span>
          <button class="remove-cart-btn" data-idx="${i}" style="color:var(--red);background:none;border:none;cursor:pointer;font-size:14px">&#10005;</button>
        </div>
      </div>
    `).join('');

    const total = this._cart.reduce((s, i) => s + i.price, 0);
    if (totalEl) totalEl.textContent = '$' + total.toFixed(2);

    document.querySelectorAll('.remove-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._cart.splice(parseInt(btn.dataset.idx), 1);
        this._renderCart();
      });
    });
  },

  _drawRevenueChart() {
    const canvas = document.getElementById('revenue-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.clientWidth || 800;
    const H = 120;
    canvas.width = W;

    const months = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
    const values = [42000, 58000, 67000, 71000, 89000, 98000, 108000, 112600];
    const max = Math.max(...values) * 1.1;

    ctx.clearRect(0, 0, W, H);

    const pad = 40;
    const chartW = W - pad * 2;
    const chartH = H - 40;
    const stepX = chartW / (values.length - 1);

    const pts = values.map((v, i) => ({
      x: pad + i * stepX,
      y: H - 30 - (v / max) * chartH
    }));

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(6,182,212,0.3)');
    grad.addColorStop(1, 'rgba(6,182,212,0)');

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i-1].x + pts[i].x) / 2;
      ctx.bezierCurveTo(cpx, pts[i-1].y, cpx, pts[i].y, pts[i].x, pts[i].y);
    }
    ctx.lineTo(pts[pts.length-1].x, H - 30);
    ctx.lineTo(pts[0].x, H - 30);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i-1].x + pts[i].x) / 2;
      ctx.bezierCurveTo(cpx, pts[i-1].y, cpx, pts[i].y, pts[i].x, pts[i].y);
    }
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Dots + labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    pts.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.fillText(months[i], p.x, H - 8);
    });
  }
};
