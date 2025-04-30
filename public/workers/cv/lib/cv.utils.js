function CvUtils() {

  // Pre process
  function upstream(src, dst) {
    // Convert image to greyscale
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
    // Blur
    const ksize = new cv.Size(3, 3);
    const anchor = new cv.Point(-1, -1);
    cv.blur(dst, dst, ksize, anchor, cv.BORDER_DEFAULT);
    return dst;
  }

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
        cv.cvtColor(src, dst, cv.COLOR_RGB2RGBA);
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

  // return immutable Object
  return Object.freeze({
    upstream,
    imageDataFromMat,
  });
}

let cvUtils = CvUtils();

new Promise((resolve, reject) => {
  if (cvUtils) resolve(cvUtils);
  else reject(console.error("error loading cvUtils"));
});
