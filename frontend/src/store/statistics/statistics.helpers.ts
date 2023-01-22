import dayjs from 'dayjs';
import {
  StatisticsStore,
  StatisticsByMonths,
  StatisticsItems,
} from './statistics.types';

export const dateToMonth = (date: Date) =>
  dayjs(new Date(date)).format('MMM-YYYY');

export const getStatisticsSortedByMonths = (
  statistics: StatisticsStore[],
): StatisticsByMonths =>
  statistics.reduce(
    (acc, item) => ({
      ...acc,
      [dateToMonth(item.date)]: {
        ...acc[dateToMonth(item.date)],
        [item.id]: {
          ...item,
          costs: Number(item.costs),
          incomes: Number(item.incomes),
        },
      },
    }),
    {} as StatisticsByMonths,
  );

export const getSumForMonth = (
  statistics: StatisticsItems,
): { costs: number; incomes: number; profitability: number } => {
  const { costs, incomes } = Object.values(statistics).reduce(
    (acc, item) => {
      acc.costs += item.costs;
      acc.incomes += item.incomes;
      return acc;
    },
    { costs: 0, incomes: 0 },
  );

  return { costs, incomes, profitability: incomes - costs };
};

export const increaseMonth = (month: Date) => {
  const date = new Date(month);
  date.setMonth(date.getMonth() + 1);
  return date;
};

export const fillMissedMonths = (months: string[]) => {
  const firstMonth = months[0];
  const lastMonth = months[months.length - 1];

  const result: string[] = [];

  for (
    let month = new Date(firstMonth);
    month.getTime() <= new Date(lastMonth).getTime();
    month = increaseMonth(month)
  ) {
    result.push(dateToMonth(month));
  }

  return result;
};
