import uploadImageCloudServer from "./uploadImageCloudServer";
import { auth } from "../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";

export default async function(imageBlobUser){
    const response = await uploadImageCloudServer(imageBlobUser);
    const user = auth.currentUser;

    //! If doesn't exist an user in the current sesion
    if(!user) throw new Error('No existe un usuario logeado actualmente, por favor inicia sesión');

    //! If exist an error in the request to up image in Cloud
    if(response.error){
        console.log(response.error);
    }

    await updateProfile(user, {
        photoURL: response.secure_url
    });

    return response;
}