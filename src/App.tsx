import dayjs, { Dayjs } from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMonth } from './utils/date';
import _ from 'lodash';
import { Day } from './models';

const App: FC = () => {
	const [month, setMonth] = useState(() => getMonth());
	const [monthIndex, setMonthIndex] = useState(() => new Date().getMonth());

	useEffect(() => {
		setMonth(getMonth(monthIndex));
	}, [monthIndex]);

	return (
		<React.Fragment>
			<NavBar>
				<button onClick={() => setMonthIndex(monthIndex - 1)}>{'<'}</button>
				<span>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</span>
				<button onClick={() => setMonthIndex(monthIndex + 1)}>{'>'}</button>
			</NavBar>
			<Grid>
				{month.map((week: Day[], weekIdx) => (
					<React.Fragment key={_.uniqueId()}>
						{week.map((day: Day, index) => (
							<div key={_.uniqueId()}>
								{weekIdx === 0 && <div>{day.date.format('dddd')}</div>}
								<p style={{ color: day.currentMonth ? 'blue' : 'red' }}>{day.date.format('DD')}</p>
							</div>
						))}
					</React.Fragment>
				))}
			</Grid>
		</React.Fragment>
	);
};

export default App;

const Grid = styled.div`
	display: grid;
	grid-template-rows: repeat(5, minmax(0, 1fr));
	grid-template-columns: repeat(7, minmax(0, 1fr));
`;

const NavBar = styled.nav`
	width: 100%;
`;
