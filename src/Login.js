import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    
    const [password, setPassword] = useState('')
    
    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            // it successfully created an account
            console.log(auth);
            if (auth){
                navigate('/');
            }
            
        }).catch(error => alert(error.message));

        
        
        
    }

    const register =e => {
        
        e.preventDefault();
        // some fancy firebase register
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            // it successfully created an account 
            if (auth){
                navigate('/');
            }


        }).catch(error => alert(error.message));
    }
  return (
    <div className='login'>
        <Link to= '/'>
            <img 
                src="images/logo.jpg"
                alt="almayas"
                className='login__logo'
            />
        </Link>
        <div className='login__container'>
            <h1>Sign-in</h1>
            <form className='login__form'>
                <h5>E-mail</h5>
                <input type='text' placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
                <button type='submit' onClick={signIn}
                    className='login__signInButton'>Sign In</button>
            </form>
            <p>
                By signing-in you agree to Almayas's <a href="https://www.almayas.com.pk"><strong>Almayas</strong></a>, Conditions of use & Sale. 
                Please see our privacy Notice, our Cookies Notice and our Interest based Ads Notice.
            </p>

            <button  onClick={register}
                className='login__registerButton'>Create your Almayas Account</button>
            
        </div>
    </div>
  )
}

export default Login