import React, { useEffect } from 'react';
import * as d3 from 'd3';

const TimeSeriesChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    // Clear existing content
    d3.select("#time-series-chart").html("");
  
    // Extract relevant data for time series
    const timeSeriesData = data.map(d => ({
      date: new Date(d.published),
      intensity: d.intensity,
      likelihood: d.likelihood,
      relevance: d.relevance
    }));
  
    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    // Create SVG container
    const svg = d3.select("#time-series-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Set up scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(timeSeriesData, d => d.date))
      .range([0, width]);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(timeSeriesData, d => Math.max(d.intensity, d.likelihood, d.relevance))])
      .range([height, 0]);
  
    // Create line functions for each variable
    const lineIntensity = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.intensity));
  
    const lineLikelihood = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.likelihood));
  
    const lineRelevance = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.relevance));
  
    // Draw lines with opacity, stroke width, and different line styles
    svg.append("path")
      .data([timeSeriesData])
      .attr("class", "line")
      .attr("d", lineIntensity)
      .style("stroke", "blue")
      .style("opacity", 0.7)
      .style("stroke-width", 2);
  
    svg.append("path")
      .data([timeSeriesData])
      .attr("class", "line")
      .attr("d", lineLikelihood)
      .style("stroke", "orange")
      .style("opacity", 0.7)
      .style("stroke-width", 2)
      .style("stroke-dasharray", "5,5"); // Dashed line
  
    svg.append("path")
      .data([timeSeriesData])
      .attr("class", "line")
      .attr("d", lineRelevance)
      .style("stroke", "green")
      .style("opacity", 0.7)
      .style("stroke-width", 2)
      .style("stroke-dasharray", "2,2"); // Dotted line
  
    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));
  
    // Add y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));
  
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 100}, 0)`);
  
    legend.append("rect")
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "blue");
  
    legend.append("text")
      .attr("x", 25)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text("Intensity");
  
    legend.append("rect")
      .attr("y", 20)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "orange");
  
    legend.append("text")
      .attr("x", 25)
      .attr("y", 29)
      .attr("dy", "0.35em")
      .text("Likelihood");
  
    legend.append("rect")
      .attr("y", 40)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "green");
  
    legend.append("text")
      .attr("x", 25)
      .attr("y", 49)
      .attr("dy", "0.35em")
      .text("Relevance");
  };
  

  return <div id="time-series-chart"></div>;
};

export default TimeSeriesChart;
