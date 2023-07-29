import imageBackgroundText from '../assets/bg_landing_page.webp';

import { useDispatch, useSelector } from "react-redux";
import GroupPageDefault from "../components/GroupPageDefault";
import CardDog from "../components/CardDog";
import { styled } from "styled-components";
import { addDogFavorite, deleteDogFavorite } from "../redux/createActions";
import { Title } from 'react-head';
import { useEffect } from 'react';

import { useAuthFirebase } from '../context/AuthProvider';
import getFavoriteDogs from '../controllers/getFavoriteDogs';

function PageMeDogs() {
    const usuario = useAuthFirebase();
    const dispatchRedux = useDispatch();
    const dogsFavorites = useSelector(({favorite_dogs}) => favorite_dogs);
    const { uid } = useAuthFirebase();
    
    const addToFavoriteDog = ({id, dogData, favorite}) => {
        if(favorite){
            dispatchRedux(deleteDogFavorite({nameDog: dogData.name, uid: usuario.uid}));
            return;
        }
        dispatchRedux(addDogFavorite({id, uid: usuario.uid, dogData}));
    };

    useEffect(() => {
        getFavoriteDogs(uid).then(console.log);
    },[]);

    return (
        <GroupPageDefault>
            <Title>Dogest - Favoritos</Title>
            <ListFavoritesPage>
                <h1>Mi Lista de Favoritos</h1>
                <article>
                    {
                        dogsFavorites.length && dogsFavorites.map(dog => (
                            <CardDog addDogFavorite={addToFavoriteDog} {...dog} key={dog.id}/>
                        ))
                    }
                </article>
            </ListFavoritesPage>
        </GroupPageDefault>
    );
}

const ListFavoritesPage = styled.section`
    padding: 0 10px;
    
    max-width: 1100px;
    margin: 0 auto;
    margin-bottom: 100px;

    & h1{
        @media (max-width: 900px) {
            font-size: 1.7rem;
        }

        padding: 20px 10px;
        font-size: 2.2rem;
        text-align: center;
        
        filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
        text-shadow:inset 0 0 5px rgba(0,0,0,0.1);
        

        background:linear-gradient(#202020, #ffffff64) ,url(${imageBackgroundText});
        background-size: contain;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
    & article{
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(300px,1fr));
        gap: 10px;
    }
`;

export default PageMeDogs;