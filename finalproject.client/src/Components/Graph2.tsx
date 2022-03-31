import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import EmotionType from '../Types/Emotion';

interface IProps {
    feeling: EmotionType;
}

// const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

const Graph2 = ({feeling}:IProps) => {

    const data = [
        {"name": "anger", "value": parseFloat(feeling.anger) * 100},
        {"name": "contempt", "value": parseFloat(feeling.contempt) * 100},
        {"name": "disgust", "value": parseFloat(feeling.disgust)* 100},
        {"name": "fear", "value": parseFloat(feeling.fear)* 100},
        {"name": "happiness", "value": parseFloat(feeling.happiness)* 100},
        {"name": "neutral", "value": parseFloat(feeling.neutral)* 100},
        {"name": "sadness", "value": parseFloat(feeling.sadness)* 100},
        {"name": "surprise", "value": parseFloat(feeling.surprise)* 100} 
    ]
    const COLORS = ['#555555', '#444444', '#333333', '#222222', '#111111', '#666666', '#777777', '#888888']
  return (
    <>
    <PieChart width={400} height={400}>
        <Pie 
        dataKey="value"
        nameKey="name"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={100}
        paddingAngle={5}
        label
        >
            {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
        </Pie>
        <Tooltip/>
    </PieChart>
    </>
  )
}

export default Graph2