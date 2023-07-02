import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
    

const firebaseConfig = ({
    apiKey: "AIzaSyBqVY7j1KVVj9XLkdGSDi-cPmjYTL9oodQ",
    authDomain: "serious-water-390616.firebaseapp.com",
    projectId: "serious-water-390616",
    storageBucket: "serious-water-390616.appspot.com",
    messagingSenderId: "913914898599",
    appId: "1:913914898599:web:1432dae8fbf9f7eaa41382",
    measurementId: "G-6DESH48PZ7"
  })
 
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app)