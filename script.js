window.onload = () => {
  if (!("serviceWorker" in navigator)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    return;
  }

  if (!("PushManager" in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    return;
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((res) => console.log("service worker registered", res))
      .catch((err) => console.log("service worker not registered", err));
  }
};
