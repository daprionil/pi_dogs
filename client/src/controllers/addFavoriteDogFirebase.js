import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import getFavoriteDogs from "./getFavoriteDogs";


async function addFavoriteDogFirebase(uid, dataDog) {
    const refCollection = collection(db, `users/${uid}/favorite_dogs`);
    const refDoc = doc(refCollection, dataDog.name);
    await setDoc(refDoc, {...dataDog, timestamp: Date.now()});

    const favorite_dogs = await getFavoriteDogs(uid);

    return favorite_dogs;
}

export default addFavoriteDogFirebase;


/* 
//? Eliminar un favorite dog

const refCollection = collection(db, `users/${uid}/favorite_dogs`);
const refDoc = doc(refCollection, "american_dog");
const response = await deleteDoc(refDoc);
*/