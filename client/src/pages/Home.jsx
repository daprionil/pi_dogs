import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

import GroupPageDefault from '../components/GroupPageDefault'
import BannerHomePage from '../components/BannerHomePage';
import SearchBarHome from '../components/SearchBarHome';
import PaginatorDogsHome from '../components/PaginatorDogsHome';

import ListDogs from '../components/ListDogs';
import { useContext, useEffect } from 'react';
import { setDogsFilteredContext, homeContext, setLoading } from '../context/HomeDogsContext';


function Home() {
    //* Get dogs from Global Store
    const dogs = useSelector(({all_dogs}) => all_dogs);
    
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
                <SearchBarHome />
                {/* <BannerHomePage /> */}
                <ListDogs />
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