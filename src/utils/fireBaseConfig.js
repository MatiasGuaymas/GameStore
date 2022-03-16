// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDzNOw3_4P2R_E-NMmwEFza21adi7Ws6OU",
  authDomain: "gamestore-e859c.firebaseapp.com",
  projectId: "gamestore-e859c",
  storageBucket: "gamestore-e859c.appspot.com",
  messagingSenderId: "524615260951",
  appId: "1:524615260951:web:6608f5fa17967ab73eb552"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  

export default db;