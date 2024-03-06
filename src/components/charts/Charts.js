
import React from 'react';
import IntensityChart from './IntensityChart';

const Charts = ({ data }) => {
    return (
        <div>
            <h2>Intensity Chart</h2>
            <IntensityChart data={data} />
         
        </div>
    );
};

export default Charts;
