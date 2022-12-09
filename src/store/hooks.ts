import { AppDispatch, RootState } from '.';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { allActionCreators } from './actionCreators';
import { bindActionCreators } from 'redux';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(allActionCreators, dispatch);
};
