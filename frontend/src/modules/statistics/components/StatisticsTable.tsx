import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';

export interface StatisticsTableColumn {
  name: string;
  key: string;
  type: 'string' | 'number' | 'date';
}

export interface StatisticsTableDataItem {
  id: string;
  [key: string]: number | string | Date;
}

interface StatisticsTableProps {
  columns: StatisticsTableColumn[];
  data: StatisticsTableDataItem[];
}

const StatisticsTable = ({ columns, data }: StatisticsTableProps) => {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(item => (
              <TableCell align="left" key={item.key}>
                {item.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              {columns.map(columnItem => (
                <TableCell align="left" key={columnItem.key}>
                  {columnItem.type === 'date'
                    ? dayjs(item[columnItem.key]).format('DD/MM/YYYY hh:mm:ss')
                    : String(item[columnItem.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatisticsTable;
