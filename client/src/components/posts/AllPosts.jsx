import { useEffect, useState } from "react";
import * as postService from "../../services/postService";
import PostsListItem from "./PostsListItem";

export default function AllPosts () {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        postService.getAll()
            .then(result => setPosts(result));
    }, []);

    return (
        <section id="all-posts">
            <h1>Posts</h1>
            {posts.map(post => (
                <PostsListItem key={post._id} {...post} />
            ))}

            {posts.length === 0 && (<h2>No posts yet</h2>)}

        </section>
    );
}