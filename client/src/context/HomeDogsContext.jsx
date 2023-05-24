import { createContext, useEffect, useReducer } from "react";

const homeContext = createContext();

//* Type Actions
const CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE";
const SET_DOGS_FILTERED = 'SET_DOGS_FILTERED';
const SET_LOADING = "SET_LOADING";

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

const setDogsFilteredContext = (dogs) => {
    //* Parse Dogs received
    const currentDogsFiltered = parseDogsPaginator(dogs);
    return {
        type: SET_DOGS_FILTERED,
        payload: currentDogsFiltered
    };
};


/**
 * dogs_filtered
 * page_current
 */

//? Generate context
const reducerContext = function(state, {type,payload}){
    const typeAction = ({
        [`${SET_DOGS_FILTERED}`]:() => {
            return {
                ...state,
                dogs_filtered: payload
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
        }
    })[type];
    return typeAction ? typeAction() : state;
};

//* Fixed Initial State

const initialState = {
    dogs_filtered:[],
    page_current:  null,
    loading:false
};

function HomeDogsContext({children}) {
    const [data, dispatch] = useReducer(reducerContext, initialState);
    
    useEffect(() => {
        if(!data.page_current){
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
};

//! Take an Array and Split it by Pages
const parseDogsPaginator = function(elements){
    const nPerPage = 20;
    const nPages = Math.ceil(elements.length / nPerPage);

    let pagesDogs = [];

    for(let i = 0; i < nPages; i++){
        const startPage = nPages*i;
        pagesDogs.push(elements.slice(startPage, startPage + nPerPage));
    };

    return pagesDogs;
};

export default HomeDogsContext;
export {
    homeContext,
    changeCurrentPage,
    setDogsFilteredContext,
    setLoading
};