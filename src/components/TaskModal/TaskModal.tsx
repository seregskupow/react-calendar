import { calendarSelector, useActions, useAppSelector } from '@/store';
import { MouseEvent } from 'react';
import {
	Button,
	Error,
	TextInput,
	TextArea,
	ModalBG,
	ModalContainer,
	ModalForm,
	ModalHeader,
} from './TaskModal.styled';
import { IoMdClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';

type FormData = {
	title: string;
	description: string;
};

const TaskModal = () => {
	const { selectedDay } = useAppSelector(calendarSelector);
	const { hide, addTask } = useActions();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const closeModal = (e: MouseEvent) => {
		hide();
	};
	const onSubmit = handleSubmit((data) => {
		const { title, description } = data;
		selectedDay &&
			addTask({
				description: description,
				title: title,
				date: selectedDay.valueOf(),
			});
		hide();
	});

	return (
		<ModalContainer>
			<ModalBG onClick={(e) => closeModal(e)} />
			<ModalForm onSubmit={onSubmit}>
				<ModalHeader>
					<Button type="button" onClick={(e) => closeModal(e)}>
						<IoMdClose />
					</Button>
				</ModalHeader>
				<TextInput {...register('title', { required: true })} />
				{errors.title && <Error>This field is required</Error>}
				<TextArea {...register('description')} />
				<Button type="submit">
					Create Task
					<IoMdClose />
				</Button>
			</ModalForm>
		</ModalContainer>
	);
};

export default TaskModal;
