import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  bodyLarge: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 16 },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1A73E8',
    secondary: '#6C63FF',
    background: '#FFFFFF',
    surface: '#FFFFFF',
  },
  fonts: configureFonts({ config: fontConfig }),
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6C63FF',
    secondary: '#1A73E8',
    background: '#0F172A',
    surface: '#111827',
  },
  fonts: configureFonts({ config: fontConfig }),
};
