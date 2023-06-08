const getAllDogsController = require('../controllers/getAllDogsController');
const createDogController = require('../controllers/createDogController');
const getDogByIdController = require('../controllers/getDogByIdController');
const getDogsByNameController = require('../controllers/getDogsByNameController');

const { validateValuesDog } = require('../utils/validateCreateDogUtils');
const getErrorsCreated = require('../utils/errorsCreateDog');

//? GET return all dogs in database
const getAllDogs = async (req, res) => {
    try {
        const allDogs = await getAllDogsController();
        res.status(200).json(allDogs);
    } catch ({ message }) {
        res.status(400).json({ error: message });
    };
};

//? GET - return a Dog by Pk
const getDogByRaza = async (req, res) => {
    try {
        const { idRaza } = req.params;
        const dogFind = await getDogByIdController(idRaza);

        res.status(200).json(dogFind);
    } catch ({ message }) {
        res.status(400).json({ error: message });
    };
};

//? GET - Filtered dogs by name
const getDogsByName = async (req, res) => {
    try {
        const { q } = req.query;
        const dogs = await getDogsByNameController({name:q});
        res.status(200).json(dogs);
    } catch ({message}) {
        res.status(400).json({error:message});
    };
};

//? POST - create Dog
/**
 * - Data para crear un nuevo Dog
 * - Recibida por Body
 * - Crear en la base de datos y relacionar con algún temperamento
 */
const createDog = async (req, res) => {
    try {
        //* Extract values of body request
        const { name, image, height, weight, yearsOld, temperaments } = req.body;
        
        //* Validate all values
        const dataDog = {
            name,
            image,
            height,
            weight,
            yearsOld,
            temperaments
        };
        
        const validateValues = validateValuesDog(dataDog);

        //* Control validations
        if(validateValues) throw new Error('No se encuentran todos los valores requeridos');

        //? Create a Dog with controller
        const createdDog = await createDogController(dataDog);

        res.status(200).json(createdDog);
    } catch (error) {
        const message = getErrorsCreated(error);
        res.status(400).json({error:message});
    };
};

module.exports = {
    getAllDogs,
    getDogByRaza,
    getDogsByName,
    createDog
}