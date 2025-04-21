export const cvContours = () =>{
    // Create contour Vector matrix
  const contours = new cv.MatVector();
  // Create hiearchy matrix
  const hierarchy = new cv.Mat();
  // Find Contours
  cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
  //TODO: loop through contours (loop + fn)
  // Get first contour
  const cnt = contours.get(0);
  console.log(contours)
  // Draw rectangle
  const rect = cv.boundingRect(cnt);
  const rectangleColor = new cv.Scalar(255, 0 ,0);
  const point1 = new cv.Point(rect.x, rect.y);
  const point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
  cv.rectangle(dst, point1, point2, rectangleColor, 2, cv.LINE_AA, 0);
  // draw contour
  const contoursColor = new cv.Scalar(255,255,255);
  cv.drawContours(dst, contours, 0, contoursColor, 1, 8, hierarchy, 100);
    //contours.delete(); hierarchy.delete(); cnt.delete();
}

export const cvConvertTo = () =>{
    // Compute values to convert src mat
  const depth = src.type() % 8;
  const scale = depth <= cv.CV_8S ? 1.0 : depth <= cv.CV_32S ? 1.0 /256.0 : 255.0;
  const shift = depth === cv.CV_8S || depth === cv.CV_16S ? 128.0 : 0.0;
  // Convert src to 8 Bit Unsigned Int 
  src.convertTo(dst, cv.CV_8U, scale, shift);
}