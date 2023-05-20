const getDogsByName = async ({name}) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/dogs/name?q=${name}`);
    const data = await response.json();
    return data;
};

export default getDogsByName;