import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const provider = new firebase.auth.GoogleAuthProvider();


const firebaseConfig = {
  apiKey: "AIzaSyDKMKWTHn9Y_Ffb3EJQB-C58Q6wALJ0v6I",
  authDomain: "chatter-ee60f.firebaseapp.com",
  projectId: "chatter-ee60f",
  storageBucket: "chatter-ee60f.firebasestorage.app",
  messagingSenderId: "751611600757",
  appId: "1:751611600757:web:076c76a0c6ad5be09a3d3c",
  measurementId: "G-FBNLP1RG35"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, provider, storage };
