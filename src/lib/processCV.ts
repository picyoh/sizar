import { RefObject } from "react";
import cv from "@/service/cv";

export async function processCV(
  videoElement: RefObject<HTMLVideoElement | null>,
  outputElement: RefObject<HTMLCanvasElement | null>
) {
  if (videoElement.current && outputElement.current) {
    // Get context
    const ctx = outputElement.current.getContext("2d");
    // Get size params
    const width = videoElement.current.clientWidth;
    const height = videoElement.current.clientHeight;
    if (ctx) {
      // Draw video to canvas
      ctx.drawImage(videoElement.current, 0, 0, width, height);
      // Get video stream image
      const inputImage = ctx.getImageData(0, 0, width, height);
      const processedImage = await cv.processVideo(inputImage);
      console.log(processedImage.data.payload);
      ctx.putImageData(processedImage.data.payload, 0, 0);
      //return false;
    }
  }
}
