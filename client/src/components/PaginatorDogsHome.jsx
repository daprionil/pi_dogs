import { styled } from "styled-components";
import Button from "../base_components/Button";

function PaginatorDogsHome({setParamPage, numberPages}) {
    
    const handleClick = (evt) => {
        const nPage = evt.target.getAttribute('data-page');
        setParamPage({page:nPage});
    };
    
    return (
        <PaginatorStyled>
            {
                Boolean(numberPages) && new Array(numberPages).fill('').map((e,i) =>(
                    <ButtonPaginator
                        value_page={i+1}
                        data-page={i}
                        key={i}
                        onClick={handleClick.bind(i)}
                    >{i}</ButtonPaginator>
                ))
            }
        </PaginatorStyled>
    );
}

const PaginatorStyled = styled.div`
    max-width: 500px;
    margin: 0 auto;

    border-radius: 10px;
    padding: 2px 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    

    margin-bottom: 50px;
`;

const ButtonPaginator = styled(Button)`
    font-size: 1rem;
    font-weight: 600;
    padding: 5px 10px;
    border-radius: 50%;

    background: transparent;
    
    position: relative;

    filter: drop-shadow(0 0 2px rgba(0, 0, 0, .3));

    &:hover{
        transform: scale(1.1);
    }

    &::before{
        content: "";
        position: absolute;
        top: 0px;
        left: -1px;
        width: 10px;
        height: 20px;
        background: black;
        border-radius: 50%;
        box-shadow: 22px 0px 0 black;
    }
    &::after{
        content: "${({value_page}) => value_page}";
        position: absolute;
        width: 30px;
        height: 30px;
        
        line-height: 26px;
        
        left: 0;
        bottom: -3px;
        
        aspect-ratio: 1;
        border-radius: 50%;

        background: white;
    }
`;

export default PaginatorDogsHome;