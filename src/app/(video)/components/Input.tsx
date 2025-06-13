"use client";

import { useState, useLayoutEffect, useEffect, useRef, RefObject } from "react";
import useVideoStream from "@/app/(video)/hooks/useVideoStream";
import useInputStore from "@/app/(video)/store/inputStore";
import { useClientWidth } from "../hooks/useClientWidth";

export default function Video() {
  // Store video DOM reference
  const videoElement = useRef<HTMLVideoElement>(null);
  const setVideoRef = useInputStore((state) => state.setVideoRef);
  useEffect(() => {
    setVideoRef(videoElement);
  }, [videoElement, setVideoRef]);

  // Store input canvas DOM reference
  const inputElement = useRef<HTMLCanvasElement>(null);
  const setInputRef = useInputStore((state) => state.setInputRef);
  useEffect(() => {
    setInputRef(inputElement);
  }, [inputElement, setInputRef]);

  // Get video stream from camera
  const { stream, ratio } = useVideoStream();
  const setVideoRatio = useInputStore((state)=> state.setVideoRatio);
  // Get window size
  const clientWidth = useClientWidth();
  // Set up sizes
  const [width, setWidth] = useState(clientWidth);
  const [height, setHeight] = useState(0);

  // Get camera stream
  useEffect(() => {
    videoElement!.current!.srcObject = stream!;
    setVideoRatio(ratio!)
  }, [videoElement, stream, ratio]);
  
  // Adjust video sizes
  useLayoutEffect(()=>{
    setWidth(clientWidth);
    if(ratio! && ratio > 0){
      setHeight(clientWidth / ratio);
    }
  },[clientWidth, ratio])  

  const [ready, setReady] = useState(false);
  
  return (
    <>
      <video
        id="camera"
        width={width}
        ref={videoElement}
        autoPlay={true}
      />
      <canvas
        id="input"
        ref={inputElement}
        width={width}
        height={height}
        className="hidden"
      />
    </>
  );
}
