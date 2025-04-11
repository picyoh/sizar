import { RefObject } from "react";

export default async function getVideoStream(
  videoElement: RefObject<HTMLVideoElement | null>
) {
  try {
    await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        if (videoElement.current) {
          videoElement.current.srcObject = stream;
        }
      });
  } catch (error) {
    console.error("No access to camera", error);
  }
};
