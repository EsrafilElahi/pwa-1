import { Camera, CameraResultType } from '@capacitor/camera';

const btn = document.getElementById("btn")

btn.onclick = takePicture();

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  
  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  var imageUrl = image.webPath;
  
  console.log('take pic :', image);
  
  // Can be set to the src of an image now
  imageElement.src = imageUrl;
};