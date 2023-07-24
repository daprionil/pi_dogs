import imageBackgroundText from '../assets/bg_landing_page.webp';

import { useDispatch, useSelector } from "react-redux";
import GroupPageDefault from "../components/GroupPageDefault";
import CardDog from "../components/CardDog";
import { styled } from "styled-components";
import { parsedDogsFavorite } from "../utils";
import { addDogFavorite, deleteDogFavorite } from "../redux/createActions";
import { Title } from 'react-head';

function PageMeDogs() {
    const dispatchRedux = useDispatch();
    const dogsFavorites = useSelector(({favorite_dogs}) => {
        return parsedDogsFavorite([...favorite_dogs.entries()].map(([,dog]) => dog), favorite_dogs);
    });
    
    const addToFavoriteDog = (id, favorite) => {
        if(favorite){
            dispatchRedux(deleteDogFavorite(id));
            return;
        }
        dispatchRedux(addDogFavorite(id));
    };

    return (
        <GroupPageDefault>
            <Title>Dogest - Favoritos</Title>
            <ListFavoritesPage>
                <h1>Mi Lista de Favoritos</h1>
                <article>
                    {
                        Boolean(dogsFavorites.length) && dogsFavorites.map(dog => (
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