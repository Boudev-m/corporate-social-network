import React from 'react';
import axios from 'axios';
import { useState } from 'react';


const Newpost = () => {
    // si non authentifié, renvoyer une erreur 'Vous devez vous authentifier pour publier un message.'

    if (!localStorage.jwt) {
        window.location = './login'
    }

    const [file, setFile] = useState();

    function uploadFile(e) {
        return setFile(e.target.files[0]);
    };

    function goHome(e) {
        e.preventDefault();
        window.location = './'
    }

    // Envoie le formulaire
    function SendForm(e) {
        // si champ texte et image vide, renvoyer une erreur
        // si image, envoyer en form-data
        e.preventDefault();         // enleve le comportement du bouton 'submit' dans les formulaires
        const post = {              // contenu du post
            text: document.getElementById('message').value,
        }
        if (!file && !post.text) {
            return alert('Veuillez saisir un texte et/ou charger une image.');
        }
        // Crée la constante qui sera envoyé dans la requête
        const formData = new FormData();
        // Ajoute le message et l'image
        formData.append('text', post.text);
        if (file) {
            formData.append('imageFile', file, file.fieldname);
        }
        // Headers de requête
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.jwt}`
        }
        // Requête POST : envoyer un post avec texte et/ou image
        axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, formData, { headers })  // mettre l'URL dans une var env
            .then(() => window.location = '/') // retour page d'accueil après login
            .catch((error) => console.log(error));
    }
    return (
        <main>
            <div className='main_content center container_new_post'>
                <form className='form'>
                    <div className='container_text_area'>
                        <label htmlFor="message">Votre message</label>
                        <textarea className="message" name="message" id="message" cols="40" rows="5"></textarea>
                    </div>
                    <div className='container_file_upload'>
                        <div>Ajouter une image</div>
                        <input name="file" id='imageFile' type="file" accept=".jpg, .jpeg, .png" onChange={uploadFile} />
                    </div>
                    <div>
                        <button onClick={goHome}>Retour</button>
                        <button onClick={SendForm}>Envoyer</button>
                    </div>
                </form>
            </div >
        </main >
    );
};

export default Newpost;