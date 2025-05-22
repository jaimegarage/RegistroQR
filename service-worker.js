const CACHE_NAME = 'registro-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon192.png',
  './icon512.png',
  'https://unpkg.com/html5-qrcode'
];

// Instalar SW y almacenar archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Servir archivos desde caché si no hay conexión
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
