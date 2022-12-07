import { configureStore } from '@reduxjs/toolkit';
import calendaReducer from './slices/calendar.slice';

export const store = configureStore({
	reducer: {
		calendar: calendaReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './useActions';
export * from './hooks';

export * from './slices/calendar.slice';
