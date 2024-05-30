// src/components/VideoChat.js (continued)
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const VideoChat = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const socket = useRef(io("http://localhost:4000"));

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);

        const pc = new RTCPeerConnection();
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        pc.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.current.emit("candidate", event.candidate);
          }
        };

        socket.current.on("candidate", (candidate) => {
          pc.addIceCandidate(new RTCIceCandidate(candidate));
        });

        socket.current.on("offer", async (offer) => {
          await pc.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.current.emit("answer", answer);
        });

        socket.current.on("answer", async (answer) => {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        });

        setPeerConnection(pc);
      })
      .catch((error) => console.error("Error accessing media devices.", error));
  }, []);

  const createOffer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.current.emit("offer", offer);
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay />
      <video ref={remoteVideoRef} autoPlay />
      <button onClick={createOffer}>Call</button>
    </div>
  );
};

export default VideoChat;
