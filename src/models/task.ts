import { Label } from './label';

export interface Task {
	id: string;
	title: string;
	description: string;
	labels: Label[];
	date: number;
	orderIndex: number;
}

export interface CreateTask {
	title: string;
	description: string;
	labels: Label[];
	date: number;
}

export interface EditTask {
	id: string;
	title?: string;
	description?: string;
	labels?: Label[];
	date: number;
	orderIndex?: number;
}
