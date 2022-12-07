import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import _ from 'lodash';
import { getMonth } from './utils/date';
import MonthGrid from './components/MonthGrid/MonthGrid';
import Header from './components/Header/Header';

const App: FC = () => {
	const [month, setMonth] = useState(() => getMonth());
	const [monthIndex, setMonthIndex] = useState(() => new Date().getMonth());

	const setCurrentMonth = () => {
		setMonthIndex(dayjs().month());
	};

	useEffect(() => {
		setMonth(getMonth(monthIndex));
	}, [monthIndex]);

	return (
		<React.Fragment>
			<MainContainer>
				<Header
					setCurrentMonth={setCurrentMonth}
					decrementMonth={() => setMonthIndex(monthIndex - 1)}
					incrementMonth={() => setMonthIndex(monthIndex + 1)}
					monthIndex={monthIndex}
				/>
				<div style={{ display: 'flex', flex: '1 1 0%' }}>
					<MonthGrid
						decrementMonth={() => setMonthIndex(monthIndex - 1)}
						incrementMonth={() => setMonthIndex(monthIndex + 1)}
						month={month}
					/>
				</div>
			</MainContainer>
		</React.Fragment>
	);
};

export default App;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;

	height: 100vh;
`;
