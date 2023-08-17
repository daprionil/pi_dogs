const uploadImageCloudinary = require("../controllers/uploadImageCloudinary");
const validateImageCloudinary = require("../utils/validateImageCloudinary");

const uploadImageHandler = async (req,res) => {
    try {
        const { imageCloud } = req.files;

        //? Valida las propiedades de la imágen
        validateImageCloudinary(imageCloud);
        const imageUrlCloudinary = await uploadImageCloudinary(imageCloud.path);
        const {secure_url} = imageUrlCloudinary;

        //! Response to client with an object json
        res.json({secure_url, originalFilename: imageCloud.originalFilename});
    } catch ({message}) {
        //? If exist an error send this json response
        res.json({error: message});
    };
};

module.exports = {
    uploadImageHandler
}