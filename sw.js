const cachesName = "example cache";
const cachesFiles = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "manifest.json",
];

// install
self.addEventListener("install", async function (e) {
  const cache = await caches.open(cachesName);
  await cache.addAll(cachesFiles);
  return self.skipWaiting();
});

// activate
self.addEventListener("activate", function (e) {
  self.clients.claim();
});

// fetch
self.addEventListener("fetch", async function (e) {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(notWorksCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await chaches.open(cachesName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function notWorksCache(req) {
  const cache = caches.open(cachesName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await cache.match(req);
    return cached;
  }
}
