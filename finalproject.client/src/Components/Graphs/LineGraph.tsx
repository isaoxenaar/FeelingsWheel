import React, { useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import EmotionType from '../../Types/Emotion';


const LineGraph = ({data}: {data:EmotionType[]}) => {
    const chartData = data.map(t => {
        t.timeFormatted = new Date(t.time).toLocaleString();
        t.contempt = parseFloat((t.contempt * 100).toPrecision(3));
        t.fear = parseFloat((t.fear * 100).toPrecision(3));
        t.neutral = parseFloat((t.neutral * 100).toPrecision(3));
        t.anger = parseFloat((t.anger * 100).toPrecision(3));
        t.sadness = parseFloat((t.sadness * 100).toPrecision(3));
        t.surprise = parseFloat((t.surprise * 100).toPrecision(3));
        t.disgust = parseFloat((t.disgust * 100).toPrecision(3));
        t.happiness = parseFloat((t.happiness * 100).toPrecision(3));
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


