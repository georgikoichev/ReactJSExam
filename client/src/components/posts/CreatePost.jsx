import * as postService from "../../services/postService";
import { useNavigate } from "react-router-dom"

export default function CreatePost () {
    const navigate = useNavigate();

    const createPostSubmitHandler = async (e) => {
        e.preventDefault();

        const postData = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await postService.create(postData);
        
            navigate("/posts")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section id="create" className="auth">
            <form id="create" onSubmit={createPostSubmitHandler}>
                <div className="container">
                    <h1>Create Post</h1>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" placeholder="Title"/>

                    <label htmlFor="description">Text:</label>
                    <textarea id="description" name="description" ></textarea>

                    <input className="btn submit" type="submit" value="Create"/>
                </div>
            </form>
        </section>
    );
}