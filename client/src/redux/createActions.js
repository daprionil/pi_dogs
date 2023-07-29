import getAllTemperaments from '../controllers/getAllTemperaments';
import getAllDogs from '../controllers/getAllDogs';
import {
    ADD_DOGS,
    SET_DOG_FAVORITE,
    SET_TEMPERAMENTS
} from './actionTypes';
import addFavoriteDogFirebase from '../controllers/addFavoriteDogFirebase';
import getFavoriteDogs from '../controllers/getFavoriteDogs';

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

const addDogFavorite = ({uid, dogData}) => {
    return function(dispatch){
        addFavoriteDogFirebase(uid, dogData).then((favorite_dogs) => {
            dispatch({
                type: SET_DOG_FAVORITE,
                payload: favorite_dogs
            })
        });
    }
};

const getDogsFavorite = ({uid}) => {
    return function(dispatch){
        getFavoriteDogs(uid).then(favorite_dogs => {
            dispatch({
                type: SET_DOG_FAVORITE,
                payload: favorite_dogs
            })
        });
    }
};

const deleteDogFavorite = (id) => ({
    type: SET_DOG_FAVORITE,
    payload:id 
});

export {
    getDogs,
    addDogFavorite,
    deleteDogFavorite,
    getTemperaments,
    getDogsFavorite
}