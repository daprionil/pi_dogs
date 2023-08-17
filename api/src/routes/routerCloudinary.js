const { Router } = require('express');
const { uploadImageHandler } = require('../handlers/CloudinaryHandlers');

const routerCloudinary = Router();

routerCloudinary.post('/', uploadImageHandler);

module.exports = routerCloudinary;