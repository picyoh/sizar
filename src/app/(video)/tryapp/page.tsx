"use client";

import { Suspense, useEffect } from "react";
import Loading from "./loading";
import Input from "@/app/(video)/components/Input";
import Output from "@/app/(video)/components/Output";
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
      <Input />
      <Output />
      <Panel />
    </Suspense>
  );
}
