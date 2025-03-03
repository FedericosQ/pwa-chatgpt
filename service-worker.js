const CACHE_NAME = 'previews-cache-v1';
const urlsToCache = [
    'index.html',
    'visor.html',
    'styles.css',
    'app.js',
    'manifest.json',
    'https://cdn.jsdelivr.net/npm/lz-string@1.5.0/libs/lz-string.min.js'
    // Agrega las rutas de tus íconos si están alojados localmente, por ejemplo:
    // 'icons/icon-192.png',
    // 'icons/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
