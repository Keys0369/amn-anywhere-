/* ===================================================
   AMN HUB - Main App Controller
   Router, AI Assistant, Notifications
   =================================================== */

import { HubData } from './hub-data.js';
import { Dashboard }   from './platforms/dashboard.js';
import { Crypto }      from './platforms/crypto.js';
import { Social }      from './platforms/social.js';
import { Ecommerce }   from './platforms/ecommerce.js';
import { Network }     from './platforms/network.js';
import { Affiliate }   from './platforms/affiliate.js';
import { Funnels }     from './platforms/funnels.js';
import { AIStation }   from './platforms/ai-station.js';
import { BotFleet }    from './platforms/bots.js';

/* ---- Platform Registry ---- */
const PLATFORMS = {
  'dashboard':  { module: Dashboard,  name: 'Hub Dashboard'      },
  'crypto':     { module: Crypto,     name: 'Crypto Trading'      },
  'social':     { module: Social,     name: 'Social Network'      },
  'ecommerce':  { module: Ecommerce,  name: 'E-Commerce'          },
  'network':    { module: Network,    name: 'Global Network'      },
  'affiliate':  { module: Affiliate,  name: 'Affiliate Hub'       },
  'funnels':    { module: Funnels,    name: 'Income Funnels'      },
  'ai-station': { module: AIStation,  name: 'AI Creator Station'  },
  'bots':       { module: BotFleet,   name: 'Bot Fleet'           },
};

let currentPlatform = null;
let currentCleanup  = null;

/* ---- Loader ---- */
async function runLoader() {
  const bar    = document.getElementById('loader-bar');
  const status = document.getElementById('loader-status');
  const plats  = document.getElementById('loader-platforms');

  const steps = [
    { pct: 15,  msg: 'Initializing Hub Core...' },
    { pct: 30,  msg: 'Connecting Crypto Engine...',  tag: '₿ Crypto' },
    { pct: 45,  msg: 'Linking Social Platforms...',  tag: '📡 Social' },
    { pct: 55,  msg: 'Loading E-Commerce Module...', tag: '🛒 Store' },
    { pct: 65,  msg: 'Mapping Global Network...',    tag: '🌐 Network' },
    { pct: 72,  msg: 'Starting Affiliate Engine...',  tag: '🔗 Affiliate' },
    { pct: 80,  msg: 'Building Income Funnels...',   tag: '⚡ Funnels' },
    { pct: 88,  msg: 'Loading AI Creator Station...', tag: '✦ AI Station' },
    { pct: 94,  msg: 'Deploying Bot Fleet...',       tag: '🤖 Bot Fleet' },
    { pct: 100, msg: 'Hub Online — All Systems Go!', tag: '✓ Ready' },
  ];

  for (const step of steps) {
    await sleep(250);
    bar.style.width = step.pct + '%';
    status.textContent = step.msg;
    if (step.tag) {
      const el = document.createElement('span');
      el.className = 'lp-tag ready';
      el.textContent = step.tag;
      plats.appendChild(el);
    }
  }

  await sleep(400);
  document.getElementById('loading-screen').style.opacity = '0';
  await sleep(300);
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('app').style.opacity = '0';
  document.getElementById('app').style.transition = 'opacity 0.4s';
  await sleep(50);
  document.getElementById('app').style.opacity = '1';
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ---- Router ---- */
function navigate(platform) {
  if (currentPlatform === platform) return;

  // Cleanup previous
  if (currentCleanup) { currentCleanup(); currentCleanup = null; }

  currentPlatform = platform;
  const def = PLATFORMS[platform];
  if (!def) return;

  // Update nav
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.platform === platform);
  });

  // Update page title
  document.getElementById('page-name').textContent = def.name;

  // Render platform
  const view = document.getElementById('platform-view');
  view.innerHTML = '';
  view.classList.remove('fade-in');
  void view.offsetWidth; // trigger reflow
  view.classList.add('fade-in');

  const { html, cleanup } = def.module.render(HubData);
  view.innerHTML = html;
  if (cleanup) currentCleanup = cleanup;

  // Init platform after render
  if (def.module.init) {
    def.module.init(HubData, { navigate });
  }

  // Close panels if open
  closePanels();
}

/* ---- Header Real-time Updates ---- */
function updateHeaderStats() {
  const portfolio = HubData.portfolio;
  const el = document.getElementById('hdr-portfolio');
  if (el) el.textContent = '$' + portfolio.total.toLocaleString('en', { maximumFractionDigits: 0 });

  const gainEl = document.getElementById('hdr-gain');
  if (gainEl) {
    const gain = portfolio.dailyGain;
    gainEl.textContent = (gain >= 0 ? '+' : '') + '$' + Math.abs(gain).toLocaleString('en', { maximumFractionDigits: 0 });
    gainEl.className = 'hdr-stat-val ' + (gain >= 0 ? 'positive' : 'negative');
  }
}

