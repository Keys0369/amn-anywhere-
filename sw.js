/* ===================================================
   AMN HUB - Service Worker
   Offline support and caching
   =================================================== */

const CACHE_NAME = 'amn-hub-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/cicd.html',
  '/manifest.json',
  '/css/main.css',
  '/js/app.js',
  '/js/hub-data.js',
  '/js/platforms/dashboard.js',
  '/js/platforms/crypto.js',
  '/js/platforms/social.js',
  '/js/platforms/ecommerce.js',
  '/js/platforms/network.js',
  '/js/platforms/affiliate.js',
  '/js/platforms/funnels.js',
  '/js/platforms/ai-station.js',
  '/js/platforms/bots.js',
];

// Install: Cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: Cache-first for static, network-first for dynamic
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET and external requests
  if (event.request.method !== 'GET') return;
  if (!url.origin === self.location.origin) return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return response;
          })
          .catch(() => caches.match('/index.html'));
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-trades') {
    event.waitUntil(syncPendingTrades());
  }
});

async function syncPendingTrades() {
  // In production: sync pending trade orders when connectivity restored
  console.log('[SW] Syncing pending trades...');
}

// Push notifications for bot alerts
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'AMN Hub Alert', {
      body: data.body || 'New activity in your hub',
      icon: '/icon-192.png',
      badge: '/icon-96.png',
      tag: 'amn-hub',
      data: data,
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/?platform=' + (event.notification.data?.platform || ''))
  );
});
