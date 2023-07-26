import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import DogestIcon from '../base_components/DogestIcon';
import { useAuthFirebase } from '../context/AuthProvider';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';
import SignInButton from './SignInButton';

function Header() {
    const usuario = useAuthFirebase();

    return (
        <HeaderStyled className="ctn_main_header">
            <NavLink to='/home'>
                <DogestIcon styles={{width:"83px"}} />
            </NavLink>
            <nav className='nav_menu'>
                <ul className='list_menu'>
                    <li className='item_menu'>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    {
                        usuario ?
                            <>
                                <li className='item_menu'>
                                    <NavLink to="/medogs">Mis Dogs</NavLink>
                                </li>
                                <li className='item_menu create_dog'>
                                    <NavLink to="/createdog">Crear Tu Dog</NavLink>
                                </li>
                                <li>
                                    <LogOutButton />
                                </li>
                            </>
                        :   <>
                                <LogInButton />
                                <SignInButton />
                            </>
                    }
                </ul>
            </nav>
        </HeaderStyled>
    );
}

const HeaderStyled = styled.header`

    /**
        //! Realizar sticky, validate height
    */
    position: sticky;
    top: 0;
    backdrop-filter: blur(2px);

    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    padding: 10px;
    z-index: 100;
    
    background: transparent;
    backdrop-filter: blur(2px);

    & h1{
        font-size: 1.5rem;
        font-weight: 900;
    }

    & .nav_menu{
        justify-self: flex-end;
        padding: 5px;

        & .list_menu{
            display: flex;
            align-items: center;
            gap: 10px;
            & .item_menu{
                & a{
                    transition: all .3s ease;
                    &:hover{
                        filter: drop-shadow(0 0 0 black);
                    }
                    &.active{
                        text-decoration: underline;
                        color: #505050;
                    } 
                }
                &.create_dog{
                    a{
                        background: red;
                        color: white;
                        padding: 4px 7px;
                        transition: all .3s ease;
                        border-radius: 5px;
                        white-space: nowrap;
                        
                        font-weight: 700;
                        &:hover{
                            box-shadow: 0 2px 1px rgba(0,0,0,0.3);
                        }
                        &.active{
                            background: #ffdada;
                            color: red;
                            text-decoration: none;
                        }
                        
                    }
                }
            }
        }
    }
`;

export default Header;