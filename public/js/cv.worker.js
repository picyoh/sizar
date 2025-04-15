async function waitForOpenCV(callbackFn) {
  cv = cv instanceof Promise ? await cv : cv;
  callbackFn(true);
}

function processVideo({ msg, payload }) {
console.log(msg, payload.input)
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
  console.log(channel)
  const imgData = new ImageData(new Uint8ClampedArray(img.data), img.cols, img.rows);
  img.delete();
  return imgData;
}

onmessage = function (e) {
  console.log(e.data.msg);
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
      console.log(e.data);
      return processVideo(e.data);
    default:
      break;
  }
};

/* onerror = function (e){
  console.log(e)

}
 */
