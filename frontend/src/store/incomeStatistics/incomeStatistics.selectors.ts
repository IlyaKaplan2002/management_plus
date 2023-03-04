import { periodsSelectors } from 'store/periods';
import { productsSelectors } from 'store/products';
import { RootState } from '../types';
import { IncomeStatistics } from './incomeStatistics.types';

const STATE_KEY = 'incomeStatistics';

export default class IncomeStatisticsSelectors {
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
    const projectIncomeStatistics = [] as IncomeStatistics[];

    periodIds.forEach(item => {
      const periodIncomeStatisticsByProducts = this.getByPeriodId(item)(state);
      const periodIncomeStatistics = Object.values(
        periodIncomeStatisticsByProducts,
      ).reduce(
        (acc, item) => [...acc, ...Object.values(item)],
        [] as IncomeStatistics[],
      );

      projectIncomeStatistics.push(...periodIncomeStatistics);
    });

    return projectIncomeStatistics;
  };
  public static getLastItems = (projectId: string) => (state: RootState) => {
    const projectIncomeStatistics = this.getByProjectId(projectId)(state);

    const sorted = projectIncomeStatistics.sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
    );

    return sorted.slice(0, 5);
  };
  public static getTotalIncomesByPeriods =
    (projectId: string) => (state: RootState) => {
      const projectIncomeStatistics = this.getByProjectId(projectId)(state);

      return projectIncomeStatistics.reduce(
        (acc, item) => ({
          ...acc,
          [item.periodId]: {
            income:
              (acc?.[item.periodId]?.income || 0) +
              Number(item.quantity) * Number(item.price),
            quantity:
              (acc?.[item.periodId]?.quantity || 0) + Number(item.quantity),
          },
        }),
        {} as { [periodId: string]: { income: number; quantity: number } },
      );
    };
  public static getAverageProductPriceAndQuantity =
    (projectId: string) => (state: RootState) => {
      const periods = periodsSelectors.getByProjectId(projectId)(state);
      const periodIds = Object.keys(periods);

      const products = productsSelectors.getByProjectId(projectId)(state);
      const productIds = Object.keys(products);

      const totalPriceAndQuantity = productIds.reduce((acc, productId) => {
        const totalByPeriods = periodIds.reduce((acc, periodId) => {
          const items = this.getByPeriodIdAndProductId({ periodId, productId })(
            state,
          );

          const total = Object.values(items).reduce(
            (acc, item) => ({
              totalPrice:
                acc.totalPrice + Number(item.price) * Number(item.quantity),
              totalQuantity: acc.totalQuantity + item.quantity,
            }),
            { totalPrice: 0, totalQuantity: 0 } as {
              totalPrice: number;
              totalQuantity: number;
            },
          );

          return {
            ...acc,
            [periodId]: {
              ...total,
              averagePrice: total.totalQuantity
                ? total.totalPrice / total.totalQuantity
                : 0,
            },
          };
        }, {} as { [periodId: string]: { totalPrice: number; averagePrice: number; totalQuantity: number } });

        return { ...acc, [productId]: { ...totalByPeriods } };
      }, {} as { [productId: string]: { [periodId: string]: { totalPrice: number; averagePrice: number; totalQuantity: number } } });

      return totalPriceAndQuantity;
    };
  public static getLoading = (state: RootState) => state[STATE_KEY].loading;
  public static getFetched = (state: RootState) => state[STATE_KEY].fetched;
  public static getError = (state: RootState) => state[STATE_KEY].error;
}
