"use client";

import useWindowSize from "@/lib/useWindowSize";

export default function Canvas() {
  const { width, height } = useWindowSize();

  return (
    <canvas width={width} height={height} className="absolute top-0 left-0"></canvas>
  );
}
