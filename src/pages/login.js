import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import { auth } from '../lib/firebase';
import './login.css'
import * as ROUTES from '../constants/routes'

function Login() {
  const history = useHistory()
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';
  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await auth.signInWithEmailAndPassword(emailAddress, password)
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError('Network connection error! Wrong email or password.Check your username and password spelling.');
      
    }
  };

  useEffect(() => {
      document.title = 'Login - Instagram';
  }, [])

  return (
    <div className='login__parent'>
      <div className="login__image">
        <img src="/images/iphone-with-profile.jpg" className='phone__img' alt="iPhone with Instagram app" />
      </div>
      <div className='login__sub'>
        <h1 className='logo'>
          <img src='/images/logo.png' alt='login_logo'/>
        </h1>

        {error && <p className='err_msg'>{error}</p>}

        <form onSubmit={handleLogin} method='POST'>
          <input 
          aria-label='Enter your email address'
          type='text'
          placeholder='Email Address'
          className='email__address'
          value={emailAddress}
          onChange={e => setEmailAddress(e.target.value)}
          />

          <input 
          aria-label='Enter your your password'
          type='password'
          placeholder='Password'
          className='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
          <button
            disabled={isInvalid}
            type='submit'
            className={`login__btn ${isInvalid && ' opacity'} `}
          >Log In</button>
        </form>
          <div className='no__acc'>
            <p className='no__acc__text'> Don't have an account?  </p>
            <Link to={ROUTES.SIGN_UP} className='signup__link'>Sign up</Link>
        </div>
      </div>
      
    </div> 
  );
}

export default Login;
