import { createRef, RefObject } from "react";
import { create } from "zustand";

interface Store {
  buttonState: [];
  objectState: boolean;
  objectRef: RefObject<HTMLButtonElement | null>;
  surfaceState: boolean;
  surfaceRef: RefObject<HTMLButtonElement | null>;
  test: boolean;
}

interface Action {
  setButtonState: () => void;
  setObjectState: () => void;
  setObjectRef: (objectRef: Store["objectRef"]) => void;
  setSurfaceState: () => void;
  setSurfaceRef: (surfaceRef: Store["objectRef"]) => void;
  setTest: () => void;
}

const useButtonStore = create<Store & Action>((set) => ({
  buttonState: [],
  setButtonState: () => set(()=> ({})),
  objectState: false,
  setObjectState: () => set((state) => ({ objectState: !state.objectState })),
  objectRef: createRef<HTMLButtonElement | null>(),
  setObjectRef: (objectRef) => set(() => ({ objectRef: objectRef })),
  surfaceState: false,
  setSurfaceState: () =>
    set((state) => ({ surfaceState: !state.surfaceState })),
  surfaceRef: createRef<HTMLButtonElement | null>(),
  setSurfaceRef: (surfaceRef) => set(() => ({ surfaceRef: surfaceRef })),
  test: false,
  setTest: () => set((state) => ({ test: !state.test })),
}));

export default useButtonStore;
