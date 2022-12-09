import { SidebarWrapper } from './Sidebar.styled';
import { useAppSelector } from '@/store';
import { tasksSelector } from '@/store/slices/tasks.slice';
import SelectedTask from '@/components/SelectedTask/SelectedTask';

import { AnimatePresence } from 'framer-motion';

import _ from 'lodash';

const Sidebar = () => {
	const { selectedTask } = useAppSelector(tasksSelector);
	return (
		<SidebarWrapper>
			<AnimatePresence>{selectedTask && <SelectedTask />}</AnimatePresence>
		</SidebarWrapper>
	);
};

export default Sidebar;
