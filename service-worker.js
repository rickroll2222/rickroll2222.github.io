const CACHE_NAME = 'rickroll2222-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/vanitas-no-carte-anime.gif',
    '/games/index.html',
    '/rickroll2222Google.html',
    // Add more paths for other static assets you want to cache here
];

self.addEventListener('install', function(event) {
    // Perform the install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                let fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then(function(response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});
