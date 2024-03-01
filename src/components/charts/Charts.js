// src/components/charts/Charts.js
import React from 'react';
import IntensityChart from './IntensityChart';

const Charts = ({ data }) => {
    return (
        <div>
            <h2>Intensity Chart</h2>
            <IntensityChart data={data} />
            {/* Add other charts as needed */}
        </div>
    );
};

export default Charts;
