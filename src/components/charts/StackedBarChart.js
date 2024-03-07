import React, { useEffect } from 'react';
import * as d3 from 'd3';

const StackedBarChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    // Clear existing content
    d3.select("#stacked-bar-chart").html("");
  
    // Assuming you want to stack bars based on the "region" field
    const categories = [...new Set(data.map(d => d.region))];
    const keys = ['intensity', 'likelihood', 'relevance'];
  
    const stackedData = d3.stack()
      .keys(keys)
      (data);
  
    const margin = { top: 20, right: 30, bottom: 50, left: 60 }; // Increased bottom margin for x-axis labels
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const svg = d3.select("#stacked-bar-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const xScale = d3.scaleBand()
      .domain(categories)
      .range([0, width])
      .padding(0.1);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])])
      .range([height, 0]);
  
    const colorScale = d3.scaleOrdinal()
      .domain(keys)
      .range(['#1f77b4', '#ff7f0e', '#2ca02c']);
  
    svg.selectAll(".bar")
      .data(stackedData)
      .enter().append("g")
      .attr("fill", d => colorScale(d.key))
      .selectAll("rect")
      .data(d => d)
      .enter().append("rect")
      .attr("x", d => xScale(d.data.region))
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth());
  
    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)") // Rotate x-axis labels for better visibility
      .style("text-anchor", "end"); // Adjust the alignment
  
    // Add y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));
  
    // Add x-axis label
    svg.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
      .style("text-anchor", "middle")
      .text("Region");
  
    // Add y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Values");
  
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 100}, 0)`);
  
    keys.forEach((key, i) => {
      legend.append("rect")
        .attr("y", i * 20)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", colorScale(key));
  
      legend.append("text")
        .attr("x", 25)
        .attr("y", i * 20 + 9)
        .attr("dy", "0.35em")
        .text(key);
    });
  };
  
  

  return <div id="stacked-bar-chart"></div>;
};

export default StackedBarChart;
