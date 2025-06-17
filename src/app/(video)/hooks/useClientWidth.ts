"use client";

import { useState, useLayoutEffect } from "react";

export default function useClientWidth() {
  const [width, setWidth] = useState(0);
  
  useLayoutEffect(()=>{
    // Handler
    function handleResize(){
      setWidth(window.innerWidth);
    }
    // Listener
    window.addEventListener("resize", handleResize);
    // Init
    handleResize();
    // Remove listener
    return () => window.removeEventListener("resize", handleResize); 
  },[]);
  
  return width;
}
