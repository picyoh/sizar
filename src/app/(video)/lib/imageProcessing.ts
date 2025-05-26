import { RefObject } from "react";
import cv from "@/app/(video)/service/cv";
import { drawBoxes } from "./drawBoxes";

interface Props {
  width: number;
  height: number;
  videoElement: RefObject<HTMLVideoElement | null>;
  inputElement: RefObject<HTMLCanvasElement | null>;
  outputElement: RefObject<HTMLCanvasElement | null>;
  modes: string[];
}

export async function imageProcessing({
  width,
  height,
  videoElement,
  inputElement,
  outputElement,
  modes,
}: Props) {

  const frame = videoElement.current;
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
    // Get response from worker
    const response = await cv.processImage({ inputImage, modes });
    // Get boxes
    const boxes = response.data.payload;
    
    //TODO: remove logs
    //console.log(response);
    
    // reset Canvas
    outputCtx.clearRect(0, 0, width, height);
    // TODO: remove put image after tests
    if (boxes.colorSpace) {
      outputCtx.putImageData(boxes, 0, 0);
    } else {
      // Draw boxes
      drawBoxes(outputCtx, boxes);
      return boxes;
    }
  }
}
