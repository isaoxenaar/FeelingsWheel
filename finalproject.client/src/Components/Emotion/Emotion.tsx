import React, { useEffect, useState } from 'react';
import './Emotion.css';
import { useAuth0 } from '@auth0/auth0-react';
import User from '../../Types/User';
import EmotionType from '../../Types/Emotion';
import Select from 'react-select';
import { Graphs } from '../Graphs/Graphs';
import LineGraph from '../Graphs/LineGraph';
import CustomChart from '../CustomChart';

const options = [
  { value: 'pieChart', label: 'Pie Chart' },
  { value: 'radialBarChart', label: 'Radial Bar Chart' },
  { value: 'radarChart', label: 'Radar Chart' },
] as const;

const Emotion = () => {
  const { user } = useAuth0();
  const [thisUser, setUser] = useState<User>();
  const [emotions, setEmotions] = useState<EmotionType[]>([
    {
      anger: 0,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 0,
      neutral: 0,
      sadness: 0,
      surprise: 0,
      time: new Date(),
      timeFormatted: ''
    },
  ]);

  const getUser = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(`https://localhost:7189/api/User/${user?.sub}`, requestOptions);

    const person = await response.json();
    const emotions = JSON.parse(person.emotions);
    const feelings: EmotionType[] = emotions.map((emo: any) => {
      const feeling: EmotionType = {
        anger: emo.Anger,
        contempt: emo.Contempt,
        disgust: emo.Disgust,
        fear: emo.Fear,
        happiness: emo.Happiness,
        neutral: emo.Neutral,
        sadness: emo.Sadness,
        surprise: emo.Surprise,
        time: emo.Time,
        timeFormatted: ''
      };
      return feeling;
    });
    console.log("person in get " + person.textEmotion);
    setUser(person);
    setEmotions(feelings);
  };

  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className={'emotions'}>
      <button id='emotions--Btn' onClick={() => getUser()}>
        get emotions
      </button>
      <Select options={options as any} value={selectedOption} onChange={e => setSelectedOption(e!)} />
      <Graphs feeling={emotions[emotions.length - 1]} type={selectedOption.value} />
      <LineGraph data={emotions}/>
      {/* <CustomChart feeling={emotions}/> */}
    </div>
  );
};

export default Emotion;
