import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@store/index';
import { logout } from '@store/slices/authSlice';
import { setLanguage, setTheme } from '@store/slices/settingsSlice';

// Manage theme, language, and profile settings.
const SettingsScreen: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  const toggleTheme = () => {
    const next = settings.theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(next));
  };

  const toggleLanguage = () => {
    const next = settings.language === 'en' ? 'es' : 'en';
    dispatch(setLanguage(next));
    i18n.changeLanguage(next);
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Display</List.Subheader>
        <List.Item
          title="Dark Mode"
          right={() => <Switch value={settings.theme === 'dark'} onValueChange={toggleTheme} />}
        />
        <Divider />
        <List.Item
          title="Spanish"
          description="Activa para cambiar el idioma"
          right={() => <Switch value={settings.language === 'es'} onValueChange={toggleLanguage} />}
        />
        <Divider />
        <List.Item title="Log out" onPress={() => dispatch(logout())} left={() => <List.Icon icon="logout" />} />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default SettingsScreen;
