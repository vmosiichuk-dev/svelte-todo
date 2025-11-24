import { CheckallIcon, IdeaIcon, ScrollIcon } from '$assets';

export const TASK_STATUS = {
	ALL: 'all',
	TODO: 'todo',
	DONE: 'done',
} as const;

export const FILTER_BUTTONS = {
	[TASK_STATUS.ALL]: {
		label: TASK_STATUS.ALL,
		icon: ScrollIcon,
	},
	[TASK_STATUS.TODO]: {
		label: TASK_STATUS.TODO,
		icon: IdeaIcon,
	},
	[TASK_STATUS.DONE]: {
		label: TASK_STATUS.DONE,
		icon: CheckallIcon,
	},
} as const;
