let countdowns = [];
const SITE_URL = 'http://localhost:3000/';
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/static/js/bundle.js',
  '/',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v21/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2',
  'http://localhost:3000/alarm.wav'
];

self.addEventListener('message', (event) => {
  countdowns = event.data;
});

// populate cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Could not cache asset', error);
      })
  );
});

// Serve cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // Become available to all pages
});

setInterval(() => {
  getCurrentClient()
    .then(client => {
      if (!client || client.visibilityState === 'hidden') {
        sendNotification();
      }
    });
}, 500);

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    getCurrentClient().then(client => {
      if (client) {
        return client.focus();
      }

      return clients.openWindow(SITE_URL);
    })
  );
});

function sendNotification () {
  countdowns.forEach((countdown) => {
    if (getTimeRemaining(countdown) === 0 && !countdown.isDismissed) {
      countdown.isDismissed = true;
      self.registration.showNotification('Your alarm finished', {
        body: 'An alarm is ringing',
        icon: '../images/touch/chrome-touch-icon-192x192.png',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample'
      });
    }
  });
}

function getCurrentClient () {
  return clients.matchAll({ type: 'window' })
    .then((windowClients) => {
      return windowClients.find(client => client.url === SITE_URL);
    });
}

function getTimeRemaining (countdown) {
  const [hour1, hour2, min1, min2, sec1, sec2] = padStart(countdown.time, 6, '0').split('');
  const countdownDuration = (parseInt(hour1 + hour2, 10) * 3600 + parseInt(min1 + min2, 10) * 60 + parseInt(sec1 + sec2, 10)) * 1000;
  const isStarted = !!countdown.startedAt;

    // if the timer was not started, the remaining time is the countdown duration
  if (!isStarted) {
    return countdownDuration;
  }

  const deadlineAt = countdown.startedAt + countdownDuration;
  const timeRemaining = deadlineAt - (countdown.pausedAt || Date.now()) + countdown.pausedDuruation;
  if (timeRemaining < 0) {
    return 0;
  }

  return timeRemaining;
}

function padStart (v, n, c) {
  c = c ? '0' : c;
  return String(v).length >= n ? '' + v : (String(c).repeat(n) + v).slice(-n);
}
