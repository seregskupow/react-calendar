import { Day } from '@/models';
import dayjs from 'dayjs';

const DAYS = 7;
const WEEKS = 5;

export function getMonth(month: number = dayjs().month()): Day[][] {
	const currentYear = dayjs().year();
	const daysInCurrentMonth = dayjs(new Date(currentYear, month)).daysInMonth();
	/** -1 to start week from Monday */
	const firstDayOfMonthIndex = dayjs(new Date(currentYear, month, 1)).day() - 1;

	let monthDayCursor = 0 - firstDayOfMonthIndex;

	const weeksInCalendarMonth: Day[][] = new Array(WEEKS).fill([]);

	const monthDays: Day[][] = weeksInCalendarMonth.map(() => {
		return new Array(DAYS).fill(null).map(() => {
			monthDayCursor++;

			const day: Day = {
				date: dayjs(new Date(currentYear, month, monthDayCursor)).toDate(),
				currentMonth: monthDayCursor >= 1 && monthDayCursor <= daysInCurrentMonth,
			};

			return day;
		});
	});
	return monthDays;
}

export function getCurrentYear(year: number, month: number): number {
	return dayjs(new Date(year, month)).year();
}
