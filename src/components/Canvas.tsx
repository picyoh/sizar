"use client";

import { useState, useRef, useEffect } from "react";

export default function Canvas() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const camera = document.getElementById("camera");
    if (camera) {
      const resizeObserver = new ResizeObserver(() => {
        setWidth(camera.clientWidth);
        setHeight(camera.clientHeight);
      });
      resizeObserver.observe(camera);
    }
  }, []);

  return (
    <canvas
      id="canny"
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0"
    />
  );
}
