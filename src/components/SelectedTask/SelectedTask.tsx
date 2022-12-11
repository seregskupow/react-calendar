import {
	BtnsContainer,
	DeleteBtn,
	EditBtn,
	Header,
	LabelsContainer,
	SelectedTaskWrapper,
	TaskTitle,
} from './SelectedTask.styled';
import { FieldLabel, Text } from '@/components/UI';
import { tasksSelector, useActions, useAppSelector } from '@/store';

import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { Label } from '@/models';
import LabelComponent from '@/components/Label/Label';
import _ from 'lodash';

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
		<SelectedTaskWrapper
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.2, ease: 'easeInOut' }}>
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
				{selectedTask?.labels?.map((label: Label) => (
					<LabelComponent key={_.uniqueId()} fontSize={1.5} title={label.title} color={label.color} />
				))}
			</LabelsContainer>
		</SelectedTaskWrapper>
	);
};

export default SelectedTask;
