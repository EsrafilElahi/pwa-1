// var takePhotoButton = document.querySelector('button#takePhoto');
// var canvas = document.querySelector('canvas');
// takePhotoButton.onclick = takePhoto;
// // Get a Blob from the currently selected camera source and
// // display this with an img element.
// function takePhoto() {
//   imageCapture.takePhoto().then(function(blob) {
//     console.log('Took photo:', blob);
//     img.classList.remove('hidden');
//     img.src = URL.createObjectURL(blob);
//   }).catch(function(error) {
//     console.log('takePhoto() error: ', error);
//   });
// }

var grabFrameButton = document.querySelector("button#grabFrame");
var canvas = document.querySelector("canvas");
grabFrameButton.onclick = grabFrame;
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
