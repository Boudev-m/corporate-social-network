import React from 'react';
import Header from '../components/Header';

const Home = () => {
    return (
        <div>
            <Header />
            <main>
                <div className='main_content center'>
                    <h1>Erreur : la page n'existe pas.</h1>
                    <p>Retourner à <a href='./'>l'accueil</a>.</p>
                </div>
            </main>
        </div>
    );
};

export default Home;