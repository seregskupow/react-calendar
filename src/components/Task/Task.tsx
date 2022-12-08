import { Task } from '@/models';
import { useActions } from '@/store';
import _ from 'lodash';
import { FC } from 'react';
import Label from '../Label/Label';
import { LabelsContainer, TaskTitle, TaskWrapper } from './Task.styled';

interface TaskProps {
	task: Task;
}

const TaskComponent: FC<TaskProps> = ({ task }) => {
	const { selectTask } = useActions();

	const openEditModal = () => {
		selectTask(task.id);
	};

	return (
		<TaskWrapper onClick={openEditModal}>
			<TaskTitle>{task.title}</TaskTitle>
			<LabelsContainer>
				{task.labels?.map((label) => (
					<Label key={_.uniqueId()} color={label.color} title={label.title} />
				))}
			</LabelsContainer>
		</TaskWrapper>
	);
};

export default TaskComponent;
