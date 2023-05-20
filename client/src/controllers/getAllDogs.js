const getAllDogs = async function(){
    const response = await fetch(`${import.meta.env.VITE_URL_API}/dogs`);
    const data = await response.json();
    
    return data;
};

export default getAllDogs;