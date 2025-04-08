"use client";

import { Suspense } from "react";
import Loading from "./loading";
import Stream from "@/components/Stream";

export default function TryIt() {
  return (
    <Suspense fallback={<Loading />}>
      <Stream />
    </Suspense>
  );
}