/* ---- Notifications ---- */
function renderNotifications() {
  const list = document.getElementById('notif-list');
  list.innerHTML = HubData.notifications.map(n => `
    <div class="notif-item">
      <div class="notif-ico">${n.icon}</div>
      <div class="notif-body">
        <div class="notif-title">${n.title}</div>
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

/* ---- AI Assistant ---- */
const AI_RESPONSES = {
  default: [
    `Based on your hub data, your portfolio is performing well at <strong>$${HubData.portfolio.total.toLocaleString()}</strong> with a <strong>+${HubData.portfolio.dailyPct}%</strong> gain today. Your strongest performers are BTC and SOL. I recommend maintaining your current allocation while monitoring XRP which shows bearish signals.`,
    `Your income streams are generating <strong>$${HubData.incomeStreams.reduce((s,i) => s+i.monthly, 0).toLocaleString()}/month</strong>. The top performer is Crypto Trading at $18,420/mo. Consider scaling your AI Station subscriptions which are growing at <strong>42.8%</strong> — the fastest of all streams.`,
    `Your bot fleet is running at <strong>100% capacity</strong> with 10 active bots. TradingBot Alpha has the highest impact with a 94% win rate on 1,247 trades. SocialBot Pro is managing 157,800 followers across 6 platforms with 6.8% engagement rate.`,
    `Your affiliate network has <strong>892 referrals</strong> generating $48,320 in total commissions. Your top affiliate Alex R. earned $8,240 this period. Consider launching a new incentive campaign — your Level 3 conversion can be improved from the current 5%.`,
  ],
  portfolio: `📊 <strong>Portfolio Overview</strong><br><br>Total Value: <strong>$${HubData.portfolio.total.toLocaleString()}</strong><br>Today's Gain: <strong>+$${HubData.portfolio.dailyGain.toLocaleString()}</strong> (+${HubData.portfolio.dailyPct}%)<br><br><strong>Holdings:</strong><br>${HubData.portfolio.holdings.map(h => `• ${h.coin}: $${h.value.toLocaleString()} (${h.alloc}%)`).join('<br>')}`,
  signals: `₿ <strong>Crypto Signals</strong><br><br>${HubData.crypto.signals.map(s => `<strong>${s.coin}</strong>: <span class="${s.signal === 'BUY' ? 'positive' : s.signal === 'SELL' ? 'negative' : ''}">${s.signal}</span> (${s.strength}% confidence)<br>→ ${s.reason}`).join('<br><br>')}`,
  commissions: `💰 <strong>Affiliate Commissions</strong><br><br>Total Earned: <strong>$${HubData.affiliate.totalCommissions.toLocaleString()}</strong><br>Pending Payout: <strong>$${HubData.affiliate.pendingPayout.toLocaleString()}</strong><br>Active Referrals: <strong>${HubData.affiliate.activeReferrals}</strong><br>Conversion Rate: <strong>${HubData.affiliate.conversionRate}%</strong><br><br>Your referral link:<br><code style="font-size:11px;color:var(--cyan)">${HubData.affiliate.referralLink}</code>`,
  funnels: `⚡ <strong>Funnel Performance</strong><br><br>Monthly Traffic: <strong>48,200 visitors</strong><br>Opt-in Rate: <strong>18.5%</strong><br>Sales Rate: <strong>2.6%</strong><br>Revenue: <strong>$${HubData.incomeStreams[0].monthly.toLocaleString()}</strong><br><br><strong>Optimization Tips:</strong><br>• Stage 3→4 is your biggest drop-off (18.5% → 8%)<br>• A/B test your sales page headline<br>• Add a time-limited bonus to boost urgency`,
  bots: `🤖 <strong>Bot Fleet Status</strong><br><br>${HubData.bots.map(b => `<span class="${b.status === 'active' ? 'positive' : 'muted'}">●</span> <strong>${b.name}</strong> — ${b.role}`).join('<br>')}`,
  tools: `✦ <strong>Top AI Tools for Content Creation</strong><br><br>1. <strong>Claude</strong> — Best for long-form, nuanced writing<br>2. <strong>ChatGPT</strong> — Great for brainstorming & drafts<br>3. <strong>Jasper AI</strong> — Marketing copy specialist<br>4. <strong>Copy.ai</strong> — Ad and email copy at scale<br>5. <strong>ElevenLabs</strong> — AI voiceovers for videos<br>6. <strong>HeyGen</strong> — AI avatar videos<br>7. <strong>Runway ML</strong> — Professional video editing`,
};

function getAIResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('portfolio') || q.includes('value') || q.includes('holdings')) return AI_RESPONSES.portfolio;
  if (q.includes('signal') || q.includes('crypto') || q.includes('btc')) return AI_RESPONSES.signals;
  if (q.includes('commiss') || q.includes('affiliate') || q.includes('referral')) return AI_RESPONSES.commissions;
  if (q.includes('funnel') || q.includes('traffic') || q.includes('conversion')) return AI_RESPONSES.funnels;
  if (q.includes('bot') || q.includes('fleet') || q.includes('status')) return AI_RESPONSES.bots;
  if (q.includes('ai tool') || q.includes('content') || q.includes('creat')) return AI_RESPONSES.tools;
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
}

