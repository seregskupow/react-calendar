import React, { FC } from 'react';
import _ from 'lodash';
import Header from '@/components/Header/Header';
import MonthGrid from '@/components/MonthGrid/MonthGrid';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Body, MainContainer } from './App.styled';
import ModalsContainer from '../ModalsContainer/ModalsContainer';
import DnDContext from '../DnDContext/DnDContext';

const App: FC = () => {
	return (
		<React.Fragment>
			<ModalsContainer />
			<DnDContext>
				<MainContainer>
					<Header />
					<Body>
						<Sidebar />
						<MonthGrid />
					</Body>
				</MainContainer>
			</DnDContext>
		</React.Fragment>
	);
};

export default App;
