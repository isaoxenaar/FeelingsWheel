import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import DeleteButton from '../Delete/DeleteButton';
import LogoutButton from '../LogoutButton';
import './User.css';

const User = () => {

  const {user, isAuthenticated} = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <section className='user--profile'>
          <section > 
            <p className='user--username'>{user?.name}</p>
            <p className='user--email'>{user?.email}</p>
          </section>
          <LogoutButton />
          <DeleteButton id={user?.sub}/>
        </section>)}
    </>
  );
}

export default User;