import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE_PATH } from '../constants/path';
import * as ROUTES from '../constants/routes'
import { useStateValue } from '../context/StateProvider';
import { firebaseapp } from '../lib/firebase';
import './header.css'



function Header() {
  const [{User , set_open, modal_open }, dispatch] = useStateValue()
  
  const handleOpen = () => {
    set_open(!modal_open)
  }

  return ( 
    <header className='header__main'>
      <div className='header__parent'>
        <div className='header__img'>
          <Link to={ROUTES.DASHBOARD}  arial-label='Instagram logo'> 
            <img className='header__image' src='/images/logo.png' alt='header__lgogo' /> 
          </Link>
        </div>

        <div className='header__side'>
          
          {User ? (
            <> 
            <button onClick={() => handleOpen()} title='Upload Image'> 
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="2em"
                width="2em"
                className='mr-2 cursor-pointer'
                aria-label='Upload an Image'

      
               >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg> 
            </button>    

              <Link to={User && ROUTES.DASHBOARD} arial-label='Dashboard'>
                
                <svg
                      className="w-8 mt-2 mr-6 text-black-light cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                </svg>
              </Link>

              <button type='button' title='Sign Out' onClick={() => firebaseapp.auth().signOut()} 
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  firebaseapp.auth().signOut();
                }
              }} >
                <svg        
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>         
                </button>

                {User && (
                  <div className='user__name'>
                      <Link to={`/p/${User?.displayName}`}>
                        <img className='user__image' src={`/images/users/avatars/${User?.displayName}.jpg`}
                        alt={`${User?.displayName} profile`}
                        onError={(e) => {
                          e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                        />
                      </Link>

                        
                  </div>
          

                )}
            </>
          ) : (
            <>
                <Link to={!User && ROUTES.LOGIN}>
                  <button aria-label='Log In'
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button aria-label='Sign Up'
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
                
            </>
          )}
        </div>

        
      </div>
    </header>
  );
}

export default Header;


