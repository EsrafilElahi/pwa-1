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

document
  .querySelector("#get-access")
  .addEventListener("click", async function init(e) {
    navigator.mediaDevices.getUserMedia({
      video: {
        minAspectRatio: 1.333,
        minFrameRate: 30,
        width: 1280,
        heigth: 720,
      },
    });
  });
