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
    &[type="checkbox"]{
        -webkit-appearance: none;
        position: relative;

        &:checked{
            &::before{
                display: block;
            }    
        }
        &::before{
            display: none;
            content: "";
            position: absolute;
            
            width: 80%;
            height: 80%;
            
            background: red;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) scale(1.3) translateY(-50%);
            
            clip-path: polygon(16% 60%, 46% 74%, 100% 0, 100% 21%, 46% 99%, 0 66%);
        }

        &:focus{
            border: none;
        }
    }
`;

export default Input;