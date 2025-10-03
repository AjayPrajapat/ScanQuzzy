import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import AppNavigator from '@navigation/AppNavigator';
import { store, useAppSelector } from '@store/index';
import './src/i18n';
import { useBootstrap } from '@hooks/useBootstrap';
import { darkTheme, lightTheme } from '@theme/index';

// Root component attaches all providers and handles dynamic theming.
const ThemedApp = () => {
  useBootstrap();
  const themePreference = useAppSelector((state) => state.settings.theme);
  const systemScheme = useColorScheme();
  const isDark = themePreference === 'system' ? systemScheme === 'dark' : themePreference === 'dark';
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppNavigator />
    </PaperProvider>
  );
};

const App = () => (
  <ReduxProvider store={store}>
    <ThemedApp />
  </ReduxProvider>
);

export default App;
