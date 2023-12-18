import { Link } from "react-router-dom";

export default function PostsListItem ({
    _id,
    title,
    description,
}) {
    return (
        <div className="post-card">
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to={`/posts/${_id}`}>View Post</Link>
        </div>
    );
}