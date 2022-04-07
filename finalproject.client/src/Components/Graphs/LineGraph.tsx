// import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import EmotionType from '../../Types/Emotion';
import {ChartType} from '../../Types/ChartData';
import { useState } from 'react';


const LineGraph = ({data, type}: {data:EmotionType[], type:ChartType}) => {

    const selectLine = (event:any) => {
      event.style.visibility = event.style.visibility === 'hidden' ? 'visible' : 'hidden';
      

    }
    if(type === 'lineChart')
    {
    return (
    <>

        <LineChart width={750} height={500} data={data}>
        <CartesianGrid strokeDasharray={'3 3'} />
        <XAxis dataKey={'timeFormatted'} />
        <YAxis />
        <Tooltip />
        <Legend onClick={selectLine}/>
        <Line type={'monotone'} dataKey='anger' stroke="#e56bb5" id='anger' />
        <Line type={'monotone'} dataKey='contempt' stroke="#af79bc" id='contempt'/>
        <Line type={'monotone'} dataKey='disgust' stroke="#b688c1" id='disgust'/>
        <Line type={'monotone'} dataKey='fear' stroke="#f19a84" id='fear'/>
        <Line type={'monotone'} dataKey='happiness' stroke="#addf97" id='happiness'/>
        <Line type={'monotone'} dataKey='neutral' stroke='#66564A' id='neutral'/>
        <Line type={'monotone'} dataKey='sadness' stroke="#a3acdd" id='sadness'/>
        <Line type={'monotone'} dataKey='surprise' stroke="#a8e0d9" id='surprise'/>
    </LineChart>

    </>
  )}
  return null;

}

export default LineGraph