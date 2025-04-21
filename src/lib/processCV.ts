import { RefObject } from "react";
import cv from "@/service/cv";

export async function processCV(
  videoElement: RefObject<HTMLVideoElement | null>,
  inputElement: RefObject<HTMLCanvasElement | null>,
  outputElement: RefObject<HTMLCanvasElement | null>,
  width: number,
  height: number
) {
  if (videoElement.current && outputElement.current && inputElement.current) {
    // Get context
    const inputCtx = inputElement.current.getContext("2d", {
      willReadFrequently: true,
    });
    const outputCtx = outputElement.current.getContext("2d", {
      willReadFrequently: true,
    });
    if (inputCtx && outputCtx) {
      // Draw video to canvas
      inputCtx.drawImage(videoElement.current, 0, 0, width, height);
      // Get video stream image
      const inputImage = inputCtx.getImageData(0, 0, width, height);
      const processedImage = await cv.processVideo(inputImage);
      outputCtx.putImageData(processedImage.data.payload, 0, 0);
    }
  }
}

add edge and contours
add blur, canny, closing (dilate + erode) and contours on worker