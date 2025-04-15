import { RefObject, useState, useEffect } from "react";
import cv from "@/service/cv";

export async function loadCV() {
  try{
    await cv.load()
    .then((res) => {
      console.log(res.returnValue)
      return res.returnValue;
    });
  } catch(error) {
    console.error('No access to opencv.js', error);
  }
}

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
      const inputImage = ctx.getImageData(0, 0, width, height).data;
      const processedImage: ImageData = await cv.processVideo({
        input: inputImage,
        width: width,
        height: height,
      });
      //ctx.putImageData(processedImage.data.payload, 0, 0);
      //return false;
    }
  }
}
