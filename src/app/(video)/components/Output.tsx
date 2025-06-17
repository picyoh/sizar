import { useState, useEffect, useRef, useCallback } from "react";
import useInputStore from "../store/inputStore";
import useOutputStore from "../store/outputStore";
import useClientWidth from "../hooks/useClientWidth";
import useSelectEvent from "../hooks/useSelectEvent";
import { imageProcessing } from "../lib/imageProcessing";

export default function Canvas() {
  const outputElement = useRef<HTMLCanvasElement>(null);
  // Get elements from input store
  const videoElement = useInputStore((state) => state.videoRef);
  const inputElement = useInputStore((state) => state.inputRef);
  const videoRatio = useInputStore((state) => state.videoRatio);
  // Get canvas sizes
  const clientWidth = useClientWidth();
  const width = clientWidth;
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (videoRatio > 0 && videoRatio !== null) {
      setHeight(clientWidth / videoRatio);
    }
  }, [videoRatio]);

  // Get modes from output store
  const modes = useOutputStore((state) => state.modes);
  const setModes = useOutputStore((state) => state.setModes);
  const resetModes = useOutputStore((state) => state.resetModes);

  // Get boxes from output store
  const selectBox = useOutputStore((state) => state.selectBox);
  const resetSelect = useOutputStore((state) => state.resetSelect);
  const objectBoxes = useOutputStore((state) => state.objectBoxes);
  const setObjectBoxes = useOutputStore((state) => state.setObjectBoxes);
  const surfaceBoxes = useOutputStore((state) => state.surfaceBoxes);

  // Listen to select Events
  useSelectEvent(outputElement);

  // Init process params
  const [processing, setProcessing] = useState(false);
  // Process image
  useEffect(() => {
    if (modes.length > 0 && !processing) {
      // Exclude until selection
      if (modes.includes("select") && selectBox.length !== 1) return;
      // Set process
      setProcessing(true);
      // Set props
      const frame = videoElement.current;
      const processImage = async () => {
        if (frame !== null) {
          // get Boxes
          const result = await imageProcessing(
            frame,
            inputElement,
            outputElement,
            modes,
            selectBox,
            objectBoxes
          );
          if (result.boxes !== undefined) {
            // set result to tracked object
            setObjectBoxes(result.boxes);
            if (modes.includes("select")) {
              // init select box
              resetSelect();
            }
            console.log(modes);
            // reset modes
            resetModes();
            setModes("tracking");
          }
          setProcessing(false);
        }
      };
      processImage();
    }
  }, [process, modes, selectBox, objectBoxes]);

  //TODO: usecallback or function ?
  // TODO: activate when empty modes
  const resetCanvas = useCallback(() => {
    // get window width & height
    let winWidth = 0;
    let winHeight = 0;
    if (width !== undefined) winWidth = width;
    if (height !== undefined) winHeight = height;
    outputElement.current
      ?.getContext("2d")
      ?.clearRect(0, 0, winWidth, winHeight);
  }, [height, width]);

  return (
    <>
      <canvas
        id="output"
        ref={outputElement}
        width={width}
        height={height}
        className="absolute top-0 left-0"
      />
    </>
  );
}
