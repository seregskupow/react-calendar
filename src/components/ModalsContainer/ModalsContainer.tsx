import { useAppSelector } from '@/store';
import { modalSelector } from '@/store/slices/modal.slice';
import { Fragment } from 'react';
import TaskModal from '../TaskModal/TaskModal';

const ModalsContainer = () => {
	const { show } = useAppSelector(modalSelector);

	return <Fragment>{show && <TaskModal />}</Fragment>;
};

export default ModalsContainer;
