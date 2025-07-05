/**
 * Service Worker for Advanced Caching and Code Splitting Optimization
 * Implements intelligent caching strategies for lazy-loaded chunks
 */

const CACHE_NAME = 'vedic-astro-web-v1';
const RUNTIME_CACHE = 'vedic-astro-runtime-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/landing',
  '/manifest.json',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

// Lazy-loaded chunk prefixes to cache aggressively
const CHUNK_PREFIXES = [
  'auth-',
  'posts-',
  'courses-',
  'angular-',
  'material-',
  'rxjs-',
  'vendors-',
  'common-'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          return caches.open(RUNTIME_CACHE)
            .then(cache => cache.match(request));
        })
    );
    return;
  }

  // Handle lazy-loaded chunks with cache-first strategy
  if (isLazyChunk(request.url)) {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.match(request)
            .then(response => {
              if (response) {
                // Return cached version and optionally update in background
                fetch(request).then(fetchResponse => {
                  if (fetchResponse.ok) {
                    cache.put(request, fetchResponse.clone());
                  }
                });
                return response;
              }
              // Not in cache, fetch and cache
              return fetch(request).then(fetchResponse => {
                if (fetchResponse.ok) {
                  cache.put(request, fetchResponse.clone());
                }
                return fetchResponse;
              });
            });
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  if (isStaticAsset(request.url)) {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.match(request)
            .then(response => response || fetch(request));
        })
    );
    return;
  }

  // Default: network-first for navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.open(CACHE_NAME)
            .then(cache => cache.match('/'));
        })
    );
    return;
  }
});

// Background sync for lazy chunk prefetching
self.addEventListener('sync', event => {
  if (event.tag === 'prefetch-chunks') {
    event.waitUntil(prefetchLazyChunks());
  }
});

function isLazyChunk(url) {
  return CHUNK_PREFIXES.some(prefix => url.includes(prefix)) || 
         url.includes('.js') && (url.includes('chunk') || url.includes('lazy'));
}

function isStaticAsset(url) {
  return url.includes('/assets/') || 
         url.endsWith('.css') || 
         url.endsWith('.js') ||
         url.endsWith('.png') ||
         url.endsWith('.jpg') ||
         url.endsWith('.svg');
}

async function prefetchLazyChunks() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    
    // Find main bundle to extract chunk references
    const mainScript = keys.find(request => 
      request.url.includes('main') && request.url.endsWith('.js')
    );
    
    if (mainScript) {
      const response = await cache.match(mainScript);
      const text = await response.text();
      
      // Extract lazy chunk references (simplified)
      const chunkMatches = text.match(/\w+-\w+\.js/g) || [];
      const uniqueChunks = [...new Set(chunkMatches)];
      
      // Prefetch chunks that aren't already cached
      const prefetchPromises = uniqueChunks
        .filter(chunk => !keys.some(key => key.url.includes(chunk)))
        .map(chunk => {
          const chunkUrl = new URL(chunk, self.location.origin);
          return fetch(chunkUrl)
            .then(response => {
              if (response.ok) {
                return cache.put(chunkUrl, response);
              }
            })
            .catch(() => {}); // Ignore prefetch failures
        });
      
      await Promise.all(prefetchPromises);
    }
  } catch (error) {
    console.error('Chunk prefetching failed:', error);
  }
}
