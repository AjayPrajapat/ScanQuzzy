import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, RadioButton, Button, ProgressBar, Surface } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@store/index';
import { submitQuiz } from '@store/slices/quizSlice';
import type { RootStackParamList } from '@navigation/AppNavigator';

// Interactive quiz taking experience with per-question navigation and timer.
type Props = NativeStackScreenProps<RootStackParamList, 'QuizTaking'>;

const QuizTakingScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const quiz = useAppSelector((state) => state.quiz.currentQuiz);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => setTimeRemaining((prev) => Math.max(prev - 1, 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!quiz || quiz.id !== route.params?.quizId) {
      navigation.goBack();
    }
  }, [quiz, route.params?.quizId, navigation]);

  const question = useMemo(() => quiz?.questions[currentIndex], [quiz, currentIndex]);

  const handleSubmit = () => {
    if (!quiz) return;
    dispatch(submitQuiz({ quizId: quiz.id, answers }));
    navigation.navigate('ExportShare');
  };

  if (!quiz || !question) {
    return (
      <View style={styles.empty}>
        <Text>No quiz loaded.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Surface style={styles.timer}>
        <Text variant="titleMedium">Time left: {Math.floor(timeRemaining / 60)}:{`${timeRemaining % 60}`.padStart(2, '0')}</Text>
        <ProgressBar progress={timeRemaining / (quiz.estimatedTime ?? 300)} />
      </Surface>
      <Text variant="titleLarge" style={styles.prompt}>
        {question.prompt}
      </Text>
      {question.options?.map((option) => (
        <RadioButton.Item
          key={option.id}
          label={option.text}
          value={option.id}
          status={answers[question.id] === option.id ? 'checked' : 'unchecked'}
          onPress={() => setAnswers((prev) => ({ ...prev, [question.id]: option.id }))}
        />
      ))}
      <View style={styles.actions}>
        <Button disabled={currentIndex === 0} onPress={() => setCurrentIndex((index) => Math.max(0, index - 1))}>
          Previous
        </Button>
        {currentIndex === quiz.questions.length - 1 ? (
          <Button mode="contained" onPress={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button mode="contained" onPress={() => setCurrentIndex((index) => Math.min(quiz.questions.length - 1, index + 1))}>
            Next
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  prompt: {
    marginVertical: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  timer: {
    padding: 12,
    borderRadius: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QuizTakingScreen;
