import { Suspense } from "react";
import Camera from "@/components/Camera";
import Canvas from "@/components/Canvas";

export default function TryIt() {
  return (
    <div className="relative">
      <Suspense>
        <Camera />
        <Canvas />
        <script async src="https://docs.opencv.org/4.x/opencv.js" />
      </Suspense>
    </div>
  );
}
