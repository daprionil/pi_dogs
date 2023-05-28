async function createADog({image, name, height, weight, yearsOld, temperaments}){
    const valuesDog = {image, name, height, weight, yearsOld, temperaments};
    const optionsFetch = {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(valuesDog)
    };
    const response = await fetch(`${import.meta.env.VITE_URL_API}/dogs`,optionsFetch);
    const createdDog = await response.json();
    return createdDog;
};

export default createADog;