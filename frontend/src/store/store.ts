'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import spacesReducer from './features/spaceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spaces: spacesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
