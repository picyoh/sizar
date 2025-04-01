"use client";

import useWindowSize from "@/lib/useWindowSize";

export default function Canvas() {
  const { width, height } = useWindowSize();

  return (
    <canvas width={width} height={height} className="absolute t-0 l-0"></canvas>
  );
}
