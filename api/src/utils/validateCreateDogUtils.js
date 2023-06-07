const validateValuesDog = (dataDog) =>  {
    return Object.entries(dataDog).some(([key,val]) => {
        if(key === 'temperaments' && typeof val !== 'object'){
            return true;
        }
        return !Boolean(typeof val === 'object' ? Object.values(val).length : val);
    });
}
module.exports = {
    validateValuesDog
}