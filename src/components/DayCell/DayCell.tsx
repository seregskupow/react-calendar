import dayjs from 'dayjs';
import _ from 'lodash';
import { FC } from 'react';
import { Day } from '../../models';
import Task from '../Task/Task';
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
interface DayCelProps {
	day: Day;
	weekIndex: number;
}

const DayCell: FC<DayCelProps> = ({ day, weekIndex }) => {
	return (
		<DayContainer key={_.uniqueId()}>
			<CellHeader>
				<AddTaskButton>
					<HiPlus />
					<span>Add task</span>
				</AddTaskButton>
				<DayEventsButton>
					<GiPartyPopper />
				</DayEventsButton>

				{weekIndex === 0 && <DayName>{day.date.format('dddd')}</DayName>}

				<DayNumber currentMonth={day.currentMonth} today={day.date.format('DD-MM-YY') === dayjs().format('DD-MM-YY')}>
					{day.date.format('DD')}
				</DayNumber>
			</CellHeader>
			<TasksContainer onWheel={(e) => e.stopPropagation()}>
				{new Array(_.random(0, 6)).fill(null).map(() => (
					<Task label="Some task" key={_.uniqueId()} />
				))}
			</TasksContainer>
		</DayContainer>
	);
};

export default DayCell;
