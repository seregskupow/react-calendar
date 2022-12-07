import dayjs from 'dayjs';
import _ from 'lodash';
import { FC } from 'react';
import { Day } from '../../models';
import { CellHeader, DayContainer, DayName, DayNumber } from './DayCell.styled';

interface DayCelProps {
	day: Day;
	weekIndex: number;
}

const DayCell: FC<DayCelProps> = ({ day, weekIndex }) => {
	return (
		<DayContainer key={_.uniqueId()}>
			<CellHeader>
				{weekIndex === 0 && <DayName>{day.date.format('dddd')}</DayName>}

				<DayNumber currentMonth={day.currentMonth} today={day.date.format('DD-MM-YY') === dayjs().format('DD-MM-YY')}>
					{day.date.format('DD')}
				</DayNumber>
			</CellHeader>
		</DayContainer>
	);
};

export default DayCell;
