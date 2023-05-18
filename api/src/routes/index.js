const { Router } = require('express');

// Importar todos los routers;
const routerDogs = require('./routerDogs');
const routerTemperaments = require('./routerTemperaments');

//Main Router
const router = Router();

// Configurar los routers
router.use('/dogs', routerDogs);
router.use('/temperaments', routerTemperaments);


module.exports = router;
