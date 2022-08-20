import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {

    // Requête GET  : affiche la collection des posts
    const [data, setData] = useState([]);
    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${localStorage.jwt}`
        }
        axios.get("http://localhost:3000/api/posts", { headers })
            .then((res) => {
                setData(res.data);
            })
            .catch(() => {
                window.location = '/login';
            })
    }, []) // le [] est pour une callback

    // Requête POST : ajouter/enlever un like
    // Requête PUT : modifier un post
    // Requête DELETE : supprimer un post

    // si user non authentifié, afficher 'connectez vous pour voir les messages'
    return (
        <main>
            {data
                .sort((a, b) => b.date - a.date) // trie par date
                .map((post) => (          // parcourt chaque elt du tableau
                    <div className='main_content' key={post._id}>
                        <div className='name_date_post'>
                            <p>{post.userId + ' ' + post.userId}</p>
                            <p>Posté le {post.date[0]} à {post.date[1]}</p>
                        </div>
                        <div className='message_post'>
                            <p className='text_post'>{post.text}</p>
                            <div className='image_post'>
                                <img src={post.imageUrl} alt="[Illustration du message]" />
                            </div>
                        </div>
                        <div className='like_post'>
                            <div>{post.likes} like{post.likes > 1 ? 's' : ''} </div>
                            <div></div>
                        </div>
                    </div>
                ))
            }
        </main>
    );
};

export default Posts;