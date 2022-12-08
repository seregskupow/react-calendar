import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { CreateTask, EditTask, Task } from '@/models/task';
import _ from 'lodash';
import dayjs from 'dayjs';

const TASKS = 'tasks';

interface TaskState {
	tasks: Task[];
}

const retrieveTasksFromLocalStorage = (): Task[] => {
	let data = JSON.parse(localStorage.getItem('tasks') || '[]');
	return data as Task[];
};

const saveToLocalStorage = (tasks: Task[]) => {
	localStorage.setItem(TASKS, JSON.stringify(tasks));
};

const initialState: TaskState = {
	tasks: retrieveTasksFromLocalStorage(),
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<CreateTask>) => {
			const newTask = { ...action.payload, id: _.uniqueId() };
			state.tasks = [...state.tasks, newTask];
			saveToLocalStorage(state.tasks);
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
			saveToLocalStorage(state.tasks);
		},
		editTask: (state, action: PayloadAction<EditTask>) => {
			state.tasks = state.tasks.map((task) => {
				if (task.id === action.payload.id) {
					return { ...task, ...action.payload };
				}
				return task;
			});
			saveToLocalStorage(state.tasks);
		},
	},
});

export const tasksActions = tasksSlice.actions;

export const tasksSelector = (state: RootState) => state.tasks;

export const selectTodosForDay = createSelector(
	(state: RootState) => state.tasks.tasks,
	(_: RootState, day: Date) => day,
	(tasks, day) => tasks.filter((task: Task) => dayjs(task.date).format('DD-MM-YY') === dayjs(day).format('DD-MM-YY')),
);

export default tasksSlice.reducer;
