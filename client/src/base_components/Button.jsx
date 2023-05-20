import { styled } from "styled-components";

const Button = styled.button`
    @media (max-width: 776px) {
        font-size: 1.4rem;
    }
    background: ${({bgcolor}) => bgcolor ?? 'white'};
    font-size: 1.7rem;
    color: ${({color}) => color ?? '#0b0b0b'};
    border-radius: 3px;
    text-align: center;
    padding: 10px 15px;
    
    cursor: pointer;
    
    transition: all .3s ease;
    &:hover{
        transform: scale(1.01);
        box-shadow: 2px 1px 5px rgba(2,2,2,.1);
    }
`;

export default Button;