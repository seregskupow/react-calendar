import dayjs from 'dayjs';
import _ from 'lodash';
import { FC, WheelEvent } from 'react';

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
	const { show, selectDay } = useActions();

	const createTaskHandler = () => {
		selectDay(day.date);
		show();
	};

	const tasksOnWheelHandler = (e: WheelEvent) => {
		const container = (e.target as HTMLInputElement)!.closest('ul');
		if (!container) return;
		container!.scrollHeight > container!.clientHeight && e.stopPropagation();
	};

	return (
		<DayContainer key={_.uniqueId()}>
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
					{dayjs(day.date).format('DD')}
				</DayNumber>
			</CellHeader>
			<TasksContainer onWheel={tasksOnWheelHandler}>
				{tasks.map((task) => (
					<Task task={task} key={_.uniqueId()} />
				))}
			</TasksContainer>
		</DayContainer>
	);
};

export default DayCell;
