import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import _ from 'lodash';
import { getMonth } from './utils/date';
import MonthGrid from './components/MonthGrid/MonthGrid';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

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
				<Body>
					<Sidebar />
					<MonthGrid
						decrementMonth={() => setMonthIndex(monthIndex - 1)}
						incrementMonth={() => setMonthIndex(monthIndex + 1)}
						month={month}
					/>
				</Body>
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

const Body = styled.div`
	display: grid;
	grid-template-columns: 10% auto;
	height: calc(100vh - ${(props) => props.theme.layout.headerHeight});
`;
