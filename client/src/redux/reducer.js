import { ADD_DOGS, SET_DOG_FAVORITE, SET_TEMPERAMENTS } from './actionTypes';

const initialState = {
    favorite_dogs: [],
    all_dogs:[],
    all_temperaments:[]
};

const rootReducer = function(state = initialState, {type, payload}){
    const typeAction = ({
        [`${ADD_DOGS}`]: () => {
            const favorites = state.favorite_dogs.map(({id}) => id);
            const newDogsWithFavorites = new Set([...payload.map(dog => (
                {...dog, favorite: favorites.includes(dog.id)}
            ))]);
            
            return {
                ...state,
                all_dogs: [...newDogsWithFavorites]
            }
        },
        [`${SET_DOG_FAVORITE}`]:() => {
            const favorites = payload.map(({id}) => id);
            const newDogsWithFavorites = new Set([...state.all_dogs.map(dog => (
                {...dog, favorite: favorites.includes(dog.id)}
            ))]);

            return {
                ...state,
                all_dogs: [...newDogsWithFavorites],
                favorite_dogs: favorites
            };
        },
        [`${SET_TEMPERAMENTS}`]: () => {
            return {
                ...state,
                all_temperaments:payload
            }
        }
    })[type];
    return typeAction ? typeAction() : state;
};

export default rootReducer;