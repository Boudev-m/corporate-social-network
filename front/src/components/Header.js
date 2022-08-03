import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/icon-left-font.png';

const Header = () => {
    return (
        <header>
            <div className='container_logo'>
                <img className='logo' src={logo} alt="logo groupomania" />
            </div>
            <div className='navigation'>
                <ul>
                    <NavLink to="/" >
                        <li>Accueil</li>
                    </NavLink>
                    <NavLink to="/signin" >
                        <li>Se connecter</li>
                    </NavLink>
                    <NavLink to="/signup" >
                        <li>S'inscrire</li>
                    </NavLink>
                </ul>
            </div>
        </header>
    );
};

export default Header;