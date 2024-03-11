import React, { useEffect } from 'react';
import * as d3 from 'd3';

const LikelihoodDistributionPieChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    // Clear existing content
    d3.select("#likelihood-pie-chart").html("");

    // Extract likelihood values
    const likelihoodValues = data.map(d => d.likelihood);

    // Count occurrences of each likelihood value
    const likelihoodCounts = likelihoodValues.reduce((count, value) => {
      count[value] = (count[value] || 0) + 1;
      return count;
    }, {});

    // Convert counts to an array of objects with 'value' and 'count' properties
    const likelihoodData = Object.keys(likelihoodCounts).map(key => ({
      value: parseInt(key),
      count: likelihoodCounts[key]
    }));

    // Calculate total count for percentage calculation
    const totalCount = likelihoodValues.length;

    // Create a pie chart layout
    const pie = d3.pie().value(d => d.count);

    // Set up dimensions
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create an arc generator
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Create SVG container
    const svg = d3.select("#likelihood-pie-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create pie chart segments
    const arcs = svg.selectAll("arc")
      .data(pie(likelihoodData))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Add path for each segment
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => getColorForLikelihood(d.data.value));

    // Add labels
    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text(d => `${(d.data.count / totalCount * 100).toFixed(1)}%`);
  };

  // Function to get color based on likelihood value
  const getColorForLikelihood = likelihood => {
    // You can customize the colors based on your preference
    const colorScale = d3.scaleOrdinal()
      .domain([1, 2, 3, 4, 5])
      .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']);

    return colorScale(likelihood);
  };

  return <div id="likelihood-pie-chart"></div>;
};

export default LikelihoodDistributionPieChart;
