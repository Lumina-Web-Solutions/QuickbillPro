// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDJzl5l8oON82dFn4WLMyihlHVeGegT4MM",
    authDomain: "quickbillpro-2f787.firebaseapp.com",
    projectId: "quickbillpro-2f787",
    storageBucket: "quickbillpro-2f787.firebasestorage.app",
    messagingSenderId: "593549626470",
    appId: "1:593549626470:web:f2d186701ed28fe360b1a7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, doc, setDoc, getDoc };
