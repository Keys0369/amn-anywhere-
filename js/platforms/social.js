/* ===================================================
   AMN HUB - Social Media Platform
   Multi-platform social management
   =================================================== */

export const Social = {

  _activePlatform: 'all',

  render(data) {
    const platforms = data.social.platforms;
    const posts     = data.social.posts;
    const totalFollowers = data.social.totalFollowers;

    const html = `
<div class="platform-page fade-in">

  <!-- KPIs -->
  <div class="grid-4 mb-24">
    <div class="stat-card pink">
      <div class="stat-card-icon">&#128101;</div>
      <div class="stat-card-val">${(totalFollowers/1000).toFixed(1)}K</div>
      <div class="stat-card-lbl">Total Followers</div>
      <div class="stat-card-change positive">&#9650; Across 6 platforms</div>
    </div>
    <div class="stat-card purple">
      <div class="stat-card-icon">&#128065;</div>
      <div class="stat-card-val">${(data.social.totalReach/1000000).toFixed(1)}M</div>
      <div class="stat-card-lbl">Monthly Reach</div>
      <div class="stat-card-change positive">&#9650; Organic growth</div>
    </div>
    <div class="stat-card cyan">
      <div class="stat-card-icon">&#10024;</div>
      <div class="stat-card-val">${data.social.engagement}%</div>
      <div class="stat-card-lbl">Avg Engagement Rate</div>
      <div class="stat-card-change positive">&#9650; Industry avg: 2.3%</div>
    </div>
    <div class="stat-card amber">
      <div class="stat-card-icon">&#128202;</div>
      <div class="stat-card-val">84</div>
      <div class="stat-card-lbl">Posts This Month</div>
      <div class="stat-card-change">SocialBot automated 72</div>
    </div>
  </div>

  <!-- Platform Cards -->
  <div class="section-title">Connected Platforms</div>
  <div class="grid-3 mb-24">
    ${platforms.map(p => `
      <div class="card" style="border-left:3px solid ${p.color};transition:all 0.2s;cursor:pointer" data-soc-platform="${p.id}">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:36px;height:36px;border-radius:10px;background:${p.color};display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#fff">${p.emoji}</div>
            <div>
              <div style="font-weight:700;font-size:14px">${p.name}</div>
              <div style="font-size:11px;color:var(--text2)">${p.posts} posts</div>
            </div>
          </div>
          <span class="dot green"></span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          <div>
            <div style="font-size:22px;font-weight:800">${p.followers.toLocaleString()}</div>
            <div style="font-size:11px;color:var(--text2)">Followers</div>
          </div>
          <div class="tag tag-green" style="align-self:flex-end">+${p.growth}%</div>
        </div>
        <div class="progress-bar" style="margin-top:10px">
          <div class="progress-fill" style="width:${Math.round(p.followers/totalFollowers*100)}%;background:${p.color}"></div>
        </div>
      </div>
    `).join('')}
  </div>

  <!-- Post Composer + Feed -->
  <div class="grid-21">

    <!-- Left: Composer + Feed -->
    <div>
      <!-- Post Composer -->
      <div class="post-composer mb-24">
        <div class="card-header" style="margin-bottom:12px">
          <div class="card-title">&#9998; Create Content</div>
          <div id="composer-ai-btn" class="btn btn-secondary btn-sm" style="cursor:pointer">&#10022; AI Write</div>
        </div>
        <textarea class="post-textarea" id="post-content" placeholder="What's happening in the hub today? Share your insights, wins, and updates...&#10;&#10;Try: &quot;Click AI Write for auto-generated content!&quot;"></textarea>

        <!-- Platform Select -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 8px;padding-top:10px;border-top:1px solid var(--border)">
          <span style="font-size:12px;color:var(--text2);align-self:center">Post to:</span>
          ${platforms.map(p => `
            <label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:12px">
              <input type="checkbox" checked style="accent-color:${p.color}"> ${p.emoji} ${p.name}
            </label>
          `).join('')}
        </div>

        <div class="composer-footer">
          <div class="composer-tools">
            <div class="composer-tool" title="Add image">&#128247;</div>
            <div class="composer-tool" title="Add video">&#127916;</div>
            <div class="composer-tool" title="Add emoji">&#128512;</div>
            <div class="composer-tool" title="Schedule">&#128197;</div>
            <div class="composer-tool" title="Add hashtags">&#35;</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:12px;color:var(--text2)" id="char-count">0 / 2200</span>
            <button class="btn btn-secondary btn-sm" id="schedule-btn">&#128197; Schedule</button>
            <button class="btn btn-primary btn-sm" id="post-now-btn">&#9654; Post Now</button>
          </div>
        </div>
      </div>

      <!-- Feed -->
      <div class="section-title">Content Feed</div>
      <div id="social-feed">
        ${posts.map(p => `
          <div class="post-card" data-post-id="${p.id}">
            <div class="post-header">
              <div class="post-ava">${p.author.slice(0,2)}</div>
              <div class="post-meta">
                <div class="post-author">${p.author}</div>
                <div class="post-time">${p.time}</div>
              </div>
              <span class="post-platform-tag tag" style="background:${p.platformColor}22;color:${p.platformColor};border:1px solid ${p.platformColor}44">${p.emoji} ${p.platform}</span>
            </div>
            <div class="post-content">${p.content}</div>
            <div class="post-stats">
              <div class="post-stat">&#10084; <span class="likes-count">${p.likes.toLocaleString()}</span></div>
              <div class="post-stat">&#128172; ${p.comments.toLocaleString()}</div>
              <div class="post-stat">&#8627; ${p.shares.toLocaleString()}</div>
              <div class="post-stat">&#128064; ${(p.likes * 18).toLocaleString()}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Right: Analytics + Schedule -->
    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- Top Performing -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#128293; Top Performers</div>
        ${platforms.sort((a,b) => b.followers - a.followers).slice(0,4).map((p,i) => `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <span style="font-size:18px;min-width:24px;text-align:center">${['🥇','🥈','🥉','4️⃣'][i]}</span>
            <span style="font-size:16px">${p.emoji}</span>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600">${p.name}</div>
              <div class="progress-bar" style="margin-top:4px">
                <div class="progress-fill" style="width:${Math.round(p.followers/totalFollowers*100)}%;background:${p.color}"></div>
              </div>
            </div>
            <span style="font-size:13px;font-weight:700">${p.followers.toLocaleString()}</span>
          </div>
        `).join('')}
      </div>

      <!-- Content Calendar -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#128197; Scheduled Posts</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${[
            { time: 'Today 18:00', content: 'Crypto market update', platforms: '𝕏 📘', status: 'scheduled' },
            { time: 'Tomorrow 09:00', content: 'Monday motivation + trading wins', platforms: '📸 🎵', status: 'draft' },
            { time: 'Mar 5 12:00', content: 'Product launch: Hub Pro v2.0', platforms: 'All platforms', status: 'approved' },
            { time: 'Mar 6 15:30', content: 'AI tools comparison video', platforms: '▶ 🎵', status: 'scheduled' },
          ].map(s => `
            <div style="padding:10px;background:var(--glass);border-radius:8px;border:1px solid var(--border)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:11px;color:var(--text2)">${s.time}</span>
                <span class="tag ${s.status==='approved'?'tag-green':s.status==='scheduled'?'tag-purple':'tag-amber'}">${s.status}</span>
              </div>
              <div style="font-size:13px;font-weight:600;margin-bottom:4px">${s.content}</div>
              <div style="font-size:11px;color:var(--text2)">${s.platforms}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Hashtag Suggestions -->
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">&#35; Top Hashtags</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px" id="hashtag-cloud">
          ${['#AMNHub','#CryptoTrading','#AITools','#PassiveIncome','#FinancialFreedom','#Web3','#NFTs','#DeFi','#TradingBot','#AffiliateMarketing','#OnlineBusiness','#AICreator','#BuildInPublic','#TechStartup','#Blockchain'].map(h => `
            <button class="btn btn-secondary btn-sm" style="border-radius:20px;font-size:11px">${h}</button>
          `).join('')}
        </div>
      </div>

      <!-- SocialBot Activity -->
      <div class="card" style="background:linear-gradient(135deg,rgba(236,72,153,0.08),rgba(124,58,237,0.04))">
        <div class="card-title" style="margin-bottom:12px">&#128161; SocialBot Activity</div>
        <div style="font-size:12px;color:var(--text2);display:flex;flex-direction:column;gap:6px">
          <div style="display:flex;justify-content:space-between"><span>Posts scheduled</span><strong style="color:var(--text)">5 today</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Comments replied</span><strong style="color:var(--text)">23 auto</strong></div>
          <div style="display:flex;justify-content:space-between"><span>DMs sent</span><strong style="color:var(--text)">48 follow-ups</strong></div>
          <div style="display:flex;justify-content:space-between"><span>Followers gained</span><strong style="color:var(--green)">+312</strong></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Post Success Toast -->
  <div id="post-toast" style="position:fixed;bottom:20px;right:20px;z-index:999;display:none">
    <div style="background:var(--bg2);border:1px solid var(--green);border-radius:12px;padding:14px 20px;box-shadow:var(--shadow-lg)">
      <strong style="color:var(--green)">&#9989; Posted Successfully!</strong>
      <div style="font-size:12px;color:var(--text2);margin-top:4px">Content published to all selected platforms</div>
    </div>
  </div>

</div>
    `;

    return { html, cleanup: null };
  },

  init(data) {
    // Char counter
    const textarea = document.getElementById('post-content');
    const charCount = document.getElementById('char-count');
    if (textarea && charCount) {
      textarea.addEventListener('input', () => {
        charCount.textContent = textarea.value.length + ' / 2200';
      });
    }

    // AI Write
    const aiBtn = document.getElementById('composer-ai-btn');
    if (aiBtn && textarea) {
      const suggestions = [
        `🚀 Just generated $${(Math.random()*5000+1000).toFixed(0)} in affiliate commissions this week using AMN Hub's automated system! The power of AI + multiple income streams is REAL. Drop a 🔥 if you want to know how! #PassiveIncome #AITools #AMNHub`,
        `📊 Market Update: BTC is showing a strong buy signal right now. Our TradingBot Alpha detected RSI oversold conditions and a golden cross forming. Already up +$2,341 today. This is why I let AI manage my crypto. #CryptoTrading #TradingBot`,
        `🌍 Growing our global network to 14,892 members across 127 countries! Every day brings new connections, new opportunities, and new income streams. The AMN Hub ecosystem is unstoppable. Join us! #GlobalNetwork #AffiliateMarketing`,
      ];
      let sugIdx = 0;
      aiBtn.addEventListener('click', () => {
        textarea.value = suggestions[sugIdx % suggestions.length];
        sugIdx++;
        charCount.textContent = textarea.value.length + ' / 2200';
      });
    }

    // Post now
    const postBtn = document.getElementById('post-now-btn');
    if (postBtn) {
      postBtn.addEventListener('click', () => {
        const content = textarea?.value?.trim();
        if (!content) { alert('Please write some content first!'); return; }

        // Add to feed
        const feed = document.getElementById('social-feed');
        if (feed) {
          const div = document.createElement('div');
          div.className = 'post-card slide-in';
          div.innerHTML = `
            <div class="post-header">
              <div class="post-ava">AM</div>
              <div class="post-meta">
                <div class="post-author">AMN Creator</div>
                <div class="post-time">just now</div>
              </div>
              <span class="post-platform-tag tag tag-purple">All Platforms</span>
            </div>
            <div class="post-content">${content}</div>
            <div class="post-stats">
              <div class="post-stat">&#10084; 0</div>
              <div class="post-stat">&#128172; 0</div>
              <div class="post-stat">&#8627; 0</div>
            </div>
          `;
          feed.insertBefore(div, feed.firstChild);
        }

        // Clear + toast
        if (textarea) textarea.value = '';
        if (charCount) charCount.textContent = '0 / 2200';
        const toast = document.getElementById('post-toast');
        if (toast) { toast.style.display = 'block'; setTimeout(() => { toast.style.display = 'none'; }, 3000); }
      });
    }

    // Like buttons
    document.querySelectorAll('.post-stat').forEach(stat => {
      stat.addEventListener('click', () => {
        if (stat.textContent.includes('❤')) {
          const count = stat.querySelector('.likes-count');
          if (count) count.textContent = (parseInt(count.textContent.replace(/,/g, '')) + 1).toLocaleString();
        }
      });
    });

    // Hashtag insert
    document.querySelectorAll('#hashtag-cloud .btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (textarea) {
          textarea.value += (textarea.value ? ' ' : '') + btn.textContent;
          if (charCount) charCount.textContent = textarea.value.length + ' / 2200';
        }
      });
    });
  }
};
