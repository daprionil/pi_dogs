import { styled } from "styled-components";

const Button = styled.button`
    @media (max-width: 776px) {
        font-size: 0.9rem;
    }
    @media (max-width: 470px) {
        font-size: .7rem;
    }
    
    background: ${({bgcolor}) => bgcolor ?? 'white'};
    font-size: 1rem;
    color: ${({color}) => color ?? '#0b0b0b'};
    border-radius: 3px;
    text-align: center;
    padding: 10px 15px;
    white-space: nowrap;

    cursor: pointer;
    
    transition: all .3s ease;
    &:hover{
        transform: scale(1.01);
        box-shadow: 2px 1px 5px rgba(2,2,2,.1);
    }

`;

export default Button;