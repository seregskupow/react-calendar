import { Api } from './index';
import { Holiday } from '@/models';

export const CalendarService = {
	async getHolidays(year: number, userLocale: string) {
		const data: Holiday[] = await Api.get(`/PublicHolidays/${year}/${userLocale}`);
		return data;
	},
};
