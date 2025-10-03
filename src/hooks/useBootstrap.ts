import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '@store/index';
import { bootstrapAuth } from '@store/slices/authSlice';
import { hydrateSettings } from '@store/slices/settingsSlice';
import { loadCachedQuizzes } from '@store/slices/quizSlice';
import { loadCachedAnalytics } from '@store/slices/analyticsSlice';

// Custom hook that restores cached state on app start.
export const useBootstrap = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bootstrapAuth());
    dispatch(loadCachedQuizzes());
    dispatch(loadCachedAnalytics());

    const hydrate = async () => {
      const [theme, language] = await Promise.all([
        AsyncStorage.getItem('scanquzzy_theme'),
        AsyncStorage.getItem('scanquzzy_language'),
      ]);
      dispatch(
        hydrateSettings({
          theme: (theme as 'light' | 'dark' | 'system') ?? 'system',
          language: language ?? 'en',
        }),
      );
    };

    hydrate();
  }, [dispatch]);
};
