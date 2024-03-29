import { createContext, useContext, useEffect, useReducer } from "react";
import { parseDogsPaginator, filteredDogsByAttributes } from "../utils";

const homeContext = createContext();
const useHomeContext = () => {
    return useContext(homeContext);
};

//* Type Actions
const CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE";
const SET_DOGS_CONTEXT = 'SET_DOGS_CONTEXT';
const SET_LOADING = "SET_LOADING";
const SET_DOGS_FILTERED = 'SET_DOGS_FILTERED';

//* Create Type Actions
const setLoading = (value) => ({
    type: SET_LOADING,
    payload: value
});

const changeCurrentPage = (page) => {
    return {
        type: CHANGE_CURRENT_PAGE,
        payload: page
    }
};

const setDogsContext = (dogs) => {
    //* Parse Dogs received
    const currentDogsFiltered = parseDogsPaginator(dogs);
    return {
        type: SET_DOGS_CONTEXT,
        payload: currentDogsFiltered
    };
};

const filterDogsContext = ({min,max, temperament,database,order}) => {
    return {
        type: SET_DOGS_FILTERED,
        payload: {min,max,temperament,database,order}
    };
};

//? Generate context
const reducerContext = function(state, {type,payload}){
    const typeAction = ({
        [`${SET_DOGS_CONTEXT}`]:() => {
            return {
                ...state,
                dogs_context: payload,
                filtered_dogs_context: payload
            };
        },
        [`${CHANGE_CURRENT_PAGE}`]: () => {
            return {
                ...state,
                page_current: payload
            };
        },
        [`${SET_LOADING}`]: () => {
            return {
                ...state,
                loading: payload
            };
        },
        [`${SET_DOGS_FILTERED}`]:() => {
            const {min,max,temperament,database,order} = payload;
            const dogsFiltered = filteredDogsByAttributes(state.dogs_context.flat(),{min,max, temperament, database,order});
            const parsedDogs = parseDogsPaginator(dogsFiltered);
            return {
                ...state,
                filtered_dogs_context:parsedDogs
            }
        }
    })[type];
    return typeAction ? typeAction() : state;
};

//* Fixed Initial State

const initialState = {
    dogs_context:[],
    page_current:  null,
    loading:false,
    filtered_dogs_context:[]
};

function HomeDogsContext({children}) {
    const [data, dispatch] = useReducer(reducerContext, initialState);

    useEffect(() => {
        if(data.page_current === null){
            const backCurrentPage = new URLSearchParams(window.location.search).get('page') || 0;
            dispatch(changeCurrentPage(backCurrentPage));
            return;
        }
        window.history.pushState({},'',`?page=${data.page_current}`);
    },[data.page_current]);

    return (
        <homeContext.Provider value={[data, dispatch]}>
            {children}
        </homeContext.Provider>
    );
}

export default HomeDogsContext;
export {
    homeContext,
    changeCurrentPage,
    setDogsContext,
    setLoading,
    filterDogsContext,
    useHomeContext
};