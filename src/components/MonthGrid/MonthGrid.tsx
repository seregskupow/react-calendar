import _ from 'lodash';
import { FC, Fragment } from 'react';
import { Day } from '../../models';
import DayCell from '../DayCell/DayCell';
import { Grid, MonthWrapper } from './MonthGrid.styled';

interface MonthGridProps {
	month: Day[][];
	incrementMonth: () => void;
	decrementMonth: () => void;
}

const MonthGrid: FC<MonthGridProps> = ({ month, incrementMonth, decrementMonth }) => {
	const onWheelHandler = _.debounce((e: any) => {
		if (e.deltaY < 0) {
			decrementMonth();
		} else {
			incrementMonth();
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
