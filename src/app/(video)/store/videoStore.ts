import { createRef, RefObject } from "react";
import { create } from "zustand";

interface Store {
  width: number;
  height: number;
  ratio: number;
  videoRef: RefObject<HTMLVideoElement | null>;
  inputRef: RefObject<HTMLCanvasElement | null>;
  outputRef: RefObject<HTMLCanvasElement | null>;
  cvLoaded: boolean
}

interface Action {
  setWidth: (width: Store["width"]) => void;
  setHeight: (height: Store["height"]) => void;
  setRatio: (width: Store["ratio"]) => void;
  setVideoRef: (videoRef: Store["videoRef"]) => void;
  setInputRef: (inputRef: Store["inputRef"]) => void;
  setOutputRef: (outputRef: Store["outputRef"]) => void;
  setCvLoaded: (cvLoaded: Store["cvLoaded"]) => void;
}

const useVideoStore = create<Store & Action>((set) => ({
  width: 0,
  setWidth: (width) => set(() => ({ width: width })),
  height: 0,
  setHeight: (height) => set(() => ({ height: height })),
  ratio: 0,
  setRatio: (ratio) => set(() => ({ ratio: ratio })),
  videoRef: createRef<HTMLVideoElement | null>(),
  setVideoRef: (videoRef) => set(() => ({ videoRef: videoRef })),
  inputRef: createRef<HTMLCanvasElement | null>(),
  setInputRef: (inputRef) => set(() => ({ inputRef: inputRef })),
  outputRef: createRef<HTMLCanvasElement | null>(),
  setOutputRef: (outputRef) => set(() => ({ outputRef: outputRef })),
  cvLoaded: false,
  setCvLoaded: (cvLoaded) => set(()=> ({cvLoaded: cvLoaded}))
}));

export default useVideoStore;
