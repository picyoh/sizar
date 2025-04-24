"use client";

import { Suspense, useEffect } from "react";
import Loading from "./loading";
import Video from "@/components/Video";
import Canvas from "@/components/Canvas";
import Panel from "@/components/Panel";
import useLoadCV from "@/hooks/useLoadOCV";
import useVideoStore from "@/store/videoStore";

export default function TryIt() {
  // Load CV
  const cvLoaded = useLoadCV();
  const setCvLoaded = useVideoStore((state) => state.setCvLoaded);

  useEffect(() => {
    setCvLoaded(cvLoaded);
  }, [cvLoaded, setCvLoaded]);
  
  return (
    <Suspense fallback={<Loading />}>
      <Video />
      <Canvas />
      <Panel />
    </Suspense>
  );
}
