import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from './slices/authSlice';
import quizReducer from './slices/quizSlice';
import analyticsReducer from './slices/analyticsSlice';
import settingsReducer from './slices/settingsSlice';

// Configure the global Redux store for the application.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    analytics: analyticsReducer,
    settings: settingsReducer,
  },
});

// Infer types for hooks.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for Redux usage inside components.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
