"use client";

import { useRef, useEffect } from "react";
import useWindowSize from "@/lib/useWindowSize";

export default function Camera() {
  const { width, height } = useWindowSize();
  const camRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getCamera();
  });

  const getCamera = async () => {
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

  return <video width={width} height={height} autoPlay={true} ref={camRef} />;
}
