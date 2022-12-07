import React, { FC } from 'react';
import styled from 'styled-components';

import _ from 'lodash';
import MonthGrid from './components/MonthGrid/MonthGrid';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

const App: FC = () => {
	return (
		<React.Fragment>
			<MainContainer>
				<Header />
				<Body>
					<Sidebar />
					<MonthGrid />
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
