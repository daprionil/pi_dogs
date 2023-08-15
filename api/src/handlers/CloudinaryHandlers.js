const uploadImageCloudinary = require("../controllers/uploadImageCloudinary");
const validateImageCloudinary = require("../utils/validateImageCloudinary");

const uploadImageHandler = async (req,res) => {
    try {
        console.log(req, req);
        const { imageCloud } = req.files;

        validateImageCloudinary(imageCloud);
        const imageUrlCloudinary = await uploadImageCloudinary(imageCloud.path);
        const {secure_url} = imageUrlCloudinary;

        res.json({secure_url, originalFilename: imageCloud.originalFilename});
    } catch ({message}) {
        res.json({error: message});
    };
};

module.exports = {
    uploadImageHandler
}