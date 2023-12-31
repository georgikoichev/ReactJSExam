import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';


export default function Login () {
    const { loginSubmitHandler } = useContext(AuthContext);
    
    const {values, onChange, onSubmit} = useForm(loginSubmitHandler, {
        email: '',
        password: '',
    });

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={values.email} onChange={onChange}/>

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" value={values.password} onChange={onChange}/>

                    <input className="btn submit" type="submit" value="Login"/>
                    <p className="field">
                        <span>
                            <span>I don't have a profile:<Link to="/register">Sign up</Link></span>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    )
}