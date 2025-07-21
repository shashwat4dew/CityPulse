// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApMobKJa3Kv5JVfEs2aclD7EjJYV-EN_0",
  authDomain: "citypulseauth.firebaseapp.com",
  projectId: "citypulseauth",
  storageBucket: "citypulseauth.appspot.com",  // ✅ FIXED HERE
  messagingSenderId: "225010182009",
  appId: "1:225010182009:web:0a6b15bb2534276939b1a8",
  measurementId: "G-VY7RK23SWL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
