import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as postService from "../../services/postService";
import * as commentService from "../../services/commentService";
import AuthContext from "../../contexts/AuthContext";

export default function PostDetails () {
    const navigate = useNavigate();
    const {email, isAuthenticated, userId} = useContext(AuthContext);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        postService.getOne(postId)
            .then(setPost);

        commentService.getAll(postId)
            .then(setComments);
    }, [postId]);

    const addCommentHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const newComment = await commentService.create(
            postId, 
            formData.get("comment")
        );

        setComments(state => [...state, {...newComment, owner: {email}}]);
    }

    const deleteButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete this post`);

        if (hasConfirmed) {
            await postService.remove(postId);

            navigate('/posts');
        }
    }

    return (
        <section id="post-details">
            <div className="post-displayed">
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                {userId === post._ownerId && (
                    <div>
                        <Link to={`/posts/${postId}/edit`}>Edit</Link>
                        <input className="delete btn" type="submit" value="Delete" onClick={deleteButtonClickHandler}/>
                    </div>
                )}

            </div>

            {isAuthenticated && (
                <article className="create-comment">
                    <label>Add comment:</label>
                    <form className="form" onSubmit={addCommentHandler}>
                        <textarea name="comment"/>
                        <input className="btn submit" type="submit" value="Add Comment"/>
                    </form>
                </article>
            )}

                <ul className="comment-section">
                    {comments.map(({_id, text, owner: { email }}) => (
                        <li key={_id} className="comment">
                            <p>{email}: {text}</p>
                        </li>
                    ))}
                </ul>
            {comments.length === 0 && (
                <h2>No comments yet</h2>
            )}
        </section>
    )
}