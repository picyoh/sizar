function CvHaar() {
  function process(src, dst) {
    if((src || dst) === undefined){
      return console.error("cvHaar call without args");
    };

  }
  // return immutable object
  return Object.freeze({
    process,
  });
}

let cvHaar = CvHaar();

new Promise((resolve, reject) => {
  if (cvHaar) resolve(cvHaar);
  else reject(console.error("error loading cvHaar"));
});