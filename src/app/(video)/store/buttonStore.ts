import { createRef, RefObject } from "react";
import { create } from "zustand";

interface Store {
  buttonState: string[];
  selectRef: RefObject<HTMLButtonElement | null>;
  objectRef: RefObject<HTMLButtonElement | null>;
  surfaceRef: RefObject<HTMLButtonElement | null>;
}

interface Action {
  setButtonState: (buttonState: Store["buttonState"]) => void;
  setSelectRef: (objectRef: Store["objectRef"]) => void;
  setObjectRef: (objectRef: Store["objectRef"]) => void;
  setSurfaceRef: (surfaceRef: Store["objectRef"]) => void;
}

const useButtonStore = create<Store & Action>((set) => ({
  buttonState: [],
  setButtonState: (buttonState) => set(() => ({ buttonState: buttonState })),
  selectRef: createRef<HTMLButtonElement | null>(),
  setSelectRef: (selectRef) => set(() => ({ selectRef: selectRef })),
  objectRef: createRef<HTMLButtonElement | null>(),
  setObjectRef: (objectRef) => set(() => ({ objectRef: objectRef })),
  surfaceRef: createRef<HTMLButtonElement | null>(),
  setSurfaceRef: (surfaceRef) => set(() => ({ surfaceRef: surfaceRef })),
}));

export default useButtonStore;
