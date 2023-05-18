const { Router } = require('express');

// Require handlers in each file directory
const { getAllDogs, getDogByRaza, getDogsByName, createDog } = require('../handlers/DogsHandlers');


//Create Router
const routerDogs = new Router();

//? GET - return all dogs
routerDogs.get('/', getAllDogs);

//? GET - return Dog by Pk
routerDogs.get('/:idRaza', getDogByRaza);

//? GET - return dogs filtered by name
routerDogs.get('/name', getDogsByName);

//? POST - Create a Dog
routerDogs.post('/', createDog);

module.exports = routerDogs;