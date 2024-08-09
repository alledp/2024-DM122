export default async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('./sw.js');
    console.log(registration);
  }