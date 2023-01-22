import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FullChartData } from 'store/statistics/statistics.types';

interface StatisticsChartProps {
  data: FullChartData;
}

const StatisticsChart = ({ data: { chartData } }: StatisticsChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="50%">
      <LineChart data={chartData} barGap={0} barCategoryGap={0} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          scale="point"
          padding={{ left: 40, right: 40 }}
        />
        <YAxis padding={{ top: 40 }} />
        <Tooltip />
        <Legend />
        <Line dataKey="Costs" stroke="red" />
        <Line dataKey="Incomes" stroke="green" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
