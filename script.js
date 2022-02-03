window.onload = () => {
  "use strict";

  if ("serviceworker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((res) => console.log("service worker registered", res))
      .catch((err) => console.log("service worker not registered", err));
  }
};
