import React, { useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import EmotionType from '../../Types/Emotion';

const dummyData = [
  {
    anger: 0.2,
    happiness: 0.5,
    time: 1
  },
  {
    anger: 0.5,
    happiness: 0.1,
    time: 2
  },
  {
    anger: 0.8,
    happiness: 1.0,
    time: 3
  },
  {
    anger: 0.2,
    happiness: 0.5,
    time: 4
  },
  {
    anger: 0.3,
    happiness: 0.3,
    time: 5
  },
  {
    anger: 0.9,
    happiness: 0.1,
    time: 6
  },
];

const LineGraph = ({data}: {data:EmotionType[]}) => {
    const chartData = data.map(t => {
        t.timeFormatted = new Date(t.time).toLocaleString();
        t.contempt *= 100;
        t.fear *= 100;
        t.neutral *= 100;
        t.anger *= 100;
        t.sadness *= 100;
        t.surprise *= 100;
        t.disgust *= 100;
        t.happiness *= 100;
        return t;
    })
  return (
    <>
    {/* {Data.map((s:any) => { */}

        <LineChart width={750} height={500} data={data}>
        <CartesianGrid strokeDasharray={'3 3'} />
        <XAxis dataKey={'timeFormatted'} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type={'monotone'} dataKey={'anger'} stroke='#FF0000'/>
        <Line type={'monotone'} dataKey={'contempt'} stroke='#00FFFF'/>
        <Line type={'monotone'} dataKey={'disgust'} stroke='#808000'/>
        <Line type={'monotone'} dataKey={'fear'} stroke='#000000'/>
        <Line type={'monotone'} dataKey={'happiness'} stroke='#00FF00'/>
        <Line type={'monotone'} dataKey={'neutral'} stroke='#66564A'/>
        <Line type={'monotone'} dataKey={'sadness'} stroke='#0000FF'/>
        <Line type={'monotone'} dataKey={'surprise'} stroke='#800080'/>

    </LineChart>
    {/* }
        )} */}

    </>
  )
}

export default LineGraph


