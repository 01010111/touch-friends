self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('airhorner').then(function(cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/app.js',
				'/pixi.js',
				'/tweenmax.js',
				'/easepack.js',
			]);
		})
	);
});