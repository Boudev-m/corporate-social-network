import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
    const headers = { 'Authorization': `Bearer ${localStorage.jwt}` }
    // Requête GET  : affiche la collection des posts
    const [data, setData] = useState([]);
    const [isAdmin, setIsAdmin] = useState([]);
    useEffect(() => {
        const headers = { 'Authorization': `Bearer ${localStorage.jwt}` }
        axios.get(`${process.env.REACT_APP_API_URL}/api/posts`, { headers })
            .then((res) => {
                setData(res.data.posts.reverse());        // reverse pour trier par date de création
                setIsAdmin(res.data.isAdmin);
            })
            .catch(() => {
                localStorage.removeItem('jwt');
                window.location = './login'
            });
    }, []) // le [] est pour une callback

    // modifier un post
    function updatePost(e) {
        const post = e.target.closest('div .main_content');
        const idPost = post.getAttribute('id');
        window.location = `./post?id=${idPost}`
    }

    // Requête POST : ajouter/enlever un like
    function likePost(e) {
        const post = e.target.closest('div .main_content');
        const idPost = post.getAttribute('id')
        axios.post(`${process.env.REACT_APP_API_URL}/api/posts/${idPost}/like`, '', { headers })  // mettre l'URL dans une var env
            .then((res) => {
                const totalLikes = parseInt(post.querySelector('.like').textContent) + res.data;
                post.querySelector('.like').textContent = totalLikes;
                if (res.data === 1) {
                    e.target.setAttribute("class", "liked");
                } else {
                    e.target.removeAttribute("class");
                }
            })
            .catch((error) => console.log(error));
    }

    // Requête DELETE : supprimer un post
    function deletePost(e) {
        const post = e.target.closest('div .main_content');
        const idPost = post.getAttribute('id')
        console.log(idPost);
        axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${idPost}`, { headers })  // mettre l'URL dans une var env
            .then(() => post.remove())
            .catch((error) => console.log(error));
    }

    // si user non authentifié, afficher 'connectez vous pour voir les messages'
    return (
        <main>
            {data.map((post) => (          // parcourt chaque elt du tableau
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
                    <div className='option_post'>
                        <div >
                            {post.isAuthor || isAdmin ?
                                <div>
                                    <button onClick={(e) => { if (window.confirm('Voulez-vous supprimer ce message ?')) deletePost(e) }}>Supprimer</button>
                                    <button onClick={updatePost}>Editer</button>
                                </div> : ""
                            }
                        </div>
                        <div className='like_post'>
                            <button onClick={likePost} className={post.hasLiked ? 'liked' : ''}>J'aime</button>
                            <p><span className='like'>{post.likes}</span> like{post.likes > 1 ? 's' : ''}</p>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
};

export default Posts;