import React from 'react'
import { PieChart, Pie, Tooltip, Cell, RadialBarChart, RadialBar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import EmotionType from '../Types/Emotion';
import './graph2.css';

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
                {name: "neutral", value: parseFloat(feeling.neutral)* 100, fill: '#66564A'},
                {name: "sadness", value: parseFloat(feeling.sadness)* 100, fill: '#0000FF'},
                {name: "surprise", value: parseFloat(feeling.surprise)* 100, fill: '#800080'}, 
                {name: "time", value:feeling.time}
            ]
        }
    ]
    const data = [
        {name: "anger", value: (parseFloat(feeling.anger) * 100).toPrecision(3), fill: '#FF0000'},
        {name: "contempt", value: (parseFloat(feeling.contempt) * 100).toPrecision(3), fill: '#00FFFF'},
        {name: "disgust", value: (parseFloat(feeling.disgust)* 100).toPrecision(3), fill: '#808000'},
        {name: "fear", value: (parseFloat(feeling.fear)* 100).toPrecision(3), fill: '#000000'},
        {name: "happiness", value: (parseFloat(feeling.happiness)* 100).toPrecision(3), fill: '#00FF00'},
        {name: "neutral", value: (parseFloat(feeling.neutral)* 100).toPrecision(3), fill: '#66564A'},
        {name: "sadness", value: (parseFloat(feeling.sadness)* 100).toPrecision(3), fill: '#0000FF'},
        {name: "surprise", value: (parseFloat(feeling.surprise)* 100).toPrecision(3), fill: '#800080'}
    ]

    // const data1 = data.map((s:any) => {
    //     const dataCopy = {...s};
    //     dataCopy.map((e:any) => (e.value = e.value < '10' ? '20' : e.value));
    //     return dataCopy;
        
    // });

    // const fruitsUpdated = fruits.map(fruit => {
    //     const fruitCopy = { ...fruit };
    //     if (fruitCopy.name === "mango") {
    //         fruitCopy.inStock = true;
    //     }
    //     return fruitCopy;
    // });


  return (
    <>
    <div className='charts'>
    {/* <h1>{dataMap[0].data[data.length].value}</h1> */}
    <PieChart className='charts__pie'
    width={400} height={400}>
        {dataMap.map((s,index) => 
            <>
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
            </>
            )}
        <Tooltip/>
    </PieChart>
    
    <RadialBarChart className='charts__radial'
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
    <div className='charts__radar'>
    <RadarChart
      outerRadius={90}
      width={500}
      height={300}
      data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={"name"}/>
        <PolarRadiusAxis angle={30} domain={[0, 150]}/>
        <Radar name={"Emotions"} dataKey={"value"} stroke={"seagreen"} fill={"tomato"} fillOpacity={65}/>
        <Legend />
    </RadarChart>
    <div className='radar__legend'><ul style={{listStyleType: 'none'}}>
            {
                data.map((e,i) => 
                    (
                    <li>
                        <p style={{color: e.fill}}>{e.name}: {e.value}%</p>
                    </li>
                ))
            }
            </ul>
            </div>
        </div>
        </div>
    </>
  )
}

export default Graph2