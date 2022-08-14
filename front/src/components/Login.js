import React from 'react';
import axios from 'axios';


const Login = () => {

    // Véfification du formulaire
    function CheckForm(e) {

        e.preventDefault(); //annule le comportement par défaut du formulaire et aussi les verificateurs html comme required ou format email)
        // Les attributs type et required apportent une vérification supplémentaire

        // récupère tous les inputs
        let input = document.querySelectorAll('.form-group input');
        let inputError = document.querySelector('.input-error');
        // De base, le formulaire est valide à chaque soumission du formulaire par l'utilisateur
        let formIsValid = true;
        // si un des champs est vide, renvoie une erreur
        for (let i = 0; i < input.length; i++) {
            if (!input[i].value) {
                inputError.textContent = 'Email ou mot de passe invalide';
                formIsValid = false;
            }
        }

        // si le champ email n'est pas conforme
        if (!/^[\w-]{1,20}@[\w-]{1,20}[.][\w-]{1,5}$/.test(input[0].value)) {
            inputError.textContent = 'Email ou mot de passe invalide';
            formIsValid = false;
        }

        // si le champ password n'est pas conforme
        if (!/^[a-zA-Z0-9]{8,20}$/.test(input[1].value)) {
            inputError.textContent = 'Email ou mot de passe invalide';
            formIsValid = false;
        }

        // Si le formulaire est conforme
        if (formIsValid) {
            console.log('Le formulaire est conforme.');
            SendForm(e);
        }
    };

    // Envoie le formulaire
    function SendForm(e) {
        // si un champ vide, renvoyer une erreur
        e.preventDefault();         // enleve le comportement du bouton 'submit' dans les formulaires
        const user = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        const headers = {           // ajout de headers
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        // Requête POST : authentification de l'user
        axios.post("http://localhost:3000/api/auth/login", user, { headers })
            .then((res) => console.log(res.data.token))
            .then((res) => headers.set('Authorization', 'Bearer ' + res.data.token))
            // token
            // .then(document.location.href = "./")     // retour page d'accueil après envoie d'un post
            .catch((error) => {
                if (error.response.status === 401) {
                    document.querySelector('.input-error').textContent = 'Email ou mot de passe invalide';
                }
            });
    }

    function RemoveTextError(e) {
        document.querySelector('.input-error').textContent = '';
    }

    return (
        <main>
            <div className='main_content center'>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name="email" id="email" onInput={RemoveTextError} required />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <br />
                        <input type="password" name="password" id="password" onInput={RemoveTextError} required />
                    </div>
                    <br />
                    <p class="input-error"></p>
                    <br />
                    <button onClick={CheckForm}>Se connecter</button>
                </form>
            </div >
        </main >
    );
};

export default Login;