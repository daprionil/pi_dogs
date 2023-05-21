import { styled } from "styled-components";

function SectionDefaultNullish({message = "Ha habido un Error en la Carga", otherStyles}) {
    return (
        <DefaultStyled style={otherStyles}>
            {message}
        </DefaultStyled>
    );
}

const DefaultStyled = styled.div`
    padding: 10px;
    background: red;
    text-align: center;
    font-weight: 700;
    font-size: 1.5rem;
    color: white;
    text-shadow: 0 1px 5px rgba(0,0,0,0.3);
    border-radius: 5px;
`;

export default SectionDefaultNullish;