import React, { createContext, useState, useRef, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer';

function OwnVideo() {
    const [stream, setStream] = useState();
    const myVideo = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((currentStream) => {
            setStream(currentStream);
    
            myVideo.current.srcObject = currentStream;
          });
    
        socket.on('me', (id) => setMe(id));
    
        socket.on('callUser', ({ from, name: callerName, signal }) => {
          setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
      }, []);
      
  return (
    <div>
        <VideoPlayer videoRef={myVideo}/>
    </div>
  )
}

export default OwnVideo