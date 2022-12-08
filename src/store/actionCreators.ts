import { calendarActions } from './slices/calendar.slice';
import { modalActions } from './slices/modal.slice';
import { tasksActions } from './slices/tasks.slice';

export const allActionCreators = {
	...calendarActions,
	...tasksActions,
	...modalActions
};
