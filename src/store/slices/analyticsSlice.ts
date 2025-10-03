import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@services/api';
import type { AnalyticsSummary } from '@types/index';

interface AnalyticsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  summary?: AnalyticsSummary;
  error?: string;
}

const initialState: AnalyticsState = {
  status: 'idle',
};

export const fetchAnalytics = createAsyncThunk('analytics/fetch', async () => {
  const response = await api.get('/analytics/user');
  const summary = response.data as AnalyticsSummary;
  await AsyncStorage.setItem('scanquzzy_analytics', JSON.stringify(summary));
  return summary;
});

export const loadCachedAnalytics = createAsyncThunk('analytics/cache', async () => {
  const cached = await AsyncStorage.getItem('scanquzzy_analytics');
  if (!cached) return undefined;
  return JSON.parse(cached) as AnalyticsSummary;
});

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.summary = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadCachedAnalytics.fulfilled, (state, action) => {
        if (action.payload) {
          state.summary = action.payload;
          state.status = 'succeeded';
        }
      });
  },
});

export default analyticsSlice.reducer;
