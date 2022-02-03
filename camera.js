// document
//   .querySelector("#get-access")
//   .addEventListener("click", async function init(e) {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: false,
//         video: true,
//       });
//       const videoTracks = stream.getVideoTracks();
//       const track = videoTracks[0];
//       alert(`Getting video from: ${track.label}`);
//       document.querySelector("video").srcObject = stream;
//       // document.querySelector("#get-access").setAttribute("hidden", true);
//       //The video stream is stopped by track.stop() after 3 second of playback.
        //  document.getElementById("stop").addEventListener("click", function() {
        //   track.stop()
        //  })
//       // setTimeout(() => {
//       //   track.stop();
//       // }, 3 * 1000);
//     } catch (error) {
//       alert(`errori hast : ${error.name}`);
//       console.error(error);
//     }
//   });

var grabFrameButton = document.querySelector("button#grabFrame");
var canvas = document.querySelector("canvas");
grabFrameButton.onclick = grabFrame();
function grabFrame() {
  imageCapture
    .grabFrame()
    .then(function (imageBitmap) {
      console.log("Grabbed frame:", imageBitmap);
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      canvas.getContext("2d").drawImage(imageBitmap, 0, 0);
      canvas.classList.remove("hidden");
    })
    .catch(function (error) {
      console.log("grabFrame() error: ", error);
    });
}
