import { updateProfile, updateEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const typeUpdate = {
    displayName: (displayName, user) => updateProfile(user,{
        displayName
    }),
    emailuser: (email, user) => updateEmail(user, email),
    phoneNumber: (phoneNumber, user) => updateProfile(user, {phoneNumber})
};

async function updateProfileUserFirebase({username: displayName, emailuser, phoneNumber}) {
    const user = auth.currentUser;

    //! If doesn't exist an user
    if(!user) throw new Error('No existe un usuario logeado actualmente para la actualización')
    const finalDataUserProfile = Object.entries({displayName, emailuser, phoneNumber}).filter(([,val]) => !!val);
    if(!finalDataUserProfile.length) throw new Error('No hay campos válidos para actualizar el perfil');
    
    const promisesUpdateProfile = finalDataUserProfile.map(([key, value]) => (
        typeUpdate[key](value, user)
    ));

    const result = await Promise.all(promisesUpdateProfile);

    return result;
};

export default updateProfileUserFirebase;