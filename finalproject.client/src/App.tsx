import React from 'react';
import './App.css';
import Home from './Components/Home';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Emotion from './Components/Emotion/';
import User from './Components/User/';
import MicRecord from './Components/Mic/MicRecord';
import Capture from './Components/Webcam';
import LoginButton from './Components/LoginButton/';
import { useAuth0 } from '@auth0/auth0-react';

function App() {

  const {isAuthenticated} = useAuth0();

  return (
    <>
    <main id='app--Login'>
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
        <section className='app--App'>
          <header className='app--Header'>
            Wheel of feelings.
            <nav className="app--Nav"> 
              <Link to={"/"}>Home</Link>
              <Link to={"/User"}>User</Link>
              <Link to={"/Emotion"}>Emotions</Link>
              <Link to={"/Record"}>Record</Link>
              <Link to={"/Photo"}>Photo</Link>
            </nav>
          </header>
          <Routes>
              <Route path="/" element={<><Home/></>}></Route>
              <Route path="/User" element={<User />}></Route>
              <Route path="/Photo" element={<Capture/>}></Route>
              <Route path="/Record" element={<MicRecord/>}></Route>
              <Route path="/Emotion" element={<Emotion/>}></Route>
          </Routes>
        </section>
      )}
      </div>
    </main>
    <footer className="app--Footer">
        Based on the feelings wheel by Gloria Willcox.   
    </footer>
    </>
  );
}

export default App;
