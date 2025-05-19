import { useEffect } from "react";
import useVideoStream from "@/app/(video)/hooks/useVideoStream";
import useResizeObserver from "@/app/(video)/hooks/useResizeObserver";
import useVideoStore from "@/app/(video)/store/videoStore";

export default function Video() {
  //TODO: resizeObserver trigger when resizing window ?
  // Video element and its sizes
  const [videoElement, rect] = useResizeObserver();
  // Video stream from camera
  const { stream, ratio } = useVideoStream();
  // Store width
  const width = useVideoStore((state) => state.width);
  const setWidth = useVideoStore((state) => state.setWidth);
  // Store height
  const height = useVideoStore((state)=> state.height)
  const setHeight = useVideoStore((state) => state.setHeight);
  // Store ratio
  const setRatio = useVideoStore((state) => state.setRatio);
  // Store DOM reference
  const setRef = useVideoStore((state) => state.setVideoRef);
  const cvLoaded = useVideoStore((state) => state.cvLoaded)


  // TODO: set real ready state in store to lock buttons cf Video
  const ready = true;

  // Set Video reference
  useEffect(() => {
    setRef(videoElement);
  }, [videoElement, setRef]);

  // Get camera stream
  useEffect(() => {
    videoElement!.current!.srcObject = stream!;
    setRatio(ratio!);
  }, [videoElement, stream, ratio, setRatio]);

  // Get displayed video sizes

  useEffect(() => {
    // Get maximum dispalyed width
    setWidth(window!.innerWidth);
    // Get height from displayed video
    if (rect !== undefined) setHeight(rect?.height);
  }, [rect, setWidth, setHeight]);

  // TODO: fine tune ready display when ready
  // set ready when openCV loaded and sizes are set
  useEffect(() => {
    if (ratio && cvLoaded && ratio * height === width) {
      //TODO: adjust stream size to ratio
    }
  }, [ratio, width, height, cvLoaded, ready]);

  return (
    <>
      <video id="camera" width={width} ref={videoElement} autoPlay={true} />
    </>
  );
}
