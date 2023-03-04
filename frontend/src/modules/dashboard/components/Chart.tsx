import { ChartData } from 'store/types';
import CustomBarChart from './CustomBarChart';
import CustomLineChart from './CustomLineChart';

interface ChartProps {
  keys: { key: string; color: string; name?: string }[];
  type: 'bar' | 'line';
  data: ChartData[];
  xAxisKey: string;
  elasticity?: boolean;
}

const Chart = ({ data, keys, type, xAxisKey, elasticity }: ChartProps) => (
  <>
    {type === 'bar' ? (
      <CustomBarChart data={data} keys={keys} xAxisKey={xAxisKey} />
    ) : (
      <CustomLineChart
        data={data}
        keys={keys}
        xAxisKey={xAxisKey}
        elasticity={elasticity}
      />
    )}
  </>
);
export default Chart;
