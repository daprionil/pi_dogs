import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const getFavoriteDogs = async (uid) => {
    const refDoc = collection(db, 'users', uid, 'favorite_dogs');
    const response = await getDocs(refDoc);
    const favorite_dogs = response.docs.map((dog) => dog.data());
    const parsedFavorite = favorite_dogs.map(dog => ({...dog, favorite: true}));
    return parsedFavorite;
}

export default getFavoriteDogs