function CvCamShift() {

  let roiHists = [];
  let trackWindow;
  let roiHist;
  let termCrit;

  function init(src, boxes) {
    console.log(src, boxes)
    if (boxes[0] === undefined) {
      //TODO: select on screen
      // Mock up
      boxes = [{
        id: "object_0",
        type: "select",
        label: "selected",
        avgHeight: 850,
        confidence: 0.8,
        bounding: [310, 315, 202, 242],
      }];
    }
    /*     for (let i = 0; i < boxes.length; i++) {
          const [left, top, width, height] = boxes[i].bounding; */
    const [left, top, width, height] = boxes[0].bounding;
    // Set initial position
    //const trackWindow = new cv.Rect(left, top, width, height)
    
    trackWindow = new cv.Rect(left, top, width, height);
    // Convert to
    
    // Median Blur
    cv.medianBlur(src, src, 5); 

    // Set up Region of interest (ROI) for tracking
    const roi = src.roi(trackWindow);
    // Convert ROI to hsv
    const hsvRoi = new cv.Mat();
    cv.cvtColor(roi, hsvRoi, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);
    // Create mask
    const mask = new cv.Mat();
    // Create thresholds
    const lowScalar = new cv.Scalar(20, 20, 0);
    const highScalar = new cv.Scalar(60, 60, 60);
    const low = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), lowScalar);
    const high = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), highScalar);
    //
    cv.inRange(hsvRoi, low, high, mask);
    // Get ROI vector
    //const roiHist = new cv.Mat();
    roiHist = new cv.Mat();

    const hsvRoiVec = new cv.MatVector();
    hsvRoiVec.push_back(hsvRoi);
    // Calc Histogram
    cv.calcHist(hsvRoiVec, [0], mask, roiHist, [180], [0, 180]);
    // Normalize
    cv.normalize(roiHist, roiHist, 0, 255, cv.NORM_MINMAX);

    /*       roiHists.push({
            "id": boxes[i].id,
            "trackWindow": trackWindow,
            "roiHist": roiHist
          });
    
          console.log(roiHists) */
    // Setup termination criteria either 10 iterations or move by 1 pt
    termCrit = new cv.TermCriteria(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 1);

    roi.delete();
    hsvRoi.delete();
    mask.delete();
    low.delete();
    high.delete();
    hsvRoiVec.delete();
    //}
    return boxes;
  }

  function process(src, boxes) {
    console.log(src, boxes);

    // Create hsv Mat and Vector
    const hsv = new cv.Mat(src.rows, src.cols, cv.CV_8UC3);
    const hsvVec = new cv.MatVector();
    hsvVec.push_back(hsv);
    // Create destination
    const dst = new cv.Mat();
    // init track box 
    let trackBox = null;
    // Convert to hsv 
    cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);
    // calculate back projection
    cv.calcBackProject(hsvVec, [0], roiHist, dst, [0, 180], 1);

    // Apply camshift
    [trackBox, trackWindow] = cv.CamShift(dst, trackWindow, termCrit);
    // Extract points and draw

    const pts = cv.rotatedRectPoints(trackBox);

    // Draw it on image
    cv.line(dst, pts[0], pts[1], [255, 0, 0, 255], 3);
    cv.line(dst, pts[1], pts[2], [255, 0, 0, 255], 3);
    cv.line(dst, pts[2], pts[3], [255, 0, 0, 255], 3);
    cv.line(dst, pts[3], pts[0], [255, 0, 0, 255], 3);

    const image = cvUtils.imageDataFromMat(dst);

    hsv.delete();
    hsvVec.delete();
    dst.delete();

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    for (let i = 0; i < pts.length; i++) {
      minX > pts[i].x ? minX = pts[i].x : minX;
      maxX < pts[i].x ? maxX = pts[i].x : maxX;
      minY > pts[i].y ? minY = pts[i].y : minY;
      maxY < pts[i].y ? maxY = pts[i].y : maxY;
    }
    const x = Math.round(minX);
    const y = Math.round(minY);
    const width = Math.round(maxX) - x;
    const height = Math.round(maxY) - y;
    boxes[0].bounding = [x, y, width, height];
  return {boxes : boxes, image: image};
  }

  return Object.freeze({
    init,
    process,
  });
}

let cvCamshift = CvCamShift();

new Promise((resolve, reject) => {
  if (cvCamshift) resolve(cvCamshift);
  else reject(console.error("error loading cvCamshift"));
});