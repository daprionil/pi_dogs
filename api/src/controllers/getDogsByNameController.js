const { Op } = require('sequelize');
const { Dog, Temperament } = require('../db');
const { URL_API, API_KEY } = process.env;
const { default: axios } = require('axios');
const fixedDog = require('../utils/fixedDog');

const getDogsByNameController = async ({name}) => {
    const nameSearch = name || '';
    
    //* get in api search?q=
    const dogs = await axios({
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'x-api-key': API_KEY
        },
        url: `${URL_API}/search?q=${nameSearch}`
    });

    const dogsWasFixed = dogs.data.map(dog => fixedDog(dog));

    //* get dogs for Database
    const dogsDB = await Dog.findAll({
        where:{
            name:{
                [Op.iLike]: `%${nameSearch}%`
            }
        },
        include:{
            model: Temperament,
            attributes:['nombre'],
            through:{
                attributes:[]
            }
        }
    })
    return [...dogsDB,...dogsWasFixed];
}
module.exports = getDogsByNameController;