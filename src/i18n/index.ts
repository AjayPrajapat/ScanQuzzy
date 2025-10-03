import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Translation resources for multi-language support.
const resources = {
  en: {
    translation: {
      welcome: 'Welcome back',
      login: 'Login',
      signup: 'Create Account',
      dashboard: 'Dashboard',
      startScan: 'Start a Scan',
      recentQuizzes: 'Recent Quizzes',
      analytics: 'Analytics',
      settings: 'Settings',
      logout: 'Log out',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido',
      login: 'Iniciar sesión',
      signup: 'Crear cuenta',
      dashboard: 'Panel',
      startScan: 'Comenzar escaneo',
      recentQuizzes: 'Cuestionarios recientes',
      analytics: 'Analíticas',
      settings: 'Configuración',
      logout: 'Cerrar sesión',
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: Localization.locale.split('-')[0] ?? 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
