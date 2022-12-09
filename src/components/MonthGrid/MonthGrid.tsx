import { forwardRef } from 'react';
import { FC, Fragment, WheelEvent } from 'react';
import DayCell from '@/components/DayCell/DayCell';
import { Grid, MonthWrapper } from './MonthGrid.styled';
import { Day } from '@/models';
import { useActions, useAppSelector, calendarSelector } from '@/store';
import _ from 'lodash';

const MonthGrid = forwardRef<HTMLDivElement>((props, ref) => {
	const { nextMonth, prevMonth } = useActions();
	const { month } = useAppSelector(calendarSelector);

	const onWheelHandler = _.debounce((e: WheelEvent) => {
		//prevent month change on window scale
		if (e.ctrlKey) return;

		if (e.deltaY < 0) {
			prevMonth();
		} else {
			nextMonth();
		}
	}, 250);

	return (
		<MonthWrapper ref={ref}>
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
});

export default MonthGrid;
