import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

import GroupPageDefault from '../components/GroupPageDefault'
import BannerHomePage from '../components/BannerHomePage';
import SearchBarHome from '../components/SearchBarHome';
import PaginatorDogsHome from '../components/PaginatorDogsHome';

import ListDogs from '../components/ListDogs';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


function Home() {
    //* Get dogs from Global Store
    const dogs = useSelector(({all_dogs}) => all_dogs);
    const [searchParams, setSearchParams] = useSearchParams();

    //* Generate State to Filter Dogs
    const [dogsFiltered, changeDogsFiltered] = useState([]);

    //? Change current page
    const setParamPage = ({page}) => {
        setSearchParams({page})
    };

    const setDogsFiltered = (dogs) => {
        //* Set new Data in the state dogsFiltered
        setParamPage({page:0});
        changeDogsFiltered(() => {
            //* When get new Dogs Data, reset param page 
            return parseDogsPaginator(dogs);
        });
    };


    //* Set dogs in local Component state
    useEffect(() => {
        if(dogs.length){
            setDogsFiltered(dogs);
        };
    },[dogs]);

    return (
        <GroupPageDefault>
            <MainStyled>
                <SearchBarHome setDogsFiltered={setDogsFiltered}/>
                <BannerHomePage />
                <ListDogs dogs={dogsFiltered[searchParams.get('page')?? 0]}/>
                <PaginatorDogsHome setParamPage={setParamPage} numberPages={dogsFiltered.length}/>
            </MainStyled>
        </GroupPageDefault>
    );
}

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

const MainStyled = styled.main`
    max-width: 1100px;
    margin: 0 auto;
    overflow: hidden;
`;

export default Home;