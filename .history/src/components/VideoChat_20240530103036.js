// src/components/VideoChat.js
import React, { useEffect, useRef, useState } from "react";

const VideoChat = () => {
  const localVideoRef = useRef();
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);
      })
      .catch((error) => console.error("Error accessing media devices.", error));
  }, []);

  return <video ref={localVideoRef} autoPlay />;
};

export default VideoChat;
