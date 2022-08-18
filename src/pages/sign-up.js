import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import { firebaseapp } from '../lib/firebase';
import './login.css'
import * as ROUTES from '../constants/routes'
import './sign-up.css'
import { doesUsernameExist } from '../services/firebase';
import { useStateValue } from '../context/StateProvider';



function SignUp() {
  const history = useHistory()
  
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';
  
  const handleSignup = async (event) => {
    event.preventDefault()

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists.length) {
      try {
        const createdUserResults = await firebaseapp
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password)

        //
        await createdUserResults.user.updateProfile({
          displayName : username,    
        })

        await firebaseapp.firestore().collection('users').add({
          userId : createdUserResults.user.uid,
          username : username.toLowerCase(),
          fullName : fullname,
          following : ['2'],
          followers : [],
          dateCreated : Date.now(),    
          emailAddress : emailAddress,
        })

        // no errors

        history.push(ROUTES.DASHBOARD)


      } catch (error) {
        setFullname('')
        setEmailAddress('')
        setPassword('')
        setError(error.message)
        
      }
    }

    else {
      setError('That username is already taken, please try another.')
    }
  };

  useEffect(() => {
      document.title = 'Sign up - Instagram';
  }, [])

  return (
    <div className='signup__parent'>
      <div className="login__image">
        <img src="/images/iphone-with-profile.jpg" className='phone__img' alt="iPhone with Instagram app" />
      </div>
      <div className='signup__sub'>
        <h1 className='logo'>
          <img src='/images/logo.png' alt='login_logo'/>
        </h1>

        {error && <p className='err_msg'>{error}</p>}

        <form onSubmit={handleSignup} method='POST'>
          <input 
          aria-label='Enter your username'
          type='text'
          placeholder='Username'
          className='username__signup'
          value={username}
          onChange={e => setUsername(e.target.value)}
          />

          <input 
          aria-label='Enter your full name'
          type='text'
          placeholder='Full Name'
          className='fullname__signup'
          value={fullname}
          onChange={e => setFullname(e.target.value)}
          />


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
            className={`signup__btn ${isInvalid && ' opacity'} `}
          >Sign up</button>
        </form>
          <div className='no__acc'>
            <p className='no__acc__text'> Have an account?  </p>
            <Link to={ROUTES.LOGIN} className='login__link'>Log In</Link>
        </div>
      </div>
      
    </div>  
  );
}

export default SignUp;
