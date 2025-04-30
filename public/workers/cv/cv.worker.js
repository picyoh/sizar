async function waitForOpenCV(callbackFn) {
  cv = cv instanceof Promise ? await cv : cv;
  cvUtils = cvUtils instanceof Promise ? await cvUtils : cvUtils;
  cvHaar = cvHaar instanceof Promise ? await cvHaar : cvHaar;
  //cvSurf = cvSurf instanceof Promise ? await cvSurf : cvSurf;
  console.log(
    `
    cv : ${cv}\n
    cvUtils : ${cvUtils}\n
    cvHaar : ${cvHaar}\n
    `
  );
  callbackFn(true);
}

function processImage({ msg, payload }) {
  // Matrix from imageDate
  const src = cv.matFromImageData(payload.inputImage);
  //const mode = payload.mode;
  // Create new matrix
  const dst = new cv.Mat();
  // pre Processing
  cvUtils.upstream(src, dst);
  //Process image
  if (mode.includes("surface")) cvObj.process(src, dst);
  if (mode.includes("object")) cvSurf.process(src, dst);
  
  //cv.threshold(dst, dst, 90, 180, cv.THRESH_BINARY);
  
  // post message and convert matToImageData
  postMessage({ msg, payload: cvUtils.imageDataFromMat(dst) });

  src.delete();
  dst.delete();
}

onmessage = function (e) {
  switch (e.data.msg) {
    case "load": {
      const scripts = [
        "./opencv.js",
        "./lib/cv.utils.js",
        "./lib/cv.haar.js",
        "./lib/cv.surface.js",
      ];
      // Import scripts
      scripts.map((script) => importScripts(script));
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
