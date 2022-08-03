import React from 'react';

const Newpost = () => {
    return (
        <main>
            <div className='main_content center'>
                <form>
                    <div className="form-group">
                        <label htmlFor="message">Votre message</label>
                        <br />
                        <textarea name="message" id="message" cols="50" rows="5"></textarea>
                    </div>
                    <br />
                    <div className="form-group">
                        <button>Image</button>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Envoyer" />
                    </div>

                </form>
            </div >
        </main >
    );
};

export default Newpost;