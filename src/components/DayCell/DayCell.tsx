import dayjs from 'dayjs';
import _ from 'lodash';
import { FC, useEffect, useLayoutEffect, useRef, useState, WheelEvent } from 'react';

import {
	AddTaskButton,
	CellHeader,
	DayContainer,
	DayEventsButton,
	DayName,
	DayNumber,
	TasksContainer,
} from './DayCell.styled';
import { GiPartyPopper } from 'react-icons/gi';
import { HiPlus } from 'react-icons/hi';
import Task from '@/components/Task/Task';
import { Day } from '@/models';
import { useActions, useAppSelector } from '@/store';
import { selectTodosForDay } from '@/store/slices/tasks.slice';
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
	}, []);

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
			<TasksContainer ref={tasksContainerRef} onWheel={(e) => overflowing && e.stopPropagation()}>
				{tasks.map((task) => (
					<Task task={task} key={_.uniqueId()} />
				))}
			</TasksContainer>
		</DayContainer>
	);
};

export default DayCell;
