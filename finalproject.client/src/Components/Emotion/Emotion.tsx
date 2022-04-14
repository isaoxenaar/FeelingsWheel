import React, { useState } from 'react';
import './Emotion.css';
import { useAuth0 } from '@auth0/auth0-react';
import EmotionType from '../../Types/Emotion';
import Select from 'react-select';
import { Graphs } from '../Graphs/Graphs';
import LineGraph from '../Graphs/LineGraph';

const options = [
  { value: 'pieChart', label: 'Pie Chart' },
  { value: 'radialBarChart', label: 'Radial Bar Chart' },
  { value: 'radarChart', label: 'Radar Chart' },
  { value: 'lineChart', label: 'Line Chart Over Time'},
] as const;

const Emotion = () => {
  const { user } = useAuth0();
  //const [thisUser, setUser] = useState<User>();
  const [modEmotions, setModEmotions] = useState<EmotionType[]>([
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

    const response = await fetch(`https://finalprojectbackend.azurewebsites.net/api/User/${user?.sub}`, requestOptions);

    const person = await response.json();
    const emotions = JSON.parse(person.emotions);
    const modEmotions = () => {
      let tempArr:EmotionType[] = [...emotions];
      tempArr.map((e, i) => {
        e.anger = parseFloat((emotions[i].Anger * 100).toPrecision(3));
        e.contempt = parseFloat((emotions[i].Contempt * 100).toPrecision(3));
        e.disgust = parseFloat((emotions[i].Disgust * 100).toPrecision(3));
        e.fear = parseFloat((emotions[i].Fear * 100).toPrecision(3));
        e.happiness = parseFloat((emotions[i].Happiness * 100).toPrecision(3));
        e.neutral = parseFloat((emotions[i].Neutral * 100).toPrecision(3));
        e.sadness = parseFloat((emotions[i].Sadness * 100).toPrecision(3));
        e.surprise = parseFloat((emotions[i].Surprise * 100).toPrecision(3));
        e.time = new Date(emotions[i].Time);
        e.timeFormatted = new Date(e.time).toLocaleString();
        return e;
        });
      setModEmotions(tempArr);
    }
    modEmotions();
    //setUser(person);
  };

  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className={'emotions'}>
      <div className='btn--container'>
        <button id='emotions--Btn' onClick={() => getUser()}>
          get emotions
        </button>
      </div>
      <div className='selector--container'>
        <Select options={options as any} value={selectedOption} onChange={e => setSelectedOption(e!)} />
      </div>
      <Graphs feeling={modEmotions[modEmotions.length - 1]} type={selectedOption.value} />
      <LineGraph data={modEmotions} type={selectedOption.value}/>
    </div>
  );
};

export default Emotion;
