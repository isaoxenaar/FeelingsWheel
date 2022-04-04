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
const [emotions, setEmotions] = useState<EmotionType[]>([{
        anger: "0",
        contempt: "0",
        disgust: "0",
        fear: "0",
        happiness: "0",
        neutral: "0",
        sadness: "0",
        surprise: "0",
        time: new Date()
}]);

const getUser = async () => {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(`https://localhost:7189/api/User/${user?.sub}`, requestOptions);

    const person = await response.json();
    const emotions = JSON.parse(person.emotions);
    const feelings: EmotionType[] = emotions.map((emo:any) => {
        
        const feeling:EmotionType = {
                anger: emo.Anger,
                contempt: emo.Contempt,
                disgust: emo.Disgust,
                fear: emo.Fear,
                happiness: emo.Happiness,
                neutral: emo.Neutral,
                sadness: emo.Sadness,
                surprise: emo.Surprise,
                time: emo.Time
            }
        return feeling;
        });
    setUser(person);
    setEmotions(feelings);
}

return (
    <div className={"emotions"}>
        <button id="emotions--Btn" onClick={() => getUser()}>get emotions</button>
        {/* <Graph feeling={emotion} /> */}
        {emotions.map((emo) => <Graph2 feeling={emo} />)}
    </div>
  )
}


export default Emotion