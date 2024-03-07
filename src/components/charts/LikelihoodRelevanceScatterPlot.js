// src/components/charts/LikelihoodRelevanceScatterPlot.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LikelihoodRelevanceScatterPlot = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear existing content
    d3.select(chartRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.likelihood)])
      .nice()
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.relevance)])
      .nice()
      .range([height, 0]);

    svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.likelihood))
      .attr('cy', (d) => yScale(d.relevance))
      .attr('r', 5)
      .style('fill', 'steelblue');

    svg.append('g').call(d3.axisBottom(xScale));
    svg.append('g').call(d3.axisLeft(yScale));
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default LikelihoodRelevanceScatterPlot;
