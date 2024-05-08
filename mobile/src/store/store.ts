import { combineReducers, configureStore } from '@reduxjs/toolkit';
import walletRducer from './wallet.slice';
import userReducer from './user.slice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
