import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@services/api';
import type { UserProfile } from '@types/index';

type AuthState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  token?: string;
  user?: UserProfile;
};

const initialState: AuthState = {
  status: 'idle',
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    // Bypass API call, return mock token and user
    const accessToken = 'mock_token';
    const user: UserProfile = {
      id: '1',
      name: 'Test User',
      email: credentials.email,
      // Add other UserProfile fields as needed
    };
    await AsyncStorage.setItem('scanquzzy_token', accessToken);
    await AsyncStorage.setItem('scanquzzy_user', JSON.stringify(user));
    return { accessToken, user };
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (payload: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/signup', payload);
    return response.data;
  },
);

export const bootstrapAuth = createAsyncThunk('auth/bootstrap', async () => {
  const token = await AsyncStorage.getItem('scanquzzy_token');
  const rawUser = await AsyncStorage.getItem('scanquzzy_user');
  if (token && rawUser) {
    return { token, user: JSON.parse(rawUser) as UserProfile };
  }
  return { token: undefined, user: undefined };
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.multiRemove(['scanquzzy_token', 'scanquzzy_user']);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.token = undefined;
        state.user = undefined;
      });
  },
});

export default authSlice.reducer;
