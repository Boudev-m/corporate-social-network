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
                        <li>
                            <NavLink to="/" >Accueil</NavLink>
                        </li>
                        <li>
                            <NavLink to="/new-post" >Nouveau message</NavLink>
                        </li>
                        <li>
                            <NavLink to="" onClick={() => { if (window.confirm('Vous allez être déconnecté.')) logout() }}>Se déconnecter</NavLink>
                        </li>
                    </ul> :
                    <ul>
                        <li>
                            <NavLink to="/login" >Se connecter</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" >S'inscrire</NavLink>
                        </li>
                    </ul>
                }
            </div>
        </header>
    );
};

export default Header;