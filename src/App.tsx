import React, { FC } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Header from '@/components/Header/Header';
import MonthGrid from '@/components/MonthGrid/MonthGrid';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useAppSelector } from '@/store';
import { modalSelector } from '@/store/slices/modal.slice';
import TaskModal from './components/TaskModal/TaskModal';

const App: FC = () => {
	const { show } = useAppSelector(modalSelector);
	return (
		<React.Fragment>
			{show && <TaskModal />}
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
