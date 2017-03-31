export default function initServiceWorker (store) {
  if ('serviceWorker' in navigator) {
    Notification.requestPermission();

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((err) => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }

  store.subscribe(() => {
    const { countdowns } = store.getState();
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(countdowns);
    }
  });
}
