const { default: axios } = require('axios');
const { Dog, Temperament } = require('../db');
const { URL_API, API_KEY } = process.env;

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
    const dataAPI = await axios({
        method:'GET',
        url:`${URL_API}`,
        headers:{
            'x-api-key':API_KEY,
            'Content-Type':'application/json'
        }
    });

    //* Parse Data GET from API
    const mapDataAPI = dataAPI.data.map(({
        name,
        image,
        id,
        height,
        weight,
        temperament,
        yearsOld,
        life_span,
        Temperaments
    }) => (
        {
            name,
            image,
            id,
            height,
            weight,
            Temperaments: temperament ? temperament.split(',')  : Temperaments,
            yearsOld: yearsOld || life_span.split(' ')[0],
        }
    ));

    return [...response, ...mapDataAPI];
};

module.exports = getAllDogsController;