const { validate } = require('uuid');
const { Dog, Temperament } = require('../db');
const getAllDogsApiController = require('./getAllDogsApiController');

const getDogByIdController = async (id) => {
    const idDog = Number(id);

    const validateUUID = validate(id);
    let findDog;

    if(validateUUID){
        findDog = await Dog.findByPk(id,{
            include:{
                model:Temperament,
                attributes: ['nombre'],
                through:{
                    attributes:[]
                }
            }
        });
    }else{
        const dogsApi = await getAllDogsApiController();
        findDog = dogsApi.find(({id}) => {
            return idDog === id
        }) || null;
    };

    if(!findDog) throw new Error("The dog you're trying to find doesn't exist");
    return findDog;
};
module.exports = getDogByIdController;