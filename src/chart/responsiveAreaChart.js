import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ResponsiveAreaChart = ({title, height, data, axisKey, areaKey, color, tooltipFormatter}) => {
    return (
        <>
            <h3>{title}</h3>
            <ResponsiveContainer height={height} width="100%">
                <AreaChart data={data} syncId="anyId">
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={axisKey}/>
                    <YAxis />
                    <Tooltip formatter={tooltipFormatter}/>
                    <Area type="monotone" dataKey={areaKey} stackId="1" stroke={color} fill={color} />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
};

export default ResponsiveAreaChart;
