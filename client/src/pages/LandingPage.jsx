import styled from "styled-components";
import { NavLink } from 'react-router-dom';

import Button from '../base_components/Button';
import imgLandingBg from '../assets/bg_landing_page.webp';
import imgBannerLanding from '../assets/icon_banner_landing_page.webp';
import { Title } from "react-head";

function LandingPage() {
    return (
        <LandingStyled>
            <Title>Dogest - Bienvenida</Title>
            <section className="ctn-all">
                <article className="info">
                    <h1>Redescubre tus Razas Favoritas</h1>
                    <div>
                        <h2>Crea tus Razas</h2>
                        <p>No te quedes sin Conocerlas Todas</p>
                    </div>
                    <div className="buttons">
                        <NavLink to='/home'>
                            <Button style={{fontSize:'1.7rem'}}>Comenzar</Button>
                        </NavLink>
                        <NavLink to='/createDog'>
                            <Button bgcolor="red" style={{fontSize:'1.7rem'}} color="white">Crear una Raza</Button>
                        </NavLink>
                    </div>
                </article>
                <article className="icon_banner">
                    {/* //! Apply Image */}
                    <img src={imgBannerLanding} alt="Dog with rose"/>
                </article>
            </section>
        </LandingStyled>
    );
}

const LandingStyled = styled.div`
    background: linear-gradient(#00fffb51, #0000003b), url(${imgLandingBg});
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;

    padding: 20px;
    
    & .ctn-all{
        @media (max-width: 776px) {
            grid-template-columns: 1fr;
        }

        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-content: center;
        gap: 10px;

        width: 100%;
        height: 100%;

        max-width: 1100px;
        margin: 0 auto;
        .info{
            @media (max-width: 776px) {
                align-self: flex-end;
            }
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
            align-items: center;
            align-content: center;
            text-align: left;
            
            color: white;
            
            @media (max-width: 776px) {
                & h1{
                    font-size: 2rem;
                }
                & h2{
                    font-size: 1.7rem;
                }
                p{
                    font-size: 1rem;
                }
            }
            
            & h1{
                font-size: 2.8rem;
            }
            & h2{
                font-size: 2.2rem;
            }
            p{
                font-size: 1.8rem;
            }
            & .buttons{
                display: flex;
                align-items: center;
                gap: 5px;
            }
        }
        .icon_banner{
            margin: 0 auto;
            position: relative;
            img{
                width: 100%;
                object-fit: cover;
                clip-path: circle(50.2% at 50% 50%);
                height: 100%;
                max-height: 40vh;
                aspect-ratio: 1;

                animation: clipPathImageBanner 5000ms ease-out infinite;
            }
            &::before{
                content: "eso";
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                background: white;
                
                transform: scale(1.1);
                clip-path: circle(50.2% at 50% 50%);

                animation:  pulseImageBanner 5000ms ease-out infinite;
            }
        }
    }
`;

export default LandingPage;