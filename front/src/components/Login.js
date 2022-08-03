import React from 'react';

const Login = () => {
    return (
        <main>
            <div className='main_content center'>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name="email" id="email" />
                    </div>
                    <br />
                    <div class="form-group">
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

export default Login;