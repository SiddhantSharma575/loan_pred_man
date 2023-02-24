// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDggs4tK8y7Vt86ZmeS2LuvVOFF71c0ONE",
    authDomain: "redux-http-ff53e.firebaseapp.com",
    databaseURL: "https://redux-http-ff53e-default-rtdb.firebaseio.com",
    projectId: "redux-http-ff53e",
    storageBucket: "redux-http-ff53e.appspot.com",
    messagingSenderId: "86314587962",
    appId: "1:86314587962:web:68775ec03777629264a203",
    measurementId: "G-858CJQ5Y25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app)
export { auth, db, storage }