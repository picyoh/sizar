async function waitForOpenCV(callbackFn) {
  cv = cv instanceof Promise ? await cv : cv;
  callbackFn(true);
}

function processImage({ msg, payload }) {
  // Matrix from imageDate
  const src = cv.matFromImageData(payload.inputImage);
  const mode = payload.mode;
  // TODO: get mode then trigger utils functions (surface -> objet)
  console.log(mode[0])
  // Create new matrix
  const dst = new cv.Mat();
  console.log(utils)
  // pre Processing 
  utils.upstream(src, dst);
  if(mode.includes("surface")) utils.surfaceProcess();
  if(mode.includes("object")) utils.objectProcess();
  //Process image
  cv.threshold(dst,dst, 90, 180, cv.THRESH_BINARY);
  // post message and convert matToImageData
  postMessage({ msg, payload: utils.imageDataFromMat(dst) });

  src.delete();
  dst.delete();
}

onmessage = function (e) {
  switch (e.data.msg) {
    case "load": {
      // Import Webassembly script
      self.importScripts("./opencv.js", "./cv.utils.js");
      waitForOpenCV(function (success) {
        if (success) postMessage({ msg: e.data.msg });
        else throw new Error("Error on loading OpenCV");
      });
      break;
    }
    case "processImage":
      return processImage(e.data);
    default:
      break;
  }
};
