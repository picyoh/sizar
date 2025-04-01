"use client";

import { useEffect, useRef } from "react";

export default function Canvas() {
  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const setCanvas = (cameraRef, canvasRef) => {
        const camera = cameraRef.current;
        const canvas = canvasRef.current;

        let ctx = canvas.getContext('2d', {willReadFrequently: true});
        camera.width()
        ctx.drawImage()
      };
    setCanvas(cameraRef, canvasRef);
  }, [cameraRef, canvasRef]);


  return(
    <canvas ref={canvasRef} className="absolute tl-0"></canvas>
  )
}
