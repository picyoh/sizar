import { useState, useEffect } from "react";

export default function useVideoStream() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [ratio, setRatio] = useState<number | undefined | null>(null);

  useEffect(() => {
    const waitVideoStream = async () => {
      try {
        await navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: false,
          })
          .then((stream) => {
            setStream(stream);
            setRatio(stream.getVideoTracks()[0].getSettings().aspectRatio);
          });
      } catch (error) {
        console.error("No access to camera", error);
      }
    };
    waitVideoStream();
  }, []);
  return {stream, ratio};
}
