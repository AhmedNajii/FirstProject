import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAynXglh8qD77W4YrB-mIsNmdxjMc9Q9r0",
    authDomain: "myapp-fb4c9.firebaseapp.com",
    projectId: "myapp-fb4c9",
    storageBucket: "myapp-fb4c9.appspot.com",
    messagingSenderId: "1077103778221",
    appId: "1:1077103778221:web:75e3f2a506dcee2fc9a924",
    measurementId: "G-VH8FJ5NSLM"
  };

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);