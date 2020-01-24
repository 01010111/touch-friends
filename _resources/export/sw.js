var CACHE = 'cache-only';
 
self.addEventListener('install', function(evt) {
	console.log('The service worker is being installed.');
	evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
	console.log('The service worker is serving the asset.');
	evt.respondWith(fromCache(evt.request));
});

function precache() {
	return caches.open(CACHE).then(function (cache) {
		return cache.addAll([
			'/',
			'index.html',
			'app.js',
			'pixi.js',
			'tweenmax.js',
			'easepack.js',
			'manifest.json',
			'favicon.ico',
			'images/icons/icon-72x72.png',
			'images/icons/icon-96x96.png',
			'images/icons/icon-128x128.png',
			'images/icons/icon-144x144.png',
			'images/icons/icon-152x152.png',
			'images/icons/icon-192x192.png',
			'images/icons/icon-384x384.png',
			'images/icons/icon-512x512.png',
		]);
	});
}
 
function fromCache(request) {
	return caches.open(CACHE).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject(`no match ${request.url}`);
		});
	});
}