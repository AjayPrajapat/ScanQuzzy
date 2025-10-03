import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface SettingsState {
  theme: ThemeMode;
  language: string;
}

const initialState: SettingsState = {
  theme: 'system',
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
      AsyncStorage.setItem('scanquzzy_theme', action.payload);
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      AsyncStorage.setItem('scanquzzy_language', action.payload);
    },
    hydrateSettings(state, action: PayloadAction<Partial<SettingsState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setTheme, setLanguage, hydrateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
