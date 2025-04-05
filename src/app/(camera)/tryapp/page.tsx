"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

import Loading from "./loading";
const Camera = dynamic(() => import("../../../components/Camera"), {
  ssr: false,
});
const Canvas = dynamic(() => import("../../../components/Canvas"), {
  ssr: false,
});

export default function TryIt() {
  return (
    <Suspense fallback={<Loading />}>
      <Camera />
      <Canvas />
      <Script async src="https://docs.opencv.org/4.x/opencv.js" />
    </Suspense>
  );
}
