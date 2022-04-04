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
    <section className="app--Login">
      <div className="app--LoginBtn">{!isAuthenticated ? (
        <LoginButton/>
      ) : (
        <div className="App">
          <header className='main--header'>
            Wheel of feelings.
          </header>
          <Capture />
          <Emotion />
          <User />
        </div>
      )}
      </div>
    </section>
  );
}

export default App;
