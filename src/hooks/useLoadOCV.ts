import { useState, useEffect } from "react";
import cv from "@/service/cv";

export default function useLoadCV() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const waitOpenCV = async () => {
      try {
        const loaded = await cv.load()
        setReady(loaded.returnValue)
      } catch (error) {
        console.error("No access to opencv.js", error);
      } finally {
        setReady(true)
      }
    };
    if(!ready && !loading){
        setLoading(true);
        waitOpenCV();
    } 
  },[loading, ready]);
  return ready;
}
