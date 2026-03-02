/* ===================================================
   AMN HUB - AI Creator Station
   Top 20 AI Tools integrated platform
   =================================================== */

export const AIStation = {

  _activeCategory: 'All',

  render(data) {
    const tools = data.aiTools;

    const categories = ['All', 'Text AI', 'Image AI', 'Video AI', 'Audio AI', 'Code AI', 'Content AI', 'Research AI'];
    const catColors = {
      'Text AI':     '#7c3aed',
      'Image AI':    '#ec4899',
      'Video AI':    '#ef4444',
      'Audio AI':    '#f59e0b',
      'Code AI':     '#06b6d4',
      'Content AI':  '#10b981',
      'Research AI': '#3b82f6',
    };

    const toolColor = t => catColors[t.category] || '#7c3aed';

    const html = `
<div class="platform-page fade-in">

  <!-- Header -->
  <div class="dashboard-welcome" style="margin-bottom:24px">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px">
      <div>
        <div class="welcome-title">&#10022; AI Creator Station</div>
        <div class="welcome-sub">Your unified hub for the world's top 20 AI tools. Access, compare, and launch directly from the ecosystem. ContentBot automates your AI workflows.</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <div style="text-align:center;padding:10px 16px;background:var(--glass);border-radius:12px;border:1px solid var(--border)">
          <div style="font-size:22px;font-weight:800;color:var(--purple-lt)">20</div>
          <div style="font-size:11px;color:var(--text2)">AI Tools</div>
        </div>
        <div style="text-align:center;padding:10px 16px;background:var(--glass);border-radius:12px;border:1px solid var(--border)">
          <div style="font-size:22px;font-weight:800;color:var(--cyan)">7</div>
          <div style="font-size:11px;color:var(--text2)">Categories</div>
        </div>
        <div style="text-align:center;padding:10px 16px;background:var(--glass);border-radius:12px;border:1px solid var(--border)">
          <div style="font-size:22px;font-weight:800;color:var(--green)">142</div>
          <div style="font-size:11px;color:var(--text2)">Items Created</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Category Filter -->
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px" id="cat-filters">
    ${categories.map(cat => `
      <button class="cat-filter-btn ${cat === 'All' ? 'active' : ''}" data-cat="${cat}"
        style="padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid ${cat==='All'?'var(--purple)':'var(--border)'};background:${cat==='All'?'rgba(124,58,237,0.2)':'var(--glass)'};color:${cat==='All'?'var(--purple-lt)':'var(--text2)'};transition:all 0.2s">
        ${cat}
      </button>
    `).join('')}
    <div style="margin-left:auto;display:flex;gap:8px">
      <input type="text" id="tool-search" placeholder="Search tools..." style="background:var(--glass);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:13px;color:var(--text);outline:none;width:160px">
    </div>
  </div>

  <!-- AI Tools Grid -->
  <div class="ai-tools-grid" id="tools-grid">
    ${tools.map(t => `
      <div class="ai-tool-card" data-tool-id="${t.id}" data-category="${t.category}" style="--tool-color:${toolColor(t)}">
        <div class="tool-header">
          <div class="tool-logo">${t.emoji}</div>
          <div class="tool-info">
            <div class="tool-name">#${t.rank} ${t.name}</div>
            <div class="tool-category" style="color:${toolColor(t)}">${t.category}</div>
          </div>
          <div style="min-width:50px;text-align:right">
            <span class="tool-tier ${t.tier}" style="font-size:11px;font-weight:700;color:${t.tier==='free'?'var(--green)':t.tier==='freemium'?'var(--cyan)':'var(--amber)'}">${t.tier === 'freemium' ? 'FREE+' : t.tier.toUpperCase()}</span>
          </div>
        </div>
        <div class="tool-desc">${t.desc}</div>
        <div class="tool-footer">
          <div style="font-size:11px;color:var(--text2)">by ${t.maker}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-secondary btn-sm tool-details-btn" data-id="${t.id}">Info</button>
            <button class="btn btn-primary btn-sm tool-launch-btn" data-id="${t.id}" data-name="${t.name}" style="background:${toolColor(t)};border-color:${toolColor(t)}">&#10148; Launch</button>
          </div>
        </div>
      </div>
    `).join('')}
  </div>

  <!-- AI Workflow Builder -->
  <div class="card mt-24" style="margin-top:24px">
    <div class="card-header">
      <div class="card-title">&#9881; AI Workflow Builder</div>
      <span class="tag tag-purple">ContentBot Powered</span>
    </div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px" id="workflow-steps">
      ${[
        { step: 1, name: 'Research',      tool: 'Perplexity AI', icon: '🔍', color: '#3b82f6' },
        { step: 2, name: 'Write',         tool: 'Claude',         icon: '🟠', color: '#f97316' },
        { step: 3, name: 'Create Images', tool: 'Midjourney',     icon: '🎨', color: '#ec4899' },
        { step: 4, name: 'Make Video',    tool: 'Runway ML',      icon: '🎥', color: '#ef4444' },
        { step: 5, name: 'Add Voice',     tool: 'ElevenLabs',    icon: '🎙️', color: '#f59e0b' },
        { step: 6, name: 'Publish',       tool: 'SocialBot',      icon: '📡', color: '#10b981' },
      ].map((s, i, arr) => `
        <div style="display:flex;align-items:center;gap:8px">
          <div style="text-align:center;padding:10px 14px;background:var(--glass);border:1px solid ${s.color}44;border-radius:10px;cursor:pointer;transition:all 0.2s;min-width:100px" class="workflow-step">
            <div style="font-size:20px;margin-bottom:4px">${s.icon}</div>
            <div style="font-size:12px;font-weight:700;color:${s.color}">${s.name}</div>
            <div style="font-size:10px;color:var(--text2)">${s.tool}</div>
          </div>
          ${i < arr.length - 1 ? `<div style="color:var(--text3);font-size:18px">&#8594;</div>` : ''}
        </div>
      `).join('')}
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-primary" id="run-workflow-btn">&#9654; Run Full Workflow</button>
      <button class="btn btn-secondary">&#43; Add Step</button>
      <button class="btn btn-secondary">&#128229; Save Template</button>
      <button class="btn btn-secondary">&#128203; Clone Workflow</button>
    </div>
    <div id="workflow-output" style="display:none;margin-top:16px;padding:14px;background:var(--glass);border-radius:8px;border:1px solid var(--green)">
      <div style="color:var(--green);font-weight:700;margin-bottom:8px">&#9989; Workflow Running...</div>
      <div id="workflow-log" style="font-size:12px;color:var(--text2);display:flex;flex-direction:column;gap:4px"></div>
    </div>
  </div>

  <!-- Usage Stats -->
  <div class="grid-3 mt-24" style="margin-top:24px">
    <div class="card">
      <div class="card-title" style="margin-bottom:12px">&#128202; AI Usage This Month</div>
      ${[
        { tool: 'Claude',      uses: 284, icon: '🟠' },
        { tool: 'ChatGPT',     uses: 198, icon: '🟢' },
        { tool: 'Midjourney',  uses: 142, icon: '🎨' },
        { tool: 'ElevenLabs', uses: 89,  icon: '🎙️' },
        { tool: 'Perplexity',  uses: 76,  icon: '🔍' },
      ].map(u => `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span style="font-size:16px">${u.icon}</span>
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;margin-bottom:3px;font-size:13px">
              <span>${u.tool}</span><span style="color:var(--text2)">${u.uses}x</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill fill-gradient" style="width:${Math.round(u.uses/284*100)}%"></div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:12px">&#128293; Hot Right Now</div>
      ${[
        { name: 'Sora', desc: 'OpenAI video gen — just launched!', emoji: '🎬', badge: 'NEW' },
        { name: 'Claude 3.7', desc: 'Anthropic\'s latest reasoning model', emoji: '🟠', badge: 'TRENDING' },
        { name: 'Grok 3', desc: 'xAI with live X data + deep search', emoji: '⚙️', badge: 'HOT' },
        { name: 'Gemini 2.0', desc: 'Google\'s multimodal powerhouse', emoji: '🔵', badge: 'UPDATED' },
      ].map(h => `
        <div style="display:flex;gap:10px;margin-bottom:10px;padding:8px;background:var(--glass);border-radius:8px;cursor:pointer">
          <span style="font-size:22px">${h.emoji}</span>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
              <span style="font-size:13px;font-weight:700">${h.name}</span>
              <span class="tag tag-amber" style="font-size:10px">${h.badge}</span>
            </div>
            <div style="font-size:11px;color:var(--text2)">${h.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:12px">&#9989; Quick Actions</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${[
          { icon: '📝', label: 'Generate Blog Post',     q: 'Write a blog post about AI income strategies' },
          { icon: '🎨', label: 'Create Social Graphics',  q: 'Create prompts for social media graphics' },
          { icon: '📧', label: 'Write Email Sequence',   q: 'Write a 7-email welcome sequence' },
          { icon: '🎵', label: 'TikTok Script',          q: 'Write a 60s TikTok script about passive income' },
          { icon: '📊', label: 'Market Research',        q: 'Research top crypto trends for this week' },
          { icon: '💡', label: 'Content Ideas',          q: 'Give me 20 content ideas for AMN Hub' },
        ].map(a => `
          <button class="quick-action-btn" data-q="${a.q}" style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--glass);border:1px solid var(--border);border-radius:8px;width:100%;text-align:left;font-size:13px;color:var(--text);transition:all 0.2s;cursor:pointer">
            <span>${a.icon}</span>${a.label}
          </button>
        `).join('')}
      </div>
    </div>
  </div>

  <!-- Tool Modal -->
  <div id="tool-modal" class="hidden" style="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:600;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)">
    <div style="background:var(--bg2);border:1px solid var(--border2);border-radius:16px;padding:28px;max-width:500px;width:90%;position:relative" id="tool-modal-content">
      <button id="close-modal" style="position:absolute;top:16px;right:16px;color:var(--text2);font-size:18px">&#10005;</button>
      <div id="modal-body"></div>
    </div>
  </div>

  <!-- Launch Toast -->
  <div id="launch-toast" style="position:fixed;bottom:20px;right:20px;z-index:999;display:none">
    <div style="background:var(--bg2);border:1px solid var(--purple);border-radius:12px;padding:14px 20px;box-shadow:var(--shadow-lg)">
      <strong style="color:var(--purple-lt)">&#10022; Launching <span id="launch-tool-name"></span>...</strong>
      <div style="font-size:12px;color:var(--text2);margin-top:4px">Opening in new tab</div>
    </div>
  </div>

</div>
    `;

    return { html, cleanup: () => { this._activeCategory = 'All'; } };
  },

  init(data) {
    const tools = data.aiTools;

    // Category filter
    document.getElementById('cat-filters')?.addEventListener('click', e => {
      const btn = e.target.closest('.cat-filter-btn');
      if (!btn) return;
      const cat = btn.dataset.cat;
      this._activeCategory = cat;

      document.querySelectorAll('.cat-filter-btn').forEach(b => {
        const isActive = b.dataset.cat === cat;
        b.style.background = isActive ? 'rgba(124,58,237,0.2)' : 'var(--glass)';
        b.style.color = isActive ? 'var(--purple-lt)' : 'var(--text2)';
        b.style.borderColor = isActive ? 'var(--purple)' : 'var(--border)';
      });

      this._filterTools(cat, document.getElementById('tool-search')?.value || '');
    });

    // Search
    document.getElementById('tool-search')?.addEventListener('input', e => {
      this._filterTools(this._activeCategory, e.target.value);
    });

    // Tool details modal
    document.querySelectorAll('.tool-details-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tool = tools.find(t => t.id === parseInt(btn.dataset.id));
        if (!tool) return;
        this._showModal(tool);
      });
    });

    // Launch tool
    document.querySelectorAll('.tool-launch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tool = tools.find(t => t.id === parseInt(btn.dataset.id));
        if (!tool) return;
        const toast = document.getElementById('launch-toast');
        document.getElementById('launch-tool-name').textContent = tool.name;
        if (toast) { toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 2500); }
        // Would open in new tab: window.open(tool.url, '_blank');
      });
    });

    // Modal close
    document.getElementById('close-modal')?.addEventListener('click', () => {
      document.getElementById('tool-modal')?.classList.add('hidden');
    });
    document.getElementById('tool-modal')?.addEventListener('click', e => {
      if (e.target === document.getElementById('tool-modal')) {
        document.getElementById('tool-modal')?.classList.add('hidden');
      }
    });

    // Workflow run
    document.getElementById('run-workflow-btn')?.addEventListener('click', async () => {
      const output = document.getElementById('workflow-output');
      const log    = document.getElementById('workflow-log');
      if (!output || !log) return;
      output.style.display = 'block';
      log.innerHTML = '';

      const steps = [
        { msg: '🔍 Perplexity AI: Researching market trends...', delay: 800 },
        { msg: '🟠 Claude: Generating content outline...', delay: 1200 },
        { msg: '🎨 Midjourney: Creating visual assets (3 images)...', delay: 1500 },
        { msg: '🎥 Runway ML: Producing 30-second video clip...', delay: 2000 },
        { msg: '🎙️ ElevenLabs: Adding AI voiceover...', delay: 1000 },
        { msg: '📡 SocialBot: Publishing to all platforms...', delay: 800 },
        { msg: '✅ Workflow complete! Content published across 6 platforms.', delay: 0 },
      ];

      let totalDelay = 0;
      for (const step of steps) {
        totalDelay += step.delay;
        setTimeout(() => {
          const el = document.createElement('div');
          el.textContent = step.msg;
          el.className = 'slide-in';
          if (step.msg.startsWith('✅')) el.style.color = 'var(--green)';
          log.appendChild(el);
        }, totalDelay);
      }
    });

    // Quick actions
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Open AI panel with pre-filled question
        const aiInput = document.getElementById('ai-input');
        const aiPanel = document.getElementById('ai-panel');
        if (aiPanel) aiPanel.classList.remove('hidden');
        if (aiInput) {
          aiInput.value = btn.dataset.q;
          aiInput.focus();
        }
      });
    });

    // Workflow step hover
    document.querySelectorAll('.workflow-step').forEach(step => {
      step.addEventListener('mouseenter', () => {
        step.style.background = 'var(--glass2)';
        step.style.transform = 'translateY(-2px)';
      });
      step.addEventListener('mouseleave', () => {
        step.style.background = 'var(--glass)';
        step.style.transform = '';
      });
    });
  },

  _filterTools(category, search) {
    document.querySelectorAll('.ai-tool-card').forEach(card => {
      const cat  = card.dataset.category;
      const name = card.querySelector('.tool-name')?.textContent?.toLowerCase() || '';
      const desc = card.querySelector('.tool-desc')?.textContent?.toLowerCase() || '';
      const matchCat  = category === 'All' || cat === category;
      const matchSearch = !search || name.includes(search.toLowerCase()) || desc.includes(search.toLowerCase());
      card.style.display = matchCat && matchSearch ? '' : 'none';
    });
  },

  _showModal(tool) {
    const modal = document.getElementById('tool-modal');
    const body  = document.getElementById('modal-body');
    if (!modal || !body) return;

    const catColors = {
      'Text AI': '#7c3aed', 'Image AI': '#ec4899', 'Video AI': '#ef4444',
      'Audio AI': '#f59e0b', 'Code AI': '#06b6d4', 'Content AI': '#10b981', 'Research AI': '#3b82f6'
    };
    const color = catColors[tool.category] || '#7c3aed';

    body.innerHTML = `
      <div style="border-top:3px solid ${color};border-radius:4px;margin:-28px -28px 20px;padding:20px 24px;background:linear-gradient(135deg,${color}11,transparent)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-size:40px">${tool.emoji}</div>
          <div>
            <div style="font-size:20px;font-weight:800">${tool.name}</div>
            <div style="font-size:13px;color:${color}">${tool.category} &bull; by ${tool.maker}</div>
          </div>
          <span style="margin-left:auto;font-size:13px;font-weight:700;color:${tool.tier==='free'?'var(--green)':tool.tier==='freemium'?'var(--cyan)':'var(--amber)'}">${tool.tier.toUpperCase()}</span>
        </div>
      </div>
      <div style="font-size:14px;line-height:1.7;color:var(--text2);margin-bottom:20px">${tool.desc}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="window.open('${tool.url}', '_blank')" style="background:${color};border-color:${color}">&#10148; Launch ${tool.name}</button>
        <button class="btn btn-secondary" onclick="document.getElementById('tool-modal').classList.add('hidden')">Close</button>
      </div>
    `;

    modal.classList.remove('hidden');
  }
};
