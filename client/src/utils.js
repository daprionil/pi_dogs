const parsedDogsFavorite = (payload, favorite_dogs) => payload.map(dog => ({
    ...dog,
    favorite: favorite_dogs.has(dog.id)
}));

const setStorageValue = (name,value) => {
    return localStorage.setItem(name, JSON.stringify(value));
}

const getStorageValue = (name) => {
    return JSON.parse(localStorage.getItem(name));
};

//! Take an Array and Split it by Pages
const parseDogsPaginator = function(elements){
    const nPerPage = 8;
    const nPages = Math.ceil(elements.length / nPerPage);

    let pagesDogs = [];

    for(let i = 0; i < nPages; i++){
        const startPage = nPerPage*i;
        pagesDogs.push(elements.slice(startPage, startPage + nPerPage));
    };

    return pagesDogs;
};

const filteredDogsByAttributes = function(dogs,{min,max, temperament}){
    const filteredDogs = dogs.filter(({weight}) => {
        if(min !== 0){
            return parseFloat(weight) >= parseFloat(min)
        }
        return true;
    }).filter(({weight}) => {
        //* Filter by max weight
        if(max !== 0){
            return parseFloat(weight) <= parseFloat(max)
        }
        return true;
    }).filter(({Temperaments}) => {
        if(Temperaments && temperament !== ''){
            const temps = Temperaments.map(({nombre}) => nombre);
            return temps.includes(temperament);
        }
        return true;
    });
    return filteredDogs;
};

export {
    parsedDogsFavorite,
    setStorageValue,
    getStorageValue,
    parseDogsPaginator,
    filteredDogsByAttributes
}