import { createRef, RefObject } from "react";
import { create } from "zustand";

//TODO: remove tracking and replace by boxes.length > 0

interface Store {
  modes: string[];
  boxes : string[],
  tracking: string[];
}

interface Action {
  setModes: (modes: Store["modes"]) => void;
  setBoxes: (boxes: Store["boxes"]) => void;
  setTracking: (tracking: Store["tracking"]) => void;
}

const useButtonStore = create<Store & Action>((set) => ({
  modes: [],
  setModes: (modes) => set(() => ({ modes: modes })),
  boxes: [],
  setBoxes: (boxes) => set(()=> ({ boxes : boxes})),
  tracking: [],
  setTracking: (tracking) => set(()=> ({ tracking: tracking})),
}));

export default useButtonStore;
