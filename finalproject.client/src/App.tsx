import React from 'react';
import LoginButton from './Components/LoginButton/';
import LogoutButton from './Components/LogoutButton/';
import Emotion from './Components/Emotion/';
import User from './Components/User/'
import { useAuth0 } from '@auth0/auth0-react';
import Capture from './Components/Webcam/';
import './App.css';

function App() {
  const {isAuthenticated} = useAuth0();
  return (
    <>
      {!isAuthenticated ? (
        <LoginButton/>
      ) : (
        <div className="App">
          <header role='header'>
            <LogoutButton />
            <User />
            Wheel of feelings.
          </header>
          
          <Capture />
          <Emotion />
        </div>
      )}
    </>
  );
}

export default App;
