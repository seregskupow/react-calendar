import { AnimatePresence } from 'framer-motion';
import FilterForm from './FilterForm/FilterForm';
import SelectedTask from '@/components/SelectedTask/SelectedTask';
import { SidebarWrapper } from './Sidebar.styled';
import _ from 'lodash';
import { tasksSelector } from '@/store/slices/tasks.slice';
import { useAppSelector } from '@/store';

const Sidebar = () => {
	const { selectedTask } = useAppSelector(tasksSelector);
	return (
		<SidebarWrapper>
			<FilterForm />
			<AnimatePresence>{selectedTask && <SelectedTask />}</AnimatePresence>
		</SidebarWrapper>
	);
};

export default Sidebar;
