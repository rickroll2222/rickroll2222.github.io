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
		'/games/doodle-jump/doodle.png',
		'/games/doodle-jump/index.html',
		'/games/doodle-jump/main.js',
		'/games/doodle-jump/sprites.png',
		'/games/doodle-jump/style.css',
		'/Slope-Game/Build/slope_data.unityweb',
		'/Slope-Game/Build/slope_framework.unityweb',
		'/Slope-Game/Build/slope_memory.unityweb',
		'/Slope-Game/Build/slope_wasmcode.unityweb',
		'/Slope-Game/Build/slope_wasmframework.unityweb',
		'/Slope-Game/Build/slope.json',
		'/Slope-Game/TemplateData/progressEmpty.Dark.png',
		'/Slope-Game/TemplateData/progressFull.Dark.png',
		'/Slope-Game/TemplateData/progressLogo.Dark.png',
		'/Slope-Game/TemplateData/style.css',
		'/Slope-Game/TemplateData/unityloader41.js',
		'/Slope-Game/TemplateData/UnityProgress.js',
		'/Slope-Game/index.html',
		'/games/baldis-basics/TemplateData/progressEmpty.Dark.png',
		'/games/baldis-basics/TemplateData/progressFull.Dark.png',
		'/games/baldis-basics/TemplateData/progressLogo.Dark.png',
		'/games/baldis-basics/TemplateData/style.css',
		'/games/baldis-basics/TemplateData/UnityProgress.js',
		'/games/baldis-basics/unity/baldi.data.unityweb',
		'/games/baldis-basics/unity/baldi.wasm.code.unityweb',
		'/games/baldis-basics/unity/baldi.wasm.framework.unityweb',
		'/games/baldis-basics/baldi.js',
		'/games/baldis-basics/baldi.json',
		'/games/baldis-basics/firebase-app.js',
		'/games/baldis-basics/index.html',
		'/games/baldis-basics/splash.png',
		'/games/minecraft.html',
		'/rickroll.gif',
		'/subway.gif',
		'/rickroll2222.github.io/credit.html',
		'/credit.html',
		'/style.css',
		'/safari-pinned-tab.svg',
		'/manifest.json',
		'/favicon.ico',
		'/apple-touch-icon.png',
		'/favicon-32x32.png',
		'/favicon-16x16.png',
		'/mstile-150x150.png',
		'/mstile-144x144.png',
		'/mstile-70x70.png',
		'/browserconfig.xml',
		'/MCPEweb/index.html',
		'/MCPEweb/index.wasm',
		'/MCPEweb/index.js',
		'/roblox/index.html',
		'/roblox/rblx.js',
		'/roblox/rblx.wasm',
		'/roblox/WebBlox.png',
		'/roblox/favicon.ico',
		'/roblox/rblx.data.0',
		'/roblox/rblx.data.1',
		'/roblox/rblx.data.2',
		'/roblox/rblx.data.3',
		'/roblox/rblx.data.4',
		'/roblox/rblx.data.5',
		'/roblox/rblx.data.6',
		'/roblox/rblx.data.7',
		'/roblox/rblx.data.8',
		'/roblox/rblx.data.9',
		'/roblox/rblx.data.10',
		'/roblox/rblx.data.11',
		'/games/minecraft-classic/index.html',
		'/games/minecraft-classic/assets/js/app.js',
		'/games/minecraft-classic/assets/js/RandomLevelWorker.js',
		'/games/minecraft-classic/assets/fonts/minecraftfont.ttf',
		'games/minecraft-classic/assets/fonts/minecraftfont.woff',
		'/games/minecraft-classic/assets/css/style.css'
		'/games/pvz/index.html',
		'/games/pvz/pvz.js',
		'/games/pvz/pvz.wasm',
		'/games/pvz/main.pak.part1',
		'/games/pvz/main.pak.part2',
		'/games/pvz/main.pak.part3',
		'/games/pvz/properties/default.xml',
		'/games/pvz/properties/Layout.xml',
		'/games/pvz/properties/partner.xml',
		'/games/pvz/properties/partner.xml.sig',
		'/games/pvz/properties/partner_logo.jpg'


				

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
