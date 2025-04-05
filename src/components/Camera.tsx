"use client";

import { useRef, useEffect } from "react";
import useWindowSize from "@/hooks/useWindowSize";

export default function Camera() {
  const { width } = useWindowSize();
  const camRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
            }
          });
      } catch (error) {
        console.error("No access to camera", error);
      }
    };
    getCamera();
  }, []);

  return <video id="camera" width={width} ref={camRef} autoPlay={true} />;
}
