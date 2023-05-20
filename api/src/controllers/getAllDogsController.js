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
            image: typeof image !== 'string' ? image.url : image,
            id,
            height: typeof height !== 'string' ?
                extractMediaOfWeightHeight(height)
            : height,
            weight:typeof weight !== 'string' ?
                extractMediaOfWeightHeight(weight)
            : weight,
            Temperaments: temperament ?
                        temperament.split(',').map(v => ({nombre:v})) :
                        Temperaments,
            yearsOld: yearsOld || life_span.split(' ')[0],
        }
    ));

    return [...response, ...mapDataAPI];
};

function extractMediaOfWeightHeight(len){
    const [one,two] = Object.entries(len).map(([k, val]) => {
        const [first,,other] = val.split(' ') ;
        return ((Number(first) + Number(other)) / 2);
    });
    return `${(one + two / 2).toFixed(1)}`
};

module.exports = getAllDogsController;