function addAIMessage(content, isUser = false) {
  const msgs = document.getElementById('ai-msgs');
  const div = document.createElement('div');
  div.className = `ai-msg ${isUser ? 'user' : 'bot'} slide-in`;
  div.innerHTML = `
    <div class="msg-ava">${isUser ? 'AM' : '🤖'}</div>
    <div class="msg-bubble">${isUser ? content : `<p>${content}</p>`}</div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showAITyping() {
  const msgs = document.getElementById('ai-msgs');
  const div = document.createElement('div');
  div.className = 'ai-msg bot';
  div.id = 'ai-typing-indicator';
  div.innerHTML = `
    <div class="msg-ava">🤖</div>
    <div class="msg-bubble"><div class="ai-typing"><span></span><span></span><span></span></div></div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

/* ---- Panel management ---- */
function closePanels() {
  document.getElementById('ai-panel').classList.add('hidden');
  document.getElementById('notif-panel').classList.add('hidden');
  document.getElementById('overlay').classList.add('hidden');
  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

/* ---- Ticker Animation ---- */
function animateTicker() {
  const ticker = document.getElementById('live-ticker');
  if (!ticker) return;
  let pos = 0;
  const width = ticker.scrollWidth;
  setInterval(() => {
    pos += 0.5;
    if (pos >= width / 2) pos = 0;
    ticker.style.transform = `translateX(-${pos}px)`;
  }, 30);
}

/* ---- Initialize App ---- */
async function init() {
  await runLoader();

  // Initial navigation
  navigate('dashboard');

  // Nav clicks
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigate(el.dataset.platform);
    });
  });

  // Sidebar toggle
  document.getElementById('sidebar-toggle-btn').addEventListener('click', () => {
    document.getElementById('app').classList.toggle('sidebar-collapsed');
  });

  // Mobile menu
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('hidden');
  });

  // Notifications
  document.getElementById('notif-btn').addEventListener('click', () => {
    const panel = document.getElementById('notif-panel');
    const isHidden = panel.classList.contains('hidden');
    closePanels();
    if (isHidden) {
      renderNotifications();
      panel.classList.remove('hidden');
      document.getElementById('overlay').classList.remove('hidden');
    }
  });
  document.getElementById('notif-close').addEventListener('click', closePanels);

  // AI Panel
  document.getElementById('ai-panel-btn').addEventListener('click', () => {
    const panel = document.getElementById('ai-panel');
    const isHidden = panel.classList.contains('hidden');
    closePanels();
    if (isHidden) panel.classList.remove('hidden');
  });
  document.getElementById('ai-panel-close').addEventListener('click', closePanels);

  // Overlay click
  document.getElementById('overlay').addEventListener('click', closePanels);

  // AI Quick buttons
  document.getElementById('ai-quick-btns').addEventListener('click', e => {
    const btn = e.target.closest('.ai-q-btn');
    if (!btn) return;
    const q = btn.dataset.q;
    handleAIQuery(q);
  });

  // AI send
  document.getElementById('ai-send').addEventListener('click', () => {
    const input = document.getElementById('ai-input');
    const q = input.value.trim();
    if (!q) return;
    input.value = '';
    handleAIQuery(q);
  });
  document.getElementById('ai-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('ai-send').click();
  });

  async function handleAIQuery(q) {
    addAIMessage(q, true);
    const typing = showAITyping();
    await sleep(800 + Math.random() * 600);
    typing.remove();
    addAIMessage(getAIResponse(q));
  }

  // Real-time data
  HubData.startRealTime({
    onPortfolioUpdate: () => updateHeaderStats(),
    onPriceUpdate: () => {
      if (currentPlatform === 'crypto' && window._cryptoTickUpdate) {
        window._cryptoTickUpdate();
      }
    }
  });

  updateHeaderStats();
  animateTicker();

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

init();
