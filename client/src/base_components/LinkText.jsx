import styled from 'styled-components';

const LinkText = styled.p`
    color: #0046dc;
    text-decoration: underline;
    font-size: .9rem;
    font-weight: 400;
    cursor: pointer;

    &:hover{
        color: #00319a;
        text-shadow: 0 1px 5px rgba(0,0,0,.3);
    }
`;
export default LinkText;