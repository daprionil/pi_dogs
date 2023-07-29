const getADog = async ({id}) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/dogs/${id}`);
    const data = await response.json();
    return data;
};

export default getADog;