import React from 'react'
import { PieChart, Pie, Tooltip, Cell, RadialBarChart, RadialBar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import EmotionType from '../Types/Emotion';

interface IProps {
    feeling: EmotionType;
}

// const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

const Graph2 = ({feeling}:IProps) => {

    const dataMap = [
        {
            data: [
                {name: "anger", value: parseFloat(feeling.anger) * 100, fill: '#FF0000'},
                {name: "contempt", value: parseFloat(feeling.contempt) * 100, fill: '#00FFFF'},
                {name: "disgust", value: parseFloat(feeling.disgust)* 100, fill: '#808000'},
                {name: "fear", value: parseFloat(feeling.fear)* 100, fill: '#000000'},
                {name: "happiness", value: parseFloat(feeling.happiness)* 100, fill: '#00FF00'},
                {name: "neutral", value: parseFloat(feeling.neutral)* 100, fill: '#999999'},
                {name: "sadness", value: parseFloat(feeling.sadness)* 100, fill: '#0000FF'},
                {name: "surprise", value: parseFloat(feeling.surprise)* 100, fill: '#800080'}
            ]
        }
    ]
    const data = [
        {name: "anger", value: (parseFloat(feeling.anger) * 100).toPrecision(3), fill: '#FF0000'},
        {name: "contempt", value: (parseFloat(feeling.contempt) * 100).toPrecision(3), fill: '#00FFFF'},
        {name: "disgust", value: (parseFloat(feeling.disgust)* 100).toPrecision(3), fill: '#808000'},
        {name: "fear", value: (parseFloat(feeling.fear)* 100).toPrecision(3), fill: '#000000'},
        {name: "happiness", value: (parseFloat(feeling.happiness)* 100).toPrecision(3), fill: '#00FF00'},
        {name: "neutral", value: (parseFloat(feeling.neutral)* 100).toPrecision(3), fill: '#999999'},
        {name: "sadness", value: (parseFloat(feeling.sadness)* 100).toPrecision(3), fill: '#0000FF'},
        {name: "surprise", value: (parseFloat(feeling.surprise)* 100).toPrecision(3), fill: '#800080'}
    ]
  return (
    <>
    <PieChart width={400} height={400}>
        {dataMap.map(s => 
            <Pie
            dataKey='value'
            isAnimationActive={false}
            data={s.data}
            cx={200}
            cy={200}
            outerRadius={100}
            innerRadius={60}
            fill='#fff'
            paddingAngle={1}
            label={(entry) => entry.name}
            />
            )}
        <Tooltip/>
    </PieChart>
    <RadialBarChart
        width={500}
        height={300}
        innerRadius={'10%'}
        outerRadius={'80%'}
        data={data}
        startAngle={180}
        endAngle={0}>
            <RadialBar label={{fill:'#666', position: 'insideStart'}} background dataKey={'value'}/>
            <Legend iconSize={10} width={120} height={140} layout={'vertical'} verticalAlign={'middle'} align={'right'}/>
    </RadialBarChart>
    <RadarChart 
      outerRadius={90}
      width={500}
      height={300}
      data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={"name"}/>
        <PolarRadiusAxis angle={30} domain={[0, 150]}/>
        <Radar name={"Jon"} dataKey={"value"} stroke={"seagreen"} fill={"tomato"} fillOpacity={65}/>
        <Legend />
    </RadarChart>
    </>
  )
}

export default Graph2