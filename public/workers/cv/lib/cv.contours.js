function CvContours() {
    function process(src) {
        const dst = new cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
        cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
        cv.adaptiveThreshold(src, src, 10, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2);
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
        for (let i = 0; i < contours.size(); i++) {
            const color = new cv.Scalar(
                Math.round(Math.random() * 255),
                Math.round(Math.random() * 255),
                Math.round(Math.random() * 255)
            );
            cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 1);
        }

        const result = cvUtils.imageDataFromMat(dst);
        dst.delete();
       /*  contours.delete();
        hierarchy.delete(); */
        return result;
    }
    return Object.freeze({
        process,
    });
}

let cvContours = CvContours();

new Promise((resolve, reject) => {
    if (cvContours) resolve(cvContours);
    else reject(console.error("error loading cvContours"));
});