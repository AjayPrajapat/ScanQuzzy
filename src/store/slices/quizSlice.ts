import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@services/api';
import type { Quiz } from '@types/index';

type QuizState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  currentQuiz?: Quiz;
  recentQuizzes: Quiz[];
};

const initialState: QuizState = {
  status: 'idle',
  recentQuizzes: [],
};

export const generateQuiz = createAsyncThunk(
  'quiz/generate',
  async (
    payload: {
      contentId: string;
      questionCount: number;
      difficulty: Quiz['difficulty'];
      types: Quiz['questions'][number]['type'][];
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post('/quiz/generate', payload);
      return response.data as Quiz;
    } catch {
      // Fallback demo data enables offline development and previews.
      const mockQuiz: Quiz = {
        id: 'demo-quiz',
        title: 'Sample Quiz',
        description: 'Offline preview generated locally.',
        difficulty: payload.difficulty,
        questions: Array.from({ length: payload.questionCount }).map((_, index) => ({
          id: `q-${index}`,
          prompt: `Sample question ${index + 1}?`,
          type: payload.types[index % payload.types.length] ?? 'mcq',
          options: [
            { id: `q-${index}-a`, text: 'Option A', isCorrect: true },
            { id: `q-${index}-b`, text: 'Option B' },
            { id: `q-${index}-c`, text: 'Option C' },
            { id: `q-${index}-d`, text: 'Option D' },
          ],
          answer: 'Option A',
        })),
        tags: ['offline', 'demo'],
        estimatedTime: payload.questionCount * 30,
      };
      return mockQuiz ?? rejectWithValue('Unable to generate quiz');
    }
  },
);

export const submitQuiz = createAsyncThunk(
  'quiz/submit',
  async (payload: { quizId: string; answers: Record<string, string | string[]> }) => {
    const response = await api.post('/quiz/submit', payload);
    return response.data;
  },
);

export const loadCachedQuizzes = createAsyncThunk('quiz/loadCache', async () => {
  const cached = await AsyncStorage.getItem('scanquzzy_recent_quizzes');
  if (!cached) return [] as Quiz[];
  return JSON.parse(cached) as Quiz[];
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuiz(state, action: PayloadAction<Quiz | undefined>) {
      state.currentQuiz = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateQuiz.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateQuiz.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentQuiz = action.payload;
        state.recentQuizzes = [action.payload, ...state.recentQuizzes].slice(0, 5);
        AsyncStorage.setItem('scanquzzy_recent_quizzes', JSON.stringify(state.recentQuizzes));
      })
      .addCase(generateQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadCachedQuizzes.fulfilled, (state, action) => {
        state.recentQuizzes = action.payload;
      });
  },
});

export const { setCurrentQuiz } = quizSlice.actions;
export default quizSlice.reducer;
