 export default async function registerServiceWorker() {
//     const registration = await navigator.serviceWorker.register('./sw.js');
//     console.log(registration);
  if ('serviceWorker' in navigator) {
    const success = () => console.log('[Service Worker] Registered');
    const failed = () => console.log('[Service Worker] Registration failed');

    // prettier-ignore
    navigator.serviceWorker.register('./sw.js')
      .then(success)
      .catch(failed);
  }
}

