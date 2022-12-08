import { Task } from '@/models';
import _ from 'lodash';
import { FC } from 'react';
import { LabelCircle, LabelsContainer, TaskLabel, TaskWrapper } from './Task.styled';

interface TaskProps {
	task: Task;
}

const TaskComponent: FC<TaskProps> = ({ task }) => {
	return (
		<TaskWrapper>
			<TaskLabel>{task.title}</TaskLabel>
			<LabelsContainer>
				{task.labels?.map((label) => (
					<LabelCircle key={_.uniqueId()} color={label.color} label={label.title} />
				))}
			</LabelsContainer>
		</TaskWrapper>
	);
};

export default TaskComponent;
