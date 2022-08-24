import React from 'react';
import axios from 'axios';
import { useState } from 'react';


const UpdatePost = () => {

    // si user non authentifié, renvoie à la page login
    if (!localStorage.jwt) {
        window.location = './login'
    }

    // récupère l'id du post dans l'url
    const url = new URL(document.location.href);
    const idFromUrl = url.searchParams.get("id");

    // récupère l'image entrante
    const [file, setFile] = useState();
    function uploadFile(e) {
        return setFile(e.target.files[0]);
    };

    // redirige à la page d'accueil
    function goHome(e) {
        e.preventDefault();
        window.location = './'
    }

    // Envoie le formulaire
    function SendForm(e) {

        // annule le comportement du bouton 'submit' dans les formulaires
        e.preventDefault();

        // récupère le texte saisie
        const post = {
            text: document.getElementById('message').value,
        }

        // si champ texte et image vide
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

        // Requête PUT : modifie le post avec texte et/ou image
        axios.put(`${process.env.REACT_APP_API_URL}/api/posts/${idFromUrl}`, formData, { headers })
            .then(() => window.location = '/')
            .catch((error) => {
                // si token invalide
                if (error.response.status === 401) {
                    localStorage.removeItem('jwt');
                    window.location = './login';
                } else {
                    console.log(error);
                }
            });
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

export default UpdatePost;