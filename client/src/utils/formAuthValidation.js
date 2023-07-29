export const messageEmptyFieldValue = {
    email: 'El Correo Electrónico no puede estar vacío',
    password: 'La contraseña no puede estar vacía',
    password2: 'La contraseña de validación no puede estar vacía'
};

export const messageSpecialValidationField = {
    email: 'El Correo Electrónico no es válido',
    password: 'La contraseña debe contener mayusculas, minusculas y 3 números ',
    password2: 'Las contraseñas no coinciden'
};

const specialValidations = {
    email: val => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val),
    password: p => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(p),
    password2: (p,p2) => p === p2
}

const validateValues = (values) => {
    let errors = [];
    for(let [key,val] of Object.entries(values)){
        if(!val){
            errors.push([
                key,
                messageEmptyFieldValue[key] ?? `El ${key} no puede estar vacío`
            ])
            continue;
        }

        const specialValidation = specialValidations[key];
        if(specialValidation){
            if(!specialValidation(val, values['password'])){
                errors.push([
                    key,
                    messageSpecialValidationField[key]
                ])
            }
        }
    }

    return errors || null;
};

export {
    validateValues
}