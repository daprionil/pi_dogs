import { styled } from "styled-components";
import CardDog from "./CardDog";
import SectionDefaultNullish from "./SectionDefaultNullish";
import { useHomeContext } from "../context/HomeDogsContext";
import Loader from '../base_components/Loader';
import { useDispatch } from "react-redux";

import { addDogFavorite, deleteDogFavorite } from "../redux/createActions";
import { useAuthFirebase } from "../context/AuthProvider";

function ListDogs() {
    const dispathRedux = useDispatch();
    const usuario = useAuthFirebase();
    const [dataContextHome] = useHomeContext();
    const dogs = [...dataContextHome.filtered_dogs_context[dataContextHome.page_current ?? 0] || []]

    const addToFavoriteDog = ({id, dogData, favorite}) => {
        if(favorite){
            dispathRedux(deleteDogFavorite(id));
            return;
        }
        dispathRedux(addDogFavorite({id, uid: usuario.uid, dogData}));
    };

    return (
        <ListDogsStyled>
            <h2 className="title_list_dogs">Lista de Razas</h2>
            {
                dataContextHome.loading ?
                    <Loader></Loader>
                :
                    dogs.length ? //If exist dogs for display
                        
                        dogs.map((dog,i) => {
                            return <CardDog {...dog} existUser={!!usuario} addDogFavorite={addToFavoriteDog} key={i}/>
                        })

                    : <SectionDefaultNullish
                        otherStyles={{gridColumn:"1/-1"}}
                        message="No Hay Perros en Tu Busqueda"
                    />
            }
        </ListDogsStyled>
    );
}

const ListDogsStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(300px, 1fr));
    gap: 10px;

    padding: 10px;

    & .title_list_dogs{
        @media (max-width: 776px){
            font-size: 1.7rem;
            text-align: center;
        }
        grid-column: 1/-1;
        padding: 10px;
        font-weight: 800;
        font-size: 2rem;
    }
`;

export default ListDogs;