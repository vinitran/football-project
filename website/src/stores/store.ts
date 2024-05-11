import { combineReducers, configureStore } from '@reduxjs/toolkit';
import playerReducer from './player';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: combineReducers({ player: playerReducer })
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
