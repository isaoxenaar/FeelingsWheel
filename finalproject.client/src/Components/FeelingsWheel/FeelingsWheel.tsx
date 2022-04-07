import './feelingsWheel.css';
import React, {useEffect, useState} from "react";
import * as data from '../../Data/FeelingArray.json';

const FeelingsWheel = () => {
    const [degree, setDegree] = useState<number>(0);
    const [feeling, setFeeling] = useState<number>(0);
    const [stop, setStop] = useState<boolean>(false);

    const starter = () => {
        setStop(true);
        const amount = Math.floor(Math.random() * 20) + 1;
        const wheel = document.getElementById('feelingsWheel');
        wheel?.setAttribute("style", "animation-play-state: running");
        setTimeout(() => {
            wheel?.setAttribute("style", "animation-play-state: paused");
        }, amount * 1000); 
        setDegree(prev => prev += amount);
    }

    useEffect(() => {
        const feelingNr = degree / 0.2 > 68 ? Math.round(degree / 0.2) % 68 : Math.round(degree / 0.2);
        //const core = degree / 6 > 6 ? degree % 6 : degree / 6;
        console.log(feelingNr);
        setFeeling(feelingNr);       
    } ,[degree, feeling])

    return (
        <>
        <section>
            <h1>Spin the Wheel</h1>
            <h4>{data.feeling[feeling-1]} hello</h4>
            <div className='arrow'>&darr;</div>
            <img src={'https://i.postimg.cc/3xRTHN29/feelings-Wheelpng.png'} className='feelingsWheel' id='feelingsWheel' onClick={starter} alt='Feelings Wheel'/>
        </section>
        </>
    )
}

export default FeelingsWheel
//1. press the wheel, the button. 
//2. settime(Math.Random): css changes for amount of time (wheel spins): wheel stops: read the degrees it has spun. 
//3. calculate degree by time. 
//13.6 / 360 = 0.0377. 1 feeling is 360 / 68 = 5,3 degree. 0.200 sec per emotion. ie. 9 (second rotation time) / 0.2 (sec pr emotion) = 45. emotion nr 45. 
//360 degrees in 15 sec. keep track of amount of time the wheel has spun, modulus 15s, divided by remaining seconds 
//1. (number of seconds since start) % 15. 
//5.3 X 