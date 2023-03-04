import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartData } from 'store/types';

interface CustomBarChartProps {
  keys: { key: string; color: string; name?: string }[];
  xAxisKey: string;
  data: ChartData[];
}

const CustomBarChart = ({ data, keys, xAxisKey }: CustomBarChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} barGap={0} barCategoryGap={0} barSize={20}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisKey} padding={{ left: 40, right: 40 }} />
      <YAxis padding={{ top: 40 }} />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      {keys.map(item => (
        <Bar
          key={item.key}
          name={item.name || item.key}
          dataKey={item.key}
          fill={item.color}
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);
export default CustomBarChart;
