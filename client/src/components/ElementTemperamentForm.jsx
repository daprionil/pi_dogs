import styled from "styled-components";
import Button from "../base_components/Button";

function ElementTemperamentForm({nombre, id, handleClick}) {
    return (
        <ContentElementTemperamentForm>
            <p>{nombre}</p>
            <Button onClick={handleClick} data-nameid={id} className="btn_temperament">x</Button>
        </ContentElementTemperamentForm>
    );
}

const ContentElementTemperamentForm = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 7px;

    padding: 3px 6px;
    font-size: 0.9rem;

    background: white;
    border-radius: 5px;

    button.btn_temperament{
        font-size: 0.9rem;

        background: #ff4116;
        color: white;
        padding: 1px 5px;

        &:hover{
            box-shadow: 0 2px 5px rgba(0,0,0,.5);
        }
    }
`;

export default ElementTemperamentForm;