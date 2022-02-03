let cacheName = "pwa-1";
let cacheFiles = ["/", "/index.html", "/style.css", "/script.js"];

// start service worker to install
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("caching assets...");
        cache.addAll(cacheFiles);
      })
      .catch((err) => console.log("not caching", err))
  );
  self.skipWaiting();
});

// serve cached content to work offline
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
    // .catch(e => {
    //   if (e.request.url.indexOf(".html") > -1) {    ===> for fallback html page
    //     return caches.match("/falback.html")
    //   }
    // })
  );
});
