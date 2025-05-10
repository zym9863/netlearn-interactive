// Service Worker for NetLearn Interactive PWA
const CACHE_NAME = 'netlearn-cache-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/favicon.ico',
  '/icons/apple-touch-icon.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/offline.png',
  '/icons/splash/apple-splash-2048-2732.png',
  '/icons/splash/apple-splash-1668-2388.png',
  '/icons/splash/apple-splash-1536-2048.png',
  '/icons/splash/apple-splash-1125-2436.png',
  '/icons/splash/apple-splash-1242-2688.png',
  '/icons/splash/apple-splash-828-1792.png',
  '/icons/splash/apple-splash-1242-2208.png',
  '/icons/splash/apple-splash-750-1334.png',
  '/icons/splash/apple-splash-640-1136.png'
];

// Install event - precache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For navigation requests (HTML pages), use network-first strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache a copy of the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // For other requests, use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return from cache if found
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cache a copy of the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Handle offline fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // If the main page is requested and network is unavailable
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }

        // For other resources, return a simple offline message if not in cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // If the resource is an image, return a default offline image
            if (event.request.destination === 'image') {
              return caches.match('/icons/offline.png');
            }

            // For other resources, return nothing (will show as failed)
            return new Response('', {
              status: 408,
              statusText: 'Offline - Resource Not Available'
            });
          });
      })
  );
});
