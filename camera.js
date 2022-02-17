// const getMedia = async () => {
//   let videoElement = document.getElementById("video");

//   // doesn't support
//   if (!("mediaDevices" in navigator)) {
//     console.log("MediaDevices doesn't support in your browser");
//     return;
//   }

//   // check old version
//   if (navigator.mediaDevices.getUserMedia === undefined) {
//     navigator.mediaDevices.getUserMedia = function (constraints) {
//       var getUserMedia =
//         navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//       if (!getUserMedia) {
//         console.log("again doesn't suuport");
//       }

//       return new Promise(function (resolve, reject) {
//         getUserMedia.call(navigator, constraints, resolve, reject);
//       });
//     };
//   }

//   // check current version device
//   const checkVideoDevice = async () => {
//     let devices = await navigator.mediaDevices.enumerateDevices();
//     let audio = false;
//     let video = false;

//     console.log("devices :", devices);

//     devices.map((device) => {
//       if (device.kind === "audioinput") {
//         console.log("audio :", device.kind);
//         audio = true;
//       } else if (device.kind === "videoinput") {
//         console.log("video :", device.kind);
//         video = true;
//       }
//     });

//     return audio, video;
//   };

//   // play video
//   let { video } = await checkVideoDevice();
//   if (video) {
//     let constraints = { audio: false, video: true };
//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then(function (stream) {
//         videoElement.srcObject = stream;
//       })
//       .catch(function (err) {
//         console.log("error : ", err);
//       });
//   } else {
//     console.log("i can't find any video device");
//   }
// };

// // await getMedia();
// async function startCapture(displayMediaOptions) {
//   let captureStream = null;

//   try {
//     captureStream = await navigator.mediaDevices.getDisplayMedia(
//       displayMediaOptions
//     );
//   } catch (err) {
//     console.error("Error: " + err);
//   }
//   return captureStream;
// }

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

camera_button.addEventListener("click", async function () {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
});

click_button.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toDataURL("image/jpeg");

  // data url of the image
  console.log(image_data_url);
});
