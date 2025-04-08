"use client";

import { useState, useRef, useEffect } from "react";
import useResizeObserver from "@/hooks/useResizeObserver";
//import cv from '@/service/cv'

export default function Stream() {
  const camRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const camSize = useResizeObserver(camRef);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [rec, setRec] = useState(false);

  //TODO: split useEffect // dependencies
  
  useEffect(() => {
    if (!rec && camRef.current) {
      const getCamera = async () => {
        try {
          await navigator.mediaDevices
            .getUserMedia({
              video: true,
              audio: false,
            })
            .then((stream) => {
              if (camRef.current) {
                camRef.current.srcObject = stream;
                setRec(true);
              }
            });
        } catch (error) {
          console.error("No access to camera", error);
        }
      };
      getCamera();
    }
  }, [rec, camRef]);

  useEffect(() => {
    if(rec && width === 0) {
      setWidth(camSize.winWidth);
      //console.log('width')
    }
  }, [rec, camSize, width]);

  useEffect(() => {
    if(rec && camSize.elHeight > height){
      setHeight(camSize.elHeight);
      //console.log('height')
    }
  }, [rec, camSize, height]);

  return (
    <div>
      <video
        id="camera"
        width={width}
        ref={camRef}
        autoPlay={true}
      />
      <canvas
        id="canny"
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0"
      />
    </div>
  );
}
