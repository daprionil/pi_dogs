const { Router } = require('express');

// Importar todos los routers;
const routerDogs = require('./routerDogs');
const routerTemperaments = require('./routerTemperaments');
const routerCloudinary = require('./routerCloudinary');

//Main Router
const router = Router();

// Configurar los routers
router.use('/dogs', routerDogs);
router.use('/temperaments', routerTemperaments);
router.use('/upload_images', routerCloudinary);


module.exports = router;
