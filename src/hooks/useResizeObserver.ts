import { useRef, useEffect, useState, RefObject } from "react";


export type ResizeObserverTuple = [RefObject<HTMLVideoElement | null>, DOMRect | undefined]
export default function useResizeObserver(): ResizeObserverTuple {
  const ref:RefObject<HTMLVideoElement | null> = useRef(null);
  const [rect, setRect] = useState<DOMRect>();

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (ref.current) {
        const boundingRect = ref.current.getBoundingClientRect();
        setRect(boundingRect);
      }
    });
    if(ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [ref]);
  return [ref, rect];
}
