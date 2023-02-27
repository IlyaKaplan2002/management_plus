import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { costsCategoriesReducer } from './costsCategories';
import { normativePriceReducer } from './normativePrice';
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
});

export default rootReducer;
