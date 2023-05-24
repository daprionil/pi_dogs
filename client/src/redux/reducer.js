import { ADD_DOGS, ADD_DOG_FAVORITE, DELETE_DOG_FAVORITE, NAME_STORAGE_FAVORITES } from './actionTypes';
import {getStorageValue, parsedDogs} from '../utils';
import { setStorageValue } from '../utils';

const storageFavoritesValues = getStorageValue(NAME_STORAGE_FAVORITES);

const initialState = {
    favorite_dogs: new Map(storageFavoritesValues),
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
            newFavoriteDogs.set(payload, {...dog, favorite: true});

            //? Set values in the storage
            setStorageValue(NAME_STORAGE_FAVORITES, [...newFavoriteDogs])

            return {
                ...state,
                favorite_dogs: newFavoriteDogs
            };
        },
        [`${DELETE_DOG_FAVORITE}`]:() => {
            const dogsPrev = new Map([...state.favorite_dogs]);
            dogsPrev.delete(payload);

            //? Set values in the storage
            setStorageValue(NAME_STORAGE_FAVORITES, [...dogsPrev]);

            return {
                ...state,
                favorite_dogs: dogsPrev
            };
        }
    })[type];
    return typeAction ? typeAction() : state;
};

export default rootReducer;