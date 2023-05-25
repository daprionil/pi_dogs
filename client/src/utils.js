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

export {
    parsedDogsFavorite,
    setStorageValue,
    getStorageValue
}