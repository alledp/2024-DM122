// console.log('Im a Kind of a Proxy!! 😁');
// console.log(self);

self.addEventListener('install', (event) => {
    console.log(`[Service Worker] install event lifecyvle!`);
    self.skipWaiting(); // don't wait for the installation, just activate it.
});

self.addEventListener('activate', () => {
    console.log(`[Service Worker] active event lifecyvle!`);
    return self.clients.claim(); //Claim All tabs
});

self.addEventListener('fetch', (event) => {
    console.log(`[Service Worker] fetch event lifecyvle!`);
    console.log(event.request.url);
    event.respondWith(fetch(event.request));
});