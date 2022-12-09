import React, { FC } from 'react';
import _ from 'lodash';
import Header from '@/components/Header/Header';
import MonthGrid from '@/components/MonthGrid/MonthGrid';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Body, MainContainer } from './App.styled';
import ModalsContainer from '../ModalsContainer/ModalsContainer';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useActions, useAppSelector } from '@/store';
import { tasksSelector } from '@/store/slices/tasks.slice';

const App: FC = () => {
	const { tasks } = useAppSelector(tasksSelector);
	const { setTasksForDay } = useActions();

	const onDragEndHandler = (result: DropResult) => {
		if (!result.destination) return;
		const { source, destination } = result;

		const [sourceId, destId] = [parseInt(source.droppableId), parseInt(destination.droppableId)];
		if (source.droppableId !== destination.droppableId) {
			let sourceTasks = [...tasks[sourceId]];
			let destTasks = [...(tasks[destId] || [])];

			const [removed] = sourceTasks.splice(source.index, 1);
			destTasks.splice(destination.index, 0, removed);

			sourceTasks = sourceTasks.map((item, index) => ({ ...item, orderIndex: index }));
			destTasks = destTasks.map((item, index) => ({ ...item, date: destId, orderIndex: index }));

			setTasksForDay({ day: sourceId, tasks: sourceTasks });
			setTasksForDay({ day: destId, tasks: destTasks });
		} else {
			let sourceTasks = [...tasks[sourceId]];
			const [removed] = sourceTasks.splice(source.index, 1);
			sourceTasks.splice(destination.index, 0, removed);

			sourceTasks = sourceTasks.map((item, index) => ({ ...item, orderIndex: index }));
			setTasksForDay({ day: sourceId, tasks: sourceTasks });
		}
	};

	return (
		<React.Fragment>
			<ModalsContainer />
			<DragDropContext onDragEnd={onDragEndHandler}>
				<MainContainer>
					<Header />
					<Body>
						<Sidebar />
						<MonthGrid />
					</Body>
				</MainContainer>
			</DragDropContext>
		</React.Fragment>
	);
};

export default App;
