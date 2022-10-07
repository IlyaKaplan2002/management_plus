import React from 'react';
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ProfitableChart = () => {
  const data: {
    label: string;
    Profitability: number;
    fill: string;
  }[] = [];

  const dataBrush: { name: string; value: number }[] = [];

  for (let i = 0; i <= 100; i++) {
    data.push({
      label: `${i}-2022`,
      Profitability: 3000,
      fill: i % 2 === 0 ? 'green' : 'red',
    });
    dataBrush.push({ name: `${i}-2022`, value: i });
  }

  return (
    <ResponsiveContainer width="100%" height="50%">
      <BarChart data={data} barGap={0} barCategoryGap={0} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          scale="point"
          padding={{ left: 40, right: 40 }}
        />
        <YAxis padding={{ top: 40 }} />
        <Tooltip />
        <Legend />
        <Brush
          dataKey="name"
          height={30}
          stroke="#8884d8"
          startIndex={20}
          endIndex={40}
          tickFormatter={(value, index) => `${index}-2022-${value}`}
        />
        <Bar dataKey="Profitability" fill="fill" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProfitableChart;
