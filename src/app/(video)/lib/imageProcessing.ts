import { RefObject } from "react";
import cv from "@/app/(video)/service/cv";
import { drawBoxes } from "./drawBoxes";

export async function imageProcessing(
  frame: HTMLVideoElement,
  inputElement: RefObject<HTMLCanvasElement | null>,
  outputElement: RefObject<HTMLCanvasElement | null>,
  modes: string[],
  boxes : string[]
) {

  const width = frame.offsetWidth;
  const height = frame.offsetHeight;
  // Get contexts
  const inputCtx = inputElement.current?.getContext("2d", {
    willReadFrequently: true,
  });
  const outputCtx = outputElement.current?.getContext("2d", {
    willReadFrequently: true,
  });

  if (frame && inputCtx && outputCtx) {
    // Draw frame to canvas
    inputCtx.drawImage(frame, 0, 0, width, height);
    // Get frame image
    const inputImage = inputCtx.getImageData(0, 0, width, height);
    // TODO: Put a loading box before processing
    //drawBoxes(outputCtx, "loading");
    // Get response from worker
    const response = await cv.processImage({ inputImage, modes, boxes});
    // Get boxes
    const result = response.data.payload;
    
    //TODO: remove logs
    //console.log(response);
    console.log(modes)
    // reset Canvas
    outputCtx.clearRect(0, 0, width, height);
    // TODO: remove put image after tests
    if (result.image?.colorSpace) {
      outputCtx.putImageData(result.image, 0, 0);
      return result;
    } else {
      // Draw boxes
      drawBoxes(outputCtx, result.boxes);
      return result;
    }
  }
}
