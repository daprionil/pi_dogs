const { Dog, Temperament } = require('../db');

const getDogByIdController = async (id) => {
    const findDog = await Dog.findByPk(id,{
        include:{
            model:Temperament,
            attributes: ['nombre'],
            through:{
                attributes:[]
            }
        }
    });
    
    if(!findDog) throw new Error("The dog you're trying to find doesn't exist");
    return findDog;
};
module.exports = getDogByIdController;