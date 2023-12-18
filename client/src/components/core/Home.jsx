import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <section>
            <h1>Home page</h1>
            <div className="home-description">
                This is the home page for this application. Go to
                <Link to="/posts">All Posts</Link>
                see all created posts.
            </div>
        </section>
    );
}