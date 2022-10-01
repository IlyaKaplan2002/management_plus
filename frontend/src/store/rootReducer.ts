import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { projectsReducer } from './projects';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
});

export default rootReducer;
