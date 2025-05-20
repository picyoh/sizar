function CvCamShift() {
  function init(src) {
    // Set initial position
    const trackWindow = new cv.Rect(150, 60, 63, 125);

    // Set up Region of interest (ROI) for tracking
    const roi = src.roi(trackWindow);
    // Convert ROI to hsv
    const hsvRoi = new cv.Mat();
    cv.cvtColor(roi, hsvRoi, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);
    // Create mask
    const mask = new cv.Mat();
    // Create thresholds
    const lowScalar = new cv.Scalar(30, 30, 0);
    const highScalar = new cv.Scalar(180, 180, 180);
    const low = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), lowScalar);
    const high = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), highScalar);
    //
    cv.inRange(hsvRoi, low, high, mask);
    // Get ROI vector
    const roiHist = new cv.Mat();
    const hsvRoiVec = new cv.MatVector();
    hsvRoiVec.push_back(hsvRoi);
    // Calc Histogram
    cv.calcHist(hsvRoiVec, [0], mask, roiHist, [180], [0, 180]);
    // Normalize
    cv.normalize(roiHist, roiHist, 0, 255, cv.NORM_MINMAX);

    roi.delete();
    hsvRoi.delete();
    mask.delete();
    low.delete();
    high.delete();
    hsvRoiVec.delete();

    // Setup termination criteria either 10 iterations or move by 1 pt
    const termCrit = new cv.TermCriteria(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 1);

    const hsv = new cv.Mat(src.rows, src.cols, cv.CV_8UC3);
    const hsvVec = new cv.MatVector();
    hsvVec.push_back(hsv);
    const dst = new cv.Mat();
    const trackBox = null;

    // TODO: split in two functions
    
    // Convert to hsv 
    cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);
    //
    cv.calcBackProject(hsvVec, [0], roiHist, dst, [0, 180], 1);

    // Apply camshift
    [trackBox, trackWindow] = cv.CamShift(dst, trackWindow, termCrit);
    //
    const pts = cv.rotatedRectPoints(trackBox);
    cv.line(src, pts[0], pts[1], [255, 0, 0, 255], 3);
    cv.line(src, pts[1], pts[2], [255, 0, 0, 255], 3);
    cv.line(src, pts[2], pts[3], [255, 0, 0, 255], 3);
    cv.line(src, pts[3], pts[0], [255, 0, 0, 255], 3);

    const result = cvUtils.imageDataFromMat(src);

    // Draw on image

    hsv.delete();
    hsvVec.delete();
    dst.delete();


  }
  return Object.freeze({
    process,
  });
}

let cvCamshift = CvCamShift();

new Promise((resolve, reject) => {
  if (cvCamshift) resolve(cvCamshift);
  else reject(console.error("error loading cvCamshift"));
});