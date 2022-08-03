import React from 'react';

const Posts = () => {
    const posts = [
        {
            firstName: 'Must',
            lastName: 'Boui',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ut suscipit excepturi nobis nulla provident ipsa consectetur esse, assumenda eligendi.',
            like: 5,
            date: 282022
        },
        {
            firstName: 'Jean',
            lastName: 'Dupont',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
            like: 1,
            date: 382022
        },
    ];
    return (
        <main>
            {posts
                .sort((a, b) => b.date - a.date)
                .map((post, index) => (
                    <div className='main_content' key={index}>
                        <div className='name_date_post'>
                            <p>{post.firstName + ' ' + post.lastName}</p>
                            <p>{post.date}</p>
                        </div>
                        <div className='message_post'>
                            <p className='text_post'>{post.message}</p>
                            <div className='image_post'>
                                <img src="./logo192.png" alt="[Illustration du message]" />
                            </div>
                        </div>
                        <div className='like_post'>
                            <div>{post.like} like{post.like > 1 ? 's' : ''} </div>
                            <div></div>
                        </div>
                    </div>
                ))

            }
        </main>
    );
};

export default Posts;