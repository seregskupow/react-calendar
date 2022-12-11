import 'react-toastify/dist/ReactToastify.css';

import { Body, MainContainer } from './App.styled';
import React, { FC, useRef } from 'react';

import DnDContext from '@/components/DnDContext/DnDContext';
import Header from '@/components/Header/Header';
import ModalsContainer from '@/components/ModalsContainer/ModalsContainer';
import MonthGrid from '@/components/MonthGrid/MonthGrid';
import Sidebar from '@/components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import _ from 'lodash';

const App: FC = () => {
	const calendarRef = useRef(null);
	return (
		<React.Fragment>
			<ModalsContainer />
			<ToastContainer style={{ fontSize: '20px' }} />
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
