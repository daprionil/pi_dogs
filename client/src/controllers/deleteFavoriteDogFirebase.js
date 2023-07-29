import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import getFavoriteDogs from "./getFavoriteDogs";

const deleteFavoriteDogFirebase = async ({nameDog,uid}) => {
    const refCollection = collection(db, `users/${uid}/favorite_dogs`);
    const refDoc = doc(refCollection, nameDog);
    await deleteDoc(refDoc);
    
    const favorite_dogs = await getFavoriteDogs(uid);
    return favorite_dogs;
};

export default deleteFavoriteDogFirebase;