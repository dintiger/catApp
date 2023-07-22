// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZH3pRJAPXSfzktd28u8CWHGahb31NNrQ",
  authDomain: "catapp-84751.firebaseapp.com",
  projectId: "catapp-84751",
  storageBucket: "catapp-84751.appspot.com",
  messagingSenderId: "318329872637",
  appId: "1:318329872637:web:0825f16821f6e061ae9e94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
