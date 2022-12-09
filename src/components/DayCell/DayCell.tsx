import dayjs from 'dayjs';
import _ from 'lodash';
import { createRef, FC, Fragment, useEffect, useLayoutEffect, useRef, useState, WheelEvent } from 'react';

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
import { GiPartyPopper } from 'react-icons/gi';
import { HiPlus } from 'react-icons/hi';
import Task from '@/components/Task/Task';
import { Day } from '@/models';
import { useActions, useAppSelector } from '@/store';
import { selectTodosForDay } from '@/store/slices/tasks.slice';
import { Droppable } from 'react-beautiful-dnd';
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
					<span>Add task</span>
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
