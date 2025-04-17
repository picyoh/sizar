"use client";

import { useState, useRef, useEffect } from "react";
import useResizeObserver from "@/hooks/useResizeObserver";
import useVideoStream from "@/hooks/useVideoStream";
import useLoadCV from "@/hooks/useLoadOCV";
import { processCV } from "@/lib/processCV";

export default function Stream() {
  //TODO: resizeObserver trigger when resizing window ?
  // Canvas element
  const outputElement = useRef<HTMLCanvasElement>(null);
  // Video element and its sizes
  const [videoElement, rect] = useResizeObserver();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  // Video stream from camera
  const {stream, ratio} = useVideoStream();
  // OpenCV loading state
  const loaded = useLoadCV();
  // Init Ready state
  const [ready, setReady] = useState(false)

  // Get camera stream
  useEffect(() => {
    if (stream !== null && videoElement.current)
      videoElement.current.srcObject = stream;
  }, [videoElement, stream]);

  // Adjust video and canvas sizes
  useEffect(() => {
    // Set width on Canvas and Video elements
    if (window) setWidth(window.innerWidth);
    // Set height on Canvas and Video elements
    if (videoElement !== null && rect !== undefined) setHeight(rect.height);
  }, [videoElement, rect]);

  // set Ready
  useEffect(()=>{
    if(ratio && loaded && ratio * height === width) setReady(true);
    console.log(ratio * height, width, loaded, ready)
  }, [ratio, width, height, loaded, ready])

  // Trigger OpenCV transformation
  useEffect(() => {
    console.log(`lauch ocv : ${ready}`);
    if (ready) processCV(videoElement, outputElement);
  }, [ready, videoElement, outputElement]);

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
