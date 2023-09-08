const messageErrors = {
    username: 'El nombre de usuario no es válido, Ej: dogestApp12',
    emailuser: 'No es un correo electrónico válido'
};

const dictionaryValidationsFields = {
    username: (val = '') => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(\S).{4,13}$/.test(val) ,
    emailuser: (val = '') => val.length < 50 && val.length >= 5,
};

function validateFieldFormProfile(name, value){
    const validation = dictionaryValidationsFields[name](value);

    if(!validation){
        return messageErrors[name];
    }
    return null;
}
function validateValuesProfileForm(values){
    const entrieValues = Object.entries(values);

    const errorsResult = entrieValues.reduce((errors,[name, value]) => {
        return {
            ...errors,
            [name]: validateFieldFormProfile(name, value)
        }
    },{})

    return errorsResult;
}

export default validateValuesProfileForm;