const CACHE_NAME = "ejs-pwa-cache-v1";
const urlsToCache = [
  "/",                // Home page
  "/public/styles/main.css", // CSS file (add actual path)
  "/public/img/logo.png", // Logo (add actual path)
  "/public/manifest.json",   // Manifest file
  "/app.js"           // Main JS file
];
console.log(urlsToCache);
// Install the service worker and cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercept network requests and serve cached resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
