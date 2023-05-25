const getAllTemperaments = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/temperaments`);
    const data = await response.json();
    return data.results;
};
export default getAllTemperaments;