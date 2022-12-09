import {
	Error,
	TextInput,
	TextArea,
	ModalBG,
	ModalContainer,
	ModalForm,
	ModalHeader,
	GrayBtn,
	LabelWrapper,
	LabelsContainer,
} from './TaskModal.styled';
import ColorSelect from './ColorSelect/ColorSelect';

import { Fragment, MouseEvent } from 'react';

import { useAppSelector, calendarSelector, useActions, tasksSelector, modalSelector } from '@/store';
import { Label, LabelColor } from '@/models';
import { Button, FieldLabel } from '@/components/UI';

import { IoMdClose, IoMdAdd } from 'react-icons/io';
import { FiTrash, FiEdit2 } from 'react-icons/fi';

import { useFieldArray, useForm, Controller } from 'react-hook-form';
import _ from 'lodash';

export type FormData = {
	title: string;
	description: string;
	labels: Label[];
};

const TaskModal = () => {
	const { selectedDay } = useAppSelector(calendarSelector);
	const { selectedTask } = useAppSelector(tasksSelector);
	const { mode } = useAppSelector(modalSelector);
	const { hide, addTask, editTask } = useActions();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			...selectedTask,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'labels',
	});

	const closeModal = (e: MouseEvent) => {
		hide();
	};
	const onSubmit = handleSubmit((data) => {
		const { title, description, labels } = data;
		console.log({ data });

		switch (mode) {
			case 'create':
				addTask({
					description: description,
					title: title,
					date: selectedDay!.valueOf(),
					labels: labels.map((label) => ({
						id: _.uniqueId(),
						color: label!.color as LabelColor,
						title: label.title,
					})),
				});
				break;
			case 'edit':
				console.log(selectedTask);
				editTask({
					id: selectedTask!.id,
					date: selectedTask!.date,
					title: title,
					description: description,
					labels: labels.map((label) => ({
						id: _.uniqueId(),
						color: label!.color as LabelColor,
						title: label.title,
					})),
				});
				break;
		}
		hide();
	});

	const addLabel = () => {
		append({
			id: '',
			title: '',
			color: 'blue',
		});
	};

	return (
		<ModalContainer>
			<ModalBG onClick={(e) => closeModal(e)} />
			<ModalForm
				onSubmit={onSubmit}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				transition={{ duration: 0.2, ease: 'easeInOut' }}>
				<ModalHeader>
					<h2>{mode === 'create' ? 'Create' : 'Edit'} task</h2>
					<Button type="button" onClick={(e) => closeModal(e)}>
						<IoMdClose />
					</Button>
				</ModalHeader>
				<FieldLabel>Title</FieldLabel>
				<TextInput {...register('title', { required: true, maxLength: 10 })} maxLength={10} />
				{errors.title && <Error>This field is required</Error>}
				<FieldLabel>Description</FieldLabel>
				<TextArea {...register('description', { maxLength: 250 })} maxLength={250} />

				<FieldLabel>Labels</FieldLabel>
				<LabelsContainer>
					{fields.map((field, index) => (
						<div key={field.id}>
							<FieldLabel style={{ marginBottom: '1rem' }}>Label title</FieldLabel>
							<LabelWrapper>
								<TextInput
									{...register(`labels.${index}.title` as const, { required: true, maxLength: 10 })}
									maxLength={10}
								/>

								<Controller
									name={`labels.${index}.color`}
									control={control}
									rules={{ required: true }}
									render={({ field }) => <ColorSelect field={field} />}
								/>

								<GrayBtn type="button" onClick={() => remove(index)}>
									<FiTrash />
								</GrayBtn>
							</LabelWrapper>
							{errors.labels?.[index]?.title && <Error mt={'1rem'}>Label title is required</Error>}
						</div>
					))}
				</LabelsContainer>
				<div>
					<GrayBtn type="button" onClick={addLabel}>
						Add Label <IoMdAdd />
					</GrayBtn>
				</div>

				<Button type="submit">
					{mode === 'create' ? (
						<Fragment>
							Create Task <IoMdAdd />
						</Fragment>
					) : (
						<Fragment>
							Edit Task <FiEdit2 />
						</Fragment>
					)}{' '}
				</Button>
			</ModalForm>
		</ModalContainer>
	);
};

export default TaskModal;
