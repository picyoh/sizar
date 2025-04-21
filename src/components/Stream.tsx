"use client";

import { useState, useRef, useEffect } from "react";
import useResizeObserver from "@/hooks/useResizeObserver";
import useVideoStream from "@/hooks/useVideoStream";
import useLoadCV from "@/hooks/useLoadOCV";
import { processCV } from "@/lib/processCV";

export default function Stream() {
  //TODO: resizeObserver trigger when resizing window ?
  // Canvas elements
  const inputElement = useRef<HTMLCanvasElement>(null);
  const outputElement = useRef<HTMLCanvasElement>(null);
  // Buttons elements
  const objButton = useRef<HTMLButtonElement>(null);
  const [objMode, setObjMode] = useState(false);
  // Video element and its sizes
  const [videoElement, rect] = useResizeObserver();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  // Video stream from camera
  const { stream, ratio } = useVideoStream();
  // OpenCV loading state
  const loaded = useLoadCV();
  // Init Ready state
  const [ready, setReady] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Get camera stream
  useEffect(() => {
    if (stream !== null && videoElement.current)
      videoElement.current.srcObject = stream;
  }, [videoElement, stream]);

  // Adjust video width and canvas sizes
  useEffect(() => {
    // Set width on Canvas and Video elements
    if (window) setWidth(window.innerWidth);
    // Set height on Canvas and Video elements
    if (videoElement !== null && rect !== undefined) setHeight(rect.height);
  }, [videoElement, rect]);

  // set ready when openCV loaded
  useEffect(() => {
    if (ratio && loaded && ratio * height === width) setReady(true);
  }, [ratio, width, height, loaded, ready]);

  // Trigger OpenCV transformation
  useEffect(() => {
    console.log(objMode);
    if (ready && objMode && !processing) {
      const processingImage = async () => {
        setProcessing(true);
        try {
          await processCV(videoElement, inputElement, outputElement, height, width);
        } catch (error) {
          console.error("Cannot transform image", error);
        } finally {
          setProcessing(false);
        }
      };
      processingImage();
    }
    if(!objMode)
      outputElement.current?.getContext("2d")?.clearRect(0, 0, width, height);
  }, [objMode, ready, processing, videoElement, inputElement, height, width]);

  useEffect(() => {
    const objDom = objButton.current;
    function handleObjClick() {
      setObjMode(!objMode);
    }
    objDom?.addEventListener("click", handleObjClick);
    return () => {
      objDom?.removeEventListener("click", handleObjClick);
    };
  }, [objMode]);

  return (
    <div>
      <video id="camera" width={width} ref={videoElement} autoPlay={true} />
      <canvas
        id="input"
        ref={inputElement}
        width={width}
        height={height}
        className="hidden"
      />
      <canvas
        id="output"
        ref={outputElement}
        width={width}
        height={height}
        className="absolute top-0 left-0"
      />
      <button ref={objButton} className="flex p-4 border-2 border-solid">
        Obj
      </button>
    </div>
  );
}
