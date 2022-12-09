import { Body, MainContainer } from './App.styled';

import React, { FC, useRef } from 'react';

import Header from '@/components/Header/Header';
import MonthGrid from '@/components/MonthGrid/MonthGrid';
import Sidebar from '@/components/Sidebar/Sidebar';
import ModalsContainer from '@/components/ModalsContainer/ModalsContainer';
import DnDContext from '@/components/DnDContext/DnDContext';

import _ from 'lodash';

const App: FC = () => {
	const calendarRef = useRef(null);
	return (
		<React.Fragment>
			<ModalsContainer />
			<DnDContext>
				<MainContainer>
					<Header calendarRef={calendarRef} />
					<Body>
						<Sidebar />
						<MonthGrid ref={calendarRef} />
					</Body>
				</MainContainer>
			</DnDContext>
		</React.Fragment>
	);
};

export default App;
