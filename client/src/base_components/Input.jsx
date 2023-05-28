import styled from 'styled-components';

const Input = styled.input`
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    border: none;
    outline: none;
    border-radius: 5px;
    color: black;

    &::placeholder{
        padding: 10px;
    }

    &:focus{
        border: 2px solid rgba(0,0,0,0.2);
    }

    &:focus{
        outline: none;
    }
    &:active{
        outline: none;
    }
`;

export default Input;