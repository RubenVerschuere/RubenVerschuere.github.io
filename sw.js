const CACHNAME = "Crypto-v1";
const applicationServerPublicKey = "BGYBVJjvQKobmSjRFPnIIo21P0HA42RJFSxyIAOffuvTDxwg5QhmORgjN50lGBPZHIWKdEd0iNFdt5RTdYMce4U";
    


var urls = [
    './', 
    'index.html', 
    'style/style.css',
    'js/app.js', 
    'sw.js', 
    'manifest.json', 
    'images/bitcoin.png', 
    'js/onlineDetection.js'
]

if('serviceWorker' in navigator){
    console.log('Service Worker and Push is supported');
    try {
        navigator.serviceWorker.register('sw.js');
        console.log('SW registered');
    } catch (error) {
        console.log('SW failed to register');
    }
}


self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHNAME).then(function(cache) {
            console.log("Opened cache");
            return cache.addAll(urls);
        })
    )
});


self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    if (url.origin === location.origin) {
      event.respondWith(cacheFirst(request));
    } else {
      event.respondWith(networkFirst(request));
    }
  });
  
  async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
  }
  
  async function networkFirst(request) {
    const dynamicCache = await caches.open('bitcoin-dynamic');
    try {
      const networkResponse = await fetch(request);
      dynamicCache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (err) {
      const cachedResponse = await dynamicCache.match(request);
      return cachedResponse || await caches.match('./fallback.json');
    }
  }
