import { createRef, RefObject } from "react";
import { create } from "zustand";

interface Store {

  videoRef: RefObject<HTMLVideoElement | null>;
  inputRef: RefObject<HTMLCanvasElement | null>;
  outputRef: RefObject<HTMLCanvasElement | null>;
  videoReady: boolean;
  videoRatio: number;
  cvLoaded: boolean;
}

interface Action {
  
  setVideoRef: (videoRef: Store["videoRef"]) => void;
  setInputRef: (inputRef: Store["inputRef"]) => void;
  setOutputRef: (outputRef: Store["outputRef"]) => void;
  setVideoReady: (videoReady: Store["videoReady"]) => void;
  setVideoRatio: (videoRatio: Store["videoRatio"]) => void;
  setCvLoaded: (cvLoaded: Store["cvLoaded"]) => void;
}

const useInputStore = create<Store & Action>((set) => ({
  videoRef: createRef<HTMLVideoElement | null>(),
  setVideoRef: (videoRef) => set(() => ({ videoRef: videoRef })),
  inputRef: createRef<HTMLCanvasElement | null>(),
  setInputRef: (inputRef) => set(() => ({ inputRef: inputRef })),
  outputRef: createRef<HTMLCanvasElement | null>(),
  setOutputRef: (outputRef) => set(() => ({ outputRef: outputRef })),
  videoReady: false,
  setVideoReady: (videoReady) => set(()=> ({videoReady: videoReady})),
  videoRatio: 0,
  setVideoRatio: (videoRatio) => set(()=> ({videoRatio: videoRatio})),
  cvLoaded: false,
  setCvLoaded: (cvLoaded) => set(() => ({cvLoaded: cvLoaded})),
}));

export default useInputStore;
