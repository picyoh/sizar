import { RefObject } from "react";
import cv from "@/app/(video)/service/cv";

export async function imageProcessing(
  videoElement: RefObject<HTMLVideoElement | null>,
  inputElement: RefObject<HTMLCanvasElement | null>,
  outputElement: RefObject<HTMLCanvasElement | null>,
  mode: string[]
) {
  const video = videoElement.current;
  // Get contexts
  const inputCtx = inputElement.current?.getContext("2d", {
    willReadFrequently: true,
  });
  const outputCtx = outputElement.current?.getContext("2d", {
    willReadFrequently: true,
  });
  if (video && inputCtx && outputCtx) {
    //Get displayed video size
    const width = video.clientWidth;
    const height = video.clientHeight;
    // Draw video to canvas
    inputCtx.drawImage(video, 0, 0, width, height);
    console.log(mode)
    // Get video stream image
    const inputImage = inputCtx.getImageData(0, 0, width, height);
    const processedImage = await cv.processImage({inputImage, mode});
    console.log(mode)
    outputCtx.putImageData(processedImage.data.payload, 0, 0);
  }
}
