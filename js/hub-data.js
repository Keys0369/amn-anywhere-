/* ===================================================
   AMN HUB - Shared Data Store
   Real-time simulated data for all platforms
   =================================================== */

export const HubData = {

  user: {
    name: 'AMN Creator',
    initials: 'AM',
    tier: 'Pro Member',
    joinDate: '2023-01-15',
    country: 'Global',
  },

  portfolio: {
    total: 127493.82,
    dailyGain: 2341.50,
    dailyPct: 1.87,
    weeklyGain: 8932.10,
    monthlyGain: 24780.45,
    holdings: [
      { coin: 'BTC',  name: 'Bitcoin',        amount: 0.842,   price: 67420,   value: 56787.64, pct: 2.4,   alloc: 44.6 },
      { coin: 'ETH',  name: 'Ethereum',       amount: 8.21,    price: 3891,    value: 31944.11, pct: 1.8,   alloc: 25.1 },
      { coin: 'SOL',  name: 'Solana',         amount: 112,     price: 178,     value: 19936,    pct: 5.2,   alloc: 15.6 },
      { coin: 'BNB',  name: 'BNB',            amount: 18.4,    price: 432,     value: 7948.80,  pct: 0.9,   alloc: 6.2  },
      { coin: 'ADA',  name: 'Cardano',        amount: 8200,    price: 0.68,    value: 5576,     pct: 3.1,   alloc: 4.4  },
      { coin: 'USDT', name: 'Tether',         amount: 5301.27, price: 1,       value: 5301.27,  pct: 0,     alloc: 4.1  },
    ]
  },

  crypto: {
    markets: [
      { symbol: 'BTC/USDT',  price: 67420.50,  change: 2.4,   volume: '42.8B',  mcap: '1.32T' },
      { symbol: 'ETH/USDT',  price: 3891.20,   change: 1.8,   volume: '18.2B',  mcap: '468B'  },
      { symbol: 'SOL/USDT',  price: 178.40,    change: 5.2,   volume: '8.4B',   mcap: '82B'   },
      { symbol: 'BNB/USDT',  price: 432.10,    change: 0.9,   volume: '4.1B',   mcap: '66B'   },
      { symbol: 'ADA/USDT',  price: 0.682,     change: 3.1,   volume: '1.8B',   mcap: '24B'   },
      { symbol: 'XRP/USDT',  price: 0.724,     change: -1.2,  volume: '2.9B',   mcap: '39B'   },
      { symbol: 'AVAX/USDT', price: 38.20,     change: 4.7,   volume: '1.2B',   mcap: '16B'   },
      { symbol: 'MATIC/USDT',price: 1.12,      change: -0.8,  volume: '0.9B',   mcap: '11B'   },
    ],
    signals: [
      { coin: 'BTC', signal: 'BUY',  strength: 82, reason: 'RSI oversold + Golden Cross' },
      { coin: 'SOL', signal: 'BUY',  strength: 76, reason: 'Breaking resistance + high volume' },
      { coin: 'ETH', signal: 'HOLD', strength: 58, reason: 'Consolidating at support' },
      { coin: 'XRP', signal: 'SELL', strength: 65, reason: 'Bearish divergence on 4H' },
    ]
  },

  social: {
    platforms: [
      { id: 'twitter', name: 'X (Twitter)', emoji: '𝕏', color: '#1DA1F2', followers: 14200, growth: 3.2, posts: 842 },
      { id: 'instagram', name: 'Instagram', emoji: '📸', color: '#E1306C', followers: 28500, growth: 5.8, posts: 1204 },
      { id: 'tiktok', name: 'TikTok', emoji: '🎵', color: '#010101', followers: 52300, growth: 12.4, posts: 386 },
      { id: 'youtube', name: 'YouTube', emoji: '▶', color: '#FF0000', followers: 18900, growth: 4.1, posts: 124 },
      { id: 'linkedin', name: 'LinkedIn', emoji: '💼', color: '#0A66C2', followers: 9800, growth: 2.7, posts: 312 },
      { id: 'facebook', name: 'Facebook', emoji: '📘', color: '#1877F2', followers: 34100, growth: 1.2, posts: 687 },
    ],
    posts: [
      { id: 1, platform: 'instagram', platformColor: '#E1306C', author: 'AMN Creator', time: '2 min ago', content: '🚀 Just hit a new milestone with our AI-powered trading system! 127% ROI this month. The future of crypto trading is here. #AMNHub #CryptoTrading #AI', likes: 342, comments: 87, shares: 54, emoji: '📸' },
      { id: 2, platform: 'twitter', platformColor: '#1DA1F2', author: 'AMN Creator', time: '45 min ago', content: 'Our Bot Fleet just executed 1,247 trades autonomously today with a 94% win rate. This is what AI-powered investing looks like 🤖📈 #Trading #Automation', likes: 891, comments: 203, shares: 312, emoji: '𝕏' },
      { id: 3, platform: 'tiktok', platformColor: '#010101', author: 'AMN Creator', time: '3 hrs ago', content: 'How I built 7 income streams from scratch using AI tools 🔥 Full breakdown in video! #FinancialFreedom #AITools #PassiveIncome', likes: 12400, comments: 1820, shares: 3200, emoji: '🎵' },
    ],
    totalFollowers: 157800,
    totalReach: 2840000,
    engagement: 6.8,
  },

  ecommerce: {
    revenue: { today: 4820, week: 28400, month: 112600, total: 843200 },
    orders: {
      total: 1847,
      pending: 23,
      processing: 45,
      completed: 1762,
      refunded: 17
    },
    products: [
      { id: 1, name: 'AI Trading Masterclass', category: 'Digital Course', price: 297, stock: 999, sold: 1204, emoji: '📊', featured: true },
      { id: 2, name: 'Hub Pro Subscription', category: 'SaaS', price: 97, stock: 999, sold: 892, emoji: '🚀', featured: true },
      { id: 3, name: 'Crypto Bot License', category: 'Software', price: 497, stock: 999, sold: 342, emoji: '🤖', featured: true },
      { id: 4, name: 'Social Media Blueprint', category: 'Digital Course', price: 197, stock: 999, sold: 678, emoji: '📱', featured: false },
      { id: 5, name: 'Affiliate Marketing Kit', category: 'Bundle', price: 147, stock: 999, sold: 521, emoji: '🔗', featured: false },
      { id: 6, name: 'Income Funnel Templates', category: 'Templates', price: 67, stock: 999, sold: 1890, emoji: '⚡', featured: false },
    ],
    topProducts: ['AI Trading Masterclass', 'Hub Pro Subscription', 'Crypto Bot License'],
    conversionRate: 3.8,
    avgOrderValue: 247,
  },

  network: {
    members: 14892,
    countries: 127,
    monthlyGrowth: 18.4,
    nodes: [
      { id: 'us',  label: 'USA',     x: 22, y: 38, members: 4200, active: true  },
      { id: 'uk',  label: 'UK',      x: 47, y: 28, members: 1820, active: true  },
      { id: 'de',  label: 'Germany', x: 50, y: 30, members: 1240, active: true  },
      { id: 'sg',  label: 'Singapore',x:78, y: 55, members: 980,  active: true  },
      { id: 'au',  label: 'Australia',x:80, y: 70, members: 760,  active: true  },
      { id: 'br',  label: 'Brazil',  x: 32, y: 62, members: 1120, active: true  },
      { id: 'jp',  label: 'Japan',   x: 83, y: 38, members: 890,  active: true  },
      { id: 'za',  label: 'S. Africa',x:54, y: 68, members: 640,  active: true  },
      { id: 'ca',  label: 'Canada',  x: 20, y: 28, members: 1380, active: true  },
      { id: 'ae',  label: 'UAE',     x: 60, y: 45, members: 720,  active: true  },
    ],
    recentJoins: [
      { name: 'Marcus J.',    country: '🇺🇸', time: '2 min ago',   level: 'Pro' },
      { name: 'Sophie K.',    country: '🇩🇪', time: '8 min ago',   level: 'Starter' },
      { name: 'Raj P.',       country: '🇸🇬', time: '15 min ago',  level: 'Pro' },
      { name: 'Ana M.',       country: '🇧🇷', time: '28 min ago',  level: 'Elite' },
      { name: 'James W.',     country: '🇬🇧', time: '42 min ago',  level: 'Pro' },
    ]
  },

  affiliate: {
    totalCommissions: 48320.80,
    pendingPayout: 3840.20,
    referrals: 892,
    activeReferrals: 674,
    conversionRate: 24.8,
    tiers: [
      { level: 1, name: 'Direct',    pct: 20, count: 127, earnings: 18420 },
      { level: 2, name: 'Level 2',   pct: 10, count: 384, earnings: 14280 },
      { level: 3, name: 'Level 3',   pct: 5,  count: 892, earnings: 8920  },
      { level: 4, name: 'Level 4',   pct: 3,  count: 1240,earnings: 4800  },
      { level: 5, name: 'Level 5',   pct: 2,  count: 2180,earnings: 1900  },
    ],
    topAffiliates: [
      { name: 'Alex R.',   earnings: 8240,  referrals: 84, tier: 'Elite'   },
      { name: 'Maria C.',  earnings: 6120,  referrals: 62, tier: 'Pro'     },
      { name: 'John D.',   earnings: 5480,  referrals: 51, tier: 'Pro'     },
      { name: 'Lisa K.',   earnings: 4920,  referrals: 48, tier: 'Pro'     },
      { name: 'Tom B.',    earnings: 3840,  referrals: 39, tier: 'Starter' },
    ],
    referralLink: 'https://amnhub.io/ref/AMN-PRO-X7K2'
  },

  funnels: [
    {
      id: 'main',
      name: 'Main Sales Funnel',
      stages: [
        { name: 'Traffic',      value: 48200, pct: 100, color: '#7c3aed' },
        { name: 'Landing Page', value: 18400, pct: 38,  color: '#6d28d9' },
        { name: 'Opt-In',       value: 8920,  pct: 18.5,color: '#5b21b6' },
        { name: 'Sales Page',   value: 3840,  pct: 8,   color: '#4c1d95' },
        { name: 'Checkout',     value: 1240,  pct: 2.6, color: '#3b0764' },
        { name: 'Upsell',       value: 620,   pct: 1.3, color: '#2e1065' },
      ]
    }
  ],

  incomeStreams: [
    { name: 'Crypto Trading',    monthly: 18420, icon: '₿',  growth: 24.2, color: '#f59e0b' },
    { name: 'E-Commerce Sales',  monthly: 12600, icon: '🛒', growth: 18.1, color: '#06b6d4' },
    { name: 'Affiliate Commissions',monthly: 9840,icon: '🔗', growth: 31.4, color: '#10b981' },
    { name: 'AI Station Subs',   monthly: 6200,  icon: '🤖', growth: 42.8, color: '#7c3aed' },
    { name: 'Course Sales',      monthly: 4820,  icon: '📚', growth: 12.3, color: '#ec4899' },
    { name: 'Network Bonuses',   monthly: 3640,  icon: '🌐', growth: 8.7,  color: '#3b82f6' },
    { name: 'Content Revenue',   monthly: 2180,  icon: '📱', growth: 15.6, color: '#8b5cf6' },
  ],

  aiTools: [
    { id: 1,  name: 'Claude',          maker: 'Anthropic',       category: 'Text AI',      emoji: '🟠', desc: 'Advanced reasoning, coding, and analysis AI. Best for complex tasks and nuanced conversations.',         tier: 'paid',       url: 'https://claude.ai',         rank: 1  },
    { id: 2,  name: 'ChatGPT',         maker: 'OpenAI',          category: 'Text AI',      emoji: '🟢', desc: 'World\'s most popular AI chatbot. Exceptional for content, brainstorming, and problem-solving.',        tier: 'freemium',   url: 'https://chat.openai.com',   rank: 2  },
    { id: 3,  name: 'Gemini',          maker: 'Google',          category: 'Text AI',      emoji: '🔵', desc: 'Google\'s flagship AI. Multimodal capabilities, real-time search, and deep Google integration.',         tier: 'freemium',   url: 'https://gemini.google.com', rank: 3  },
    { id: 4,  name: 'Midjourney',      maker: 'Midjourney Inc.', category: 'Image AI',     emoji: '🎨', desc: 'Industry-leading AI image generation. Creates stunning, photorealistic and artistic images.',             tier: 'paid',       url: 'https://midjourney.com',    rank: 4  },
    { id: 5,  name: 'DALL-E 3',        maker: 'OpenAI',          category: 'Image AI',     emoji: '🖼️', desc: 'OpenAI\'s powerful image generator. Excels at precise, detailed prompts and consistent style.',          tier: 'paid',       url: 'https://openai.com',        rank: 5  },
    { id: 6,  name: 'Sora',            maker: 'OpenAI',          category: 'Video AI',     emoji: '🎬', desc: 'Revolutionary text-to-video model. Generates cinematic, realistic videos up to 1 minute long.',          tier: 'paid',       url: 'https://openai.com/sora',   rank: 6  },
    { id: 7,  name: 'Runway ML',       maker: 'Runway',          category: 'Video AI',     emoji: '🎥', desc: 'Professional AI video creation, editing, and generation suite for creators and studios.',                tier: 'paid',       url: 'https://runwayml.com',      rank: 7  },
    { id: 8,  name: 'ElevenLabs',      maker: 'ElevenLabs',      category: 'Audio AI',     emoji: '🎙️', desc: 'Ultra-realistic AI voice cloning and speech synthesis. 29+ languages, perfect for content.',             tier: 'freemium',   url: 'https://elevenlabs.io',     rank: 8  },
    { id: 9,  name: 'Perplexity AI',   maker: 'Perplexity',      category: 'Research AI',  emoji: '🔍', desc: 'AI-powered search engine. Real-time web search with cited sources. Best research assistant.',             tier: 'freemium',   url: 'https://perplexity.ai',     rank: 9  },
    { id: 10, name: 'GitHub Copilot',  maker: 'GitHub/OpenAI',   category: 'Code AI',      emoji: '💻', desc: 'AI pair programmer. Autocomplete entire functions, classes, and tests in any language.',                  tier: 'paid',       url: 'https://github.com/copilot', rank: 10 },
    { id: 11, name: 'Stable Diffusion',maker: 'Stability AI',    category: 'Image AI',     emoji: '🌊', desc: 'Open-source image AI. Unlimited generation, fine-tuning, and custom model training.',                    tier: 'free',       url: 'https://stability.ai',      rank: 11 },
    { id: 12, name: 'Jasper AI',       maker: 'Jasper',          category: 'Content AI',   emoji: '📝', desc: 'AI copywriting platform for marketing. Brand voice, SEO content, and campaign generation.',               tier: 'paid',       url: 'https://jasper.ai',         rank: 12 },
    { id: 13, name: 'Copy.ai',         maker: 'Copy.ai',         category: 'Content AI',   emoji: '✍️', desc: 'AI-powered marketing copy. Sales emails, ads, social posts, and long-form content at scale.',            tier: 'freemium',   url: 'https://copy.ai',           rank: 13 },
    { id: 14, name: 'Synthesia',       maker: 'Synthesia',       category: 'Video AI',     emoji: '🎭', desc: 'Create professional videos with AI avatars. 230+ avatars, 140+ languages, no camera needed.',            tier: 'paid',       url: 'https://synthesia.io',      rank: 14 },
    { id: 15, name: 'HeyGen',          maker: 'HeyGen',          category: 'Video AI',     emoji: '👤', desc: 'Instant AI avatar videos for marketing. Clone yourself with a 2-minute video sample.',                   tier: 'paid',       url: 'https://heygen.com',        rank: 15 },
    { id: 16, name: 'Pika Labs',       maker: 'Pika',            category: 'Video AI',     emoji: '⚡', desc: 'Text and image to video generation. Anime, cinematic, and 3D styles with motion control.',                tier: 'freemium',   url: 'https://pika.art',          rank: 16 },
    { id: 17, name: 'Adobe Firefly',   maker: 'Adobe',           category: 'Image AI',     emoji: '🔥', desc: 'Adobe\'s generative AI for creative professionals. Commercially safe, integrated in Creative Cloud.',    tier: 'paid',       url: 'https://adobe.com/firefly', rank: 17 },
    { id: 18, name: 'Ideogram',        maker: 'Ideogram AI',     category: 'Image AI',     emoji: '💡', desc: 'Text-to-image AI specializing in typography. Generates logos, posters, and text-integrated designs.',    tier: 'freemium',   url: 'https://ideogram.ai',       rank: 18 },
    { id: 19, name: 'Luma AI',         maker: 'Luma Labs',       category: 'Video AI',     emoji: '✨', desc: 'Photo-realistic video generation with Dream Machine. 3D capture and NeRF reconstruction.',                tier: 'freemium',   url: 'https://lumalabs.ai',       rank: 19 },
    { id: 20, name: 'Grok',            maker: 'xAI',             category: 'Text AI',      emoji: '⚙️', desc: 'Elon Musk\'s AI with real-time X (Twitter) data access. Unique humor and unfiltered responses.',          tier: 'paid',       url: 'https://grok.x.ai',         rank: 20 },
  ],

  bots: [
    {
      id: 'trading-bot',
      name: 'TradingBot Alpha',
      role: 'Crypto Trading & Signals',
      emoji: '₿',
      color: 'linear-gradient(135deg, #f59e0b, #d97706)',
      status: 'active',
      platform: 'crypto',
      metrics: { trades: 1247, winRate: '94%', profit: '+$18,420' },
      logs: [
        { time: '14:32:01', msg: 'BTC BUY signal detected - RSI 28, MACD cross' },
        { time: '14:31:44', msg: 'Executed SOL/USDT buy order: 50 SOL @ $177.82' },
        { time: '14:30:12', msg: 'Portfolio rebalanced: +2.1% ETH allocation' },
        { time: '14:28:55', msg: 'Stop-loss triggered: XRP sold @ $0.721' },
      ]
    },
    {
      id: 'social-bot',
      name: 'SocialBot Pro',
      role: 'Social Media Automation',
      emoji: '📡',
      color: 'linear-gradient(135deg, #ec4899, #be185d)',
      status: 'active',
      platform: 'social',
      metrics: { posts: 84, reach: '2.8M', engagement: '6.8%' },
      logs: [
        { time: '14:33:10', msg: 'Scheduled 5 posts across all platforms for 18:00' },
        { time: '14:32:30', msg: 'Auto-replied to 23 Instagram comments' },
        { time: '14:31:15', msg: 'TikTok video hashtag optimization complete' },
        { time: '14:29:44', msg: 'Engagement report: +312 new followers today' },
      ]
    },
    {
      id: 'shop-bot',
      name: 'ShopBot Commerce',
      role: 'E-Commerce Automation',
      emoji: '🛒',
      color: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      status: 'active',
      platform: 'ecommerce',
      metrics: { orders: 23, revenue: '$4,820', conversions: '3.8%' },
      logs: [
        { time: '14:33:00', msg: 'Order #1847 processed: AI Trading Masterclass' },
        { time: '14:32:15', msg: 'Upsell triggered: Hub Pro subscription offered' },
        { time: '14:31:45', msg: 'Abandoned cart email sent to 12 users' },
        { time: '14:30:20', msg: 'Product pricing A/B test variant B winning' },
      ]
    },
    {
      id: 'network-bot',
      name: 'NetworkBot Global',
      role: 'Network Expansion',
      emoji: '🌐',
      color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      status: 'active',
      platform: 'network',
      metrics: { joined: 48, countries: '127', active: '14,892' },
      logs: [
        { time: '14:33:05', msg: '3 new members joined from Singapore' },
        { time: '14:31:55', msg: 'Network event created: Global Crypto Summit' },
        { time: '14:30:40', msg: 'Outreach campaign: 840 connection requests sent' },
        { time: '14:29:10', msg: 'Community post boosted: 12.4K impressions' },
      ]
    },
    {
      id: 'affiliate-bot',
      name: 'AffiliateBot Max',
      role: 'Affiliate & Commission Tracking',
      emoji: '🔗',
      color: 'linear-gradient(135deg, #10b981, #059669)',
      status: 'active',
      platform: 'affiliate',
      metrics: { commissions: '$3,840', referrals: 892, rate: '24.8%' },
      logs: [
        { time: '14:32:50', msg: 'Commission paid: Alex R. earned $840' },
        { time: '14:31:20', msg: '14 new referral link clicks tracked' },
        { time: '14:30:05', msg: 'Level 2 bonus triggered: Maria C. +$120' },
        { time: '14:28:30', msg: 'Affiliate leaderboard updated for March' },
      ]
    },
    {
      id: 'funnel-bot',
      name: 'FunnelBot Traffic',
      role: 'Traffic & Funnel Optimization',
      emoji: '⚡',
      color: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
      status: 'active',
      platform: 'funnels',
      metrics: { visitors: '48.2K', conversions: '2.6%', revenue: '$2,341' },
      logs: [
        { time: '14:33:08', msg: 'Traffic spike: +820 visitors from TikTok' },
        { time: '14:32:22', msg: 'Funnel stage 3 conversion rate optimized: +0.4%' },
        { time: '14:31:00', msg: 'A/B test winner: Headline variant B (+22% CVR)' },
        { time: '14:29:35', msg: 'Retargeting audience updated: 12,400 users' },
      ]
    },
    {
      id: 'content-bot',
      name: 'ContentBot AI',
      role: 'AI Content Creation',
      emoji: '✍️',
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      status: 'active',
      platform: 'ai-station',
      metrics: { content: 142, words: '284K', campaigns: 18 },
      logs: [
        { time: '14:32:44', msg: 'Blog post generated: "Top 10 AI Trading Strategies"' },
        { time: '14:31:30', msg: '20 social media captions created for the week' },
        { time: '14:30:18', msg: 'Email sequence (7 emails) drafted and ready' },
        { time: '14:29:00', msg: 'YouTube script generated: "AI Income Streams 2025"' },
      ]
    },
    {
      id: 'analytics-bot',
      name: 'AnalyticsBot IQ',
      role: 'Data Intelligence & Insights',
      emoji: '📊',
      color: 'linear-gradient(135deg, #f59e0b, #b45309)',
      status: 'busy',
      platform: 'dashboard',
      metrics: { reports: 28, insights: 142, accuracy: '98.2%' },
      logs: [
        { time: '14:33:12', msg: 'Generating monthly performance report...' },
        { time: '14:32:01', msg: 'Anomaly detected: SOL volume spike +340%' },
        { time: '14:31:15', msg: 'Cross-platform revenue correlated: social → shop' },
        { time: '14:30:00', msg: 'Predictive model updated with March data' },
      ]
    },
    {
      id: 'security-bot',
      name: 'SecurityBot Shield',
      role: 'Platform Security & Monitoring',
      emoji: '🛡️',
      color: 'linear-gradient(135deg, #ef4444, #b91c1c)',
      status: 'active',
      platform: 'dashboard',
      metrics: { threats: 0, scans: 2840, uptime: '99.9%' },
      logs: [
        { time: '14:33:00', msg: 'Security scan complete: 0 threats detected' },
        { time: '14:32:30', msg: 'API rate limiting enforced on 3 endpoints' },
        { time: '14:31:00', msg: '2FA verification enforced for all logins' },
        { time: '14:30:15', msg: 'SSL certificates valid: all 9 platforms secured' },
      ]
    },
    {
      id: 'support-bot',
      name: 'SupportBot 24/7',
      role: 'Customer Support Automation',
      emoji: '💬',
      color: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
      status: 'active',
      platform: 'ecommerce',
      metrics: { tickets: 48, resolved: '96%', rating: '4.9★' },
      logs: [
        { time: '14:33:05', msg: '3 new support tickets resolved automatically' },
        { time: '14:32:10', msg: 'Refund processed: Order #1832 (policy satisfied)' },
        { time: '14:31:00', msg: 'FAQ updated with 5 new common questions' },
        { time: '14:29:45', msg: 'Live chat handoff: 1 complex case → human agent' },
      ]
    },
  ],

  notifications: [
    { id: 1, icon: '₿', title: 'BTC Signal Alert', text: 'Strong buy signal detected — RSI oversold at 28', time: '2 min ago', type: 'crypto' },
    { id: 2, icon: '🛒', title: 'New Order Received', text: 'AI Trading Masterclass — $297.00 from John D.', time: '8 min ago', type: 'ecommerce' },
    { id: 3, icon: '🔗', title: 'Affiliate Commission', text: 'Alex R. earned $840 — Level 1 commission', time: '24 min ago', type: 'affiliate' },
    { id: 4, icon: '📱', title: 'Social Milestone', text: 'TikTok post went viral: 50K+ views in 1 hour!', time: '1 hr ago', type: 'social' },
    { id: 5, icon: '🌐', title: 'Network Milestone', text: '100 new members joined today — all-time record!', time: '2 hrs ago', type: 'network' },
  ],

  // Real-time data simulation
  _intervals: [],

  startRealTime(callbacks) {
    // Price ticker simulation
    const priceInterval = setInterval(() => {
      this.crypto.markets.forEach(m => {
        const delta = (Math.random() - 0.48) * 0.5;
        m.price = parseFloat((m.price * (1 + delta / 100)).toFixed(m.price < 10 ? 4 : 2));
        m.change = parseFloat((m.change + (Math.random() - 0.5) * 0.1).toFixed(2));
      });
      if (callbacks.onPriceUpdate) callbacks.onPriceUpdate(this.crypto.markets);
    }, 2000);

    // Portfolio value simulation
    const portfolioInterval = setInterval(() => {
      this.portfolio.total += (Math.random() - 0.45) * 200;
      this.portfolio.dailyGain += (Math.random() - 0.45) * 50;
      if (callbacks.onPortfolioUpdate) callbacks.onPortfolioUpdate(this.portfolio);
    }, 5000);

    this._intervals.push(priceInterval, portfolioInterval);
  },

  stopRealTime() {
    this._intervals.forEach(id => clearInterval(id));
    this._intervals = [];
  }
};
