async function waitForOpenCV(callbackFn) {
  // TODO: promiseAll ?
  // Load scripts
  cv = cv instanceof Promise ? await cv : cv;
  cvUtils = cvUtils instanceof Promise ? await cvUtils : cvUtils;
  cvDnn = cvDnn instanceof Promise ? await cvDnn : cvDnn;
  cvBox = cvBox instanceof Promise ? await cvBox : cvBox;

  // TODO: create a promise on laoding
  // create files on cv file systems
  cv.FS.mkdir("/dnn");
  const models = [
    "./lib/model/configMobNetSSD.prototxt",
    "./lib/model/mobilenet_iter_73000.caffemodel",
    "./lib/model/object_detection_classes_pascal_voc.txt"
  ]
  models.map((model) => {
    cvDnn.loadDnn(model)
  });

  //TODO: get build information
  // console.info(cv.getBuildInformation());

  callbackFn(true);
}

function processImage({ msg, payload }) {
  // Mat from imageDate
  const src = cv.matFromImageData(payload.inputImage);
  // Get mode
  const mode = payload.mode;
  // Init boxes
  let boxes;
  // Process image
  if (mode.includes("surface")) {
    boxes = cvHough.process(src);
  }
  if (mode.includes("object")) {
    boxes = cvDnn.process(src);
  }
  // Post message and convert matToImageData
  postMessage({ msg, payload: boxes });
  // Delete source image Mat
  src.delete();
}

onmessage = function (e) {
  switch (e.data.msg) {
    case "load": {
      const scripts = [
        "./opencv.js",
        "./lib/cv.utils.js",
        "./lib/cv.dnn.js",
        "./lib/cv.hough.js",
        "./lib/cv.box.js",
      ];
      // Import scripts
      scripts.map((script) => importScripts(script));
      // Wait for promises and return message
      waitForOpenCV(function (success) {
        if (success) postMessage({ msg: e.data.msg });
        else cvUtils.printError(err);
      });
      break;
    }
    case "processImage":
      return processImage(e.data);
    default:
      break;
  }
};
