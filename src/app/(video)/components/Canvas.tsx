import { useState, useEffect, useRef, useCallback } from "react";
import useVideoStore from "../store/videoStore";
import useButtonStore from "../store/buttonStore";
import { imageProcessing } from "../lib/imageProcessing";

export default function Canvas() {
  // Init canvas elements references
  const inputElement = useRef<HTMLCanvasElement>(null);
  const outputElement = useRef<HTMLCanvasElement>(null);
  const setInputRef = useVideoStore((state) => state.setInputRef);
  const setOutputRef = useVideoStore((state) => state.setOutputRef);
  // Set canvas references to store
  useEffect(() => {
    setInputRef(inputElement);
    setOutputRef(outputElement);
  }, [inputElement, outputElement, setInputRef, setOutputRef]);

  // Get Video params from store
  const videoElement = useVideoStore((state) => state.videoRef);
  const width = useVideoStore((state) => state.width);
  const height = useVideoStore((state) => state.height);
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
      //if (boxes.length > 0) setModes(["tracking"]);
      const props = {
        width,
        height,
        videoElement,
        inputElement,
        outputElement,
        modes,
      };
      const processImage = async () => {
        // get Boxes
        const result = await imageProcessing(props);
        setBoxes(result);
        setProcessing(false);
      };
      processImage();
    }
  }, [process, modes, boxes]);

  //TODO: usecallback or function ?
  const resetCanvas = useCallback(() => {
    outputElement.current?.getContext("2d")?.clearRect(0, 0, width, height);
  }, [height, width]);

  return (
    <>
      <canvas
        id="input"
        ref={inputElement}
        width={width}
        height={height}
        className="hidden"
      />
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
