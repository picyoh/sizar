function CvHough() {
  function process(src) {
    const dst = new cv.Mat(src.rows, src.cols, cv.CV_8UC4);
    // Create lines Mat
    const lines = new cv.Mat();
    // Convert src rgba to gray
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    // Canny
    cv.Canny(src, src, 50, 120, 3);
    // Hough
    cv.HoughLines(src, lines, 1, Math.PI / 180, 75, 0, 0, 0, Math.PI);
    console.log(lines.rows)
    // Draw lines
    for (let i = 0; i < lines.rows; i++) {
      // Get results
      const rho = lines.data32F[i * 2];
      const theta = lines.data32F[i * 2 + 1];

      const a = Math.cos(theta);
      const b = Math.sin(theta);
      const x0 = a * rho;
      const y0 = b * rho;
      const startPoint = { x: x0 - 1000 * b, y: y0 + 1000 * a };
      const endPoint = { x: x0 + 1000 * b, y: y0 - 1000 * a };
      cv.line(dst, startPoint, endPoint, [255, 0, 0, 255]);
    }

    const result = cvUtils.imageDataFromMat(dst);

    dst.delete();
    lines.delete();
    return result;
  }
  return Object.freeze({
    process,
  });
}

let cvHough = CvHough();

new Promise((resolve, reject) => {
  if (cvHough) resolve(cvHough);
  else reject(console.error("error loading cvHough"));
});