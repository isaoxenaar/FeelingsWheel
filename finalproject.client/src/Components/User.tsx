import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const User = () => {
    const {user, isAuthenticated} = useAuth0();
  return (
    <>
      {isAuthenticated && (
          <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{user?.sub} </p>
            <img src={user?.picture} />
        </div>)}
    </>
  );
}

export default User