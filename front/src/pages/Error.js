import React from 'react';
import Header from '../components/Header';

const Home = () => {
    return (
        <div>
            <Header />
            <h1>Erreur : la page n'existe pas.</h1>
            <p>Retourner à <a href='./'>l'accueil</a>.</p>
        </div>
    );
};

export default Home;