import { useAppSelector } from '@/store';
import { modalSelector } from '@/store/slices/modal.slice';
import TaskModal from '../TaskModal/TaskModal';
import { AnimatePresence } from 'framer-motion';

const ModalsContainer = () => {
	const { show } = useAppSelector(modalSelector);

	return <AnimatePresence>{show && <TaskModal />}</AnimatePresence>;
};

export default ModalsContainer;
