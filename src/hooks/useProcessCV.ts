import { RefObject, useState, useEffect } from "react";
import cv from "@/service/cv";
export default function useProcessCV(
  videoElement: RefObject<HTMLVideoElement | null>,
  outputElement: RefObject<HTMLCanvasElement | null>
) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [processing, setProcessing] = useState(false);
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
      setImageData(inputImage);
    }
  }

  useEffect(() => {
    if (!processing) {
      const processingImage = async () => {
        setProcessing(true);
        try {
          const processedImage: ImageData = await cv.processVideo(imageData);
          console.log(processedImage);
          if (processedImage.data) {
            //ctx.putImageData(processedImage.data.payload, 0, 0);
          }
        } catch (error) {
          console.error("Cannot transform image", error);
        } finally {
          setProcessing(false);
        }
      };
      processingImage();
    }
  }, [imageData, processing]);
  return imageData;
}
