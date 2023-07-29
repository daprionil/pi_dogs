const { default: axios } = require('axios');

const {fixedDog} = require('../utils/fixedDog');
const { URL_API, API_KEY } = process.env;

module.exports = async function(){
    const dataAPI = await axios({
        method:'GET',
        url:`${URL_API}`,
        headers:{
            'x-api-key':API_KEY,
            'Content-Type':'application/json'
        }
    });

    //* Parse Data GET from API
    return dataAPI.data.map(dog => fixedDog(dog));
}