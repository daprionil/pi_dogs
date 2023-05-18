const { Router } = require("express");
const { getAllTemperaments } = require('../handlers/TemperamentHandlers');
//Create router temperaments
const routerTemperaments = new Router();

routerTemperaments.get('/', getAllTemperaments);

module.exports = routerTemperaments;