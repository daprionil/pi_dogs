module.exports = function(
    {
        name,
        image,
        id,
        height,
        weight,
        temperament,
        yearsOld,
        life_span,
        Temperaments,
        reference_image_id
    }
){
    //https://cdn2.thedogapi.com/images/HyL3bl94Q.jpg
    return {
        name,
        image: image ?
            typeof image !== 'string' ? image.url : image
        : `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`,
        id,
        height: typeof height !== 'string' ?
            extractMediaOfWeightHeight(height)
        : height,
        weight:typeof weight !== 'string' ?
            extractMediaOfWeightHeight(weight)
        : weight,
        Temperaments: temperament ?
                    temperament.split(',').map(v => ({nombre:v})) :
                    Temperaments,
        yearsOld: yearsOld || life_span.split(' ')[0],
    }
};

function extractMediaOfWeightHeight(len){
    const [one,two] = Object.entries(len).map(([k, val]) => {
        const [first,,other] = val.split(' ') ;
        return ((Number(first) + Number(other)) / 2);
    });
    return `${(one + two / 2).toFixed(1)}`
};