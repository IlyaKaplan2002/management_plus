import { Box, Button, Typography } from '@mui/material';
import ProjectLayout from 'components/ProjectLayout';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { costsCategoriesSelectors } from 'store/costsCategories';
import { costsStatisticsSelectors } from 'store/costsStatistics';
import { incomeStatisticsSelectors } from 'store/incomeStatistics';
import { manufacturedQuantityStatisticsSelectors } from 'store/manufacturedQuantityStatistics';
import { otherIncomeStatisticsSelectors } from 'store/otherIncomeStatistics';
import { periodsSelectors } from 'store/periods';
import { productsSelectors } from 'store/products';
import styled from 'styled-components';
import AddIncomeStatistics from '../components/AddIncomeStatistics';
import AddManufacturedStatistics from '../components/AddManufacturedStatistics';
import StatisticsTable, {
  StatisticsTableColumn,
  StatisticsTableDataItem,
} from '../components/StatisticsTable';
import AddCostsStatistics from '../forms/AddCostsStatistics';
import AddOtherIncomeStatistics from '../forms/AddOtherIncomeStatistics';

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

const OTHER_INCOME_STATISTICS_COLUMNS: StatisticsTableColumn[] = [
  { name: 'Income', key: 'income', type: 'number' },
  { name: 'Creation date', key: 'creationDate', type: 'date' },
];

const COSTS_STATISTICS_COLUMNS: StatisticsTableColumn[] = [
  { name: 'Category', key: 'category', type: 'string' },
  { name: 'Costs', key: 'costs', type: 'number' },
  { name: 'Creation date', key: 'creationDate', type: 'date' },
];

const StatisticsPage = () => {
  const { id: projectId } = useParams();

  const navigate = useNavigate();

  const [incomeStatisticsOpen, setIncomeStatisticsOpen] =
    useState<boolean>(false);

  const [manufacturedStatisticsOpen, setManufacturedStatisticsOpen] =
    useState<boolean>(false);

  const products = useSelector(
    productsSelectors.getByProjectId(projectId || ''),
  );

  const costsCategories = useSelector(
    costsCategoriesSelectors.getByProjectId(projectId || ''),
  );

  const lastIncomeStatistics = useSelector(
    incomeStatisticsSelectors.getLastItems(projectId || ''),
  );

  const currentPeriod = useSelector(
    periodsSelectors.getCurrentPeriod(projectId || ''),
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

  const otherIncomeStatistics = useSelector(
    otherIncomeStatisticsSelectors.getLastItems(projectId || ''),
  );

  const otherIncomeStatisticsData: StatisticsTableDataItem[] = useMemo(
    () =>
      otherIncomeStatistics.map(
        (item): StatisticsTableDataItem => ({
          id: item.id,
          income: item.income,
          creationDate: item.creationDate,
        }),
      ),
    [otherIncomeStatistics],
  );

  const costsStatistics = useSelector(
    costsStatisticsSelectors.getLastItems(projectId || ''),
  );

  const costsStatisticsData: StatisticsTableDataItem[] = useMemo(
    () =>
      costsStatistics.map(
        (item): StatisticsTableDataItem => ({
          id: item.id,
          creationDate: item.creationDate,
          costs: item.costs,
          category: costsCategories?.[item.costsCategoryId]?.name || '',
        }),
      ),
    [costsStatistics, costsCategories],
  );

  return (
    <ProjectLayout>
      <Typography variant="h4" marginBottom="30px">
        Statistics
      </Typography>

      {currentPeriod &&
        Boolean(Object.values(products).length) &&
        Boolean(Object.values(costsCategories).length) && (
          <>
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
              <StatisticsPage.StatsContainer>
                <Box
                  marginBottom="20px"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">Other incomes statistics</Typography>
                </Box>

                <AddOtherIncomeStatistics />

                {Boolean(otherIncomeStatisticsData.length) && (
                  <>
                    <Typography
                      marginTop="78px"
                      marginBottom="5px"
                      variant="subtitle1"
                    >
                      Last created
                    </Typography>
                    <StatisticsTable
                      columns={OTHER_INCOME_STATISTICS_COLUMNS}
                      data={otherIncomeStatisticsData}
                    />
                  </>
                )}
              </StatisticsPage.StatsContainer>

              <StatisticsPage.StatsContainer>
                <Box
                  marginBottom="20px"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">Costs statistics</Typography>
                </Box>

                <AddCostsStatistics />

                {Boolean(costsStatisticsData.length) && (
                  <>
                    <Typography marginBottom="5px" variant="subtitle1">
                      Last created
                    </Typography>
                    <StatisticsTable
                      columns={COSTS_STATISTICS_COLUMNS}
                      data={costsStatisticsData}
                    />
                  </>
                )}
              </StatisticsPage.StatsContainer>
            </StatisticsPage.Container>

            <AddIncomeStatistics
              open={incomeStatisticsOpen}
              onClose={() => setIncomeStatisticsOpen(false)}
            />

            <AddManufacturedStatistics
              open={manufacturedStatisticsOpen}
              onClose={() => setManufacturedStatisticsOpen(false)}
            />
          </>
        )}

      {!currentPeriod && (
        <Button onClick={() => navigate(`/projects/${projectId}/periods`)}>
          Start a period first
        </Button>
      )}

      {!Boolean(Object.values(products).length) && (
        <Button onClick={() => navigate(`/projects/${projectId}/products`)}>
          Create a product first
        </Button>
      )}

      {!Boolean(Object.values(costsCategories).length) && (
        <Button onClick={() => navigate(`/projects/${projectId}/settings`)}>
          Create a cost category first
        </Button>
      )}
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
