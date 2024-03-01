// src/App.js
import React, { useState, useEffect } from 'react';
import Layout from './components/layouts/Layout';
import { fetchData } from './services/dataService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Charts from './components/charts/Charts';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData()
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleFilterChange = (filters) => {
        // Implement filter logic and update data accordingly
    };

    return (
        <div className="App">
            <Layout data={data} onFilterChange={handleFilterChange} />
            <Charts data={data} />
        </div>
    );
}

export default App;
