import { getApps, initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCq6zmWG3RdWAkldOCT0yhBy0vnm8psfvA",
  authDomain: "spmessenger-b71fe.firebaseapp.com",
  projectId: "spmessenger-b71fe",
  storageBucket: "spmessenger-b71fe.appspot.com",
  messagingSenderId: "821599055804",
  appId: "1:821599055804:web:a4de9157141cfa2e1385b9",
  measurementId: "G-R49TVY0H3X",
  databaseURL: "https://spmessenger-b71fe-default-rtdb.firebaseio.com/",
};
let app = null
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}
export default app