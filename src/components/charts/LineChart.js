import React, { useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    // Clear existing content
    d3.select("#line-chart").html("");

    // Extract unique countries or regions
    const countries = [...new Set(data.map(d => d.country))];
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(countries);

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select("#line-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.start_year))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([height, 0]);

    // Create line function
    const line = d3.line()
      .x(d => xScale(d.start_year))
      .y(d => yScale(d.intensity));

    // Draw lines for each country or region
    countries.forEach(country => {
      const countryData = data.filter(d => d.country === country);

      svg.append("path")
        .data([countryData])
        .attr("class", "line")
        .attr("d", line)
        .style("stroke", colorScale(country))
        .style("fill", "none");
    });

    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(5));

    // Add y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 100}, 0)`);

    countries.forEach((country, i) => {
      legend.append("rect")
        .attr("y", i * 20)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", colorScale(country));

      legend.append("text")
        .attr("x", 25)
        .attr("y", i * 20 + 9)
        .attr("dy", "0.35em")
        .text(country);
    });
  };

  return <div id="line-chart"></div>;
};

export default LineChart;
