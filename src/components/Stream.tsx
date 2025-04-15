"use client";

import { useState, useRef, useEffect } from "react";
import useResizeObserver from "@/hooks/useResizeObserver";
import useVideoStream from "@/hooks/useVideoStream";
import { loadCV, processCV } from "@/lib/processCV";

export default function Stream() {
  //TODO: resizeObserver trigger when resizing window ?
  const [videoElement, rect] = useResizeObserver();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const stream = useVideoStream();
  const outputElement = useRef<HTMLCanvasElement>(null);

  // Get camera stream
  useEffect(() => {
    if (stream !== null && videoElement.current)
      videoElement.current.srcObject = stream;
  }, [videoElement, stream]);

  // Adjust video and canvas sizes
  useEffect(() => {
    // Set width on Canvas and Video elements
    if (window) {
      setWidth(window.innerWidth);
    }
    // Set height on Canvas and Video elements
    if (videoElement !== null && rect !== undefined) {
      setHeight(rect.height);
    }
  }, [videoElement, rect]);

  // Load OpenCV worker
  useEffect(() => {}, [loaded]);

  // Trigger openCV
  useEffect(() => {
    if (loaded && !isProcessing) {
      //processCV(videoElement, outputElement);
      setProcessing(true);
    }
  }, [loaded, isProcessing, videoElement, outputElement]);

  return (
    <div>
      <video id="camera" width={width} ref={videoElement} autoPlay={true} />
      <canvas
        id="output"
        ref={outputElement}
        width={width}
        height={height}
        className="absolute top-0 left-0"
      />
    </div>
  );
}
