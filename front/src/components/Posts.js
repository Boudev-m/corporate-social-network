import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {

    // Requête GET  : affiche la collection des posts
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/posts", axios.defaults.headers.common.Authorization)
            .then((res) => setData(res.data))
            .catch((error) => console.log(error));
    }, []) // le [] est pour une callback

    // Requête POST : ajouter/enlever un like

    // si user non authentifié, afficher 'connectez vous pour voir les messages'
    return (
        <main>
            {data
                .sort((a, b) => b.date - a.date) // trie par date
                .map((post, index) => (          // parcourt chaque elt du tableau
                    <div className='main_content' key={index}>
                        <div className='name_date_post'>
                            <p>{post.firstName + ' ' + post.lastName}</p>
                            <p>Date : {post.date}</p>
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