const parsedDogs = (payload, favorite_dogs) => payload.map(dog => ({
    ...dog,
    favorite: favorite_dogs.has(dog.id)
}));

export {
    parsedDogs
}