import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import type { Quiz } from '@types/index';

interface QuizCardProps {
  quiz: Quiz;
  onPress?: () => void;
}

// Reusable component that presents a quiz summary with accent colors.
const QuizCard: React.FC<QuizCardProps> = ({ quiz, onPress }) => (
  <Card style={styles.card} onPress={onPress} mode="elevated">
    <Card.Title title={quiz.title} subtitle={quiz.description} />
    <Card.Content>
      <Text variant="bodyMedium">{quiz.questions.length} questions</Text>
      <Text variant="bodyMedium" style={styles.spacing}>
        Difficulty: {quiz.difficulty.toUpperCase()}
      </Text>
      <Chip icon="tag" compact>
        {quiz.tags?.join(', ') || 'General'}
      </Chip>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 16,
  },
  spacing: {
    marginVertical: 4,
  },
});

export default QuizCard;
