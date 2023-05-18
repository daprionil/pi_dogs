const { Dog, Temperament } = require('../db');

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
    return response;
};

module.exports = getAllDogsController;