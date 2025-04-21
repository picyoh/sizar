async function waitForOpenCV(callbackFn) {
  cv = cv instanceof Promise ? await cv : cv;
  callbackFn(true);
}

function processVideo({ msg, payload }) {
  // Matrix from imageDate
  const src = cv.matFromImageData(payload);
  // Create new matrix
  const dst = new cv.Mat();
  // PRE
  // Convert image to greyscale
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
  // Blur
  const ksize = new cv.Size(3, 3);
  const anchor = new cv.Point(-1, -1);
  cv.blur(dst, dst, ksize, anchor, cv.BORDER_DEFAULT);
  // Canny Edge detector
  cv.Canny(dst, dst, 190, 380, 5, false);
  // Closing (dilate then erode)
  const M = cv.Mat.ones(5, 5, cv.CV_8U);
  cv.morphologyEx(dst, dst, cv.MORPH_CLOSE, M);

  // Find contours
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    dst,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  );
  //console.log(contours.$$.count.value)
  for (let i = 0; i < contours.size(); i++) {
    const color = new cv.Scalar(
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255)
    );
    cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
  }
  // post messsage and convert matToImageData
  postMessage({ msg, payload: imageDataFromMat(dst) });
  src.delete();
  M.delete();
  contours.delete();
  hierarchy.delete();
  dst.delete();
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
  dst.delete();
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
