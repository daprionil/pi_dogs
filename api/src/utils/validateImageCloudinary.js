
//? Valida si el archivo cuenta con una extensión válida para Cloudinary
module.exports = function(imageFileObject){
    const MAX_SIZE_FILE = 2500000;
    const validExtensions = [
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];

    const typeFile = imageFileObject.type;
    const sizeFile = imageFileObject.size;

    const validationSize = sizeFile <= MAX_SIZE_FILE;

    if(!imageFileObject) throw new Error('No hay una imágen');

    if(!validExtensions.includes(typeFile) && !validationSize){
        throw new Error('No es una extensión de archivo permitida [jpg, png, jpeg] - Max 2.5mb');
    };
};