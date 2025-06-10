import { useState, useEffect, useRef, useCallback } from "react";
import useVideoStore from "../store/videoStore";
import useButtonStore from "../store/buttonStore";
import { imageProcessing } from "../lib/imageProcessing";

export default function Canvas() {
  // Init canvas elements references
  const outputElement = useRef<HTMLCanvasElement>(null);
  const setOutputRef = useVideoStore((state) => state.setOutputRef);
  // Set output canvas references to store
  useEffect(() => {
    setOutputRef(outputElement);
  }, [outputElement, setOutputRef]);

  // Get Video params from store
  const videoElement = useVideoStore((state) => state.videoRef);
  const width = videoElement.current?.offsetWidth;
  const height = videoElement.current?.offsetHeight;
  // Get input canvas element
  const inputElement = useVideoStore((state) => state.inputRef);

  // Get modes from store
  const modes = useButtonStore((state) => state.modes);
  const setModes = useButtonStore((state) => state.setModes);

  // Init process params
  const [processing, setProcessing] = useState(false);
  const tracking = useButtonStore((state) => state.tracking);
  const setTracking = useButtonStore((state) => state.setTracking);
  const boxes = useButtonStore((state) => state.boxes);
  const setBoxes = useButtonStore((state) => state.setBoxes);
  // Process image
  useEffect(() => {
    if (modes.length === 0) {
      resetCanvas();
    }
    if (modes.length > 0 && !processing) {
      // Set process
      setProcessing(true);
      // Set props
      if (boxes.length > 0) setModes(["tracking"]);
      const frame = videoElement.current;
      const processImage = async () => {
        if (frame !== null) {
          // get Boxes
          const result = await imageProcessing(
            frame,
            inputElement,
            outputElement,
            modes,
            boxes
          );
          console.log(result);
          if (result.boxes !== undefined) {
            setBoxes(result.boxes);
          }
          setProcessing(false);
        }
      };
      processImage();
    }
  }, [process, modes, boxes]);

  function onMouseDownHandler(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    console.log(`MouseDown x: ${e.clientX}, y:${e.clientY}`);
  }

  function onMouseUpHandler(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    console.log(`MouseUp x: ${e.clientX}, y:${e.clientY}`);
  }

  //TODO: usecallback or function ?
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
        onMouseDown={(event) => onMouseDownHandler(event)}
        onMouseUp={(event) => onMouseUpHandler(event)}
      />
    </>
  );
}
