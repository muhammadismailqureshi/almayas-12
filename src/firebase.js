// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUUIw47y5RfDdjTwjLVf1Rg0wmVIj8Fpc",
  authDomain: "almayas-12.firebaseapp.com",
  projectId: "almayas-12",
  storageBucket: "almayas-12.appspot.com",
  messagingSenderId: "577981172564",
  appId: "1:577981172564:web:293a57f2eb746f064096c1",
  measurementId: "G-SQCB4BLPTQ"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };