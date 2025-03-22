import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Space } from '@/types/space';

// interface Review {
//   _id: string;
//   rating: number;
//   comment: string;
//   createdAt: string;
// }

interface Filters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}

interface SpaceState {
  spaces: Space[];
  loading: boolean;
  error: string | null;
  filters: {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
  };
  selectedSpace: Space | null;
}

const initialState: SpaceState = {
  spaces: [],
  loading: false,
  error: null,
  filters: {},
  selectedSpace: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchSpaces = createAsyncThunk(
  'spaces/fetchSpaces',
  async (filters: Filters | undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/spaces`, { params: filters });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch spaces');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateSpace = createAsyncThunk(
  'spaces/updateSpace',
  async ({ id, data }: { id: string; data: Partial<Space> }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/spaces/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update space');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const spaceSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSelectedSpace: (state, action) => {
      state.selectedSpace = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpaces.fulfilled, (state, action) => {
        state.loading = false;
        state.spaces = action.payload;
      })
      .addCase(fetchSpaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch spaces';
      })
      .addCase(updateSpace.fulfilled, (state, action) => {
        const index = state.spaces.findIndex(space => space._id === action.payload._id);
        if (index !== -1) {
          state.spaces[index] = action.payload;
        }
        if (state.selectedSpace?._id === action.payload._id) {
          state.selectedSpace = action.payload;
        }
      });
  },
});

export const { setFilters, setSelectedSpace } = spaceSlice.actions;
export default spaceSlice.reducer;