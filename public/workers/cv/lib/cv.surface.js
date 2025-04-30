function CvHough() {
  function process(src, dst) {
    if((src || dst) === undefined){
      return console.error("cvHoucall without args");
    };


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