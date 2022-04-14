import './feelingsWheel.css';
import React, {useEffect, useState} from "react";
import * as data from '../../Data/FeelingArray';

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
        }, amount * 1000); 
        setDegree(prev => prev += amount);
    }

    useEffect(() => {
        const feelingNr = degree / 0.2 > 68 ? degree / 0.2 % 68 : degree / 0.2;
        // const core = Math.round(degree / 2.85) > 6 ? Math.round(degree/2.85) % 6 : Math.round(degree / 2.85);
        // const middle = degree / 0.4 > 34 ? degree % 34 : degree / 0.4;
        setFeeling(feelingNr);  
        setStop(false);   
    } ,[degree, feeling])

    return (
        <>
        <section className="wheel">
            <h1 className="wheel--Title">Spin the Wheel</h1>
            <h4 className="wheel--Feeling" style={stop ? { backgroundColor: `${data.default.feeling[feeling][1]}` } : {backgroundColor:"white"}}>{stop ? `${data.default.feeling[feeling][0]}`: ""}</h4>
            <div className='wheel--Arrow'>&darr;</div>
            <img src={'https://i.postimg.cc/3xRTHN29/feelings-Wheelpng.png'} className='wheel--Image' id='wheel--Image' onClick={starter} alt='Feelings Wheel'/>
        </section>
        </>
    )
}

export default FeelingsWheel