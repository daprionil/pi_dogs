import { styled } from "styled-components";

function SearchBarHome() {
    return (
        <SearchBarStyled>
            <article>
                <h3>Busca La Raza que Prefieras</h3>
                <input type="search" name="nameSearch" placeholder="Escribe el nombre"/>
            </article>
        </SearchBarStyled>
    );
}

const SearchBarStyled = styled.section`
    padding: 10px;
    article{
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
        & input[type="search"]{
            box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
            border-radius: 10px;
            padding: 10px;
            
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
        }
    }
`;

export default SearchBarHome;