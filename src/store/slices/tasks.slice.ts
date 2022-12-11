import { CreateTask, EditTask, Task } from '@/models/task';
import { TaskValidationSchema, TasksValidationSchema } from '@/utils';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import Ajv from 'ajv';
import { DayTasks } from '@/models';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import _ from 'lodash';

const TASKS = 'tasks';
const SELECTED_TASK = 'selected_task';

//TODO: implement better tasks structure
// {
// 	[year: number]: {
// 		[month: number]: {
// 			[day: number] : Task[]
// 		}
// 	}
// }

interface TaskState {
	tasks: DayTasks;
	selectedTask: Task | null;
	titleFilter: string;
}

const ajv = new Ajv();
const dayTasksValidator = ajv.compile(TasksValidationSchema);
const singleTaskValidator = ajv.compile(TaskValidationSchema);

const retrieveTasksFromLocalStorage = (): DayTasks => {
	try {
		let data = JSON.parse(localStorage.getItem(TASKS) || '[]');

		return data as DayTasks;
	} catch (e) {
		return [];
	}
};

const retrieveselectedTaskFromLocalStorage = (): Task | null => {
	try {
		let data = JSON.parse(localStorage.getItem(SELECTED_TASK) || 'null');
		return data as Task;
	} catch (e) {
		return null;
	}
};

const saveToLocalStorage = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const tasks = retrieveTasksFromLocalStorage();
const selectedTask = retrieveselectedTaskFromLocalStorage();

const localStorageDataIsValid = dayTasksValidator(tasks) && singleTaskValidator(selectedTask);

const initialState: TaskState = {
	tasks: localStorageDataIsValid ? tasks : [],
	selectedTask: localStorageDataIsValid ? selectedTask : null,
	titleFilter: '',
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<CreateTask>) => {
			const dayTasks = state.tasks[action.payload.date];

			let newTask;
			if (!dayTasks) {
				newTask = { ...action.payload, id: _.uniqueId(), orderIndex: 0 };

				state.tasks = {
					...state.tasks,
					...{ [action.payload.date]: [newTask] },
				};
			} else {
				const newIndex = dayTasks.length;
				newTask = { ...action.payload, id: _.uniqueId(), orderIndex: newIndex };

				state.tasks = {
					...state.tasks,
					...{ [action.payload.date]: [...dayTasks, { ...newTask }] },
				};
			}
			state.selectedTask = newTask;
			saveToLocalStorage(TASKS, state.tasks);
			saveToLocalStorage(SELECTED_TASK, state.selectedTask);
		},

		selectTask: (state, action: PayloadAction<string>) => {
			let taskToSelect: Task | undefined;
			for (const [key, value] of Object.entries(state.tasks)) {
				taskToSelect = value.find((task) => task.id === action.payload);
				if (taskToSelect) {
					taskToSelect = taskToSelect;
					break;
				}
			}

			if (!taskToSelect) throw new Error('Wrong task id');

			state.selectedTask = taskToSelect;
			saveToLocalStorage(SELECTED_TASK, state.selectedTask);
		},
		deselectTask: (state) => {
			state.selectedTask = null;
		},

		deleteTask: (state, action: PayloadAction<string>) => {
			for (const [key, value] of Object.entries(state.tasks)) {
				const taskToDelete = value.findIndex((task) => task.id === action.payload);

				if (taskToDelete !== -1) {
					const clone = _.cloneDeep(value);
					clone.splice(taskToDelete, 1);

					state.tasks = _.omitBy(
						{ ...state.tasks, [key]: clone.map((item, index) => ({ ...item, orderIndex: index })) },
						_.isEmpty,
					);
					break;
				}
			}

			state.selectedTask = null;

			saveToLocalStorage(TASKS, state.tasks);
			localStorage.removeItem(SELECTED_TASK);
		},

		editTask: (state, action: PayloadAction<EditTask>) => {
			const dayTasks = state.tasks[action.payload.date];
			const editedArr = dayTasks.map((task) => {
				if (task.id === action.payload.id) {
					const editedTask = { ...task, ...action.payload };
					state.selectedTask = editedTask;
					return editedTask;
				}
				return task;
			});

			state.tasks = {
				...state.tasks,
				[action.payload.date]: editedArr,
			};

			saveToLocalStorage(TASKS, state.tasks);
			saveToLocalStorage(SELECTED_TASK, state.selectedTask);
		},

		setTasks: (state, action: PayloadAction<DayTasks>) => {
			state.tasks = action.payload;
			saveToLocalStorage(TASKS, state.tasks);
		},

		setTasksForDay: (state, action: PayloadAction<{ day: number; tasks: Task[] }>) => {
			state.tasks = _.omitBy({ ...state.tasks, [action.payload.day]: action.payload.tasks }, _.isEmpty);
			saveToLocalStorage(TASKS, state.tasks);
		},

		setTitleFilter: (state, action: PayloadAction<string>) => {
			state.titleFilter = action.payload;
		},
	},
});

export const selectTodosForDay = createSelector(
	(state: RootState) => state.tasks.tasks,
	(state: RootState) => state.tasks.titleFilter,
	(_: RootState, day: Date) => day,
	(tasks, filter, day) =>
		tasks[day.valueOf()]?.filter((task) => {
			const filterLower = filter.toLowerCase();
			const titleMatch = task.title.toLowerCase().includes(filterLower);
			const labelMatch = task.labels.some((label) => label.title.toLowerCase().includes(filterLower));

			return titleMatch || labelMatch;
		}) || [],
);
export const tasksActions = tasksSlice.actions;

export const tasksSelector = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
