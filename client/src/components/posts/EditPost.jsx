import { useNavigate, useParams } from 'react-router-dom';
import * as postService from '../../services/postService';
import { useEffect, useState } from 'react';

export default function EditPost() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        postService.getOne(postId)
            .then(result => {
                setPost(result);
            });
    }, [postId]);

    const editPostSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await postService.edit(postId, values);

            navigate('/posts');
        } catch (err) {

            console.log(err);
        }
    }

    const onChange = (e) => {
        setPost(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section id="create" className="auth">
            <form id="create" onSubmit={editPostSubmitHandler}>
                <div className="container">
                    <h1>Create Post</h1>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" placeholder="Title" value={post.title} onChange={onChange}/>

                    <label htmlFor="description">Text:</label>
                    <textarea id="description" name="description" value={post.description} onChange={onChange}></textarea>

                    <input className="btn submit" type="submit" value="Edit"/>
                </div>
            </form>
        </section>
    );
}
