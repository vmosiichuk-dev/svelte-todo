import { LocalStorage } from '$utils';
import { SvelteDate } from 'svelte/reactivity';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
	id: string;
	title: string;
	description: string;
	timestamp: number;
	status: TaskStatus;
}

export const STATUS = {
	TODO: 'todo',
	PROGRESS: 'in-progress',
	DONE: 'done',
} as const;

export class TasksState {
	#storage = new LocalStorage<Task[]>('tasks', []);

	get all() {
		return this.#storage.current;
	}

	add(task: Task) {
		this.#storage.current = [...this.all, task];
	}

	remove(id: string) {
		this.#storage.current = this.all.filter((task: Task) => {
			return task.id !== id;
		});
	}

	update(id: string, patch: Partial<Task>) {
		this.#storage.current = this.all.map((task: Task) => {
			return task.id === id ? { ...task, ...patch } : task;
		});
	}

	get today() {
		const start = new SvelteDate().setHours(0, 0, 0, 0);
		return this.all.filter((task: Task) => task.timestamp >= start);
	}

	get byStatus() {
		return {
			todo: this.all.filter((task: Task) => task.status === STATUS.TODO),
			progress: this.all.filter(
				(task: Task) => task.status === STATUS.PROGRESS
			),
			done: this.all.filter((task: Task) => task.status === STATUS.DONE),
		};
	}
}

export const tasks = new TasksState();
