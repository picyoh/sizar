"use client";

import { RefObject, useEffect, useState } from "react";

export default function useResizeObserver(
  element: RefObject<HTMLVideoElement | null>
) {
  const [size, setSize] = useState({
    winWidth: 0,
    winHeight: 0,
    elWidth: 0,
    elHeight: 0,
  });

  useEffect(() => {
    if (typeof window !== undefined && element !== null && element.current) {
      const resizeObserver = new ResizeObserver(() => {
        setSize({
          winWidth: window.innerWidth,
          winHeight: window.innerHeight,
          elWidth: element.current!.clientWidth,
          elHeight: element.current!.clientHeight,
        });
      });
      if (element.current) resizeObserver.observe(element.current);
      return () => resizeObserver.disconnect();
    }
  }, [element]);

  //console.log(size,element)

  return size;
}
