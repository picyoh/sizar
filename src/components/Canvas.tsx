import { useState, useEffect, useRef, useCallback } from "react";
import useVideoStore from "@/store/videoStore";
import { imageProcessing } from "@/lib/imageProcessing";
import useButtonStore from "@/store/buttonStore";

export default function Canvas() {
  // Canvas elements
  const inputElement = useRef<HTMLCanvasElement>(null);
  const outputElement = useRef<HTMLCanvasElement>(null);
// Actions from store
    const setInputRef = useVideoStore((state) => state.setInputRef);
    const setOutputRef = useVideoStore((state) => state.setOutputRef);
  
  // Video element
  const videoElement = useVideoStore((state)=> state.videoRef);
  // Video sizes
  const width = useVideoStore((state) => state.width);
  const height = useVideoStore((state) => state.height);

  // Processing trigger
  const [processing, setProcessing] = useState(false);
  const buttonState = useButtonStore((state)=> state.buttonState);

  const resetCanvas = useCallback(() => {
    outputElement.current?.getContext("2d")?.clearRect(0, 0, width, height);
  }, [height, width])

  // Set references to store
  useEffect(() => {
    setInputRef(inputElement);
    setOutputRef(outputElement);
  }, [inputElement, outputElement, setInputRef, setOutputRef]);

  // Trigger OpenCV transformation
  useEffect(() => {
    if (buttonState.length === 0) return resetCanvas;
    if (buttonState && !processing) {
      setProcessing(true);
      const processingImage = async () => {
        try {
          await imageProcessing(
            videoElement,
            inputElement,
            outputElement,
            buttonState
          );
        } catch (error) {
          console.error("Cannot transform image", error);
        } finally {
          setProcessing(false);
        }
      };
      processingImage();
    }
      
  }, [
    processing,
    buttonState,
    videoElement,
    inputElement,
    outputElement,
    resetCanvas
  ]);

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
