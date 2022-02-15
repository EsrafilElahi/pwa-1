let cacheName = "pwa-1";
let cacheFiles = ["/", "/style.css", "/script.js", "/manifest.json"];

let CACHE_VERSION = 1.1;
let CURRENT_CACHE = {
  front: `pwa-cache-v${CACHE_VERSION}`,
};

// start service worker to install
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches
      .open(CURRENT_CACHE["front"])
      .then((cache) => {
        console.log("caching assets...");
        cache.addAll(cacheFiles);
      })
      .catch((err) => console.log("not caching", err))
  );
  self.skipWaiting();
});

// activate cache
self.addEventListener("activate", function (e) {
  console.log("activating service worker", e);

  // array 0f expected cache name (Object.value())
  let expectedCacheNamesArray = Object.values(CURRENT_CACHE);

  // deleting which caches is not in expected cache name array (caches.keys())
  e.waitUntil(
    caches.keys().then((cacheArray) => {
      return Promise.all(
        cacheArray.map((res) => {
          if (!expectedCacheNamesArray.includes(res)) {
            return caches.delete(res);
          }
        })
      );
    })
  );
});

// serve cached content to work offline
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.open(CURRENT_CACHE["front"]).then((cache) => {
      return cache.match(e.request).then((response) => {
        if (response) {
          return response;
        } else {
          fetch(e.response).then((netResponse) => {
            console.log("netResponse :", netResponse);
            cache.put(e.request, netResponse.clone());
            return netResponse;
          });
        }
      });
    })
    // .catch(e => {
    //   if (e.request.url.indexOf(".html") > -1) {    ===> for fallback html page
    //     return caches.match("/falback.html")
    //   }
    // })
  );
});
