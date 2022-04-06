import './feelingsWheel.css';
import React, {useEffect, useState} from "react";
import { setTokenSourceMapRange } from 'typescript';

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
            console.log("setTimeout in starter was called: ", amount);
            wheel?.setAttribute("style", "animation-play-state: paused");
            
        }, amount * 1000);  
        setDegree(prev => prev += amount);
        console.log(degree + amount + " this is degree newest?");
        
    }

    useEffect(() => {
        const feelingNr = degree / 0.212;
        setFeeling(feelingNr)
        console.log(feelingNr + " this is feeling nr?");
    } ,[degree, feeling])

    // const stopper = () => {
    //     setStop(false);
    //     const wheel = document.getElementById('feelingsWheel');
    //     // wheel?.setAttribute('class', 'paused' );
    //     if (wheel?.style.animationPlayState === 'running') 
    //         wheel?.setAttribute("style", "animation-play-state: paused");
    //     else
    //         wheel?.setAttribute("style", "animation-play-state: running");
    // }

    return (
        <>
        <section>
            <h1>Spin the Wheel</h1>
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
//15 / 360 = 0.04. 1 feeling is 360 / 68 = 5,3 degree. 0.212 sec per emotion. ie. 9 (second rotation time) / 0.2 (sec pr emotion) = 45 deg. emotion nr 45. 
//360 degrees in 15 sec. keep track of amount of time the wheel has spun, modulus 15s, divided by remaining seconds 
//1. (number of seconds since start) % 15. 