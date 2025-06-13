import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import useInputStore from "../store/inputStore";
import useButtonStore from "../store/outputStore";
import { imageProcessing } from "../lib/imageProcessing";
import useClickOutside from "../hooks/useClickOutside";
import { useClientWidth } from "../hooks/useClientWidth";

export default function Canvas() {

  // Store output canvas DOM reference
  const outputElement = useRef<HTMLCanvasElement>(null);
  const setOutputRef = useInputStore((state) => state.setOutputRef);
  useEffect(() => {
    setOutputRef(outputElement);
  }, [outputElement, setOutputRef]);

  // Get Elements from  input store
  const videoElement = useInputStore((state) => state.videoRef);
  const inputElement = useInputStore((state) => state.inputRef);
  const videoRatio = useInputStore((state) => state.videoRatio);
  // Get canvas sizes
  const clientWidth = useClientWidth();
  const width = clientWidth;
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if(videoRatio > 0 && videoRatio !== null){
      setHeight(clientWidth / videoRatio)
    }
  }, [videoRatio]);

  // Get clicks
  const handleClick = (e: Event) => {
    console.log(`target: ${e.target}`);
  };
  
  useClickOutside(outputElement, handleClick);
  
  // Get modes from store
  const modes = useButtonStore((state) => state.modes);
  const setModes = useButtonStore((state) => state.setModes);

  // Init process params
  const [processing, setProcessing] = useState(false);
  const boxes = useButtonStore((state) => state.boxes);
  const setBoxes = useButtonStore((state) => state.setBoxes);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // Process image
  useEffect(() => {
    if (modes.length === 0) {
      resetCanvas();
    }
    if (modes.length > 0 && !processing) {
      if (modes.includes("select")) return;
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
          if (result.boxes !== undefined) {
            setBoxes(result.boxes);
          }
          setProcessing(false);
        }
      };
      processImage();
    }
  }, [process, modes, boxes]);

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
      />
    </>
  );
}
