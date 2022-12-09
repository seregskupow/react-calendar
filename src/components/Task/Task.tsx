import { Task } from '@/models';
import { useActions } from '@/store';
import _ from 'lodash';
import { FC } from 'react';
import Label from '../Label/Label';
import { LabelsContainer, TaskTitle, TaskWrapper } from './Task.styled';
import { Draggable } from 'react-beautiful-dnd';

interface TaskProps {
	task: Task;
}

const TaskComponent: FC<TaskProps> = ({ task }) => {
	const { selectTask } = useActions();

	const openEditModal = () => {
		selectTask(task.id);
	};
	return (
		<Draggable key={task.id} draggableId={task.id} index={task.orderIndex}>
			{(provided) => (
				<TaskWrapper
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					onClick={openEditModal}>
					<TaskTitle>{task.title}</TaskTitle>
					<LabelsContainer>
						{task.labels?.map((label) => (
							<Label key={_.uniqueId()} color={label.color} title={label.title} />
						))}
					</LabelsContainer>
				</TaskWrapper>
			)}
		</Draggable>
	);
};

export default TaskComponent;
