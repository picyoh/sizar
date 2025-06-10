async function waitForOpenCV(callbackFn) {
  // TODO: implement module on worker
  // Load scripts
  cv = cv instanceof Promise ? await cv : cv;
  cvUtils = cvUtils instanceof Promise ? await cvUtils : cvUtils;
  cvDnn = cvDnn instanceof Promise ? await cvDnn : cvDnn;
  cvBox = cvBox instanceof Promise ? await cvBox : cvBox;
  cvContours = cvContours instanceof Promise ? await cvContours : cvContours;
  cvCamshift = cvCamshift instanceof Promise ? await cvCamshift : cvCamshift;

  // create files on cv file systems
  cv.FS.mkdir("/dnn");
  const models = [
    "./lib/model/configMobNetSSD.prototxt",
    "./lib/model/mobilenet_iter_73000.caffemodel",
    "./lib/model/object_detection_classes_modif.json"
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
  const modes = payload.modes;
  // Init boxes
  let boxes;
  let image;
  // Loop on modes
  for (let i = 0; i < modes.length; i++) {
    // Process image
    switch (modes[i]) {
      case "select":
        boxes = cvCamshift.init(src);
        break;
      case "tracking":
        result = cvCamshift.process(src, payload.boxes);
        boxes = result.boxes;
        image = result.image;
        break;
      case "object":
        console.log(modes[i])
        boxes = cvDnn.process(src);
        break;
      case "surface":
        boxes = cvContours.process(src);
        break;
      default:
        console.error("wrong mode");
        break;
    }
  }
  //TODO: remove logs
  //console.log(boxes)

  // Post message and convert matToImageData
  postMessage({ msg, payload: {boxes: boxes, image: image}});
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
        "./lib/cv.contours.js",
        "./lib/cv.camshift.js",
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
