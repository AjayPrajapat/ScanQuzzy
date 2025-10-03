import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, SegmentedButtons, Button, List, ActivityIndicator } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '@store/index';
import { generateQuiz } from '@store/slices/quizSlice';
import type { RootStackParamList } from '@navigation/AppNavigator';

// Configure AI quiz generation and preview the resulting questions.
type Props = NativeStackScreenProps<RootStackParamList, 'QuizGeneration'>;

const QuizGenerationScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { status, currentQuiz } = useAppSelector((state) => state.quiz);
  const [questionCount, setQuestionCount] = useState('10');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [types, setTypes] = useState<string[]>(['mcq', 'true_false']);

  const handleGenerate = () => {
    dispatch(
      generateQuiz({
        contentId: route.params?.contentId ?? 'demo-content',
        questionCount: Number(questionCount),
        difficulty,
        types: types as any,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Customize your quiz
      </Text>
      <SegmentedButtons
        value={questionCount}
        onValueChange={setQuestionCount}
        buttons={['5', '10', '15'].map((value) => ({ value, label: `${value} Qs` }))}
        style={styles.segment}
      />
      <SegmentedButtons
        value={difficulty}
        onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')}
        buttons={[
          { value: 'easy', label: 'Easy' },
          { value: 'medium', label: 'Medium' },
          { value: 'hard', label: 'Hard' },
        ]}
        style={styles.segment}
      />
      <List.Section>
        <List.Subheader>Select question types</List.Subheader>
        {['mcq', 'true_false', 'cloze', 'short_answer', 'matching'].map((type) => (
          <List.Item
            key={type}
            title={type.replace('_', ' ').toUpperCase()}
            left={() => <List.Icon icon={types.includes(type) ? 'check-circle' : 'checkbox-blank-circle-outline'} />}
            onPress={() =>
              setTypes((prev) =>
                prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type],
              )
            }
          />
        ))}
      </List.Section>
      <Button mode="contained" onPress={handleGenerate} style={styles.cta}>
        Generate Quiz
      </Button>
      {status === 'loading' && <ActivityIndicator style={styles.loader} />}
      {currentQuiz && (
        <List.Section>
          <List.Subheader>Preview</List.Subheader>
          {currentQuiz.questions.map((question) => (
            <List.Accordion key={question.id} title={question.prompt}>
              {question.options?.map((option) => (
                <List.Item
                  key={option.id}
                  title={option.text}
                  left={() => <List.Icon icon={option.isCorrect ? 'check' : 'circle-outline'} />}
                />
              ))}
            </List.Accordion>
          ))}
          <Button onPress={() => navigation.navigate('QuizTaking', { quizId: currentQuiz.id })}>
            Start quiz
          </Button>
        </List.Section>
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
    marginBottom: 16,
  },
  segment: {
    marginBottom: 16,
  },
  cta: {
    borderRadius: 24,
    marginTop: 8,
  },
  loader: {
    marginVertical: 16,
  },
});

export default QuizGenerationScreen;
