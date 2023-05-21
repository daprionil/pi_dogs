import styled from 'styled-components';

function Footer() {
    return (
        <FooterStyled>
            <p>Creado por David Bulla &#128420;
                <span> &copy;{new Date().getFullYear()} </span>
            </p>
        </FooterStyled>
    );
};

const FooterStyled = styled.footer`
    text-align: center;
    background: red;
    padding: 10px;
    
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 100;

    & p{
        span{
            font-weight: 600;
        }
    }
`;

export default Footer;