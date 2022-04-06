import React, {FC, useRef, useEffect, useState} from "react";
import  EmotionType from '../../Types/Emotion';
import Data from '../../Types/FeelingData';
import {
    pie,
    arc
} from 'd3';
import { Arc } from 'd3-shape';
import * as d3 from 'd3';

interface IProps {
    feeling: EmotionType[];
}

const CustomChart: FC<IProps> = ({feeling}:IProps) => {
    const d3Pie = useRef<SVGSVGElement| null>(null);
    const [feelings, setFeelings] = useState(feeling)

    useEffect(() => {
        const margin = {top: 30, right: 50, bottom: 50, left:30};
        const width = parseInt(d3.select('#graph').style('width'));
        const height = parseInt(d3.select('#graph').style('height'));
        const radius = Math.min(width, height) / 2 - 20;
        const svg = d3.select(d3Pie.current).attr("width", width)
            .attr("height", height).style("background-color", "yellow")
            .append("g")
            .attr("transform", "translate("+width/2+","+height/2+")");
        
        const data:object[] = [
            {name: "anger", value: feeling[0].anger * 100 },
            {name: "contempt", value: feeling[0].contempt * 100},
            {name: "disgust", value: feeling[0].disgust * 100},
            {name: "fear", value: feeling[0].fear * 100},
            {name: "happiness", value: feeling[0].happiness * 100},
            {name: "neutral", value: feeling[0].neutral * 100},
            {name: "sadness", value: feeling[0].sadness * 100},
            {name: "surprise", value: feeling[0].surprise * 100} 
        ]
        //const color = d3.scaleOrdinal().domain(data.map((d:any) => d.value)).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#abba91", "#322102", "#124ef9"])
        //const color = d3.scaleOrdinal().domain(data2).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#abba91", "#322102", "#124ef9"])
        const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#abba91", "#322102", "#124ef9"];
        const pie = d3.pie().value(((d:any) => d.value)(data))
        // const data_ready = pie(data);
        let myArc: Arc<any, any> = arc().innerRadius(0).outerRadius(radius);
        let color = d3.scaleOrdinal().range(d3.schemeSet2);
        let arcs = svg.selectAll('whatever').data([1, 2, 3, 4, 5]);
        let newBlock = arcs.enter();

        newBlock
            .append('g')
            .attr('d', (d:any) => d)
            .append('path')
            .attr('fill', (d:any, i:number) => colors[i])
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
            .attr('d', myArc);
       
    }, [])
 return(
    <div id="graph"><svg ref={d3Pie}></svg></div>
    )
}

export default CustomChart;
