const { Dog, Temperament } = require('../db');
const getAllDogsApiController = require('./getAllDogsApiController');

const getAllDogsController = async () => {
    const response = await Dog.findAll({
        include:{
            model: Temperament,
            attributes:['nombre'],
            through: {
                attributes:[]
            }
        }
    });

    //! Get values in API
    const dogsApi = await getAllDogsApiController();

    return [...response, ...dogsApi];
};

module.exports = getAllDogsController;