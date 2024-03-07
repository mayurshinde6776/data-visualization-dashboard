import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import IntensityChart from './charts/IntensityChart';
import { fetchData } from '../services/dataService';
import LikelihoodRelevanceScatterPlot from './charts/LikelihoodRelevanceScatterPlot';
import YearIntensityLineChart from './charts/YearIntensityLineChart';
import StackedBarChart from './charts/StackedBarChart';
import LikelihoodDistributionPieChart from './charts/LikelihoodDistributionPieChart';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData()
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilterChange = (filters) => {
    const filtered = data.filter(item => {
      return (
        (!filters.endYear || item.end_year === filters.endYear) &&
        (!filters.topic || item.topic.toLowerCase().includes(filters.topic.toLowerCase()))
      );
    });

    setFilteredData(filtered);
  };

  return (
    <Container>
      <Row>
        <Col>
          <div>
            <h3>Intensity vs Topics (Bar Chart)</h3>
            <IntensityChart data={filteredData} />
          </div>
        </Col>
        <Col>
          <div>
            <h3>Likelihood vs Relevance (Scatter Plot)</h3>
            <LikelihoodRelevanceScatterPlot data={filteredData} />
          </div>
        </Col>
        <Col>
          <div>
            <h3>Year vs Intensity (Line Chart)</h3>
            <YearIntensityLineChart data={filteredData} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <h3>Stacked Bar Chart</h3>
            <StackedBarChart data={filteredData} />
          </div>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <div>
            <h3>Likelihood Distribution Pie Chart</h3>
            <LikelihoodDistributionPieChart data={filteredData} />
          </div>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Dashboard;
