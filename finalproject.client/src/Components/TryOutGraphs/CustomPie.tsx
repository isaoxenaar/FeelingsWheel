import React, {useState, useEffect, useRef} from "react";
import * as d3 from 'd3';

const CustomPie = () =>  {
    const generateData = (value:number, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

    const [data, setData] = useState(generateData(0));
    const changeData = () => {
        setData(generateData(0));
    };
    const ref = useRef(null);
    const cache = useRef(data);
    const createPie = d3
      .pie()
      .value(d => 5)
      .sort(null);
    const createArc = d3
      .arc()
      .innerRadius(5)
      .outerRadius(5);
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const format = d3.format(".2f");
    useEffect(
        () => {
        setData(generateData(0));
        },
        [!data]
    );



}

export default CustomPie