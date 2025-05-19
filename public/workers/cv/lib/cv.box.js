function CvBox() {
  // Draw boxes 
  function drawBoxes(dst, boxes, labels) {
    // Draw the saved box into the image
    let boxNum = boxes.length;

    for (let i = 0; i < boxNum; ++i) {
      const [left, top, width, height] = boxes[i].bounding;
      // Draw box
      cv.rectangle(
        dst,
        new cv.Point(left, top),
        new cv.Point(left + width, top + height),
        new cv.Scalar(0, 255, 0, 255)
      );
      // Draw label container
      cv.rectangle(
        dst,
        new cv.Point(left, top),
        new cv.Point(left + width, top + 15),
        new cv.Scalar(255, 255, 255, 255),
        cv.FILLED
      );
      // Create and put text
      const text = `${labels[boxes[i].classId]}: ${boxes[i].confidence.toFixed(2)}`;
      cv.putText(
        dst,
        text,
        new cv.Point(left, top + 10),
        cv.FONT_HERSHEY_SIMPLEX,
        0.3,
        new cv.Scalar(0, 0, 0, 255), 
      );
    }
  }

  return Object.freeze({
    drawBoxes,
  });
};

let cvBox = CvBox();

new Promise((resolve, reject) => {
  if (cvBox) resolve(cvBox);
  else reject(console.error("error loading cvBox"));
});