import React from 'react';

const Signup = () => {
    return (
        <main>
            <div className='main_content center'>
                <form>
                    <div className="form-group">
                        <label htmlFor="lastName">Nom</label>
                        <br />
                        <input type="text" name="lastName" id="lastName" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="firstName">Prénom</label>
                        <br />
                        <input type="text" name="firstName" id="firstName" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name="email" id="email" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <br />
                        <input type="password" name="password" id="password" />
                    </div>
                    <br />
                    <button>Se connecter</button>
                </form>
            </div >
        </main >
    );
};

export default Signup;