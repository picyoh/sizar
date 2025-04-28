"use client";

import { Suspense, useEffect } from "react";
import Loading from "./loading";
import Video from "@/app/(video)/components/Video";
import Canvas from "@/app/(video)/components/Canvas";
import Panel from "@/app/(video)/components/Panel";
import useLoadCV from "@/app/(video)/hooks/useLoadOCV";
import useVideoStore from "@/app/(video)/store/videoStore";

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
