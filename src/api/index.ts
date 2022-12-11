import axios, { AxiosInstance } from 'axios';

import { CalendarService } from './calendar.service';

export const Api: AxiosInstance = axios.create({
	baseURL: 'https://date.nager.at/api/v3',
});

Api.interceptors.response.use(function (response) {
	return response.data;
});

export { CalendarService };
