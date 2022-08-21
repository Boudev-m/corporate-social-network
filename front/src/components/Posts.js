import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {

    const headers = { 'Authorization': `Bearer ${localStorage.jwt}` }
    // Requête GET  : affiche la collection des posts
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/posts", { headers })
            .then((res) => {
                setData(res.data.reverse());        // reverse pour trier par date de création
            })
            .catch(() => { window.location = '/login' });
    }, []) // le [] est pour une callback

    // Requête PUT : modifier un post


    // Requête POST : ajouter/enlever un like
    function likePost(e) {
        const post = e.target.closest('div .main_content');
        const idPost = post.getAttribute('id')
        console.log(idPost);
        axios.post(`http://localhost:3000/api/posts/${idPost}/like`, '', { headers })  // mettre l'URL dans une var env
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
    }

    // Requête DELETE : supprimer un post
    function deletePost(e) {
        const post = e.target.closest('div .main_content');
        const idPost = post.getAttribute('id')
        console.log(idPost);

        axios.delete(`http://localhost:3000/api/posts/${idPost}`, { headers })  // mettre l'URL dans une var env
            .then(post.remove())
            .catch((error) => console.log(error));
    }

    // si user non authentifié, afficher 'connectez vous pour voir les messages'
    return (
        <main>
            {data
                .map((post) => (          // parcourt chaque elt du tableau
                    <div className={post.isAuthor ? 'main_content ownper_post' : 'main_content'} id={post._id} key={post._id}>
                        <div className='name_date_post'>
                            <p>{post.author[1] + ' ' + post.author[0]}</p>
                            <p>Posté le {post.date[0]} à {post.date[1]}</p>
                        </div>
                        <div className='message_post'>
                            <p className='text_post'>{post.text}</p>
                            {post.imageUrl ?
                                <div className='image_post'>
                                    <img src={post.imageUrl} alt={post.imageUrl ? "[Illustration du message]" : ""} />
                                </div> : ""
                            }
                        </div>
                        <div className='like_post'>
                            <div>
                                {post.isAuthor ?
                                    <div>
                                        <button onClick={deletePost}>Supprimer</button>
                                        <button>Editer</button>
                                    </div> : ""
                                }
                            </div>
                            <div>
                                <button onClick={likePost}>J'aime</button>
                                <span> {post.likes} like{post.likes > 1 ? 's' : ''} </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </main>
    );
};

export default Posts;