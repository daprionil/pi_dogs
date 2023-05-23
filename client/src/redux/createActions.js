import getAllDogs from '../controllers/getAllDogs';
import {
    ADD_DOGS,
    ADD_DOG_FAVORITE,
    DELETE_DOG_FAVORITE
} from './actionTypes';

const getDogs = function(){
    return async function(dispatch){
        const dogs = await getAllDogs();
        dispatch({type:ADD_DOGS, payload: dogs});
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
    deleteDogFavorite
}