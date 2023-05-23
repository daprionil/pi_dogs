import { styled } from "styled-components";
import Button from "../base_components/Button";
import getDogsByName from "../controllers/getDogsByName";
import { useContext } from "react";
import { changeCurrentPage, homeContext, setDogsFilteredContext, setLoading } from "../context/HomeDogsContext";

function SearchBarHome() {
    const [,dispatchContextHome] = useContext(homeContext);

    const handleSubmit = evt => {
        evt.preventDefault();
        const val = evt.target['nameSearch'].value;

        if(val && isNaN(val)){
            dispatchContextHome(setLoading(true));
            getDogsByName({name:val})
                .then(data => {
                    //Get values by controller and set in the context
                    dispatchContextHome(setDogsFilteredContext(data));

                    //Set page current value
                    dispatchContextHome(changeCurrentPage('0'));

                    //Change Loading
                    dispatchContextHome(setLoading(false));
                });
        };
    };

    return (
        <SearchBarStyled>
            <form action="" onSubmit={handleSubmit}>
                <h3>Busca La Raza que Prefieras</h3>
                <div className="inputs_form">
                    <input type="search" name="nameSearch" placeholder="Escribe el nombre"/>
                    <Button
                        className="btn_search_bar"
                        type="submit"
                        bgcolor="red"
                        color="white"
                    >Buscar</Button>
                </div>
            </form>
        </SearchBarStyled>
    );
}

const SearchBarStyled = styled.section`
    padding: 10px;
    form{
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;

        div.inputs_form{
            margin: 0 auto;
            width: 100%;
            max-width: 500px;

            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            & input[type="search"]{
                box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
                border-radius: 10px;
                padding: 10px;
                margin: 0 auto;
                
                width: 100%;
            }
            .btn_search_bar{
                font-size: 1rem;
                font-weight: 800;
            }
        }
    }
`;

export default SearchBarHome;