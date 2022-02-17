(async () => {
  // create and show the notification
  const showNotification = () => {
    const notification = new Notification("عکس گرفتن", {
      body: "میخایید از خودتان عکس بگیرید؟",
      icon: "./images/hello-icon-128.png",
    });
    console.log("before notif");

    // close the notification after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10 * 1000);

    // navigate to a URL when clicked
    notification.addEventListener("click", async () => {
      await window.open("./camera.js", "_blank");
    });
  };

  // function showNotification() {
  //   Notification.requestPermission(function (result) {
  //     if (result === "granted") {
  //       navigator.serviceWorker.ready.then(function (registration) {
  //         registration.showNotification("Vibration Sample", {
  //           body: "Buzz! Buzz!",
  //           icon: "../images/touch/chrome-touch-icon-192x192.png",
  //           vibrate: [200, 100, 200, 100, 200, 100, 200],
  //           tag: "vibration-sample",
  //         });
  //       });
  //     }
  //   });
  // }

  const showError = () => {
    alert("شما خدمات مارا رد کردید اصنشم قهرم!!");
  };

  // check notification permission
  let granted = false;

  if (Notification.permission === "granted") {
    granted = true;
  } else if (Notification.permission !== "denied") {
    let permission = await Notification.requestPermission();
    granted = permission === "granted" ? true : false;
  }

  // show notification or error
  granted ? showNotification() : showError();
})();

