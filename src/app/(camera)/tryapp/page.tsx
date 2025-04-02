'use client'

import { Suspense } from "react";
import Loading from "./loading";
import Script from "next/script";
import Camera from "@/components/Camera";
import Canvas from "@/components/Canvas";

export default function TryIt() {
  return (
    <div className="relative">
      <Suspense fallback={<Loading />}>
        <Camera />
        <Canvas />
        <Script async src="https://docs.opencv.org/4.x/opencv.js" />
      </Suspense>
    </div>
  );
}
