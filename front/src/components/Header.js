import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/icon-left-font.png';

const Header = () => {

    // vérifie la connexion
    let isLogged = false;
    if (localStorage.jwt) {
        isLogged = true;
    }

    // Déconnexion
    function logout() {
        localStorage.removeItem('jwt');
        window.location = '/login';
    }

    return (
        <header>
            <div className='container_logo'>
                <img className='logo' src={logo} alt="logo groupomania" />
            </div>
            <div className='navigation'>
                {isLogged ?
                    <ul>
                        <NavLink to="/" >
                            <li>Accueil</li>
                        </NavLink>
                        <NavLink to="/new-post" >
                            <li>Nouveau message</li>
                        </NavLink>
                        <NavLink to="" >
                            <li onClick={() => { if (window.confirm('Vous allez être déconnecté.')) logout() }}>Se déconnecter</li>
                        </NavLink>
                    </ul> :
                    <ul>
                        <NavLink to="/login" >
                            <li>Se connecter</li>
                        </NavLink>
                        <NavLink to="/signup" >
                            <li>S'inscrire</li>
                        </NavLink>
                    </ul>
                }
            </div>
        </header>
    );
};

export default Header;