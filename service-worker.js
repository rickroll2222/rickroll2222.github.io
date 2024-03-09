const CACHE_NAME = 'rickroll2222-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/vanitas-no-carte-anime.gif',
    '/games/index.html',
    '/rickroll2222Google.html',
    // Add more paths for other static assets you want to cache here
];

self.addEventListener('install', async (event) => {
    console.log("install event");
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(STATIC_ASSETS);
});

self.addEventListener('fetch', async (event) => {
    console.log("fetch event");
    const response = await caches.match(event.request);
    if (response) {
        return response;
    }
    return fetch(event.request);
});
