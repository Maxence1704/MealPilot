const CACHE_NAME = 'mealpilot-v5';
const APP_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './images/breakfast-eggs.jpg',
  './images/breakfast-pancakes.jpg',
  './images/breakfast-porridge.jpg',
  './images/breakfast-smoothie.jpg',
  './images/breakfast-yogurt.jpg',
  './images/dinner-lentil-soup.jpg',
  './images/dinner-mushroom-risotto.jpg',
  './images/dinner-roast-chicken.jpg',
  './images/dinner-salmon-zucchini.jpg',
  './images/dinner-shakshuka.jpg',
  './images/dinner-vegetarian-chili.jpg',
  './images/dinner-zucchini-pasta.jpg',
  './images/lunch-chicken-rice.jpg',
  './images/lunch-chicken-wrap.jpg',
  './images/lunch-chickpea-salad.jpg',
  './images/lunch-chili.jpg',
  './images/lunch-lentil-curry.jpg',
  './images/lunch-omelette-potato.jpg',
  './images/lunch-tofu-wok.jpg',
  './images/lunch-tuna-pasta.jpg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith('mealpilot-') && key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
