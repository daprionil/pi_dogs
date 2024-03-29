import { styled } from "styled-components";
import CardDog from "./CardDog";
import SectionDefaultNullish from "./SectionDefaultNullish";
import { useHomeContext } from "../context/HomeDogsContext";
import Loader from '../base_components/Loader';

function ListDogs() {
    const [dataContextHome] = useHomeContext();
    const dogs = [...dataContextHome.filtered_dogs_context[dataContextHome.page_current ?? 0] || []]

    return (
        <ListDogsStyled>
            <h2 className="title_list_dogs">Lista de Razas</h2>
            {
                dataContextHome.loading ?
                    <Loader></Loader>
                :
                    dogs.length ? //If exist dogs for display
                        
                        dogs.map((dog) => {
                            return <CardDog {...dog} key={dog.id}/>
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