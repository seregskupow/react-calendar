import {
	AddTaskButton,
	CellHeader,
	DayContainer,
	DayEventsButton,
	DayName,
	DayNumber,
	HolidayName,
	HolidaysContainer,
	TasksContainer,
	TasksWrapper,
} from './DayCell.styled';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { selectHolidaysForToday, selectTodosForDay, useActions, useAppSelector } from '@/store';

import { Day } from '@/models';
import { Droppable } from 'react-beautiful-dnd';
import { GiPartyPopper } from 'react-icons/gi';
import { HiPlus } from 'react-icons/hi';
import Task from '@/components/Task/Task';
import _ from 'lodash';
import dayjs from 'dayjs';

interface DayCelProps {
	day: Day;
	weekIndex: number;
}

const DayCell: FC<DayCelProps> = ({ day, weekIndex }) => {
	const tasks = useAppSelector((state) => selectTodosForDay(state, day.date));
	const holidays = useAppSelector((state) => selectHolidaysForToday(state, day.date));
	const { show, selectDay, deselectTask } = useActions();

	const [tasksOverflowing, setTasksOverflowing] = useState(false);
	const tasksContainerRef = useRef<HTMLUListElement>(null);

	const [showHolidays, setShowHolidays] = useState(false);
	const [holidaysOverflowing, setHolidaysOverflowing] = useState(false);
	const holidaysContainerRef = useRef<HTMLUListElement>(null);

	useLayoutEffect(() => {
		if (tasksContainerRef.current) {
			const container = tasksContainerRef.current;
			setTasksOverflowing(container!.scrollHeight > container!.clientHeight);
		}
	}, [tasks.length]);

	useLayoutEffect(() => {
		if (holidaysContainerRef.current) {
			const container = holidaysContainerRef.current;
			setHolidaysOverflowing(container!.scrollHeight > container!.clientHeight);
		}
	}, [holidays.length, showHolidays]);

	const createTaskHandler = () => {
		selectDay(day.date);
		deselectTask();
		show('create');
	};

	return (
		<DayContainer $overflow={tasksOverflowing} key={_.uniqueId()}>
			{showHolidays && (
				<HolidaysContainer
					ref={holidaysContainerRef}
					onWheel={(e) => holidaysOverflowing && e.stopPropagation()}
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.2, ease: 'easeInOut' }}>
					{holidays.map((holiday) => (
						<HolidayName key={_.uniqueId()}>{holiday.localName}</HolidayName>
					))}
				</HolidaysContainer>
			)}

			<CellHeader>
				<AddTaskButton onClick={createTaskHandler} title="Add task">
					<HiPlus />
				</AddTaskButton>
				{holidays.length > 0 && (
					<DayEventsButton onClick={() => setShowHolidays(!showHolidays)} title="Show holidays">
						<GiPartyPopper />
						{holidays.length}
					</DayEventsButton>
				)}

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
						<TasksContainer ref={tasksContainerRef} onWheel={(e) => tasksOverflowing && e.stopPropagation()}>
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
