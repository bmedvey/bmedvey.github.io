const staticCacheName = 'hello-pwa';
const dynamicCacheName = 'dynamic-images';
const staticFilesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', event => {
    event.waitUntil (() => {
        caches.open(staticCacheName).then(cache => {
            return cache.addAll(staticFilesToCache);
        });
    });
    console.log("Install done");
});

self.addEventListener('activate',event => {
    console.log('Claiming control');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch',event => {
    const {request} = event;
    // event.respondWith(networkFirst(request));
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log("Loading from cache", request.url);
            }
            return response || fetch(request, {mode: 'cors', credentials: 'omit'})
                .then(response => {
                    console.log("Loading from network", request.url);
                    const cloneResponse = response.clone();
                    caches.open(dynamicCacheName).then(cache => cache.put(request, cloneResponse));
                    return response;
                });
        }));
});