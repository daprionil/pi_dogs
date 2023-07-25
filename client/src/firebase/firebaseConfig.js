import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APP_APIKEY ,
    authDomain: import.meta.env.VITE_FIREBASE_APP_AUTHDOMAIN ,
    projectId: import.meta.env.VITE_FIREBASE_APP_PROJECTID ,
    storageBucket: import.meta.env.VITE_FIREBASE_APP_STORAGEBUCKET ,
    messagingSenderId: import.meta.env.VITE_FIREBASE_APP_MESSAGINGSENDERID ,
    appId: import.meta.env.VITE_FIREBASE_APP_APPID 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    db,
    app,
    auth
}