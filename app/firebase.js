/* 
This is where the firebase is initialized to set up user authentication

*/

import * as firebase from "firebase";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgQZ8-M7FR1yugpc4mXnov0mzh7B9gKjU",
  authDomain: "cryptocurrency-app-272a6.firebaseapp.com",
  projectId: "cryptocurrency-app-272a6",
  storageBucket: "cryptocurrency-app-272a6.appspot.com",
  messagingSenderId: "583638841012",
  appId: "1:583638841012:web:7438e662accf502793c9e1",
  measurementId: "G-G78ZT9JPQE",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase?.auth();
const storage = firebase?.storage();
const storageRef = storage?.ref();
const firebaseS = firebase?.storage;
const db = firebase?.firestore();

export { auth, storageRef, firebaseS, db };
