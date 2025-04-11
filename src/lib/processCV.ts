import { RefObject } from "react";
import cv from "@/service/cv";

export default async function processCV(
  videoElement: RefObject<HTMLVideoElement | null>,
  canvasElement: RefObject<HTMLCanvasElement | null>
) {
  if (videoElement.current && canvasElement.current) {
    // Get context
    const ctx = canvasElement.current.getContext("2d");
    // Get size params
    const width = videoElement.current.clientWidth;
    const height = videoElement.current.clientHeight;
    if (ctx) {
      // Draw video to canvas
      ctx.drawImage(videoElement.current, 0, 0, width, height);
      // Get canvas image
      const image = ctx.getImageData(0, 0, width, height);
      await cv.load();
      const processedImage = await cv.imageProcessing(image);
      console.log(processedImage)
      ctx.putImageData(processedImage.data.payload, 0, 0);
      //return false;
    }
  }
}
