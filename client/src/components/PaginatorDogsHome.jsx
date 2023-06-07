import { css, styled } from "styled-components";
import Button from "../base_components/Button";
import { useContext, useEffect, useState } from "react";
import { changeCurrentPage, homeContext } from "../context/HomeDogsContext";

function PaginatorDogsHome() {
    const [dataContextHome, dispatchHome] = useContext(homeContext);
    const numberPages = dataContextHome.filtered_dogs_context.length;
    const currentPage = Number(dataContextHome.page_current);

    //* It have a values to range paginator
    const [valuesRange, setValuesRange] = useState({initRange:0, finishRange:numberPages});

    //* Change page current in with paginator
    const changePageWithPaginator = nPage => {
        dispatchHome(changeCurrentPage(nPage));
    }
    
    const handleClick = (evt) => {
        const nPage = evt.target.getAttribute('data-page');

        //? Change current page
        changePageWithPaginator(nPage);
    };

    //* handle for Prev and Next Button
    const handleRecursiveChangeCurrentPage = (valRefButton) => {
        
        //* Validate type handler action
        if(valRefButton){
            //* If the limit to paginator is surpassed
            if(currentPage >= numberPages - 1) return;    
            changePageWithPaginator(currentPage + 1);
            return;
        };

        //* If the limit to paginator is surpassed
        if(currentPage <= 0) return;
        changePageWithPaginator(currentPage - 1);
    };

    //* If change any this values, set new Values to generate paginator
    useEffect(() => {
        //* Set dinamic paginator
        const initRange = numberPages > 8 && currentPage > 4 ?
                            currentPage - 4 : 0;
        const finishRange = numberPages > 8 && ((currentPage - 4) < numberPages - 4)
                            ? currentPage + 4 : numberPages;
        setValuesRange({initRange, finishRange});
    },[dataContextHome.filtered_dogs_context, dataContextHome.page_current])

    return (
        <PaginatorStyled onMouseMove={(e) => {e.target}}>
            <ButtonAux onClick={() => handleRecursiveChangeCurrentPage(false)}>Prev</ButtonAux>
            { (numberPages > 8 && currentPage - 4 > 0) && '...'}
            {
                Boolean(numberPages) && new Array(numberPages).fill('').map((e,i) =>(
                    <ButtonPaginator
                        value_page={i+1}
                        data-page={i}
                        key={i}
                        activepagebutton={(currentPage === i) + ''}
                        onClick={handleClick}
                    >{i}</ButtonPaginator>
                )).slice(valuesRange.initRange, valuesRange.finishRange)
            }
            { (numberPages > 8 && currentPage + 4 < numberPages) && '...'}
            <ButtonAux onClick={() => handleRecursiveChangeCurrentPage(true)}>Next</ButtonAux>
        </PaginatorStyled>
    );
}

const PaginatorStyled = styled.div`
    max-width: fit-content;
    margin: 0 auto;

    overflow-x: hidden;

    border-radius: 10px;
    padding: 2px 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    padding: 10px;
    

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
        font-weight: 800;
        
        aspect-ratio: 1;
        border-radius: 50%;

        background: white;
    }
    ${({activepagebutton}) => {
        if(activepagebutton === 'true'){
            return css`
                &::after{
                    background: red;
                    color: white;
                }
            `;
        }
    }}
`;
const ButtonAux = styled(Button)`
    font-size: 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
`;

export default PaginatorDogsHome;