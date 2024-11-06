import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types for chart data
interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
  }>;
}

// Define types for table data
interface TableData {
  region: string;
  cases: number;
}

// Define a union type for different result types
type QueryResult = 
  | { type: 'chart'; data: ChartData; message: string }
  | { type: 'table'; data: TableData[]; message: string }
  | { type: 'text'; message: string };

interface LogEntry {
  id: string;
  timestamp: string;
  query: string;
  source: 'chat' | 'dashboard' | 'api';
  result: QueryResult | null;
}

interface GraphState {
  results: QueryResult | null;
  loading: boolean;
  error: string | null;
  logs: LogEntry[];
}

const initialState: GraphState = {
  results: null,
  loading: false,
  error: null,
  logs: [],
};

export const executeQuery = createAsyncThunk<
  QueryResult,
  string,
  { rejectValue: string }
>(
  'graph/executeQuery',
  async (query: string, { rejectWithValue }) => {
    try {
      // For now, we'll use the mock API directly here
      // In a real application, this would be a fetch call to your backend
      const response = await import('@/lib/mockSocket').then(module => module.sendQuery(query));
      return response as QueryResult;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    logQuery: (state, action: PayloadAction<{ query: string; source: 'chat' | 'dashboard' | 'api' }>) => {
      state.logs.push({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        query: action.payload.query,
        source: action.payload.source,
        result: state.results,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(executeQuery.fulfilled, (state, action: PayloadAction<QueryResult>) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(executeQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An error occurred';
      });
  },
});

export const { logQuery } = graphSlice.actions;
export default graphSlice.reducer;