import styled from "styled-components";

const Select = styled.select`
    -webkit-appearance: none;
    border: none;
    outline: none;
    box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    padding: 5px;
    text-align: center;

    & option{
        padding: 4px;
        color: white;
    }
`;

export default Select;