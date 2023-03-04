import { periodsSelectors } from 'store/periods';
import { productsSelectors } from 'store/products';
import { RootState } from '../types';
import { ManufacturedQuantityStatistics } from './manufacturedQuantityStatistics.types';

const STATE_KEY = 'manufacturedQuantityStatistics';

export default class ManufacturedQuantityStatisticsSelectors {
  public static getAll = (state: RootState) => state[STATE_KEY].items;
  public static getByPeriodId = (periodId: string) => (state: RootState) =>
    state[STATE_KEY].items[periodId] || {};
  public static getByPeriodIdAndProductId =
    ({ periodId, productId }: { periodId: string; productId: string }) =>
    (state: RootState) =>
      state[STATE_KEY].items?.[periodId]?.[productId] || {};
  public static getByProjectId = (projectId: string) => (state: RootState) => {
    const periods = periodsSelectors.getByProjectId(projectId)(state);
    const periodIds = Object.keys(periods);
    const projectManufacturedQuantityStatistics =
      [] as ManufacturedQuantityStatistics[];

    periodIds.forEach(item => {
      const periodManufacturedQuantityStatisticsByProducts =
        this.getByPeriodId(item)(state);
      const periodManufacturedQuantityStatistics = Object.values(
        periodManufacturedQuantityStatisticsByProducts,
      ).reduce(
        (acc, item) => [...acc, ...Object.values(item)],
        [] as ManufacturedQuantityStatistics[],
      );

      projectManufacturedQuantityStatistics.push(
        ...periodManufacturedQuantityStatistics,
      );
    });

    return projectManufacturedQuantityStatistics;
  };
  public static getLastItems = (projectId: string) => (state: RootState) => {
    const projectManufacturedQuantityStatistics =
      this.getByProjectId(projectId)(state);

    const sorted = projectManufacturedQuantityStatistics.sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
    );

    return sorted.slice(0, 5);
  };
  public static getTotalManufacturedCostsByPeriods =
    (projectId: string) => (state: RootState) => {
      const projectManufacturedStatistics =
        this.getByProjectId(projectId)(state);

      return projectManufacturedStatistics.reduce(
        (acc, item) => ({
          ...acc,
          [item.periodId]:
            (acc?.[item.periodId] || 0) +
            Number(item.quantity) * Number(item.cost),
        }),
        {} as { [periodId: string]: number },
      );
    };
  public static getAverageProductCostAndQuantity =
    (projectId: string) => (state: RootState) => {
      const periods = periodsSelectors.getByProjectId(projectId)(state);
      const periodIds = Object.keys(periods);

      const products = productsSelectors.getByProjectId(projectId)(state);
      const productIds = Object.keys(products);

      const totalCostAndQuantity = productIds.reduce((acc, productId) => {
        const totalByPeriods = periodIds.reduce((acc, periodId) => {
          const items = this.getByPeriodIdAndProductId({ periodId, productId })(
            state,
          );

          const total = Object.values(items).reduce(
            (acc, item) => ({
              totalCost:
                acc.totalCost + Number(item.cost) * Number(item.quantity),
              totalQuantity: acc.totalQuantity + item.quantity,
            }),
            { totalCost: 0, totalQuantity: 0 } as {
              totalCost: number;
              totalQuantity: number;
            },
          );

          return {
            ...acc,
            [periodId]: {
              ...total,
              averageCost: total.totalQuantity
                ? total.totalCost / total.totalQuantity
                : 0,
            },
          };
        }, {} as { [periodId: string]: { totalCost: number; averageCost: number; totalQuantity: number } });

        return { ...acc, [productId]: { ...totalByPeriods } };
      }, {} as { [productId: string]: { [periodId: string]: { totalCost: number; averageCost: number; totalQuantity: number } } });

      return totalCostAndQuantity;
    };
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
