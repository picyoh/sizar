import { create } from "zustand";

type Select = {
  selectStart: { x: number; y: number };
  selectEnd: { x: number; y: number };
  selectBox: Array<Box>;
};

type Boxes = {
  modes: string[];
  objectBoxes: string[];
  surfaceBoxes: string[];
};

type Actions = {
  setModes: (id: string) => void;
  resetModes: () => void;
  setSelectStart: (selectStart: Select["selectStart"]) => void;
  setSelectEnd: (selectEnd: Select["selectEnd"]) => void;
  setSelectBox: (tracking: Select["selectBox"]) => void;
  resetSelect: () => void;
  setObjectBoxes: (tracking: Boxes["objectBoxes"]) => void;
  setSurfaceBoxes: (tracking: Boxes["surfaceBoxes"]) => void;
};

const initialSelectPoint: Select = {
  selectStart: { x: 0, y: 0 },
  selectEnd: { x: 0, y: 0 },
  selectBox: [],
};

const initialBoxes: Boxes = {
  modes: [],
  objectBoxes: [],
  surfaceBoxes: [],
};

const useOutputStore = create<Select & Boxes & Actions>((set) => ({
  ...initialSelectPoint,
  setSelectStart: (selectStart) => set(() => ({ selectStart: selectStart })),
  setSelectEnd: (selectEnd) => set(() => ({ selectEnd: selectEnd })),
  setSelectBox: (selectBox) => set(() => ({ selectBox: selectBox })),
  resetSelect: () => set(initialSelectPoint),
  ...initialBoxes,
  setModes: (id: string) =>
    set((state) => ({
      modes: [...state.modes].includes(id)
        ? [...state.modes.filter((element) => element !== id)]
        : [...state.modes, id],
    })),
  resetModes: () => set({ modes: [] }),
  setObjectBoxes: (objectBoxes) => set(() => ({ objectBoxes: objectBoxes })),
  setSurfaceBoxes: (surfaceBoxes) =>
    set(() => ({ surfaceBoxes: surfaceBoxes })),
}));

export default useOutputStore;
