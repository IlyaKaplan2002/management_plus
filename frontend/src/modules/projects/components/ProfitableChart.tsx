import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FullChartData } from 'store/statistics/statistics.types';

interface ProfitableChartProps {
  data: FullChartData;
}

const ProfitableChart = ({ data: { chartData } }: ProfitableChartProps) => {
  // const data: {
  //   label: string;
  //   Profitability: number;
  //   fill: string;
  // }[] = [];

  // const dataBrush: { name: string; value: number }[] = [];

  // for (let i = 0; i <= 100; i++) {
  //   data.push({
  //     label: `${i}-2022`,
  //     Profitability: 3000,
  //     fill: i % 2 === 0 ? 'green' : 'red',
  //   });
  //   dataBrush.push({ name: `${i}-2022`, value: i });
  // }

  return (
    <ResponsiveContainer width="100%" height="50%">
      <BarChart data={chartData} barGap={0} barCategoryGap={0} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          scale="point"
          padding={{ left: 40, right: 40 }}
        />
        <YAxis padding={{ top: 40 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Profitability" fill="green" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProfitableChart;
