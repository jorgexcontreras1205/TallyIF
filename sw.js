/* Tally: keeps the app available offline. The newest index.html is used whenever there is a connection. */
const VERSION = 'tally-10';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Fonts and the travel map change rarely: answer from the cache, fetch once.
  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.open(VERSION).then((cache) =>
        cache.match(request).then((hit) => hit || fetch(request).then((response) => {
          cache.put(request, response.clone());
          return response;
        }))
      ).catch(() => fetch(request))
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // The app itself: newest copy when online, saved copy when offline.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(VERSION).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: true }).then((hit) => hit || caches.match('./index.html')))
  );
});
