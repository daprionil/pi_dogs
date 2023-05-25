import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

import GroupPageDefault from '../components/GroupPageDefault'
import BannerHomePage from '../components/BannerHomePage';
import SearchBarHome from '../components/SearchBarHome';
import PaginatorDogsHome from '../components/PaginatorDogsHome';

import ListDogs from '../components/ListDogs';
import { useContext, useEffect } from 'react';
import { setDogsFilteredContext, homeContext, setLoading } from '../context/HomeDogsContext';
import FilterDogsHome from '../components/FilterHomeDogs';


function Home() {
    //* Get dogs from Global Store
    const {all_dogs:dogs,favorite_dogs} = useSelector(({all_dogs,favorite_dogs}) => ({all_dogs,favorite_dogs}));
    
    const [,dispatchHome] = useContext(homeContext);

    //* Set dogs in local Component state
    useEffect(() => {
        dispatchHome(setLoading(true));
        if(dogs.length){
            dispatchHome(setLoading(false));
            //* Set new Data in the state dogsFiltered
            dispatchHome(setDogsFilteredContext(dogs));
        };
    },[dogs]);

    return (
        <GroupPageDefault>
            <MainStyled>
                <SearchBarHome dogsRedux={dogs}/>
                <BannerHomePage />
                <FilterDogsHome />
                <ListDogs favorite_dogs={favorite_dogs}/>
                <PaginatorDogsHome />
            </MainStyled>
        </GroupPageDefault>
    );
}

const MainStyled = styled.main`
    max-width: 1100px;
    margin: 0 auto;
    overflow: hidden;
`;

export default Home;