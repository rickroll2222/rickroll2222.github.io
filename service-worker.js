const cacheName = "cache2"; // Change value to force update

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([

                '/',
                '/index.html',
                '/vanitas-no-carte-anime.gif',
                '/games/index.html',
                '/rickroll2222Google.html',
                '/games/mario64/sm64.us.f3dex2e.wasm',
                '/games/mario64/sm64.us.f3dex2e.js',
                '/games/mario64/index.html',
                '/games/Paper Minecraft v11.html',
                '/200w.gif',
		'/games/doodle-jump/doodle.png'
		'/games/doodle-jump/index.html'
		'/games/doodle-jump/main.js'
		'/games/doodle-jump/sprites.png'
		'/games/doodle-jump/style.css'
		'/Slope-Game/Build/slope_data.unityweb'
		'/Slope-Game/Build/slope_framework.unityweb'
		'/Slope-Game/Build/slope_memory.unityweb'
		'/Slope-Game/Build/slope_wasmcode.unityweb'
		'/Slope-Game/Build/slope_wasmframework.unityweb'
		'/Slope-Game/Build/slope.json'
		'/Slope-Game/TemplateData/progressEmpty.Dark.png'
		'/Slope-Game/TemplateData/progressFull.Dark.png'
		'/Slope-Game/TemplateData/progressLogo.Dark.png'
		'/Slope-Game/TemplateData/style.css'
		'/Slope-Game/TemplateData/unityloader41.js'
		'/Slope-Game/TemplateData/UnityProgress.js'
		'/Slope-Game/index.html'




				

]


				
    // Add more paths for other static assets you want to cache here
			]);
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data. 
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
			})
		})
	);
});
