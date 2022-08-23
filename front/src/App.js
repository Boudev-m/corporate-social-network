// Importe le paquet React
import React from 'react';

// Importe le paquet react-router-dom
// Pour créer notre routeur pour la navigation
// C'est App.js qui va gérer les routes de l'application
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importe les composants
import Home from './pages/Home';
import Newpost from './pages/Newpost';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';
import Updatepost from './pages/Updatepost';

// Crée le composant/la fonction App
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<Newpost />} />
        <Route path="/post" element={<Updatepost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
        {/* path=* fonctionne si aucune route déclarée ne correspond, redirige vers Home, on peut mettre 404 */}
      </Routes>
    </BrowserRouter>
  );
};

// Exporte App.js
export default App;


/************************ */

// Notes :
// App.js = composant le + haut de l'app après index.js, toute l'application (tous les autre composants) découle de lui
// Ensuite c'est la navigation (les pages) qui est situé le + haut, sera appellé dans toutes nos pages
// BrowserRouter : englobe toute l'application, c'est la navigation
// Routes : pour déclarer nos routes (pages)
// Route : la route, le chemin, l'URL (path = ce qui se trouve dans l'url)
// Si le path/url est /... alors récupère le composant ...
// Il faut importer (import) un composant pour pouvoir l'utiliser ici
// Exporter un composant pour pouvoir l'utiliser ailleurs
// comment en JSX : {/* comment */} (ecrire puis CTRL+/)
// 1ère lettre du Composant en Majuscule 