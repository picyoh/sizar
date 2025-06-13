import { RefObject, useEffect, useRef } from "react";

export default function useClickOutside(
  ref: RefObject<HTMLCanvasElement | null>,
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handleOnClickOutside(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, [ref, handleOnClickOutside]);
}