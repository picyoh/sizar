import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // execute on client side
    if (typeof window !== "undefined") {
        // handler called on resize event
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      // add resize listener
      window.addEventListener('resize', handleResize);
      // call it initially
      handleResize();
      // remove listener
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}
