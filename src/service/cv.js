class CV {
  _dispatch(event) {
    const { msg } = event;
    this._status[msg] = ["loading"];
    this.worker.postMessage(event);
    return new Promise((res, rej) => {
      let interval = setInterval(() => {
        const status = this_status[msg];
        if (status[0] === "done") res(status[1]);
        if (status[0] === "error") rej(status[1]);
        if (status[0] === "loading") {
          delete this_status[msg];
          clearInterval(interval);
        }
      }, 50);
    });
  }

  load() {
    this._status = {};
    this.worker = new Worker("/js/cv.worker.js");

    this.worker.onmessage = (e) => (this._status[e.data.msg] = ["done", e]);
    this.worker.onerror = (e) => (this._status[e.data.msg] = ["error", e]);
    return this._dispatch({ msg: "load" });
  }
}

//
const newCV = new CV();
export default newCV;
