import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useActions, useAppSelector } from '@/store';

import { FC } from 'react';
import { tasksSelector } from '@/store/slices/tasks.slice';

interface DnDContextProps {
	children: React.ReactNode;
}

const DnDContext: FC<DnDContextProps> = ({ children }) => {
	const { tasks } = useAppSelector(tasksSelector);
	const { setTasksForDay } = useActions();

	/**
	 * On task drop handler
	 *
	 * @param result DropResult
	 * Detects source and destination drop containers and moves tasks accordinly
	 */
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
	return <DragDropContext onDragEnd={onDragEndHandler}>{children}</DragDropContext>;
};

export default DnDContext;
