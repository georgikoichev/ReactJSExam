import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';


export default function Register () {
    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        email: "",
        password: "",
        confirmPassword: "",
    });


    return (
    <section id="register-page" className="content auth">
        <form id="register" onSubmit={onSubmit}>
            <div className="container">
                <h1>Register</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={values.email} onChange={onChange}/>

                <label htmlFor="pass">Password:</label>
                <input type="password" id="register-password" name="password" value={values.password} onChange={onChange}/>

                <label htmlFor="confirm-pass">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirmPassword" value={values.confirmPassword} onChange={onChange}/>

                <input className="btn submit" type="submit" value="Register"/>
                <p className="field">
                    <span>
                        <span>I already have a profile:<Link to="/login">Sign in</Link></span>
                    </span>
                </p>
            </div>
        </form>
    </section>
    )
}