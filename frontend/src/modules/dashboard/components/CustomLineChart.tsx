import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartData } from 'store/types';
import ElasticityTooltip from './ElasticityTooltip';

interface CustomLineChartProps {
  data: ChartData[];
  xAxisKey: string;
  keys: { key: string; color: string; name?: string }[];
  elasticity?: boolean;
}

const CustomLineChart = ({
  data,
  keys,
  xAxisKey,
  elasticity,
}: CustomLineChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} barGap={0} barCategoryGap={0} barSize={20}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={xAxisKey}
        scale="point"
        padding={{ left: 40, right: 40 }}
      />
      <YAxis padding={{ top: 40 }} />
      {elasticity ? <Tooltip content={<ElasticityTooltip />} /> : <Tooltip />}
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      {keys.map(item => (
        <Line
          key={item.key}
          name={item.name || item.key}
          dataKey={item.key}
          stroke={item.color}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);
export default CustomLineChart;
