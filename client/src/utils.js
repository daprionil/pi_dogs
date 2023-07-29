//! Take an Array and Split it by Pages
const parseDogsPaginator = function(elements){
    const nPerPage = 8;
    const nPages = Math.ceil(elements.length / nPerPage);

    let pagesDogs = [];

    for(let i = 0; i < nPages; i++){
        const startPage = nPerPage*i;
        pagesDogs.push(elements.slice(startPage, startPage + nPerPage));
    }
    return pagesDogs;
};

const filteredDogsByAttributes = function(dogs,{min,max, temperament, database, order}){
    const filteredDogs = dogs.filter(({weight}) => {
        if(min !== 0){
            return parseFloat(weight) >= parseFloat(min)
        }
        return true;
    }).filter(({weight}) => {
        //* Filter by max weight
        if(max !== 0){
            return parseFloat(weight) <= parseFloat(max)
        }
        return true;
    }).filter(({Temperaments}) => {
        if(Temperaments && temperament !== ''){
            const temps = Temperaments.map(({nombre}) => nombre);
            return temps.includes(temperament);
        }
        return true;
    }).filter(({db}) => {
        if(database){
            return db;
        }
        return true
    }).sort(({name:nA},{name:nB}) => {
        const [n1,n2] = [nA.toLowerCase().charCodeAt(), nB.toLowerCase().charCodeAt()];
        if(order){
            return n2-n1;
        }
        return n1-n2;
    });
    return filteredDogs;
};

//? FORM CREATEDOG FUNCTIONS
//* Dictionaries
const dictionaryValuesForm = {
    name:'nombre',
    height:'altura',
    weight:'peso',
    yearsOld: 'años de edad',
    image:'imagen',
};
const validateFormEmptyFields = (values) => {
    let localError = '';

    const arrayEntries = Object.entries(values);
    const validation = arrayEntries.some( ([key,val]) => {
        //* Validate strings in form
        if(typeof val === 'string'){
            const validate = !val.trim().length;
            if(validate){
                localError = `El ${dictionaryValuesForm[key]} no puede estar vacío`
            }
            return validate;
        }

        //* Validate length in temperaments field
        if(key === 'temperaments'){
            const validate = !(val.length >= 2);
            if(validate){
                localError = `Debes de tener por lo menos 2 temperamentos`
            }
            return validate;
        }
        
        //* Validate if this is a filed empty
        const lastValidate = !val.length;
        if(lastValidate){
            localError = `El ${dictionaryValuesForm[key]} no es válido`
        }
        return lastValidate;
    })
    return [validation,localError];
};

//* Validate Values
const limitValuesFunction = (val) => {
    const parsedValue = parseInt(val);
    return parsedValue > 0 && parsedValue <= 100
};

const specialValidationsFormCreateDog = {
    height:limitValuesFunction,
    weight:limitValuesFunction,
    name: val => val.trim().length < 50,
    yearsOld:limitValuesFunction,
};

const validateSpecialValuesForm = (values) => {
    let localError = '';
    const arrayEntries = Object.entries(values);
    const validation = arrayEntries.some(([key,val]) => {
        //* Get special validate for one field in the form
        const specialValidate = specialValidationsFormCreateDog[key];
    
        if(specialValidate){
            const validation = !specialValidate(val);
            //* Set error to display
            if(validation) localError = `El campo ${dictionaryValuesForm[key]} no es válido`;
            return validation;
        }
        return false;
    });
    return [validation, localError]
};

export {
    parseDogsPaginator,
    filteredDogsByAttributes,
    validateFormEmptyFields,
    validateSpecialValuesForm
}