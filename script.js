window.onload = async () => {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker
      .register("./service-worker.js")
      .then((res) => console.log("service worker registered", res))
      .catch((err) => console.log("service worker not registered", err));
  } else if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else {
    let permission = await Notification.requestPermission();
    console.log("permission :", permission);
  }
};

// for install banner
// let defferPrompt;

// window.addEventListener("beforeinstallprompt", (e) => {
//   e.preventDefault();
//   console.log("before install prompt");
//   defferPrompt = e;
// });

// let btn = document.getElementById("add");

// btn.addEventListener("click", (e) => {
//   e.preventDefault();

//   if (defferPrompt) {
//     console.log("user choice", defferPrompt.userChoice);
//     defferPrompt.userChoice.then((res) => {
//       if (res.outcome === "accepted") {
//         console.log("accepted");
//       } else {
//         console.log("not accepted");
//       }
//       defferPrompt = null;
//     });
//   }
// });

// window.addEventListener("appinstalled", (e) => {
//   console.log("app installed");
//   defferPrompt = null;
// });

// document.addEventListener("DOMContentLoaded", async (e) => {

//   const getNotifState = async () => {
//     if (navigator.permissions) {
//       let result = await navigator.permissions.query({
//         name: "notifications",
//       });
//       return result.state;
//     }
//   };

//   const state = await getNotifState();

//   if (!("serviceWorker" in navigator && "PushManager" in window)) {
//     console.log("serviceWorker & PushManager doesn't support");
//   } else {
//     console.log(state);
//   }
// });
