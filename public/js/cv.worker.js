async function waitForOpenCV(callbackFn) {
  cv = cv instanceof Promise ? await cv : cv;
  callbackFn(true);
}

function processVideo({ msg, payload }) {
  console.log(payload);
  const src = cv.matFromImageData(payload);
  let dst = new cv.Mat();
  const depth = src.type() % 8;
  const scale = depth <= cv.CV_8S ? 1.0 : depth <= cv.CV_32S ? 1.0 /256.0 : 255.0;
  const shift = depth === cv.CV_8S || depth === cv.CV_16S ? 128.0 : 0.0;
  console.log(scale, shift)
  src.convertTo(dst, cv.CV_8U, scale, shift);
  cv.cvtColor(dst, dst, cv.COLOR_BGRA2GRAY, 0);
  console.log(dst)
  postMessage({ msg, payload: imageDataFromMat(dst) });
}

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
  //TODO: check if delete
  // //dst.delete();
  return imgData;
}

onmessage = function (e) {
  switch (e.data.msg) {
    case "load": {
      // Import Webassembly script
      self.importScripts("./opencv.js");
      waitForOpenCV(function (success) {
        if (success) postMessage({ msg: e.data.msg });
        else throw new Error("Error on loading OpenCV");
      });
      break;
    }
    case "processVideo":
      return processVideo(e.data);
    default:
      break;
  }
};