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
// const checkVideoDevice = async () => {
//   let devices = await navigator.mediaDevices.enumerateDevices();
//   let audio = false;
//   let video = false;

//   console.log("devices :", devices);

//   devices.map((device) => {
//     if (device.kind === "audioinput") {
//       console.log("audio :", device.kind);
//       audio = true;
//     } else if (device.kind === "videoinput") {
//       console.log("video :", device.kind);
//       video = true;
//     }
//   });

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

// sections
let section1 = document.getElementById("section1");
let section2 = document.getElementById("section2");

section1.onclick = () => {
  section1.style.display = "none";
  section2.style.display = "none";
  video_div.style.display = "none";
  picture_div.style.display = "grid";
};

section2.onclick = () => {
  section1.style.display = "none";
  section2.style.display = "none";
  picture_div.style.display = "none";
  video_div.style.display = "grid";
};

// picture elements
const picture_div = document.querySelector("#take-picture");
let start_camera_photo = document.querySelector("#start-camera-photo");
let video_photo = document.querySelector("#video-photo");
let take_Photo = document.querySelector("#take-photo");
let canvas = document.querySelector("#canvas");

// video elemetns
const video_div = document.querySelector("#record-video");
let video_button = document.querySelector("#start-camera-video");
let video_video = document.querySelector("#video-video");
let start_button = document.querySelector("#start-record");
let stop_button = document.querySelector("#stop-record");
let download_link = document.querySelector("#download-video");

let camera_stream = null;
let media_recorder = null;
let blobs_recorded = [];

// picture functions
start_camera_photo.addEventListener("click", async function () {
  take_Photo.style.display = "flex";
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  console.log(stream);
  video_photo.srcObject = stream;
});

take_Photo.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toDataURL("image/jpeg");

  // data url of the image
  console.log(image_data_url);
});

// video functions
video_button.addEventListener("click", async function () {
  start_button.style.display = "flex";
  stop_button.style.display = "flex";
  download_link.style.display = "flex";

  camera_stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.srcObject = camera_stream;
});

start_button.addEventListener("click", function () {
  // set MIME type of recording as video/webm
  media_recorder = new MediaRecorder(camera_stream, { mimeType: "video/webm" });

  // event : new recorded video blob available
  media_recorder.addEventListener("dataavailable", function (e) {
    blobs_recorded.push(e.data);
  });

  // event : recording stopped & all blobs sent
  media_recorder.addEventListener("stop", function () {
    // create local object URL from the recorded video blobs
    let video_local = URL.createObjectURL(
      new Blob(blobs_recorded, { type: "video/webm" })
    );
    download_link.href = video_local;
  });

  // start recording with each recorded blob having 1 second video
  media_recorder.start(1000);
});

stop_button.addEventListener("click", function () {
  media_recorder.stop();
});
