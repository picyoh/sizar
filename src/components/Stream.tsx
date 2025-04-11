"use client";

import { useState, useRef, useEffect } from "react";
import useResizeObserver from "@/hooks/useResizeObserver";
import getVideoStream from "@/lib/getVideoStream"
import processCV  from "@/lib/processCV";



export default function Stream() {
  //TODO: resizeObserver trigger when resizing window ?
  const [videoElement, rect] = useResizeObserver();
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [rec, setRec] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  // Get camera stream
  useEffect(() => {
    if (!rec && videoElement.current) {
      getVideoStream(videoElement);
      setRec(true);
    }
  }, [rec, videoElement]);
  
  // Adjust video and canvas sizes

  useEffect(()=>{
    if(window){
      setWidth(window.innerWidth)
    }
    if(videoElement !== null && rect !== undefined){
      setHeight(rect.height);
      setInterval(()=>{
        setLoaded(true);
      }, 500) 
    }
  }, [videoElement, rect])

  // Trigger openCV
  useEffect(() => {
    if (isLoaded && !isProcessing) {
      processCV(videoElement, canvasElement);
      setProcessing(true);
      console.log()
    }
  }, [isLoaded, isProcessing, videoElement, canvasElement]);

  return (
    <div>
      <video id="camera" width={width} ref={videoElement} autoPlay={true} />
      <canvas
        id="canny"
        ref={canvasElement}
        width={width}
        height={height}
        className="absolute top-0 left-0"
      />
    </div>
  );
}
