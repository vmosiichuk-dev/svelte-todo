export type TaskStatus = 'all' | 'todo' | 'done';

export type Task = {
	id: string;
	title: string;
	description?: string;
	status: TaskStatus;
	date: number;
};
