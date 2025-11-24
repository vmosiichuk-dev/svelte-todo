<script lang="ts">
	import type { Task, TaskStatus } from '$state/tasks';
	import { tasks, TASK_STATUS, FILTER_BUTTONS } from '$state/tasks';
	import { getBrowserTabTitle, ROUTES } from '$utils';
	import { IconButton } from '$ui';
	import * as Tasks from '$components/tasks';

	let filter = $state<TaskStatus>(TASK_STATUS.ALL);

	let filteredTasks = $derived.by((): Task[] => {
		switch (filter) {
			case TASK_STATUS.TODO: {
				return tasks.todo;
			}
			case TASK_STATUS.DONE: {
				return tasks.done;
			}
			default: {
				return tasks.all;
			}
		}
	});
</script>

<svelte:head>
	<title>
		{getBrowserTabTitle(ROUTES.HOMEPAGE.title)}
	</title>
</svelte:head>

<main class="grid justify-center gap-6 py-2">
	<Tasks.Header />

	<Tasks.Title />

	<div class="flex h-32 w-full items-center justify-center gap-5">
		{#each Object.values(FILTER_BUTTONS) as { label, icon: Icon } (label)}
			<IconButton
				onclick={() => (filter = label)}
				label={label.charAt(0).toUpperCase() + label.slice(1)}
				active={filter === label}
			>
				<Icon class="size-14 drop-shadow-liquid" />
			</IconButton>
		{/each}
	</div>

	<div class="flex max-w-lg flex-col gap-6">
		{#each filteredTasks as task (task.id)}
			<Tasks.Item {task} />
		{/each}
	</div>
</main>
