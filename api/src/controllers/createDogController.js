const { Dog } = require('../db');//Get from database.models in db.js

const createDogController = async ({temperaments, ...dataDog}) => {
    //* Generate Dog in Model
    const createdDog = await Dog.create(dataDog);

    //* Add relations to new Dog created
    await createdDog.addTemperaments(temperaments);

    //* Return Dog
    return createdDog;
};

module.exports = createDogController;