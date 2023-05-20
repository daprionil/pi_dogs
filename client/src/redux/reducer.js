import { ADD_DOGS } from './actionTypes';

const numberPerPage = 20;

const initialState = {
    favorite_dogs:[],
    all_dogs:[]
};

const rootReducer = function(state = initialState, {type, payload}){
    const typeAction = ({
        [`${ADD_DOGS}`]: () => {
            return {
                ...state,
                all_dogs: payload
            }
        }
    })[type];
    return typeAction ? typeAction() : state;
};

export default rootReducer;