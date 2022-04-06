import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import EmotionType from '../../Types/Emotion';


const LineGraph = ({data}: {data:EmotionType[]}) => {
    const [selectedLine, setSelectedLine] = useState<string[]>([]);
    
  
  const chartData:EmotionType[] = data.map(t => {
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

    const selectLine = (event:any) => {
      let selectArr = selectedLine.map((s) => s);
      let lineIndex = selectArr.indexOf(event.id);
      event.dataKey != 'null' ? selectArr.push(event.id) : selectArr.splice(lineIndex, 1);
      setSelectedLine(selectArr);

    }
    
  return (
    <>

        <LineChart width={750} height={500} data={data}>
        <CartesianGrid strokeDasharray={'3 3'} />
        <XAxis dataKey={'timeFormatted'} />
        <YAxis />
        <Tooltip />
        <Legend onClick={selectLine}/>
        <Line type={'monotone'} dataKey={selectedLine.includes('anger') ? 'null' : 'anger'} stroke='#FF0000' id='anger' />
        <Line type={'monotone'} dataKey='contempt' stroke='#00FFFF' id='contempt'/>
        <Line type={'monotone'} dataKey='disgust' stroke='#808000' id='disgust'/>
        <Line type={'monotone'} dataKey='fear' stroke='#000000' id='fear'/>
        <Line type={'monotone'} dataKey='happiness' stroke='#00FF00' id='happiness'/>
        <Line type={'monotone'} dataKey='neutral' stroke='#66564A' id='neutral'/>
        <Line type={'monotone'} dataKey='sadness' stroke='#0000FF' id='sadness'/>
        <Line type={'monotone'} dataKey='surprise' stroke='#800080' id='surprise'/>
    </LineChart>

    </>
  )
}

export default LineGraph


// <Line type={'monotone'} dataKey={selectedLine === 'null' || selectedLine === 'anger' ? 'anger' : 'anger '} stroke='#FF0000' id='anger' />
// <Line type={'monotone'} dataKey={selectedLine === 'null' || selectedLine === 'contempt' ? 'contempt' : 'contempt '} stroke='#00FFFF' id='contempt'/>
// <Line type={'monotone'} dataKey={selectedLine === 'null' || selectedLine === 'disgust' ? 'disgust' : 'disgust '} stroke='#808000' id='disgust'/>
// <Line type={'monotone'} dataKey={selectedLine === 'null' || selectedLine === 'fear' ? 'fear' : 'fear '} stroke='#000000' id='fear'/>
// <Line type={'monotone'} dataKey={selectedLine === 'null' || selectedLine === 'happiness' ? 'happiness' : 'happiness '} stroke='#00FF00' id='happiness'/>
// <Line type={'monotone'} dataKey={selectedLine === 'null' || selectedLine === 'neutral' ? 'neutral' : 'neutral '} stroke='#66564A' id='neutral'/>
// <Line type={'monotone'} dataKey={selectedLine === 'null' || selectedLine === 'sadness' ? 'sadness' : 'sadness '} stroke='#0000FF' id='sadness'/>
// <Line type={'monotone'} dataKey={selectedLine === 'null' || selectedLine === 'surprise' ? 'surprise' : 'surprise '} stroke='#800080' id='surprise'/>