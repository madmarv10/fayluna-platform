import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const PerformanceChart = ({ data, dataKey = 'value', xKey = 'date', lineColor = '#007bff' }) => {
  /*
    Props:
    - data: array of objects like [{ date: '2025-06-01', value: 50 }, ...]
    - dataKey: the key to use for the Y-axis values (default 'value')
    - xKey: the key to use for the X-axis (default 'date')
    - lineColor: color of the line (default blue)
  */

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={lineColor}
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
