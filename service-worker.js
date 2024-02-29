self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('rickroll2222-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/games/index.html',
        '/rickroll2222Google.html',
        // Add more resources you want to cache here
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
