import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import QuizCard from '@components/QuizCard';
import StatsCard from '@components/StatsCard';
import { useAppDispatch, useAppSelector } from '@store/index';
import { fetchAnalytics } from '@store/slices/analyticsSlice';
import type { RootStackParamList } from '@navigation/AppNavigator';

// Dashboard aggregates recent quizzes, analytics, and quick actions.
type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const recentQuizzes = useAppSelector((state) => state.quiz.recentQuizzes);
  const analytics = useAppSelector((state) => state.analytics.summary);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineSmall" style={styles.greeting}>
        {t('dashboard')}, {user?.name ?? 'Educator'}
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ContentInput')}
        style={styles.cta}
        icon="plus"
      >
        {t('startScan')}
      </Button>
      <View style={styles.statsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <StatsCard title="Quizzes" value={`${analytics?.totalQuizzes ?? 0}`} progress={0.8} />
          <StatsCard title="Avg Score" value={`${analytics?.averageScore ?? 0}%`} progress={0.65} />
          <StatsCard title="Streak" value={`${analytics?.streak ?? 0} days`} />
        </ScrollView>
      </View>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        {t('recentQuizzes')}
      </Text>
      <FlatList
        data={recentQuizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuizCard quiz={item} onPress={() => navigation.navigate('QuizTaking', { quizId: item.id })} />
        )}
        ListEmptyComponent={<Text>No quizzes generated yet. Start by scanning content!</Text>}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  content: {
    padding: 16,
  },
  greeting: {
    marginBottom: 16,
  },
  cta: {
    borderRadius: 24,
    marginBottom: 16,
  },
  statsRow: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
});

export default DashboardScreen;
