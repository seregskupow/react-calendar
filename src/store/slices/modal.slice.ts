import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import _ from 'lodash';

interface ModalState {
	show: boolean;
}

const initialState: ModalState = {
	show: false,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		show: (state) => {
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
