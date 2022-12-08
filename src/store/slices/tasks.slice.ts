import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { CreateTask, EditTask, Task } from '@/models/task';
import _ from 'lodash';
import dayjs from 'dayjs';
import { modalActions } from './modal.slice';

const TASKS = 'tasks';
const SELECTED_TASK = 'selected_task';

interface TaskState {
	tasks: Task[];
	selectedTask: Task | null;
}

const retrieveTasksFromLocalStorage = (): Task[] => {
	try {
		let data = JSON.parse(localStorage.getItem(TASKS) || '[]');

		return data as Task[];
	} catch (e) {
		return [];
	}
};

const retrieveselectedTaskFromLocalStorage = (): string => {
	try {
		let data = JSON.parse(localStorage.getItem(SELECTED_TASK) || '{}');
		return data;
	} catch (e) {
		return '';
	}
};

const saveToLocalStorage = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const tasks = retrieveTasksFromLocalStorage();
const savedId = retrieveselectedTaskFromLocalStorage();
const selectedTask = tasks.find((task) => task.id === savedId) || null;

const initialState: TaskState = {
	tasks: tasks,
	selectedTask: selectedTask,
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<CreateTask>) => {
			const newTask = { ...action.payload, id: _.uniqueId() };
			state.tasks = [...state.tasks, newTask];
			state.selectedTask = newTask;
			saveToLocalStorage(TASKS, state.tasks);
			saveToLocalStorage(SELECTED_TASK, state.selectedTask.id);
		},

		selectTask: (state, action: PayloadAction<string>) => {
			const taskToSelect = state.tasks.find((task) => task.id === action.payload);

			if (!taskToSelect) throw new Error('Wrong task id');

			state.selectedTask = taskToSelect;
			saveToLocalStorage(SELECTED_TASK, state.selectedTask.id);
		},
		deselectTask: (state) => {
			state.selectedTask = null;
		},

		deleteTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
			state.selectedTask = null;

			saveToLocalStorage(TASKS, state.tasks);
		},

		editTask: (state, action: PayloadAction<EditTask>) => {
			state.tasks = state.tasks.map((task) => {
				if (task.id === action.payload.id) {
					const editedTask = { ...task, ...action.payload };
					state.selectedTask = editedTask;

					return editedTask;
				}
				return task;
			});

			saveToLocalStorage(TASKS, state.tasks);
			saveToLocalStorage(SELECTED_TASK, action.payload.id);
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(modalActions.hide, (state) => {
	// 		state.selectedTask = null;
	// 	});
	// },
});

export const tasksActions = tasksSlice.actions;

export const tasksSelector = (state: RootState) => state.tasks;

export const selectTodosForDay = createSelector(
	(state: RootState) => state.tasks.tasks,
	(_: RootState, day: Date) => day,
	(tasks, day) => tasks.filter((task: Task) => dayjs(task.date).format('DD-MM-YY') === dayjs(day).format('DD-MM-YY')),
);

export default tasksSlice.reducer;
