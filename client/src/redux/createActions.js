import getAllTemperaments from '../controllers/getAllTemperaments';
import getAllDogs from '../controllers/getAllDogs';
import {
    ADD_DOGS,
    ADD_DOG_FAVORITE,
    DELETE_DOG_FAVORITE,
    SET_TEMPERAMENTS
} from './actionTypes';

//getAllTemperaments

const getDogs = function(){
    return async function(dispatch){
        const dogs = await getAllDogs();
        dispatch({type:ADD_DOGS, payload: dogs});
    };
};

const getTemperaments = function(){
    return async function(dispatch){
        const temps = await getAllTemperaments();
        dispatch({type: SET_TEMPERAMENTS, payload: temps});
    };
};

const addDogFavorite = (id) => ({
    type: ADD_DOG_FAVORITE,
    payload:id   
});

const deleteDogFavorite = (id) => ({
    type: DELETE_DOG_FAVORITE,
    payload:id 
});

export {
    getDogs,
    addDogFavorite,
    deleteDogFavorite,
    getTemperaments
}