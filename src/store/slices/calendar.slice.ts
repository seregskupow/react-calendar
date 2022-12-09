import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Day } from '../../models';
import { getMonth } from '../../utils/date';
import dayjs from 'dayjs';
import { Holiday } from '@/models/holiday';

interface CalendarState {
	month: Day[][];
	monthIndex: number;
	selectedDay: Date | null;
	holidays: Holiday[];
}

const initialState: CalendarState = {
	month: getMonth(),
	monthIndex: new Date().getMonth(),
	selectedDay: null,
	holidays: [],
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
		selectDay: (state, action: PayloadAction<Date>) => {
			state.selectedDay = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getYearHolidays.fulfilled, (state, action) => {
			state.holidays.push(action.payload);
		});
	},
});

const getYearHolidays = createAsyncThunk('calendar/getYearHolidays b', async (year: number, thunkAPI) => {
	const userLocale = (navigator.language || navigator.userLanguage).split('-')[1] || 'UA';
	const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${userLocale}`);
	const data = await response.json();
	return data;
});

export const { nextMonth, prevMonth } = calendarSlice.actions;
export const calendarActions = { ...calendarSlice.actions, getYearHolidays };
export const calendarSelector = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
