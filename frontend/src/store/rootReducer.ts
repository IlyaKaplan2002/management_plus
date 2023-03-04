import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { costsCategoriesReducer } from './costsCategories';
import { costsStatisticsReducer } from './costsStatistics';
import { incomeStatisticsReducer } from './incomeStatistics';
import { manufacturedQuantityStatisticsReducer } from './manufacturedQuantityStatistics';
import { normativePriceReducer } from './normativePrice';
import { otherIncomeStatisticsReducer } from './otherIncomeStatistics';
import { periodsReducer } from './periods';
import { plannedSellQuantityReducer } from './plannedSellQuantity';
import { productsReducer } from './products';
import { projectsReducer } from './projects';
import { statisticsReducer } from './statistics';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  statistics: statisticsReducer,
  products: productsReducer,
  costsCategories: costsCategoriesReducer,
  periods: periodsReducer,
  normativePrice: normativePriceReducer,
  plannedSellQuantity: plannedSellQuantityReducer,
  incomeStatistics: incomeStatisticsReducer,
  manufacturedQuantityStatistics: manufacturedQuantityStatisticsReducer,
  otherIncomeStatistics: otherIncomeStatisticsReducer,
  costsStatistics: costsStatisticsReducer,
});

export default rootReducer;
