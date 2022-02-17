// notification




// camera
const getMedia = async () => {
  // doesn't support
  if (!("mediaDevices" in navigator)) {
    console.log("MediaDevices doesn't support in your browser");
    return;
  }

  // check old version
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      var getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      if (!getUserMedia) {
        console.log("again doesn't suuport");
      }

      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }

  // check current version device
  const checkVideoDevice = async () => {
    let devices = await navigator.mediaDevices.enumerateDevices();
    let audio = false;
    let video = false;

    devices.map((device) => {
      if (device.kind === "audioinput") {
        audio = true;
      } else if (device.kind === "videoinput") {
        video = true;
      }
    });

    return audio, video;
  };

  // play video
  let { video } = await checkVideoDevice();
  if (video) {
    let setting = { audio: false, video: true };
    navigator.mediaDevices
      .getUserMedia(setting)
      .then(function (stream) {
        videoElement.srcObject = stream;
      })
      .catch(function (err) {
        console.log("error : ", err);
      });
  } else {
    console.log("i can't find any video device");
  }
};

await getMedia();
