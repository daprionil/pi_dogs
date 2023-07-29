import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

import GroupPageDefault from '../components/GroupPageDefault'
import BannerHomePage from '../components/BannerHomePage';
import SearchBarHome from '../components/SearchBarHome';
import PaginatorDogsHome from '../components/PaginatorDogsHome';

import ListDogs from '../components/ListDogs';
import { useEffect } from 'react';
import { setDogsContext, setLoading, useHomeContext } from '../context/HomeDogsContext';
import FilterDogsHome from '../components/FilterHomeDogs';
import { Title } from 'react-head';
import { useAuthFirebase } from '../context/AuthProvider';


function Home() {
    //* Get dogs from Global Store
    const usuario = useAuthFirebase();
    const [,dispatchHome] = useHomeContext();
    const {all_dogs, favorite_dogs} = useSelector(({all_dogs, favorite_dogs}) => ({all_dogs, favorite_dogs}));

    //* Set dogs in local Component state
    useEffect(() => {
        dispatchHome(setLoading(true));
        if(usuario && !favorite_dogs) return;
        if(all_dogs.length){
            dispatchHome(setLoading(false));
            //* Set new Data in the state dogs context
            dispatchHome(setDogsContext(all_dogs));
        }
    },[all_dogs]);

    return (
        <GroupPageDefault>
            <Title>Dogest - Home</Title>
            <MainStyled>
                <SearchBarHome dogsRedux={all_dogs}/>
                <BannerHomePage />
                <FilterDogsHome />
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