// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT8aWsNBte6Ku25nydxmwk__D-x-Slops",
  authDomain: "assignment-bfe37.firebaseapp.com",
  projectId: "assignment-bfe37",
  storageBucket: "assignment-bfe37.appspot.com",
  messagingSenderId: "256125052031",
  appId: "1:256125052031:web:aa259a7310fcc7e9a40b4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { fireDB, auth, storage };
