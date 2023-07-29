const fixedDog = function({name,image,id,height,weight,temperament,yearsOld,life_span,Temperaments,reference_image_id}){
    return {
        name,
        image: parseImageDog(image, reference_image_id),
        id,
        height: getAverageHeightOrWeight(height),
        weight: getAverageHeightOrWeight(weight),
        Temperaments: getAndParseTemperaments(temperament, Temperaments),
        yearsOld: getYearsOld(yearsOld, life_span),
    }
};

function extractMediaOfWeightHeight(len){
    if(!len) return 0;

    //* Validate if the object have 2 attributes
    const values = Object.entries(len).length;
    if(values !== 2) return 0;

    const [one,two] = Object.entries(len).map(([k, val]) => {
        const [first,,other] = val.split(' ') ;
        return ((Number(first) + Number(other)) / 2);
    });

    return `${(one + two / 2).toFixed(1)}`
};

function parseImageDog(image, reference_image_id){
    const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs9QCE6xoS_WQHh0P-Neg4IHTzcUb3jmSRuIYcnVnOVQEFx6hfz8hJmseWsgCoVtxVfos&usqp=CAU';

    const imageOrUrlImage = image?.url ?? image;
    const validateUrl = isValidUrl(imageOrUrlImage);
    if( validateUrl || reference_image_id){
        if(validateUrl) return imageOrUrlImage;
        if(reference_image_id) return `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`;
    };
    return defaultImageUrl;
};

function getAverageHeightOrWeight(average){
    return typeof average !== 'string' ?
                extractMediaOfWeightHeight(average)
            : average;
};

function getAndParseTemperaments(temperament, Temperaments){
    return temperament ?
    temperament.split(',').map(v => ({nombre:v})) :
    Temperaments
};

function getYearsOld(yearsOld, life_span){
    const validateYearNumber = (val) => Number(`${val}` || 'nada');

    const validation = !isNaN(validateYearNumber(yearsOld)) && !life_span;
    if(validation) return yearsOld;
    
    if(!life_span || typeof life_span !== 'string'){
        return 0;
    };

    const yearLifeSpan = life_span.split(' ')[0];
    if(isNaN(validateYearNumber(yearLifeSpan))) return 0;
    
    return yearLifeSpan;
};


//* Validate URL
const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
};

module.exports = {
    fixedDog,
    parseImageDog,
    getAverageHeightOrWeight,
    getYearsOld,
    getAndParseTemperaments
}