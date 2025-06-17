import { createRef, RefObject } from "react";
import { create } from "zustand";

interface Store {
  videoRef: RefObject<HTMLVideoElement | null>;
  inputRef: RefObject<HTMLCanvasElement | null>;
  videoRatio: number;
  cvLoaded: boolean;
}

interface Action {
  setVideoRef: (videoRef: Store["videoRef"]) => void;
  setInputRef: (inputRef: Store["inputRef"]) => void;
  setVideoRatio: (videoRatio: Store["videoRatio"]) => void;
  setCvLoaded: (cvLoaded: Store["cvLoaded"]) => void;
}

const useInputStore = create<Store & Action>((set) => ({
  videoRef: createRef<HTMLVideoElement | null>(),
  setVideoRef: (videoRef) => set(() => ({ videoRef: videoRef })),
  inputRef: createRef<HTMLCanvasElement | null>(),
  setInputRef: (inputRef) => set(() => ({ inputRef: inputRef })),
  videoRatio: 0,
  setVideoRatio: (videoRatio) => set(()=> ({videoRatio: videoRatio})),
  cvLoaded: false,
  setCvLoaded: (cvLoaded) => set(() => ({cvLoaded: cvLoaded})),
}));

export default useInputStore;
