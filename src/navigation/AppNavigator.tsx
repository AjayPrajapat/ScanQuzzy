import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import { useAppSelector } from '@store/index';
import LoginScreen from '@screens/auth/LoginScreen';
import SignupScreen from '@screens/auth/SignupScreen';
import DashboardScreen from '@screens/DashboardScreen';
import ContentInputScreen from '@screens/ContentInputScreen';
import QuizGenerationScreen from '@screens/QuizGenerationScreen';
import QuizTakingScreen from '@screens/QuizTakingScreen';
import ExportShareScreen from '@screens/ExportShareScreen';
import AnalyticsScreen from '@screens/AnalyticsScreen';
import SettingsScreen from '@screens/SettingsScreen';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  ContentInput: undefined;
  QuizGeneration: { contentId: string } | undefined;
  QuizTaking: { quizId: string } | undefined;
  ExportShare: undefined;
  Analytics: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const token = useAppSelector((state) => state.auth.token);
  const themePreference = useAppSelector((state) => state.settings.theme);
  const systemScheme = useColorScheme();

  const navTheme = themePreference === 'system'
    ? systemScheme === 'dark'
      ? DarkTheme
      : DefaultTheme
    : themePreference === 'dark'
    ? DarkTheme
    : DefaultTheme;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ContentInput" component={ContentInputScreen} options={{ title: 'Add Content' }} />
            <Stack.Screen name="QuizGeneration" component={QuizGenerationScreen} options={{ title: 'Generate Quiz' }} />
            <Stack.Screen name="QuizTaking" component={QuizTakingScreen} options={{ title: 'Take Quiz' }} />
            <Stack.Screen name="ExportShare" component={ExportShareScreen} options={{ title: 'Export & Share' }} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ title: 'Analytics' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create Account' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
