import { ADD_DOGS, ADD_DOG_FAVORITE, DELETE_DOG_FAVORITE } from './actionTypes';
import {parsedDogs} from '../utils';

const initialState = {
    favorite_dogs: new Map(),
    all_dogs:[]
};

const rootReducer = function(state = initialState, {type, payload}){
    const typeAction = ({
        [`${ADD_DOGS}`]: () => {
            const {favorite_dogs} = state;
            const newDogs = parsedDogs(payload, favorite_dogs);

            return {
                ...state,
                all_dogs: newDogs
            }
        },
        [`${ADD_DOG_FAVORITE}`]:() => {
            //* Find dog in AllDogs to Add in FavoriteDogs
            const dog = state.all_dogs.find(({id}) => id === payload);
            const newFavoriteDogs = new Map([...state.favorite_dogs]);
            newFavoriteDogs.set(payload, dog);

            return {
                ...state,
                favorite_dogs: newFavoriteDogs
            };
        },
        [`${DELETE_DOG_FAVORITE}`]:() => {
            const dogsPrev = new Map([...state.favorite_dogs]);
            dogsPrev.delete(payload);

            return {
                ...state,
                favorite_dogs: dogsPrev
            };
        }
    })[type];
    return typeAction ? typeAction() : state;
};

export default rootReducer;