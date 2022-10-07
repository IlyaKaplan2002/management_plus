import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { projectsReducer } from './projects';
import { statisticsReducer } from './statistics';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  statistics: statisticsReducer,
});

export default rootReducer;
