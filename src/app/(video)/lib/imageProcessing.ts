import { RefObject } from "react";
import cv from "@/app/(video)/service/cv";
import { drawBoxes } from "./drawBoxes";

export async function imageProcessing(
  videoElement: RefObject<HTMLVideoElement | null>,
  inputElement: RefObject<HTMLCanvasElement | null>,
  outputElement: RefObject<HTMLCanvasElement | null>,
  mode: string[]
) {
  const frame = videoElement.current;
  // Get contexts
  const inputCtx = inputElement.current?.getContext("2d", {
    willReadFrequently: true,
  });
  const outputCtx = outputElement.current?.getContext("2d", {
    willReadFrequently: true,
  });
  if (frame && inputCtx && outputCtx) {
    //Get displayed frame size
    const width = frame.clientWidth;
    const height = frame.clientHeight;
    // Draw frame to canvas
    inputCtx.drawImage(frame, 0, 0, width, height);
    // Get frame image
    const inputImage = inputCtx.getImageData(0, 0, width, height);
    // Get message from worker
    const message = await cv.processImage({ inputImage, mode });
    // Get boxes
    const boxes = message.data.payload;
    // reset Canvas
    outputCtx.clearRect(0, 0, width, height);
    if(boxes.colorSpace){
      outputCtx.putImageData(boxes, 0, 0);
    }else{
      // Draw boxes
      drawBoxes(outputCtx, boxes);
    }
  }
}
