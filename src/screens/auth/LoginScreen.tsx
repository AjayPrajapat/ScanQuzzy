import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@store/index';
import { login } from '@store/slices/authSlice';
import type { RootStackParamList } from '@navigation/AppNavigator';

// Login screen with JWT authentication flow.
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('demo@scanquzzy.com');
  const [password, setPassword] = useState('password');

  const onSubmit = () => {
    dispatch(login({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        {t('welcome')} to ScanQuzzy
      </Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={onSubmit} loading={authState.status === 'loading'} style={styles.cta}>
        {t('login')}
      </Button>
      <Button onPress={() => navigation.navigate('Signup')}>{t('signup')}</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#1A73E8',
  },
  input: {
    marginBottom: 16,
  },
  cta: {
    borderRadius: 24,
    marginTop: 8,
  },
});

export default LoginScreen;
