window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((res) => console.log("service worker registered", res))
      .catch((err) => console.log("service worker not registered", err));
  }
};

let defferPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  defferPrompt = e;
})

document.getElementById("add").addEventListener("click", (e) => {
  e.preventDefault();

  if(defferPrompt) {
    console.log('user choice', defferPrompt.userChoice)
  }
})