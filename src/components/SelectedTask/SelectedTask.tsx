import { useActions, useAppSelector } from '@/store';
import { tasksSelector } from '@/store/slices/tasks.slice';
import { FieldLabel, Text } from '@/components/UI';
import {
	BtnsContainer,
	DeleteBtn,
	EditBtn,
	Header,
	LabelsContainer,
	SelectedTaskWrapper,
	TaskTitle,
} from './SelectedTask.styled';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

import _ from 'lodash';
import Label from '../Label/Label';

const SelectedTask = () => {
	const { selectedTask } = useAppSelector(tasksSelector);
	const { selectTask, show, deleteTask } = useActions();

	const editTaskHandler = () => {
		selectTask(selectedTask!.id);
		show('edit');
	};

	const deleteTaskHandler = () => {
		deleteTask(selectedTask!.id);
	};

	return (
		<SelectedTaskWrapper>
			<Header>
				<TaskTitle>{selectedTask?.title}</TaskTitle>
				<BtnsContainer>
					<EditBtn onClick={editTaskHandler}>
						<FiEdit2 />
					</EditBtn>
					<DeleteBtn onClick={deleteTaskHandler}>
						<AiOutlineDelete />
					</DeleteBtn>
				</BtnsContainer>
			</Header>

			<FieldLabel>Description</FieldLabel>
			<Text>{selectedTask?.description || 'No description'}</Text>
			<FieldLabel>Labels</FieldLabel>
			{!selectedTask?.labels?.length && <Text>No Labels</Text>}
			<LabelsContainer>
				{selectedTask?.labels?.map((label) => (
					<Label key={_.uniqueId()} fontSize={1.5} title={label.title} color={label.color} />
				))}
			</LabelsContainer>
		</SelectedTaskWrapper>
	);
};

export default SelectedTask;
