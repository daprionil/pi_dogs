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

export {
    getDogs
}