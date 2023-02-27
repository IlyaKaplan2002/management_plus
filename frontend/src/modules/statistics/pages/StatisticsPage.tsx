import { Box, Button, Typography } from '@mui/material';
import ProjectLayout from 'components/ProjectLayout';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { incomeStatisticsSelectors } from 'store/incomeStatistics';
import { manufacturedQuantityStatisticsSelectors } from 'store/manufacturedQuantityStatistics';
import { productsSelectors } from 'store/products';
import styled from 'styled-components';
import AddIncomeStatistics from '../components/AddIncomeStatistics';
import AddManufacturedStatistics from '../components/AddManufacturedStatistics';
import StatisticsTable, {
  StatisticsTableColumn,
  StatisticsTableDataItem,
} from '../components/StatisticsTable';

const INCOME_STATISTICS_COLUMNS: StatisticsTableColumn[] = [
  { name: 'Product', key: 'product', type: 'string' },
  { name: 'Price', key: 'price', type: 'number' },
  { name: 'Quantity', key: 'quantity', type: 'number' },
  { name: 'Total price', key: 'totalPrice', type: 'number' },
  { name: 'Creation date', key: 'creationDate', type: 'date' },
];

const MANUFACTURED_QUANTITY_STATISTICS_COLUMNS: StatisticsTableColumn[] = [
  { name: 'Product', key: 'product', type: 'string' },
  { name: 'Cost', key: 'cost', type: 'number' },
  { name: 'Quantity', key: 'quantity', type: 'number' },
  { name: 'Total cost', key: 'totalCost', type: 'number' },
  { name: 'Creation date', key: 'creationDate', type: 'date' },
];

const StatisticsPage = () => {
  const { id: projectId } = useParams();

  const [incomeStatisticsOpen, setIncomeStatisticsOpen] =
    useState<boolean>(false);

  const [manufacturedStatisticsOpen, setManufacturedStatisticsOpen] =
    useState<boolean>(false);

  const products = useSelector(
    productsSelectors.getByProjectId(projectId || ''),
  );

  const lastIncomeStatistics = useSelector(
    incomeStatisticsSelectors.getLastItems(projectId || ''),
  );

  const incomeStatisticsData: StatisticsTableDataItem[] = useMemo(
    () =>
      lastIncomeStatistics.map(
        (item): StatisticsTableDataItem => ({
          id: item.id,
          product: products?.[item.productId]?.name || '',
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.quantity * item.price,
          creationDate: item.creationDate,
        }),
      ),
    [lastIncomeStatistics, products],
  );

  const lastManufacturedQuantityStatistics = useSelector(
    manufacturedQuantityStatisticsSelectors.getLastItems(projectId || ''),
  );

  const manufacturedQuantityStatisticsData: StatisticsTableDataItem[] = useMemo(
    () =>
      lastManufacturedQuantityStatistics.map(
        (item): StatisticsTableDataItem => ({
          id: item.id,
          product: products?.[item.productId]?.name || '',
          quantity: item.quantity,
          cost: item.cost,
          totalCost: item.quantity * item.cost,
          creationDate: item.creationDate,
        }),
      ),
    [lastManufacturedQuantityStatistics, products],
  );

  return (
    <ProjectLayout>
      <Typography variant="h4" marginBottom="30px">
        Statistics
      </Typography>

      <StatisticsPage.Container>
        <StatisticsPage.StatsContainer>
          <Box
            marginBottom="20px"
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h6">Sales statistics</Typography>

            <Button onClick={() => setIncomeStatisticsOpen(true)}>
              Add sales statistics
            </Button>
          </Box>

          <Typography marginBottom="5px" variant="subtitle1">
            Last created
          </Typography>
          <StatisticsTable
            data={incomeStatisticsData}
            columns={INCOME_STATISTICS_COLUMNS}
          />
        </StatisticsPage.StatsContainer>

        <StatisticsPage.StatsContainer>
          <Box
            marginBottom="20px"
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h6">Production statistics</Typography>

            <Button onClick={() => setManufacturedStatisticsOpen(true)}>
              Add production statistics
            </Button>
          </Box>

          <Typography marginBottom="5px" variant="subtitle1">
            Last created
          </Typography>
          <StatisticsTable
            data={manufacturedQuantityStatisticsData}
            columns={MANUFACTURED_QUANTITY_STATISTICS_COLUMNS}
          />
        </StatisticsPage.StatsContainer>
      </StatisticsPage.Container>

      <StatisticsPage.Container>
        <StatisticsPage.StatsContainer>test2</StatisticsPage.StatsContainer>
        <StatisticsPage.StatsContainer>test3</StatisticsPage.StatsContainer>
      </StatisticsPage.Container>

      <AddIncomeStatistics
        open={incomeStatisticsOpen}
        onClose={() => setIncomeStatisticsOpen(false)}
      />

      <AddManufacturedStatistics
        open={manufacturedStatisticsOpen}
        onClose={() => setManufacturedStatisticsOpen(false)}
      />
    </ProjectLayout>
  );
};

StatisticsPage.Container = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

StatisticsPage.StatsContainer = styled(Box)`
  width: 45%;
  margin-bottom: 50px;
`;

export default StatisticsPage;
