import React, { createContext, useState, useRef, useEffect } from 'react';

function Webcam() {
    const [stream, setStream] = useState();
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
    <div>Webcam</div>
  )
}

export default Webcam