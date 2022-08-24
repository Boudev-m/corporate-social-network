import React from 'react';
import axios from 'axios';

const Login = () => {

    // Véfifie le formulaire
    function CheckForm(e) {

        e.preventDefault(); // annule le comportement par défaut du formulaire et aussi les verificateurs html comme required ou format email)
        // Les attributs type et required apportent une vérification supplémentaire

        // récupère tous les inputs
        let input = document.querySelectorAll('.form-group input');
        let inputError = document.querySelector('.input-error');

        // De base, le formulaire est valide
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

        // soumet le formulaire si il est conforme
        if (formIsValid) {
            SendForm(e);
        }
    };

    // Envoie le formulaire
    function SendForm(e) {

        // récupère les valeurs des champs
        const user = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        // En-tête de requête
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Requête POST : authentification de l'user
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, user, { headers })
            .then((res) => {
                // stocke le token dans le localStorage
                localStorage.jwt = res.data.jwt;
            })
            .then(() => {
                window.location = '/';
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    document.querySelector('.input-error').textContent = 'Email ou mot de passe invalide';
                } else {
                    console.log(error);
                }
            });
    }

    // Efface l'erreur affiché dans le form
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
                    <p className="input-error"></p>
                    <br />
                    <button onClick={CheckForm}>Se connecter</button>
                </form>
            </div >
        </main >
    );
};

export default Login;