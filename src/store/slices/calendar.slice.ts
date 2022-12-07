import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Day } from '../../models';
import { getMonth } from '../../utils/date';
import dayjs from 'dayjs';

interface CalendarState {
	month: Day[][];
	monthIndex: number;
}

const initialState: CalendarState = {
	month: getMonth(),
	monthIndex: new Date().getMonth(),
};

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		nextMonth: (state) => {
			state.monthIndex += 1;
			state.month = getMonth(state.monthIndex);
		},
		prevMonth: (state) => {
			state.monthIndex -= 1;
			state.month = getMonth(state.monthIndex);
		},
		setCurrentMonth: (state) => {
			state.monthIndex = dayjs().month();
			state.month = getMonth(state.monthIndex);
		},
	},
});

export const { nextMonth, prevMonth } = calendarSlice.actions;
export const calendarActions = calendarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const calendarSelector = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
