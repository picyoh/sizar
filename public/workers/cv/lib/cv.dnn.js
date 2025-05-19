function CvDnn() {

  // Load Dnn File
  function loadDnn(url) {
    // Fetch file
    fetch(url).then((response) => {
      // Get file name
      const split = url.split("/");
      const fileName = split[split.length - 1];
      // Get array buffer
      response.arrayBuffer().then(
        (arrayBuffer) => {
          // Create file on cv file system
          const data = new Uint8Array(arrayBuffer);
          cv.FS.createDataFile('/dnn', fileName, data, true, false, false);
          //console.info(cv.FS.readdir("/dnn"));
        })
    });
  }

  // Read Dnn result and extract boxes
  function getBoxesFromSSD(result, confThreshold, srcWidth, srcHeight, labels) {
    let boxes = [];
    // Result to float
    const resultData = result.data32F;
    // Vector params
    const vectNum = result.matSize[2];
    const vecLength = 7;

    for (let i = 0; i < vectNum; i++) {
      // Get a vector
      const vector = resultData.slice(i * vecLength, (i + 1) * vecLength);
      // Get confidence
      let confidence = vector[2];
      if (confidence > confThreshold) {
        // Get approx positions
        const left = Math.round(vector[3] * srcWidth);
        const top = Math.round(vector[4] * srcHeight);
        const right = Math.round(vector[5] * srcWidth);
        const bottom = Math.round(vector[6] * srcHeight);
        // Deduct sizes
        const width = right - left;
        const height = bottom - top;
        // Push box
        boxes.push({
          type: "object",
          classId: labels[vector[1] - 1],
          confidence: confidence,
          bounding: [left, top, width, height],
        });
      }
    }
    return boxes;
  }

  function process(src) {
    console.info("process dnn");
    // TODO: get files in dnn dir wth .ext
    const configPath = "/dnn/configMobNetSSD.prototxt";
    const modelPath = "/dnn/mobilenet_iter_73000.caffemodel";

    // Read recognition labels from file
    const file = cv.FS.readFile("/dnn/object_detection_classes_pascal_voc.txt", { encoding: "utf8" });
    const labels = file.split("\n").filter((element) => element !== "");
    
    // Model params for blob
    const inputSize = [300, 300];
    const mean = [127.5, 127.5, 127.5];
    const std = 0.007843;
    const swapRB = false;
    // Create blob
    const input = cvUtils.getBlobFromImage(src, inputSize, mean, std, swapRB);
    //console.log(input)
    console.info("readNetwork")
    
    // Set network input
    const net = cv.readNet(configPath, modelPath);
    net.setInput(input);
    // Set start time
    const start = performance.now();
    // Pass it to network 
    const result = net.forward();
    // Get process time
    const time = performance.now() - start;
    console.info(`Time : ${Math.round(time) / 1000} seconds`)
    
    // Boxes Params
    const width = src.matSize[1];
    const height = src.matSize[0];
    const confThreshold = 0.5;
    // Process result
    const boxes = getBoxesFromSSD(result, confThreshold, width, height, labels);

    input.delete();
    net.delete();
    result.delete();
    return boxes;
  }

  return Object.freeze({
    loadDnn,
    process,
  });
}

let cvDnn = CvDnn();

new Promise((resolve, reject) => {
  if (cvDnn) resolve(cvDnn);
  else reject(console.error("error loading cvDnn"));
});
