const errorCreateDogs = {
    23505:({fields}) => {
        const [key,value] = Object.entries(fields).flat();
        return `El campo '${key}:${value}' ya existe en la Base de Datos`
    }
};

const getErrorsCreated = (error) => {
    const {original:{code}} = error;
    const errorField = errorCreateDogs[code];
    return errorField ? errorField(error) : 'Validation Error';
};

module.exports = getErrorsCreated;