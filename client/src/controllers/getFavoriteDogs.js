import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const getFavoriteDogs = async (uid) => {
    const refDoc = collection(db, 'users', uid, 'favorite_dogs');
    const q = query(refDoc, orderBy("timestamp", 'asc'))
    const response = await getDocs(q);
    const favorite_dogs = response.docs.map((dog) => dog.data());
    const parsedFavorite = favorite_dogs.map(dog => ({...dog, favorite: true}));

    return parsedFavorite;
}

export default getFavoriteDogs