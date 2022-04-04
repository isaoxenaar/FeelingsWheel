import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LogoutButton from '../LogoutButton';
import './User.css';

const User = () => {
    const {user, isAuthenticated} = useAuth0();
  return (
    <>
      {isAuthenticated && (
        <section className='profile'>
          <section > 
            <img className='avatar' src={user?.picture} />
            <p className='username'>{user?.name}</p>
            <p className='email'>{user?.email}</p>
          </section>
          <LogoutButton />
        </section>)}
    </>
  );
}

export default User;