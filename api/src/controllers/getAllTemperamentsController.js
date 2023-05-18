const { Dog, Temperament } = require('../db');

const getAllTemperamentsController = async () => {
    const elements = await Temperament.findAll({
        include: {
            model: Dog,
            through:{
                attributes:[]
            }
        }
    });
    return elements;
};

module.exports =  getAllTemperamentsController;