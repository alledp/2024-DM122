// console.log('Im a Kind of a Proxy!! 😁');
// console.log(self);
self.addEventListener('install', (event) => {
    console.log(`[Service Worker] install event lifecyvle!`);
    event.waitUntil(installStaticAccess());
    self.skipWaiting(); // don't wait for the installation, just activate it.
});

self.addEventListener('activate', (event) => {
    event.waitUntil(cacheCleanup(0));
    console.log(`[Service Worker] active event lifecyvle!`);
    return self.clients.claim(); //Claim All tabs
});

self.addEventListener('fetch', async (event) => {
    console.log(`[Service Worker] fetch event lifecyvle!`);
    // const url = new URL(event.request.url);
    // console.log(url.pathname, );
    // if(url.pathname === '/2024-DM122/Service-Workers/images/dog.svg'){
    //     event.respondWith(fetch('/2024-DM122/Service-Workers/images/cat.svg'));
    // }
    const response = await caches.match(event.request.url);
    event.respondWith(cacheFirst(event.request));
});

const CACHE_VERSION_KEY = 'sw-cache-v1';

async function installStaticAccess(){
    return caches
        .open(CACHE_VERSION_KEY)
        .then((cache) => 
            cache.addAll(  [
                '/',
                '/2024-DM122/Service-Workers/index.html', 
                'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.fluid.classless.min.css',
                '/2024-DM122/Service-Workers/app.js',
                '/2024-DM122/Service-Workers/images/dog.svg', 
                '/2024-DM122/Service-Workers/images/cat.svg']))
}

async function cacheCleanup() {
    const cacheKeys = await caches.keys();
    const outdatedCache = (cacheKey) => cacheKey !== CACHE_VERSION_KEY;
    const purge = (cacheKey) => caches.delete(cacheKey);
    cacheKeys.filter(outdatedCache).forEach(purge);
    return true;
  }

async function cacheFirst(request){
    const cache = await caches.open(CACHE_VERSION_KEY);
    const response = await cache.match(requestUrl);
    if(response){
        return response;
    }
    console.log('URL: NOT IN THE CACHE', request.url);
    try {
        const networkResponse = await fetch(request);
        return networkResponse;
    } catch (error) {
        return new Response(`Network Error Happened: ${error}`, {
            status: 408,
            headers: {'Content-Type': 'text/plain'},
        });
    }
}