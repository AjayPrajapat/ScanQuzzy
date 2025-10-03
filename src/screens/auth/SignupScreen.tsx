import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@store/index';
import { signup } from '@store/slices/authSlice';
import type { RootStackParamList } from '@navigation/AppNavigator';

// Signup screen to onboard new users onto ScanQuzzy.
type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [name, setName] = useState('ScanQuzzy Educator');
  const [email, setEmail] = useState('educator@scanquzzy.com');
  const [password, setPassword] = useState('password');

  const onSubmit = () => {
    dispatch(signup({ name, email, password }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        {t('signup')}
      </Text>
      <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={onSubmit} style={styles.cta}>
        {t('signup')}
      </Button>
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
  },
});

export default SignupScreen;
