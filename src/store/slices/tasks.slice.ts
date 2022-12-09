import { createSelector, createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { CreateTask, EditTask, Task } from '@/models/task';
import _ from 'lodash';
import dayjs from 'dayjs';
import { modalActions } from './modal.slice';

const TASKS = 'tasks';
const SELECTED_TASK = 'selected_task';

interface DayTasks {
	[key: number]: Task[];
}

interface TaskState {
	tasks: DayTasks;
	selectedTask: Task | null;
}

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
const initialState: TaskState = {
	tasks: tasks,
	selectedTask: selectedTask || null,
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<CreateTask>) => {
			const dayTasks = state.tasks[action.payload.date];

			let newTask: Task;
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
					...{ [action.payload.date]: [...dayTasks, { ...action.payload, id: _.uniqueId(), orderIndex: newIndex }] },
				};
			}
			state.selectedTask = newTask;
			saveToLocalStorage(TASKS, state.tasks);
			saveToLocalStorage(SELECTED_TASK, state.selectedTask.id);
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

					state.tasks = { ...state.tasks, [key]: clone.map((item, index) => ({ ...item, orderIndex: index })) };
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
					console.log({ editedTask });
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

		setTasksForDay: (state, action: PayloadAction<{ day: number; tasks: Task[] }>) => {
			state.tasks = { ...state.tasks, [action.payload.day]: action.payload.tasks };
			saveToLocalStorage(TASKS, state.tasks);
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
	(tasks, day) => tasks[day.valueOf()] || [],
);

export default tasksSlice.reducer;
