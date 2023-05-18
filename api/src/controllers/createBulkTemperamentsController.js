const { Temperament } = require('../db');

const createBulkTemperamentsController = async ({temperaments}) => {
    let finalTemperaments = temperaments;
    
    if(!finalTemperaments[0].name){
        finalTemperaments = finalTemperaments.map(temp => ({nombre:temp}));
    };
    
    const createdTemperaments = await Temperament.bulkCreate(finalTemperaments);
    return createdTemperaments;
};

module.exports = createBulkTemperamentsController;