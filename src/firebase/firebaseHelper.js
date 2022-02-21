import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  serverTimestamp,
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  onSnapshot  
} from 'firebase/firestore'
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  push,
  get,
  update,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";

import app from "./connection";

// import {  onSnapshot } from "firebase/firestore";

const database = getDatabase();
// const db = getDatabase();
const db = getFirestore(app);
const auth = getAuth();
const dbRef = ref(getDatabase());
// console.log('auth :>> ', auth);

//Refs name
const conversations = "conversations";
const chatUsers = "chatUsers";

export const user = auth.currentUser;
console.log('user :>> ', user);

export const signInAnonymouslyFn = () => signInAnonymously(auth);
export const createUserWithEmailAndPasswordFn = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const signInWithEmailAndPasswordFn = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const signOutFn = async () => await signOut(auth);
export const onAuthStateChangedFn = (callback) => onAuthStateChanged(auth, callback(user));


export const fetchVisitorsList = async () => await getDocs(collection(getFirestore(), chatUsers));
export const fetchVisitorsChat = async () => await getDocs(collection(getFirestore(), conversations));

export const fetchVisitorsListListener = async () => await getDocs(collection(getFirestore(), chatUsers));
export const fetchVisitorsChatListener = (documentId, callback) => onSnapshot(doc(getFirestore(), conversations, documentId), callback(doc));


const unsub = onSnapshot(doc(db, "chatUsers", "IHKwwvl9TFMF8LDOF7G2sNBvA5t1"), (doc) => {
  console.log("####Current data: ", doc.data());
});
unsub()

export const getCurrentUser = async () => {
  const user = await getAuth().currentUser;
  if (user) {
    return {
      id: user.uid,
      name: user.displayName || "Anonymous",
      isAnonymous: user.isAnonymous,
      thumb: "contact/2.jpg",
      status: "8",
      mesg: "Typing................",
      lastSeenDate: "20/02/22",
      onlineStatus: "online",
      typing: true,
    }
  }
  return user;
};


/**
 * Create user 
 * @param {number} documentId 
 * @param {object} data 
 * @returns 
 */
export const addChatUser = async (user) => {
  set(ref(database, 'users/' + user.uid), {
    uid: user.uid,
    name: user.displayName || "Anonymous",
    email: user.email,
    isAnonymous: user.isAnonymous,
    profile_picture : ""
  });
}

/**
 * Create conversation
 * @param {number} documentId 
 * @param {object} data 
 * @returns 
 */
export const createConversation = async (documentId = null, data) => {
  const collectionRef = collection(getFirestore(), conversations)

  const dataToCreate = {
    ...data,
    createTimestamp: serverTimestamp(),
    updateTimestamp: serverTimestamp()
  }

  const createPromise =
  documentId === null || documentId === undefined ? // Create doc with generated id
    await addDoc(collectionRef, dataToCreate).then(d => d.id) : // Create doc with custom id
    await setDoc(doc(collectionRef, documentId), dataToCreate).then(() => documentId)

  return await createPromise
}

/**
 * Replay message
 * @param {number} documentId 
 * @param {*object} data 
 * @returns 
 */
export const replayMessageWithFirebase = async (documentId = null, data) => {
  const collectionRef = collection(getFirestore(), conversations)

  const dataToCreate = {
    ...data,
    updateTimestamp: serverTimestamp()
  }

  const createPromise = await updateDoc(doc(collectionRef, documentId), dataToCreate).then(() => documentId)

  return await createPromise
}


// setTimeout(()=> {
//   replayMessageWithFirebase('fjfjjfjf2332', {jeee33: "djjdjd2s"}).then((data) =>{
//     console.log('data :>> ', data);
//   })
// }, 3000)





export const dbRefPath = (uid = "", action = "", type = "client") => {
  if (uid === "") return "";
  if (action === "") return "";
  if (action === "messages") {
    return "messages/" + uid + "/";
  }
  return "";
};

export const middleware = (path = "/", callback = () => {}) => {
  return onValue(ref(db, path), callback);
};

export const getUserMessages = (refName = "", callback = () => {}) => {
  if (user) {
    const refPath = dbRefPath(user.uid, refName);
    console.log(`refPath>>`, refPath);
    if (refPath !== "")
      return get(child(dbRef, refPath))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            callback({
              type: "success",
              message: "data loaded",
              data: snapshot.val(),
            });
          } else {
            console.log("No data available");
            callback({
              type: "notFound",
              message: "No data available",
              data: {},
            });
          }
        })
        .catch((error) => {
          console.error(error);
          callback({
            type: "error",
            message: "Something went wrong",
            data: {},
            error,
          });
        });
  } else {

  }
};

export const messageTemplate = (uid, message = "", key = "") => {
  return {
    key,
    message,
    time: Date.now(),
    sender: uid,
  };
};

export const saveData = (refName = "", message = "", key = "") => {
  const userId = auth.currentUser.uid;
  if (userId && refName) {
    const refPath = dbRefPath(userId, refName);
    const newPostKey = push(child(dbRef, refPath)).key;
    const updates = {};
    updates[refPath + newPostKey] = messageTemplate(userId, message, key);
    return update(dbRef, updates);
  }
};

export const onChildAddedListener = (refName = "", callback = () => {}) => {
  const userId = auth.currentUser.uid;
  if (userId && refName) {
    const refPath = dbRefPath(userId, refName);
    const commentsRef = ref(db, refPath);
    return onChildAdded(commentsRef, callback);
  }
};