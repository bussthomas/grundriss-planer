// Macht die Seite installierbar und offline nutzbar. Bei jeder Änderung die Version hochzählen.
const CACHE = 'grundriss-v20';
const DATEIEN = ['./', 'index.html', 'rechtliches.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png',
  'fonts/Poppins-Regular.ttf', 'fonts/Poppins-Medium.ttf', 'fonts/Poppins-SemiBold.ttf', 'fonts/Poppins-Bold.ttf'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((n) => n !== CACHE).map((n) => caches.delete(n)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
