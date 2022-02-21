import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

import {
  getCurrentUser,
  signInAnonymouslyFn,
  createUserWithEmailAndPasswordFn,
  signInWithEmailAndPasswordFn,
  onAuthStateChangedFn,
  signOutFn,
  addChatUser,
  fetchVisitorsList,
  fetchVisitorsChat,
  fetchVisitorsListListener,
  fetchVisitorsChatListener,
  createConversation,
  replayMessageWithFirebase
} from './firebase/firebaseHelper'



const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [page, setPage] = useState('');
  const [isAuth, setIsAuth] = useState('');
  const [user, setUser] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // Firebase Authentication
    const unsubscribeAuthentication = () => onAuthStateChanged(getAuth(), (user) => {
      console.log('#user :>> ', user);
      if(user){
        const userObj = {
          uid: user.uid,
          name: user.displayName || "Anonymous",
          email: user.email,
          isAnonymous: user.isAnonymous,
          profile_picture : ""
        }
        addChatUser(user)
        setName(user.displayName || "Anonymous")
        setIsAuth(true)
        setUser(userObj)
        setPage('home')
        // setTimeout(() => signOutFn(), 3000)
      }else{
        // signInWithEmailAndPasswordFn('shaponpal4@gmail.com', 12345678).catch(function (error){
        //   console.log('error :>> ', error);
        // })
        // signInAnonymouslyFn().then((res) =>{
        //   console.log('res2 :>> ', res);
        // })
        setIsAuth(false)
        setUser(null)
        setPage('auth')
      }
    })
    unsubscribeAuthentication()

    return () => {unsubscribeAuthentication();}
  }, []);

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

  const createUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPasswordFn(email, password);
  const signInWithEmailAndPassword = (email, password) => signInWithEmailAndPasswordFn(email, password);
  const signInAnonymously = () => signInAnonymouslyFn();
  const signOut = () => signOutFn();
  
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      page,
      setPage,
      isAuth,
      user,
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      signInAnonymously, 
      signInWithEmailAndPassword, 
      createUserWithEmailAndPassword,
      signOut,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
