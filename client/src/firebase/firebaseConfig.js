import { initializeApp } from 'firebase/app';
import firestore from 'firebase/firestore';
import authentication from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APP_APIKEY ,
    authDomain: import.meta.env.VITE_FIREBASE_APP_AUTHDOMAIN ,
    projectId: import.meta.env.VITE_FIREBASE_APP_PROJECTID ,
    storageBucket: import.meta.env.VITE_FIREBASE_APP_STORAGEBUCKET ,
    messagingSenderId: import.meta.env.VITE_FIREBASE_APP_MESSAGINGSENDERID ,
    appId: import.meta.env.VITE_FIREBASE_APP_APPID 
}

const app = initializeApp(firebaseConfig);
const db = firestore(app);
const auth = authentication(app);

export {
    app,
    auth,
    db
}