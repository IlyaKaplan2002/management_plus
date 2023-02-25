import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { productsReducer } from './products';
import { projectsReducer } from './projects';
import { statisticsReducer } from './statistics';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  statistics: statisticsReducer,
  products: productsReducer,
});

export default rootReducer;
