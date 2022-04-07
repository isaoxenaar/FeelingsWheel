import { useMemo } from 'react';
import { PieChart, Pie, Tooltip, RadialBarChart, RadarChart, Legend, RadialBar, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar } from 'recharts';
import { ChartData, ChartType } from '../../Types/ChartData';
import EmotionType from '../../Types/Emotion';
import './graphs.css';

export const Graphs = ({ feeling, type }: { feeling: EmotionType; type: ChartType }) => {
 
  
  const chartData = useMemo<ChartData>(
    () => [
      {
        name: 'anger',
        value: feeling.anger,
        fill: "#e56bb5",
      },
      {
        name: 'contempt',
        value: feeling.contempt,
        fill: "#af79bc",
      },
      {
        name: 'disgust',
        value: feeling.disgust,
        fill: "#b688c1",
      },
      {
        name: 'fear',
        value: feeling.fear,
        fill: "#f19a84",
      },
      {
        name: 'happiness',
        value: feeling.happiness,
        fill: "#addf97",
      },
      {
        name: 'neutral',
        value: feeling.neutral,
        fill: '#66564A',
      },
      {
        name: 'sadness',
        value: feeling.sadness,
        fill: "#a3acdd",
      },
      {
        name: 'surprise',
        value: feeling.surprise,
        fill: "#a8e0d9",
      },
    ],
    [feeling]
  );
  if (type === 'pieChart') return <PieGraph data={chartData} />;
  if (type === 'radialBarChart') return <RadialBarGraph data={chartData} />;
  if (type === 'radarChart') return <RadarGraph data={chartData} />;
  return null;
};

const PieGraph = ({ data }: { data: ChartData }) => {
  return (
    <PieChart className='charts__pie' width={400} height={400}>
      <Pie dataKey='value' isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={100} innerRadius={60} fill='#fff' paddingAngle={1} label={entry => entry.name} />
      <Tooltip />
    </PieChart>
  );
};

const RadialBarGraph = ({ data }: { data: ChartData }) => {
  return (
    <RadialBarChart className='charts__radial' width={500} height={300} innerRadius={'10%'} outerRadius={'80%'} data={data} startAngle={180} endAngle={0}>
      <RadialBar label={{ fill: '#666', position: 'insideStart' }} background dataKey={'value'} />
      <Legend iconSize={10} width={120} height={140} layout={'vertical'} verticalAlign={'middle'} align={'right'} />
    </RadialBarChart>
  );
};

const RadarGraph = ({ data }: { data: ChartData }) => {
  return (
    <div className='charts__radar'>
      <RadarChart outerRadius={90} width={500} height={300} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={'name'} />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name={'Emotions'} dataKey={'value'} stroke={'seagreen'} fill={'tomato'} fillOpacity={65} />
      </RadarChart>
      <div className='radar__legend'>
        <ul style={{ listStyleType: 'none' }}>
          {data.map((e, i) => (
            <li>
              <p style={{ color: e.fill }}>
                {e.name}: {e.value}%
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
