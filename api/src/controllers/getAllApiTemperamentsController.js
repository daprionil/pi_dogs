const {default: axios} = require('axios');
const { URL_API, API_KEY} = process.env;

const getAllApiTemperaments = async () => {
    const response = await axios({
        method: 'GET',
        url: URL_API,
        headers:{
            'Content-Type':'application/json',
            'x-api-key': API_KEY
        }
    });
    
    //? Extract values of response
    const {data, status} = response;
    
    //! Validate if response is truthy
    if(status !== 200) throw new Error('Falla al obtener los temperamentos desde la API');
    
    //? Extract temperaments
    const temperaments = data.reduce((set, {temperament}) => {
        if(temperament){
            set.add(...temperament.split(','));
        }
        return set;
    }, new Set());
    
    return [...temperaments];
};

module.exports = getAllApiTemperaments;