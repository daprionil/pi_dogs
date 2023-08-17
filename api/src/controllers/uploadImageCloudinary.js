const { v2:cloudinary } = require("cloudinary");

//? Recibe el path de la imágen alojada en tmp
module.exports = async function(imagePath){
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false
    };
    const response = await cloudinary.uploader.upload(imagePath, options);
    
    return response;
};