import { styled } from "styled-components";
import CardDog from "./CardDog";

function ListDogs({dogs=[]}) {
    return (
        <ListDogsStyled>
            <h2 className="title_list_dogs">Lista de Razas</h2>
            {
                Boolean(dogs.length)? dogs.map((dog,i) => {
                    return <CardDog {...dog} key={dog.id}/>
                }) : <p>No hay elementos por mostrar</p>
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