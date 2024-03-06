import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Container } from 'react-bootstrap';

const IntensityChart = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        if (data.length > 0) {
            drawChart();
        }
    }, [data]);

    const drawChart = () => {
        const margin = { top: 20, right: 20, bottom: 50, left: 40 };
        const fullWidth = Math.min(window.innerWidth, 1200); 
        const width = fullWidth - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = d3.select(chartRef.current)
            .attr('width', fullWidth)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d.topic))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.intensity)])
            .range([height, 0]);

        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.topic))
            .attr('width', x.bandwidth())
            .attr('y', d => y(d.intensity))
            .attr('height', d => height - y(d.intensity))
            .style('fill', 'steelblue');

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        svg.append('g')
            .call(d3.axisLeft(y));
    };

    return (
        <Container>
            <svg ref={chartRef}></svg>
        </Container>
    );
};

export default IntensityChart;
