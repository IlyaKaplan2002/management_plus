import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Box, IconButton, Typography } from '@mui/material';
import ProjectLayout from 'components/ProjectLayout';
import { useSelector } from 'react-redux';
import { periodsSelectors } from 'store/periods';
import { incomeStatisticsSelectors } from 'store/incomeStatistics';
import { manufacturedQuantityStatisticsSelectors } from 'store/manufacturedQuantityStatistics';
import { otherIncomeStatisticsSelectors } from 'store/otherIncomeStatistics';
import { costsStatisticsSelectors } from 'store/costsStatistics';
import { useMemo } from 'react';
import Chart from '../components/Chart';
import { productsSelectors } from 'store/products';
import { randomColorGenerator } from '../../../helpers/randomColorGenerator';
import { normativePriceSelectors } from 'store/normativePrice';
import { plannedSellQuantitySelectors } from 'store/plannedSellQuantity';

const ProjectDashboard = () => {
  const { id: projectId } = useParams();

  const periods = useSelector(periodsSelectors.getByProjectId(projectId || ''));
  const incomeStatistics = useSelector(
    incomeStatisticsSelectors.getTotalIncomesByPeriods(projectId || ''),
  );
  const manufacturedStatistics = useSelector(
    manufacturedQuantityStatisticsSelectors.getTotalManufacturedCostsByPeriods(
      projectId || '',
    ),
  );
  const otherIncomeStatistics = useSelector(
    otherIncomeStatisticsSelectors.getTotalOtherIncomeByPeriods(
      projectId || '',
    ),
  );
  const costsStatistics = useSelector(
    costsStatisticsSelectors.getTotalCostsByPeriods(projectId || ''),
  );

  const products = useSelector(
    productsSelectors.getByProjectId(projectId || ''),
  );

  const totalIncomeStatisticsByProducts = useSelector(
    incomeStatisticsSelectors.getAverageProductPriceAndQuantity(
      projectId || '',
    ),
  );

  const totalManufacturedStatisticsByProducts = useSelector(
    manufacturedQuantityStatisticsSelectors.getAverageProductCostAndQuantity(
      projectId || '',
    ),
  );

  const normativePrices = useSelector(normativePriceSelectors.getAll);

  const plannedSellQuantities = useSelector(
    plannedSellQuantitySelectors.getAll,
  );

  const totalPlannedSellQuantities = useSelector(
    plannedSellQuantitySelectors.getTotalPlannedSellQuantityByPeriods(
      projectId || '',
    ),
  );

  const sortedPeriods = useMemo(
    () =>
      Object.values(periods).sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      ),
    [periods],
  );

  const profitChartData = useMemo(() => {
    const allData = sortedPeriods.map((periodItem, index) => {
      const key = periodItem.id;

      const incomeItem = incomeStatistics?.[key];
      const income = incomeItem?.income || 0;

      const manufacturedItem = manufacturedStatistics?.[key] || 0;
      const otherIncomeItem = otherIncomeStatistics?.[key] || 0;
      const costsItem = costsStatistics?.[key] || 0;

      const prevKey = sortedPeriods[index - 1]?.id || '';

      const prevIncomeItem = incomeStatistics?.[prevKey];
      const prevIncome = prevIncomeItem?.income || 0;
      const prevManufacturedItem = manufacturedStatistics?.[prevKey] || 0;
      const prevOtherIncomeItem = otherIncomeStatistics?.[prevKey] || 0;
      const prevCostsItem = costsStatistics?.[prevKey] || 0;

      return {
        Income: otherIncomeItem + income,
        Costs: manufacturedItem + costsItem,
        Profit: otherIncomeItem + income - (manufacturedItem + costsItem),
        Period: index + 1,
        ProfitChange:
          otherIncomeItem +
          income -
          (manufacturedItem + costsItem) -
          (prevOtherIncomeItem +
            prevIncome -
            (prevManufacturedItem + prevCostsItem)),
      };
    });

    return allData;
  }, [
    sortedPeriods,
    incomeStatistics,
    manufacturedStatistics,
    otherIncomeStatistics,
    costsStatistics,
  ]);

  const productChartData = useMemo(() => {
    const allData = sortedPeriods.map((periodItem, index) => {
      const periodKey = periodItem.id;
      const prevPeriodKey = sortedPeriods[index - 1]?.id || '';

      const chartDataForProducts = Object.values(products).reduce(
        (acc, productItem) => {
          const productKey = productItem.id;

          const totalIncomeStatisticsItem =
            totalIncomeStatisticsByProducts?.[productKey]?.[periodKey];

          const averagePrice = totalIncomeStatisticsItem?.averagePrice || 0;
          const quantity = totalIncomeStatisticsItem?.totalQuantity || 0;

          const prevTotalIncomeStatisticsItem =
            totalIncomeStatisticsByProducts?.[productKey]?.[prevPeriodKey];

          const prevAveragePrice =
            prevTotalIncomeStatisticsItem?.averagePrice || 0;
          const prevQuantity =
            prevTotalIncomeStatisticsItem?.totalQuantity || 0;
          const prevTotalPrice = prevTotalIncomeStatisticsItem?.totalPrice || 0;

          const totalManufacturedStatisticsItem =
            totalManufacturedStatisticsByProducts?.[productKey]?.[periodKey];

          const manufacturedQuantity =
            totalManufacturedStatisticsItem?.totalQuantity || 0;
          const manufacturedAverageCost =
            totalManufacturedStatisticsItem?.averageCost || 0;

          const prevTotalManufacturedStatisticsItem =
            totalManufacturedStatisticsByProducts?.[productKey]?.[
              prevPeriodKey
            ];

          const prevManufacturedAverageCost =
            prevTotalManufacturedStatisticsItem?.averageCost || 0;

          const elasticity =
            prevQuantity && prevAveragePrice
              ? (((quantity - prevQuantity) / prevQuantity) * 100) /
                (((averagePrice - prevAveragePrice) / prevAveragePrice) * 100)
              : 0;

          return {
            ...acc,
            [`${productItem.name}ImpactPrice`]:
              averagePrice * quantity - prevAveragePrice * quantity,
            [`${productItem.name}ImpactQuantity`]:
              prevQuantity * prevAveragePrice
                ? prevTotalPrice *
                  ((quantity * prevAveragePrice) /
                    (prevQuantity * prevAveragePrice) -
                    1)
                : 0,
            [`${productItem.name}ImpactCost`]:
              manufacturedQuantity * prevManufacturedAverageCost -
              manufacturedQuantity * manufacturedAverageCost,
            [`${productItem.name}Elasticity`]: elasticity,
          };
        },
        {} as { [productName: string]: number },
      );

      return { ...chartDataForProducts, Period: index + 1 };
    });

    return allData;
  }, [
    sortedPeriods,
    totalIncomeStatisticsByProducts,
    products,
    totalManufacturedStatisticsByProducts,
  ]);

  const deviationChartData = useMemo(() => {
    const allData = sortedPeriods.map((periodItem, index) => {
      const periodKey = periodItem.id;

      const incomeItem = incomeStatistics[periodKey];

      const totalSoldQuantity = incomeItem?.quantity || 0;

      const totalPlannedSellQuantity =
        totalPlannedSellQuantities[periodKey] || 0;

      const chartData = Object.values(products).reduce(
        (acc, productItem) => {
          const productKey = productItem.id;

          const normativePriceItems =
            normativePrices?.[periodKey]?.[productKey];
          const normativePriceItem = normativePriceItems
            ? Object.values(normativePriceItems)[0]
            : null;
          const normativePrice = normativePriceItem?.price
            ? Number(normativePriceItem.price)
            : 0;

          const plannedSellQuantityItems =
            plannedSellQuantities?.[periodKey]?.[productKey];
          const plannedSellQuantityItem = plannedSellQuantityItems
            ? Object.values(plannedSellQuantityItems)[0]
            : null;
          const plannedSellQuantity = plannedSellQuantityItem?.quantity
            ? Number(plannedSellQuantityItem.quantity)
            : 0;

          const totalIncomeStatisticsItem =
            totalIncomeStatisticsByProducts?.[productKey]?.[periodKey];

          const averagePrice = totalIncomeStatisticsItem?.averagePrice || 0;
          const totalQuantity = totalIncomeStatisticsItem?.totalQuantity || 0;

          const factWeight = totalSoldQuantity
            ? totalQuantity / totalSoldQuantity
            : 0;
          const plannedWeight = totalPlannedSellQuantity
            ? plannedSellQuantity / totalPlannedSellQuantity
            : 0;

          return {
            DeviationByPrice:
              acc.DeviationByPrice +
              (averagePrice - normativePrice) * totalQuantity,
            DeviationBySalesVolume:
              acc.DeviationBySalesVolume +
              (totalQuantity - plannedSellQuantity) * normativePrice,
            DeviationBySalesCombination:
              acc.DeviationBySalesCombination +
              (factWeight - plannedWeight) * normativePrice * totalSoldQuantity,
          };
        },
        {
          DeviationByPrice: 0,
          DeviationBySalesVolume: 0,
          DeviationBySalesCombination: 0,
        },
      );

      return {
        ...chartData,
        DeviationBySales:
          chartData.DeviationBySalesVolume -
          chartData.DeviationBySalesCombination,
        Period: index + 1,
      };
    });

    return allData;
  }, [
    sortedPeriods,
    normativePrices,
    plannedSellQuantities,
    totalIncomeStatisticsByProducts,
    totalPlannedSellQuantities,
    incomeStatistics,
    products,
  ]);

  const impactPriceProductChartKeys = useMemo(
    () =>
      Object.values(products).map(item => ({
        key: `${item.name}ImpactPrice`,
        name: `${item.name} Price Impact`,
        color: randomColorGenerator(),
      })),
    [products],
  );

  const impactQuantityChartKeys = useMemo(
    () =>
      Object.values(products).map(item => ({
        key: `${item.name}ImpactQuantity`,
        name: `${item.name} Sales Impact`,
        color: randomColorGenerator(),
      })),
    [products],
  );

  const impactCostChartKeys = useMemo(
    () =>
      Object.values(products).map(item => ({
        key: `${item.name}ImpactCost`,
        name: `${item.name} Cost Impact`,
        color: randomColorGenerator(),
      })),
    [products],
  );

  const elasticityChartKeys = useMemo(
    () =>
      Object.values(products).map(item => ({
        key: `${item.name}Elasticity`,
        name: `${item.name} Elasticity`,
        color: randomColorGenerator(),
      })),
    [products],
  );

  return (
    <ProjectLayout>
      <ProjectDashboard.Wrapper>
        <ProjectDashboard.LeftWrapper>
          <ProjectDashboard.ChartsWrapper>
            <ProjectDashboard.ChartContainer>
              <Typography variant="subtitle1">
                Profit statistics chart
              </Typography>
              <Chart
                type="bar"
                data={profitChartData}
                keys={[{ key: 'Profit', color: 'blue' }]}
                xAxisKey="Period"
              />
            </ProjectDashboard.ChartContainer>

            <ProjectDashboard.ChartContainer>
              <Typography variant="subtitle1">
                Income and costs statistics chart
              </Typography>
              <Chart
                type="line"
                data={profitChartData}
                keys={[
                  { key: 'Income', color: 'green' },
                  { key: 'Costs', color: 'red' },
                ]}
                xAxisKey="Period"
              />
            </ProjectDashboard.ChartContainer>
          </ProjectDashboard.ChartsWrapper>

          <ProjectDashboard.ChartsWrapper>
            <ProjectDashboard.ChartContainer>
              <Typography variant="subtitle1">
                Period profit change chart
              </Typography>
              <Chart
                type="bar"
                data={profitChartData}
                keys={[
                  { key: 'ProfitChange', color: 'blue', name: 'Profit change' },
                ]}
                xAxisKey="Period"
              />
            </ProjectDashboard.ChartContainer>

            <ProjectDashboard.ChartContainer>
              <Typography variant="subtitle1">
                Impact of prices on profit
              </Typography>
              <Chart
                type="line"
                data={productChartData}
                keys={impactPriceProductChartKeys}
                xAxisKey="Period"
              />
            </ProjectDashboard.ChartContainer>
          </ProjectDashboard.ChartsWrapper>

          <ProjectDashboard.ChartsWrapper>
            <ProjectDashboard.ChartContainer>
              <Typography variant="subtitle1">
                Impact of sales on profit
              </Typography>
              <Chart
                type="line"
                data={productChartData}
                keys={impactQuantityChartKeys}
                xAxisKey="Period"
              />
            </ProjectDashboard.ChartContainer>

            <ProjectDashboard.ChartContainer>
              <Typography variant="subtitle1">
                Impact of production cost on profit
              </Typography>
              <Chart
                type="line"
                data={productChartData}
                keys={impactCostChartKeys}
                xAxisKey="Period"
              />
            </ProjectDashboard.ChartContainer>
          </ProjectDashboard.ChartsWrapper>

          <ProjectDashboard.ChartsWrapper>
            <ProjectDashboard.ChartContainer>
              <Typography variant="subtitle1">
                Profit deviation estimation
              </Typography>
              <Chart
                type="line"
                data={deviationChartData}
                keys={[
                  {
                    key: 'DeviationByPrice',
                    name: 'Deviation by price',
                    color: randomColorGenerator(),
                  },
                  {
                    key: 'DeviationBySalesVolume',
                    name: 'Deviation by sales volume',
                    color: randomColorGenerator(),
                  },
                  {
                    key: 'DeviationBySales',
                    name: 'Deviation by sales',
                    color: randomColorGenerator(),
                  },
                  {
                    key: 'DeviationBySalesCombination',
                    name: 'Deviation by sales combination',
                    color: randomColorGenerator(),
                  },
                ]}
                xAxisKey="Period"
              />
            </ProjectDashboard.ChartContainer>

            <ProjectDashboard.ChartContainer>
              <Typography variant="subtitle1">Elasticity</Typography>
              <Chart
                type="line"
                data={productChartData}
                keys={elasticityChartKeys}
                xAxisKey="Period"
                elasticity
              />
            </ProjectDashboard.ChartContainer>
          </ProjectDashboard.ChartsWrapper>
        </ProjectDashboard.LeftWrapper>
      </ProjectDashboard.Wrapper>
    </ProjectLayout>
  );
};

ProjectDashboard.Wrapper = styled.div`
  display: flex;
`;

ProjectDashboard.Title = styled(Typography)`
  margin-bottom: 20px;
  margin-left: 65px;
`;

ProjectDashboard.LeftWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-right: 40px;
  height: calc(100vh - 142px);
`;

ProjectDashboard.Button = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: -4px;
`;

ProjectDashboard.ChartsWrapper = styled.div`
  height: calc((100% - 52px) / 2);
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

ProjectDashboard.RightWrapper = styled.div`
  width: 25%;
`;

ProjectDashboard.ChartContainer = styled(Box)`
  width: calc((100% - 20px) / 2);
  height: 100%;
`;

export default ProjectDashboard;
