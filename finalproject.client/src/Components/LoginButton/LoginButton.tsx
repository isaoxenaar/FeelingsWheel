import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './LoginButton.css';

const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();
  return (
    <section><button className='login--button' onClick={() => loginWithRedirect()}>Log in</button></section>
  )
}

export default LoginButton