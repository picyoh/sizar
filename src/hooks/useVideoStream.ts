import { useState, useEffect } from "react";

export default function useVideoStream() {
  const [stream, setStream] = useState<MediaStream | null>(null);

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
          });
      } catch (error) {
        console.error("No access to camera", error);
      }
    };
    waitVideoStream();
  }, []);
  return stream;
}
