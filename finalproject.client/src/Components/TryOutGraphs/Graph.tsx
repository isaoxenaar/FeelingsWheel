// import React, {FC, useRef, useEffect, useState} from "react";
// import  EmotionType from '../Types/Emotion';
// import Data from '../Types/FeelingData';
// import * as d3 from 'd3';

// interface IProps {
//     feeling: EmotionType;
// }

// const Graph: FC<IProps> = ({feeling}:IProps) => {
//     const d3Pie = useRef<SVGSVGElement| null>(null);
//     const [feelings, setFeelings] = useState(feeling)

//     useEffect(() => {
//         const margin = {top: 30, right: 50, bottom: 50, left:30};
//         const width = parseInt(d3.select('#graph').style('width'));
//         const height = parseInt(d3.select('#graph').style('height'));
//         const radius = Math.min(width, height) / 2 - 20;
//         const svg = d3.select(d3Pie.current).attr("width", width)
//             .attr("height", height).style("background-color", "white")
//             .append("g")
//             .attr("transform", "translate("+width/2+","+height/2+")");
        
//         const data:Data[] = [
//             {name: "anger", value: parseInt(feeling.anger, 10) * 100 },
//             {name: "contempt", value: parseInt(feeling.contempt, 10) * 100},
//             {name: "disgust", value: parseInt(feeling.disgust, 10) * 100},
//             {name: "fear", value: parseInt(feeling.fear, 10) * 100},
//             {name: "happiness", value: parseInt(feeling.happiness, 10) * 100},
//             {name: "neutral", value: parseInt(feeling.neutral, 10) * 100},
//             {name: "sadness", value: parseInt(feeling.sadness, 10) * 100},
//             {name: "surprise", value: parseInt(feeling.surprise, 10) * 100} 
//         ]
//         const data2 = ['1', '2', '3', '4', '5', '6', '7', '8'];
//         const color = d3.scaleOrdinal().domain(data.map((d:any) => d.value)).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#abba91", "#322102", "#124ef9"])
//         const pie = d3.pie().value((d:any) => d.value)
//         //const data_ready = pie(d3.entries(data))
        
//     }, [])
//     //d3.pie({valueOf(feelings)})
//  return(
//     <div id="graph"><svg ref={d3Pie}></svg></div>
//     )
// }

// export default Graph;

export {}