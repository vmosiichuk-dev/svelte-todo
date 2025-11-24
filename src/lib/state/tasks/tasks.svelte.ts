import type { Task } from './tasks.types.ts';
import { TASK_STATUS } from './tasks.constants.ts';
import { SvelteDate } from 'svelte/reactivity';
import { LocalStorage } from '$utils';

export class TasksState {
	loaded = $state(false);
	#storage = new LocalStorage<Task[]>('tasks', []);

	constructor() {
		this.loaded = true;
	}

	get all() {
		return [...this.#storage.current].sort((a, b) => {
			return b.date - a.date;
		});
	}

	add(task: Task) {
		this.#storage.current = [...this.all, task];
	}

	delete(id: Task['id']) {
		const updatedTasks = this.all;
		this.#storage.current = updatedTasks.filter((task: Task) => {
			return task.id !== id;
		});
	}

	toggleStatus(id: string) {
		const updatedTasks = [...this.all];
		const index = updatedTasks.findIndex((task) => task.id === id);

		if (index !== -1) {
			const task = updatedTasks[index];
			updatedTasks[index] = {
				...task,
				status:
					task.status === TASK_STATUS.TODO
						? TASK_STATUS.DONE
						: TASK_STATUS.TODO,
			};

			this.#storage.current = [...updatedTasks];
		}
	}

	get todo() {
		return this.all.filter((task: Task) => {
			return task.status === TASK_STATUS.TODO;
		});
	}

	get done() {
		return this.all.filter((task: Task) => {
			return task.status === TASK_STATUS.DONE;
		});
	}

	get #todayStart() {
		return new SvelteDate().setHours(0, 0, 0, 0);
	}

	get #tomorrowStart() {
		const date = new SvelteDate(this.#todayStart);
		return date.setDate(date.getDate() + 1);
	}

	get today() {
		const today = this.#todayStart;
		const tomorrow = this.#tomorrowStart;

		return this.all.filter((task: Task) => {
			return task.date >= today && task.date < tomorrow;
		});
	}
}

export const tasks = new TasksState();
