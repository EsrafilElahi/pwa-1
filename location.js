function showLocation() {
  if (!navigator.geolocation) {
    console.log("geo location doesn't support");
  }

  const onSuccess = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    alert(`lat: ${lat} ==> long: ${long}`);
    console.log("position :", position);
  };

  const onError = (position) => {
    switch (position.code) {
      case 0:
        alert("unknown error");
        break;

      case 1:
        alert("permission denied");
        break;

      case 2:
        alert("position unavailable");
        break;

      case 3:
        alert("timed out");
        break;

      default:
        alert("another unknown errorّ");
        break;
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      timeout: 5000,
    });
  }
}
