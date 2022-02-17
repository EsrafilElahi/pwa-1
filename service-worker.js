let cacheName = "pwa-1";
let cacheFiles = [
  "/",
  "/style.css",
  "/offline.html",
  "/camera.html",
  "/script.js",
  "/camera.js",
  "/manifest.json",
];

let CACHE_VERSION = 1.1;
let CURRENT_CACHE = {
  static: `static-cache-v${CACHE_VERSION}`,
  dynamic: `dynamic-cache-v${CACHE_VERSION}`,
};

// start service worker to install
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CURRENT_CACHE["static"])
      .then((cache) => {
        console.log("caching assets...");
        cache.addAll(cacheFiles);
      })
      .catch((err) => console.log("not caching", err))
  );
  self.skipWaiting();
});

// activate cache
self.addEventListener("activate", (e) => {
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

// serve cached content to work offline --> staticly
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.open(CURRENT_CACHE["static"]).then((cache) => {
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
  );
});

// serve cached content to work offline --> dynamicly
// self.addEventListener("fetch", (event) => {
//   let urls = ["http://roocket.org/api/products"];

//   if (urls.indexOf(event.request.url) > -1) {
//     console.log("network first");
//     return event.respondWith(
//       fetch(event.request)
//         .then((response) => {
//           return caches.open(CURRENT_CACHE["dynamic"]).then((cache) => {
//             cache.put(event.request, response.clone());
//             return response;
//           });
//         })
//         .catch((err) => {
//           return caches.match(event.request);
//         })
//     );
//   } else {
//     console.log("cache first");

//     return event.respondWith(
//       caches.match(event.request).then((response) => {
//         if (response) return response;

//         return fetch(event.request)
//           .then((networkResponse) => {
//             return caches.open(CURRENT_CACHE["dynamic"]).then((cache) => {
//               cache.put(event.request, networkResponse.clone());
//               return networkResponse;
//             });
//           })
//           .catch((err) => {
//             return caches.open(CURRENT_CACHE["static"]).then((res) => {
//               return res.match("/offline.html");
//             });
//           });
//       })
//     );
//   }
// });
