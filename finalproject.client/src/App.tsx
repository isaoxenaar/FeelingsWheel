import React from 'react';
import LoginButton from './Components/LoginButton/';
import LogoutButton from './Components/LogoutButton/';
import Emotion from './Components/Emotion/';
import User from './Components/User/';
import MicRecord from './Components/MicRecord';
import { useAuth0 } from '@auth0/auth0-react';
import Capture from './Components/Webcam/';
import './App.css';

function App() {
  const {isAuthenticated} = useAuth0();

  return (
    <section className='app--Login'>
      <div className="app--LoginBtn">{!isAuthenticated ? (
        <>
          <div className='app--loginPage'>
            <h1 className='main--header'>Welcome to Pearl Tusk's Graduation Project!</h1>
            <h2>Made by Michal, Isa, Jon and Richard</h2>
            <p>Press the button below to log in</p>
            <LoginButton/>
          </div>
        </>
      ) : (
        <div className='App'>
          <header className='main--header'>
            Wheel of feelings.
          </header>
          <MicRecord />
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
