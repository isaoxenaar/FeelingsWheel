import React from 'react';
import LoginButton from './Components/LoginButton';
import LogoutButton from './Components/LogoutButton';
import User from './Components/User'
import { useAuth0 } from '@auth0/auth0-react';
import Capture from './Components/Webcam';
import './App.css';

function App() {
  const {isAuthenticated} = useAuth0();
  return (
    <>
      {!isAuthenticated ? (
        <LoginButton/>
      ) : (
        <div className="App">
        Wheel of feelings.
        <Capture />
        <User />
        <LogoutButton />
        </div>
      )}
    </>
  );
}

export default App;
