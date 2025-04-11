async function waitForOpenCV(callbackFn) {
  cv = cv instanceof Promise ? await cv : cv;
  callbackFn(true);
}

function imageProcessing({ msg, payload }) {
  // convert imageData to mat
  const img = cv.matFromImageData(payload);
  // create a new mat
  let result = new cv.Mat();
  // Greyscale
  cv.cvtColor(img, result, cv.COLOR_RGBA2GRAY);
  postMessage({ msg, payload: imageDataFromMat(result) });
}

function imageDataFromMat(mat) {
  // get channel number to know image color mode
  const channel = mat.channels();
  const img = new cv.Mat();
  switch (channel) {
    case 4:
      mat.copyTo(img);
      break;
    case 3:
      cv.cvtColor(mat, img, cv.COLOR_RGB2RGBA);
      break;
    case 1:
      cv.cvtColor(mat, img, cv.COLOR_GRAY2RGBA);
      break;
    default:
      postMessage({ msg: "error" });
      break;
  }
  console.log(img.data, img.cols, img.rows)

  return new ImageData(new Uint8ClampedArray(img.data), img.cols, img.rows);
}

onmessage = function (e) {
  console.log(e.data.msg);
  switch (e.data.msg) {
    case "load": {
      // Import Webassembly script
      self.importScripts("./opencv.js");
      console.log(cv);
      waitForOpenCV(function (success) {
        if (success) postMessage({ msg: e.data.msg });
        else throw new Error("Error on loading OpenCV");
      });
      break;
    }
    case "imageProcessing":
      return imageProcessing(e.data);
    default:
      break;
  }
};

/* onerror = function (e){
  console.log(e)

}
 */
