<script lang="ts">
	import type { Task, TaskStatus } from '$state';
	import { tasks, user, TASK_STATUS } from '$state';
	import { getBrowserTabTitle, ROUTES } from '$utils';
	import { SvelteDate } from 'svelte/reactivity';

	import { Badge } from '$components/badge';
	import { Button } from '$components/button';
	import { Checkbox } from '$components/checkbox';
	import { Skeleton } from '$components/skeleton';
	import { ScrollIcon, IdeaIcon, CheckallIcon } from '$assets';
	import { Clock, Calendar } from '@lucide/svelte';
	import * as Item from '$components/item';
	import { Separator } from '$components/separator';

	const icons = {
		[TASK_STATUS.ALL]: {
			svg: ScrollIcon,
			label: TASK_STATUS.ALL,
		},
		[TASK_STATUS.TODO]: {
			svg: IdeaIcon,
			label: TASK_STATUS.TODO,
		},
		[TASK_STATUS.DONE]: {
			svg: CheckallIcon,
			label: TASK_STATUS.DONE,
		},
	};

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

	const getCount = <T,>(array: Array<T>, enumerable: string) => {
		const pluralEnumerable = enumerable + 's';
		if (!Array.isArray(array)) return `0 ${pluralEnumerable}`;

		const result = array.length === 1 ? enumerable : pluralEnumerable;
		return `${array.length} ${result}`;
	};

	const addTask = () => {
		tasks.add({
			id: crypto.randomUUID(),
			title: 'Lorem ipsum seldum minodotum naregonum estus deo',
			description:
				'Example sentence that I have written to illustrate how long text will be rendered in the task description block.',
			status: 'done',
			date: SvelteDate.now(),
		});
	};

	const toggleTaskStatus = (e: CustomEvent<boolean>, id: Task['id']) => {
		console.log(e, e.detail, id);
		tasks.update(id, {
			status: e.detail ? TASK_STATUS.DONE : TASK_STATUS.TODO,
		});
	};

	const timeFormatter = new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
	});

	const dateFormatter = new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: 'short',
		year: '2-digit',
	});
</script>

<svelte:head>
	<title>
		{getBrowserTabTitle(ROUTES.HOMEPAGE.title)}
	</title>
</svelte:head>

<main class="grid gap-6 pt-2">
	<div class="grid-template-rows-[20px_64px] grid h-[84px]">
		{#if !user.loaded}
			<Skeleton class="my-1.75 h-2 w-1/2" />
		{:else}
			<p class="text-sm text-muted-foreground">
				Hello, {user && user?.name ? user.name : ''}
			</p>
		{/if}

		<div class="grid w-5/6 gap-4 pt-3.25">
			{#if !tasks.loaded}
				<Skeleton class="h-3.75 w-full" />
				<Skeleton class="h-3.75 w-full" />
			{:else}
				<h1 class="text-2xl font-semibold tracking-tight text-balance">
					{#if tasks.today.length > 0}
						You have {getCount(tasks.today, 'task')} for today
					{:else if tasks.today.length === 0 && tasks.done.length > 0}
						You have completed {getCount(tasks.done, 'task')} so far
					{:else}
						Looks like your task list is empty...
					{/if}
				</h1>
			{/if}
		</div>
	</div>

	<div class="flex h-32 w-full items-center justify-center gap-5">
		{#each Object.values(icons) as icon (icon.label)}
			<Button
				onclick={() => (filter = icon.label)}
				variant="ghost"
				class={[
					'group flex min-h-16 flex-col rounded-full [&]:p-0',
					'[&]:focus-visible:ring-0 [&]:focus-visible:outline-none',
					'[&]:hover:!bg-transparent',
				]}
			>
				<span
					class={[
						'p-2.5',
						'rounded-full focus-visible:outline-none',
						'group-focus-visible:ring-3 focus-visible:ring-3',
						'group-focus-visible:ring-ring focus-visible:ring-ring',
						'group-hover:bg-accent/50 hover:bg-accent/50',
						filter === icon.label && 'ring-3 ring-primary',
					]}
				>
					<icon.svg className="size-14 drop-shadow-liquid" />
				</span>

				<span class="scroll-m-20 font-medium tracking-tight">
					{icon.label.charAt(0).toUpperCase() + icon.label.slice(1)}
				</span>
			</Button>
		{/each}
	</div>

	<div class="flex flex-col gap-6">
		{#each filteredTasks as task (task.id)}
			<Item.Root
				class="gap-2.5 pt-3"
				variant={task.status === TASK_STATUS.DONE ? 'muted' : 'outline'}
			>
				<div class="flex w-full justify-between">
					<Item.Title>{task.title}</Item.Title>

					<Badge
						class={[
							'ml-2 h-max',
							task.status === TASK_STATUS.TODO &&
								'bg-[var(--chart-1)]',
						]}
					>
						{task.status}
					</Badge>
				</div>

				<Separator />

				<Item.Content>
					<Item.Description>{task?.description}</Item.Description>

					<div>
						<Badge
							variant="outline"
							class="items-[normal] inline-flex border-0 pl-0"
						>
							<Clock />
							{timeFormatter.format(new SvelteDate(task.date))}
						</Badge>

						<Badge
							variant="outline"
							class="items-[normal] inline-flex border-0 pl-0"
						>
							<Calendar />
							{dateFormatter.format(new SvelteDate(task.date))}
						</Badge>
					</div>
				</Item.Content>

				<Item.Actions>
					<Checkbox
						checked={task.status === TASK_STATUS.DONE}
						onchange={(e) => toggleTaskStatus(e, task.id)}
					/>
				</Item.Actions>
			</Item.Root>
		{/each}
	</div>

	<button onclick={addTask}>Add Task</button>
</main>
