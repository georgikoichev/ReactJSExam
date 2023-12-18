import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';


export default function Navigation() {
    const {
        isAuthenticated,
        email,
    } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <h1><Link className="home" to="/">Home</Link></h1>
                <Link className="all-posts" to="/posts">All Posts</Link>
                {isAuthenticated && (
                    <div id="user">
                        <Link to="/posts/create">Create Post</Link>
                        <Link to="/logout">Logout</Link>
                        <span>{email}</span>
                    </div>
                )}

                {!isAuthenticated && (
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}