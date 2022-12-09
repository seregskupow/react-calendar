import {
	AddTaskButton,
	CellHeader,
	DayContainer,
	DayEventsButton,
	DayName,
	DayNumber,
	TasksContainer,
	TasksWrapper,
} from './DayCell.styled';

import { FC, useLayoutEffect, useRef, useState } from 'react';

import Task from '@/components/Task/Task';
import { Day } from '@/models';
import { useActions, useAppSelector, selectTodosForDay } from '@/store';

import { GiPartyPopper } from 'react-icons/gi';
import { HiPlus } from 'react-icons/hi';

import { Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';
import dayjs from 'dayjs';

interface DayCelProps {
	day: Day;
	weekIndex: number;
}

const DayCell: FC<DayCelProps> = ({ day, weekIndex }) => {
	const tasks = useAppSelector((state) => selectTodosForDay(state, day.date));
	const { show, selectDay, deselectTask } = useActions();

	const [overflowing, setOverflowing] = useState(false);
	const tasksContainerRef = useRef<HTMLUListElement>(null);

	useLayoutEffect(() => {
		if (tasksContainerRef.current) {
			const container = tasksContainerRef.current;
			setOverflowing(container!.scrollHeight > container!.clientHeight);
		}
	}, [tasks.length]);

	const createTaskHandler = () => {
		selectDay(day.date);
		deselectTask();
		show('create');
	};

	return (
		<DayContainer $overflow={overflowing} key={_.uniqueId()}>
			<CellHeader>
				<AddTaskButton onClick={createTaskHandler}>
					<HiPlus />
				</AddTaskButton>
				<DayEventsButton>
					<GiPartyPopper />
				</DayEventsButton>

				{weekIndex === 0 && <DayName>{dayjs(day.date).format('dddd')}</DayName>}

				<DayNumber
					currentMonth={day.currentMonth}
					today={dayjs(day.date).format('DD-MM-YY') === dayjs().format('DD-MM-YY')}>
					{dayjs(day.date).format('D')}
				</DayNumber>
			</CellHeader>
			<Droppable key={day.date.valueOf()} droppableId={day.date.valueOf().toString()}>
				{(provided, snapshot) => (
					<TasksWrapper ref={provided.innerRef} {...provided.droppableProps}>
						<TasksContainer ref={tasksContainerRef} onWheel={(e) => overflowing && e.stopPropagation()}>
							{tasks.map((task, index) => (
								<Task task={task} key={_.uniqueId()} />
							))}
						</TasksContainer>
					</TasksWrapper>
				)}
			</Droppable>
		</DayContainer>
	);
};

export default DayCell;
