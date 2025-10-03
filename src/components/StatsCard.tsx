import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';

interface StatsCardProps {
  title: string;
  value: string;
  progress?: number;
}

// Displays analytics metric with optional progress indicator.
const StatsCard: React.FC<StatsCardProps> = ({ title, value, progress }) => (
  <Card style={styles.card} mode="contained">
    <Card.Content>
      <Text variant="titleMedium">{title}</Text>
      <Text variant="displaySmall" style={styles.value}>
        {value}
      </Text>
      {typeof progress === 'number' && <ProgressBar progress={progress} color="#6C63FF" />}
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingVertical: 12,
    marginRight: 12,
    minWidth: 180,
  },
  value: {
    marginVertical: 8,
  },
});

export default StatsCard;
