import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/icon-left-font.png';

const Header = () => {
    // si user non authentifié : login et signup
    // si user authentifié : nouveau message et logout
    return (
        <header>
            <div className='container_logo'>
                <NavLink to="/">
                    <img className='logo' src={logo} alt="logo groupomania" />
                </NavLink>
            </div>
            <div className='navigation'>
                <ul>
                    <NavLink to="/" >
                        <li>Accueil</li>
                    </NavLink>
                    <NavLink to="/new-post" >
                        <li>Nouveau message</li>
                    </NavLink>
                    <NavLink to="/login" >
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