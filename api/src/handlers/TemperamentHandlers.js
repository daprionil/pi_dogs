const getAllTemperamentsController = require('../controllers/getAllTemperamentsController');

const getAllTemperaments = async (req,res) => {
    try {
        const temperaments = await getAllTemperamentsController();
        res.status(200).json({results:temperaments});
    } catch ({message}) {
        res.status(400).json({error:message});
    };
};

module.exports = {
    getAllTemperaments
}