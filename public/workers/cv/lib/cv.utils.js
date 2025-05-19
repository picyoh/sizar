function CvUtils() {

  // Convert Mat to Blob
  function getBlobFromImage(image, inputSize, mean, std, swapRB) {
    // empty Mat
    let matC3 = new cv.Mat(image.matSize[1], image.matSize[0], cv.CV_8UC3);
    // convert to BGR
    cv.cvtColor(image, matC3, cv.COLOR_RGBA2BGR);
    // get blob
    let blob = cv.blobFromImage(
      matC3, 
      std, 
      new cv.Size(inputSize[1], inputSize[0]),
      new cv.Scalar(mean[0], mean[1], mean[2]), 
      swapRB
    );
    matC3.delete();
    return blob;
  };

  // Convert Mat to imageData
  function imageDataFromMat(src) {
    // get channel number to know image color mode
    const channel = src.channels();
    const dst = new cv.Mat();
    switch (channel) {
      case 4:
        src.copyTo(dst);
        break;
      case 3:
        cv.cvtColor(src, dst, cv.COLOR_BGR2RGBA);
        break;
      case 1:
        cv.cvtColor(src, dst, cv.COLOR_GRAY2RGBA);
        break;
      default:
        postMessage({ msg: "error" });
        break;
    }
    const imgData = new ImageData(
      new Uint8ClampedArray(dst.data),
      dst.cols,
      dst.rows
    );
    dst.delete();
    return imgData;
  }
  
  // TODO: set printError 
  function printError(err) {
    if (typeof err === 'undefined') {
      err = '';
    } else if (typeof err === 'number') {
      if (!isNaN(err)) {
        if (typeof cv !== 'undefined') {
          err = 'Exception: ' + cv.exceptionFromPtr(err).msg;
        }
      }
    } else if (typeof err === 'string') {
      let ptr = Number(err.split(' ')[0]);
      if (!isNaN(ptr)) {
        if (typeof cv !== 'undefined') {
          err = 'Exception: ' + cv.exceptionFromPtr(ptr).msg;
        }
      }
    } else if (err instanceof Error) {
      err = err.stack.replace(/\n/g, '<br>');
    }
    console.error(err);
  }

  // return immutable Object
  return Object.freeze({
    getBlobFromImage,
    imageDataFromMat,
    printError,
  });
}

let cvUtils = CvUtils();

new Promise((resolve, reject) => {
  if (cvUtils) resolve(cvUtils);
  else reject(console.error("error loading cvUtils"));
});
