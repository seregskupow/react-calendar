import { Day, Holiday } from '@/models';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { getCurrentYear, getMonth } from '@/utils/date';

import { CalendarService } from '@/api';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import dayjs from 'dayjs';

interface CalendarState {
	month: Day[][];
	currentYear: number;
	monthIndex: number;
	selectedDay: Date | null;
	holidays: Holiday[];
}

const initialState: CalendarState = {
	month: getMonth(),
	currentYear: dayjs().year(),
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
			state.currentYear = getCurrentYear(dayjs().year(), state.monthIndex);
		},
		prevMonth: (state) => {
			state.monthIndex -= 1;
			state.month = getMonth(state.monthIndex);
			state.currentYear = getCurrentYear(dayjs().year(), state.monthIndex);
		},
		setCurrentMonth: (state) => {
			state.monthIndex = dayjs().month();
			state.month = getMonth(state.monthIndex);
			state.currentYear = getCurrentYear(dayjs().year(), state.monthIndex);
		},
		selectDay: (state, action: PayloadAction<Date>) => {
			state.selectedDay = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getWorlwideHolidays.fulfilled, (state, action: PayloadAction<Holiday[]>) => {
			state.holidays = [...action.payload];
		});
	},
});

const getWorlwideHolidays = createAsyncThunk('calendar/getWorlwideHolidays', async (year: number, thunkAPI) => {
	//Todo: change with backend detection(currently detects by system language)
	const userLocale = navigator.language.split('-')[1] || 'UA';
	const data: Holiday[] = await CalendarService.getHolidays(year, userLocale);
	return data;
});

export const selectHolidaysForToday = createSelector(
	(state: RootState) => state.calendar.holidays,
	(_: RootState, day: Date) => day,
	(holidays, day) =>
		holidays.filter((holiday) => dayjs(holiday.date).format('DD-MM-YY') === dayjs(day).format('DD-MM-YY')),
);

export const { nextMonth, prevMonth } = calendarSlice.actions;
export const calendarActions = { ...calendarSlice.actions, getWorlwideHolidays };
export const calendarSelector = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
