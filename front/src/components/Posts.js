import React from 'react';

const Posts = () => {
    return (
        <main className='container_posts'>
            <div className='post'>
                <div className='name_date_post'>
                    <p>Prénom Nom</p>
                    <p>Date</p>
                </div>
                <div className='message_post'>
                    <p className='text_post'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ut suscipit excepturi nobis nulla provident ipsa consectetur esse, assumenda eligendi.
                    </p>
                    <div className='image_post'>
                        <img src="./logo192.png" alt="[Illustration du message]" />
                    </div>
                </div>
                <div className='like_post'>
                    <div>Like :</div>
                    <div>0</div>
                </div>
            </div>
        </main>
    );
};

export default Posts;