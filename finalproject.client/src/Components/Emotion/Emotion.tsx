import React, {useEffect, useState} from 'react';
import './Emotion.css';
import { useAuth0 } from '@auth0/auth0-react';
import Graph from "../Graph";
import  User from '../../Types/User';
import  EmotionType from '../../Types/Emotion';
import Graph2 from '../Graph2';

const Emotion = () => {

const {user} = useAuth0()
const [thisUser, setUser] = useState<User>();
const [emotion, setEmotion] = useState<EmotionType>({
        anger: "0",
        contempt: "0",
        disgust: "0",
        fear: "0",
        happiness: "0",
        neutral: "0",
        sadness: "0",
        surprise: "0"
});

const getUser = async () => {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(`https://localhost:7189/api/User/${user?.sub}`, requestOptions);

    const person = await response.json();
    
    const emotions = person.emotions.split(',');
    const feeling: EmotionType = {
        anger: emotions[0],
        contempt: emotions[1],
        disgust: emotions[2],
        fear: emotions[3],
        happiness: emotions[4],
        neutral: emotions[5],
        sadness: emotions[6],
        surprise: emotions[7]
    };
    setUser(person);
    setEmotion(feeling);
}

useEffect(() => {}, [])
return (
    <div className={"emotions"}>
        <button id="emotions--Btn" onClick={() => getUser()}>get emotions</button>
        {/* <Graph feeling={emotion} /> */}
        <Graph2 feeling={emotion} />
    </div>
  )
}


export default Emotion