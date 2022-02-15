window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((res) => console.log("service worker registered", res))
      .catch((err) => console.log("service worker not registered", err));
  }

  if (!("serviceWorker" in navigator && "PushManager" in window)) {
    console.log("SW & PM doesn't support");
  } else {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "notifications" })
        .then((res) => console.log(res.state));
    }
  }
};

// for install banner
let defferPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  console.log("before install prompt");
  defferPrompt = e;
});

let btn = document.getElementById("add");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (defferPrompt) {
    console.log("user choice", defferPrompt.userChoice);
    defferPrompt.userChoice.then((res) => {
      if (res.outcome === "accepted") {
        console.log("accepted");
      } else {
        console.log("not accepted");
      }
      defferPrompt = null;
    });
  }
});

window.addEventListener("appinstalled", (e) => {
  console.log("app installed");
  defferPrompt = null;
});
