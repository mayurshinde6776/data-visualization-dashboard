import React, { useState, useEffect } from 'react';
import IntensityChart from './charts/IntensityChart';
import { fetchData } from '../services/dataService';
import { Container } from 'react-bootstrap';

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
           <div>
            <h3>Intensity vs topics</h3>
           <IntensityChart data={filteredData} />
           </div>
            
        </Container>
    );
};

export default Dashboard;
