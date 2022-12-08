import _ from 'lodash';
import Label from '@/components/Label/Label';
import { SidebarWrapper, LabelsContainer } from './Sidebar.styled';
import { useAppSelector } from '@/store';
import { tasksSelector } from '@/store/slices/tasks.slice';
import SelectedTask from '../SelectedTask/SelectedTask';

const Sidebar = () => {
	const { selectedTask } = useAppSelector(tasksSelector);
	return (
		<SidebarWrapper>
			{selectedTask && <SelectedTask />}
			{/* <LabelsContainer>
				{new Array(5).fill(null).map((item) => (
					<Label label="Some label" key={_.uniqueId()} />
				))}
			</LabelsContainer> */}
		</SidebarWrapper>
	);
};

export default Sidebar;
