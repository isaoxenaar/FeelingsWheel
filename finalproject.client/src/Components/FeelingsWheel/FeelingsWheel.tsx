import './feelingsWheel.css';
import React, {useEffect, useState} from "react";
import * as data from '../../Data/FeelingArray';
import { useAuth0 } from '@auth0/auth0-react';

// const data = require('~FinalProject/finalproject.api/src/Data/FeelingArray.json');

const FeelingsWheel = () => {
    const [degree, setDegree] = useState<number>(0);
    const [feeling, setFeeling] = useState<number>(0);
    const [stop, setStop] = useState<boolean>(false);

    const starter = () => {
        const amount = Math.floor(Math.random() * 20) + 1;
        const wheel = document.getElementById('wheel--Image');
        wheel?.setAttribute("style", "animation-play-state: running");
        setTimeout(() => {
            wheel?.setAttribute("style", "animation-play-state: paused");
            setStop(true);
            setDegree(prev => prev += 24 * amount);
        }, amount * 1000); 
        console.log("Circle degree: ", degree);
    }

    useEffect(() => {
        const feelingNr = degree / 0.2 > 68 ? degree / 0.2 % 68 : degree / 0.2;
        const core = Math.round(degree / 2.85) > 6 ? Math.round(degree/2.85) % 6 : Math.round(degree / 2.85);
        const middle = degree / 0.4 > 34 ? degree % 34 : degree / 0.4;
        console.log(feelingNr, core, middle);
        setFeeling(feelingNr);  
        setStop(false);   
    } ,[degree, feeling])

    return (
        <>
        <section className="wheel">
            <h1 className="wheel--Title">Spin the Wheel</h1>
            <h4 className="wheel--Feeling" style={stop ? { backgroundColor: `${data.default.feeling[feeling + 1][1]}` } : {backgroundColor:"white"}}>{stop ? `${data.default.feeling[feeling + 1][0]}`: ""}</h4>
            <div className='wheel--Arrow'>&darr;</div>
            <img src={'https://i.postimg.cc/3xRTHN29/feelings-Wheelpng.png'} className='wheel--Image' id='wheel--Image' onClick={starter} alt='Feelings Wheel'/>
        </section>
        </>
    )
}

export default FeelingsWheel
//1. press the wheel, the button. 
//2. settime(Math.Random): css changes for amount of time (wheel spins): wheel stops: read the degrees it has spun. 
//3. calculate degree by time. 
//13.72 / 360 = 0.0377. 1 feeling is 360 / 68 = 5,3 degree. 0.200 sec per emotion. ie. 9 (second rotation time) / 0.2 (sec pr emotion) = 45. emotion nr 45. 
//360 degrees in 15 sec. keep track of amount of time the wheel has spun, modulus 15s, divided by remaining seconds 
//1. (number of seconds since start) % 15. 
//5.3 X 