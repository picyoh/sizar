import { RefObject, useEffect } from "react";
import useOutputStore from "../store/outputStore";
import getSelectBox from "../lib/getSelectBox";
import { drawBoxes } from "../lib/drawBoxes";

export default function useSelectEvent(
  ref: RefObject<HTMLCanvasElement | null>
) {
  // TODO: handle TouchEvent

  // Get select elements from output store
  const modes = useOutputStore((state) => state.modes);
  const setModes = useOutputStore((state) => state.setModes);

  const selectStart = useOutputStore((state) => state.selectStart);
  const setSelectStart = useOutputStore((state) => state.setSelectStart);
  const selectEnd = useOutputStore((state) => state.selectEnd);
  const setSelectEnd = useOutputStore((state) => state.setSelectEnd);
  const selectBox = useOutputStore((state) => state.selectBox);
  const setSelectBox = useOutputStore((state) => state.setSelectBox);

  // Handle Events
  const handleSelectEvent = (event: MouseEvent) => {
    if (event.type === "mousedown") {
      //TODO: console.log to error handling
      //console.log(`start: x: ${event.clientX}, y: ${event.clientY}`);
      setSelectStart({ x: event.clientX, y: event.clientY });
    }
    if (event.type === "mouseup") {
      //console.log(`end: x: ${event.clientX}, y: ${event.clientY}`);
      setSelectEnd({ x: event.clientX, y: event.clientY });
    }
  };

  // Listen to Events
  useEffect(() => {
    if (modes.includes("select")) {
      const listener = (event: MouseEvent) => {
        if (!ref.current) return;
        handleSelectEvent(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("mouseup", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("mouseup", listener);
      };
    }
  }, [ref, handleSelectEvent, modes]);

  // Create select boxes
  useEffect(() => {
    const outputCtx = ref.current?.getContext("2d", {
      willReadFrequently: true,
    });
    if (selectStart.x > 0 && selectEnd.x > 0 && outputCtx!) {
      const newSelectBox = getSelectBox(selectStart, selectEnd);
      setSelectBox(newSelectBox);
      drawBoxes(outputCtx, newSelectBox);
    }
  }, [selectStart, selectEnd]);
}
