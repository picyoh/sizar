function CvCamShift() {
  function process(src, dst) {
    if((src || dst) === undefined){
      return console.error("cvCamshift call without args");
    };


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