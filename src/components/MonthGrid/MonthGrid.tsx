import _ from 'lodash';
import { FC, Fragment } from 'react';
import DayCell from '../DayCell/DayCell';
import { Grid, MonthWrapper } from './MonthGrid.styled';
import { Day } from '@/models';
import { useActions, useAppSelector, calendarSelector } from '@/store';

interface MonthGridProps {}

const MonthGrid: FC = () => {
	const { nextMonth, prevMonth } = useActions();
	const { month } = useAppSelector(calendarSelector);

	const onWheelHandler = _.debounce((e: any) => {
		if (e.deltaY < 0) {
			prevMonth();
		} else {
			nextMonth();
		}
	}, 250);

	return (
		<MonthWrapper>
			<Grid onWheel={(e) => onWheelHandler(e)}>
				{month.map((week: Day[], weekIdx: number) => (
					<Fragment key={_.uniqueId()}>
						{week.map((day: Day) => (
							<DayCell day={day} weekIndex={weekIdx} key={_.uniqueId()} />
						))}
					</Fragment>
				))}
			</Grid>
		</MonthWrapper>
	);
};

export default MonthGrid;
