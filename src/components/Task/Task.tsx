import { FC } from 'react';
import { LabelCircle, LabelsContainer, TaskLabel, TaskWrapper } from './Task.styled';

interface TaskProps {
	label: string;
}

const Task: FC<TaskProps> = ({ label }) => {
	return (
		<TaskWrapper>
			<TaskLabel>{label}</TaskLabel>
			<LabelsContainer>
				<LabelCircle color="blue" label="lorem" />
				<LabelCircle color="green" label="lorem" />
				<LabelCircle color="red" label="lorem" />
				<LabelCircle color="yellow" label="lorem" />
			</LabelsContainer>
		</TaskWrapper>
	);
};

export default Task;
