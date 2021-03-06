async function notif() {
  // create and show the notification
  const showNotification = () => {
    const notification = new Notification("عکس گرفتن", {
      body: "عکس میخای بگیری از خودت عشقشو ببری؟",
      icon: "images/hello-icon-128.png",
      badge: "images/hello-icon-128.png",
      image: "images/hello-icon-256.png",
    });

    // close the notification after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10 * 1000);

    // navigate to a URL when clicked
    notification.addEventListener("click", () => {
      notification.close();
      window.open("/camera.html", "_blank");
    });
  };

  // show an error message
  const showError = () => {
    alert("denied");
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
}
