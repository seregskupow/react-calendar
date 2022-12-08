import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import _ from 'lodash';
import { tasksActions } from './tasks.slice';

type ModalMode = 'create' | 'edit';

interface ModalState {
	show: boolean;
	mode: ModalMode;
}

const initialState: ModalState = {
	show: false,
	mode: 'create',
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		show: (state, action: PayloadAction<ModalMode>) => {
			state.mode = action.payload;
			state.show = true;
		},
		hide: (state) => {
			state.show = false;
		},
	},
});

export const modalActions = modalSlice.actions;

export const modalSelector = (state: RootState) => state.modal;

export default modalSlice.reducer;
