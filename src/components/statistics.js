import React from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer} from 'recharts';

export default function Statistics(props){

    var _ = require('lodash');

    const data = _(props.trainings).groupBy('activity').map( (objs, key) => ({
        'activity': key,
        'Total duration (min)': _.sumBy(objs, 'duration')
        }) ).value();

    return (
        <ResponsiveContainer width='100%' height={400}>
            <BarChart width={900} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" tickFormatter={(value='string') => `${value}`} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total duration (min)" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}