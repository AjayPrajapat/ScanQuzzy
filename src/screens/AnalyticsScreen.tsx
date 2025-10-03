import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, DataTable } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '@store/index';
import { fetchAnalytics } from '@store/slices/analyticsSlice';

// Visualize attempts, scores, and spaced repetition suggestions.
const AnalyticsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const analytics = useAppSelector((state) => state.analytics.summary);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Performance Overview
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Metric</DataTable.Title>
          <DataTable.Title numeric>Value</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Total Attempts</DataTable.Cell>
          <DataTable.Cell numeric>{analytics?.attempts ?? 0}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Average Score</DataTable.Cell>
          <DataTable.Cell numeric>{analytics?.averageScore ?? 0}%</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Best Score</DataTable.Cell>
          <DataTable.Cell numeric>{analytics?.bestScore ?? 0}%</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Streak</DataTable.Cell>
          <DataTable.Cell numeric>{analytics?.streak ?? 0} days</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
});

export default AnalyticsScreen;
