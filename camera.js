document
  .querySelector("#get-access")
  .addEventListener("click", async function init(e) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      const videoTracks = stream.getVideoTracks();
      const track = videoTracks[0];
      alert(`Getting video from: ${track.label}`);
      document.querySelector("video").srcObject = stream;
      document.querySelector("#get-access").setAttribute("hidden", true);
      document.getElementById("stop").addEventListener("click", function () {
        track.stop();
      });
    } catch (error) {
      alert(`errori hast : ${error.name}`);
      console.error(error);
    }
  });

