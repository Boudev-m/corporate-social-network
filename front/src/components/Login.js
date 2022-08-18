import React from 'react';
import axios from 'axios';
// import { accountService } from '_services';



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
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                // stocke le token dans le header Authorization, sera disponible dans les prochaines requêtes de l'user
                // remarque : quand on actualise la page, le token disparait du header
                axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            })
            .then(() => {
                // window.location = '/'; // retour page d'accueil après login
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // // Vérifie que l'utilisateur est authentifié
    // function jwtInterceptor() {
    //     axios.interceptors.request.use(request => {
    //         // add auth header with jwt if account is logged in and request is to the api url
    //         const account = accountService.accountValue;
    //         const isLoggedIn = account?.token;
    //         const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);

    //         if (isLoggedIn && isApiUrl) {
    //             request.headers.common.Authorization = `Bearer ${account.token}`;
    //         }

    //         return request;
    //     });
    // }
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