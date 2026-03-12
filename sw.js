const CACHE_NAME = 'prod-app-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com'
];

// Installation : Mise en cache des fichiers de base
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Stratégie : Network First (on essaie le réseau, sinon le cache)
// C'est vital pour tes données Sheets qui changent souvent !
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
