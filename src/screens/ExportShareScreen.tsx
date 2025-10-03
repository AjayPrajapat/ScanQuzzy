import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '@store/index';
import type { RootStackParamList } from '@navigation/AppNavigator';
import Pdf from 'react-native-pdf';

// Allow educators to export generated quizzes to multiple formats.
type Props = NativeStackScreenProps<RootStackParamList, 'ExportShare'>;

const ExportShareScreen: React.FC<Props> = () => {
  const quiz = useAppSelector((state) => state.quiz.currentQuiz);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Export & Share
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Download as PDF, push to Google Forms, or export as QTI for your LMS.
      </Text>
      <Button mode="contained" icon="file-pdf-box" style={styles.button}>
        Export as PDF
      </Button>
      <Button mode="contained" icon="google-drive" style={styles.button}>
        Send to Google Forms
      </Button>
      <Button mode="contained" icon="share" style={styles.button}>
        Export as QTI
      </Button>
      {quiz && (
        <View style={styles.preview}>
          <Pdf source={{ uri: 'https://arxiv.org/pdf/2106.01345.pdf' }} style={styles.pdf} trustAllCerts />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
  },
  button: {
    borderRadius: 24,
    marginVertical: 6,
  },
  preview: {
    flex: 1,
    marginTop: 16,
  },
  pdf: {
    flex: 1,
  },
});

export default ExportShareScreen;
