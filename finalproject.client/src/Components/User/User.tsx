import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import './User.css';

const User = () => {
    const {user, isAuthenticated} = useAuth0();
  return (
    <>
      {isAuthenticated && (
          <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <img src={user?.picture} />
        </div>)}
    </>
  );
}

export default User;