import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import bannerImageHome from '../assets/home_banner.webp';
import iconBannerImageHome from '../assets/happy_dog_icon_banner_home.webp';
import DogestIcon from '../base_components/DogestIcon';

import Button from  '../base_components/Button';

function BannerHomePage() {
    return (
        <BannerHomeStyled>
            <div className='info_banner'>
                <DogestIcon />
                <h2>Conoce nuestra Plataforma</h2>
                <p>Crea a Tu Raza Favorita</p>
                <NavLink to="/createdog" style={{width:"fit-content"}}>
                    <Button bgcolor="#ff4116" color='white' style={{width:"fit-content",fontWeight:"900"}}>Crear</Button>
                </NavLink>
            </div>
            <img className='happy_dog_icon_banner' src={iconBannerImageHome} alt="happy dog"/>
        </BannerHomeStyled>
    );
}

const BannerHomeStyled = styled.section`
    @media (max-width:1100px){
        min-height: 550px;
    }

    @media (max-width:776px){
        min-height: 400px;
    }

    background: linear-gradient(#6161619e, #ffffff8f 30%), url(${bannerImageHome});
    background-position: center;
    background-size: cover;

    min-height: 700px;
    
    display: flex;
    position: relative;

    .happy_dog_icon_banner{
        position: absolute;
        height: 100%;
        bottom: 0;
        right: -20%;
        filter: drop-shadow(5px -1px 0 gray);
        z-index: 1;
    }

    & .info_banner{
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
        z-index: 2;

        display: grid;
        grid-template-columns: 1fr;
        align-content: center;
        gap: 10px;
        
        padding: 30px;
        backdrop-filter: blur(2px);
    }
`;

export default BannerHomePage;