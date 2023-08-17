
//? Valida si el archivo cuenta con una extensión válida para Cloudinary
//? Esta función recibe un Objeto Blob ArrayBuffer con la Imágen para validar
module.exports = function(imageFileObject){
    if(!imageFileObject) throw new Error('No hay una imágen');

    const MAX_SIZE_FILE = 2500000;
    const validExtensions = [
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];

    const typeFile = imageFileObject.type;
    const sizeFile = imageFileObject.size;

    const validationSize = sizeFile <= MAX_SIZE_FILE;

    if(!(typeFile && sizeFile))throw new Error('La carga de imágen ha fallado');
    
    if(!validExtensions.includes(typeFile) && !validationSize){
        throw new Error('No es una extensión de archivo permitida [jpg, png, jpeg] - Max 2.5mb');
    };
};