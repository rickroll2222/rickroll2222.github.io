const CACHE_NAME = 'rickroll2222-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/vanitas-no-carte-anime.gif',
    '/games/index.html',
    '/rickroll2222Google.html',
    '/games/mario64/sm64.us.f3dex2e.wasm',
    '/games/mario64/sm64.us.f3dex2e.js',
    '/games/mario64/index.html',
    '/games/Paper Minecraft v11.html',
    
    // Add more paths for other static assets you want to cache here
];

self.addEventListener('install', async (event) => {
    console.log("install event");
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(STATIC_ASSETS);
});

self.addEventListener('fetch', async (event) => {
    console.log("fetch event");
    event.respondWith(
        // First, try to fetch the request from the network
        fetch(event.request)
        .then(async (response) => {
            // If the response is valid, clone it and store it in the cache
            if (response && response.status === 200) {
                const cache = await caches.open(CACHE_NAME);
                await cache.put(event.request, response.clone());
            }
            return response;
        })
        .catch(async () => {
            // If fetching fails (offline), try to respond with the cached version
            const cachedResponse = await caches.match(event.request);
            return cachedResponse || new Response(null, { status: 404 });
        })
    );
});
