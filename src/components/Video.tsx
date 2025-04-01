'use client'

import React, { useRef, useEffect } from "react";
import { Suspense } from "react";

export default function Video() {
  const camRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    getVideo();
  });
  const getVideo = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          if (camRef.current) {
            const cam = camRef.current;
            cam.srcObject = stream;
            cam.play();
          }
        });
    } catch (error) {
      console.error("No access to camera", error);
    }
  };

  return (

    <Suspense>
      <video width="320" height="240" autoPlay={true} ref={camRef} />
      <canvas ref={canvasRef} />
    </Suspense>
  );
}
