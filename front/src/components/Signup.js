import React from 'react';
import axios from 'axios';

const Signup = () => {

    // Véfifie le formulaire
    function CheckForm(e) {

        e.preventDefault(); // annule le comportement par défaut du formulaire et aussi les verificateurs html comme required ou format email
        // Les attributs type et required apportent une vérification supplémentaire

        // récupère tous les inputs
        let input = document.querySelectorAll('.form-group input');

        // De base, le formulaire est valide
        let formIsValid = true;

        // si un des champs est vide, renvoie une erreur
        for (let i = 0; i < input.length; i++) {
            if (!input[i].value) {
                input[i].nextSibling.textContent = 'Veuillez entrer une valeur correcte'
                formIsValid = false;
            }
        }

        // si les champs firstName et lastName ne sont pas conformes
        for (let i = 0; i < 2; i++) {
            if (!/^[a-zA-Z]{2,20}/.test(input[i].value)) {
                input[i].nextSibling.textContent = 'Veuillez entrer une valeur correcte'
                formIsValid = false;
            }
        }

        // si le champ email n'est pas conforme
        if (!/^[\w-]{1,20}@[\w-]{1,20}[.][\w-]{1,5}$/.test(input[2].value)) {
            input[2].nextSibling.textContent = 'Veuillez entrer une adresse mail correcte';
            formIsValid = false;
        }

        // si le champ password n'est pas conforme
        if (!/^[a-zA-Z0-9]{8,20}$/.test(input[3].value)) {
            input[3].nextSibling.textContent = 'Veuillez entrer un mot de passe correct (8 caractères min. et sans caractères spéciaux)'
            formIsValid = false;
        }

        // soumet le formulaire si il est conforme
        if (formIsValid) {
            SendForm(e);
        }

    };

    // Envoi le formulaire
    function SendForm(e) {

        // récupère les valeurs des champs
        const user = {
            lastName: document.getElementById('lastName').value,
            firstName: document.getElementById('firstName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        // En-tête de requête
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Requête POST : inscription de l'user
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, user, { headers })
            .then(() => axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email: user.email, password: user.password }, { headers })
                .then((res) => {
                    // stocke le token dans le localStorage
                    localStorage.jwt = res.data.jwt;
                })
                .then(() => {
                    window.location = '/';
                })
                .catch((error) => console.log(error)))
            .catch((error) => {
                if (error.response.data.error.errors.email.kind === 'unique') {
                    document.querySelectorAll('.form-group input')[2].nextSibling.textContent = 'Cette adresse mail est déjà prise.'
                } else {
                    console.log(error);
                }
            });
    }

    // Efface l'erreur affiché dans le form
    function RemoveTextError(e) {
        e.target.nextElementSibling.textContent = '';
    }

    return (
        <main>
            <div className='main_content center'>
                <form>
                    <div className="form-group">
                        <label htmlFor="lastName">Nom</label>
                        <br />
                        <input type="text" name="lastName" id="lastName" onInput={RemoveTextError} required />
                        <p className="input-error"></p>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="firstName">Prénom</label>
                        <br />
                        <input type="text" name="firstName" id="firstName" onInput={RemoveTextError} required />
                        <p className="input-error"></p>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name="email" id="email" onInput={RemoveTextError} required />
                        <p className="input-error"></p>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <br />
                        <input type="password" name="password" id="password" onInput={RemoveTextError} required />
                        <p className="input-error"></p>
                    </div>
                    <br />
                    <button onClick={CheckForm}>S'inscrire</button>
                </form>
            </div >
        </main >
    );
};

export default Signup;