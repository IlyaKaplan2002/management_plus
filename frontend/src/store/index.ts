import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { persistStore } from 'redux-persist';
import { AppDispatch } from './types';
import { useDispatch } from 'react-redux';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);

export default store;
