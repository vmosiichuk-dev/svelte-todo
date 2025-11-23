<script lang="ts">
	import type { Task, TaskStatus } from '$state';
	import { tasks, TASK_STATUS } from '$state';
	import { getBrowserTabTitle, ROUTES } from '$utils';
	import { SvelteDate } from 'svelte/reactivity';

	import { Badge } from '$components/badge';
	import { Button } from '$components/button';
	import { Skeleton } from '$components/skeleton';
	import { Separator } from '$components/separator';
	import { IconButton } from '$components/icon-button';
	import { Input } from '$components/input';
	import { Label } from '$components/label';
	import { Textarea } from '$components/textarea';
	import { Checkbox } from '$components/checkbox';
	import { ModeToggle } from '$components/mode-toggle';
	import { Clock, Calendar } from '@lucide/svelte';
	import * as Sheet from '$components/sheet';
	import * as Item from '$components/item';

	import {
		ScrollIcon,
		IdeaIcon,
		CheckallIcon,
		PlusIcon,
		RemoveIcon,
		TrashcanIcon
	} from '$assets';

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

	let sheetOpen = $state(false);
	let formTitle = $state('');
	let formDescription = $state('');

	const addTask = () => {
		tasks.add({
			id: crypto.randomUUID(),
			title: formTitle,
			description: formDescription,
			status: 'todo',
			date: SvelteDate.now(),
		});

		sheetOpen = false;
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

	const timeFormatter = new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
	});

	const dateFormatter = new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: 'short',
		year: '2-digit',
	});

	const now = new SvelteDate();
	const hour = now.getHours();
</script>

<svelte:head>
	<title>
		{getBrowserTabTitle(ROUTES.HOMEPAGE.title)}
	</title>
</svelte:head>

<main class="grid gap-6 py-2 justify-center">
	<div class="relative">
		<Sheet.Root bind:open={sheetOpen}>
			<div class="absolute top-3.75 right-1 flex items-center gap-2">
				<Sheet.Trigger>
					<IconButton>
						<PlusIcon className="size-6 drop-shadow-liquid" />
					</IconButton>
				</Sheet.Trigger>

				<ModeToggle />
			</div>

			<Sheet.Content side="right">
				<Sheet.Header>
					<Sheet.Title>Add task</Sheet.Title>

					<Sheet.Description>
						Fill in the required fields to add a new task
					</Sheet.Description>
				</Sheet.Header>

				<form class="grid gap-8 p-4">
					<fieldset class="grid gap-2">
						<Label for="form-title">Title</Label>

						<Input
							id="form-title"
							bind:value={formTitle}
							placeholder="Enter title..."
						/>
					</fieldset>

					<fieldset class="grid gap-2">
						<Label for="form-description">Description</Label>

						<Textarea
							id="form-description"
							bind:value={formDescription}
							placeholder="Enter description..."
						/>
					</fieldset>
				</form>

				<Sheet.Footer class="mb-4">
					<Button onclick={addTask} disabled={formTitle === ''}>
						Create task
					</Button>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</div>

	<div class="grid-template-rows-[20px_64px] grid h-[84px]">
		<p class="text-sm text-muted-foreground">
			{#if hour >= 5 && hour < 12}
				Good morning,
			{:else if hour < 18}
				Good afternoon,
			{:else if hour < 24}
				Good evening,
			{:else}
				Hello,
			{/if}
		</p>

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
			<IconButton
				onclick={() => (filter = icon.label)}
				label={icon.label.charAt(0).toUpperCase() + icon.label.slice(1)}
				active={filter === icon.label}
			>
				<icon.svg className="size-14 drop-shadow-liquid" />
			</IconButton>
		{/each}
	</div>

	<div class="flex flex-col gap-6 max-w-lg">
		{#each filteredTasks as task (task.id)}
			<Item.Root
				class="gap-2.5 pt-3 w-full"
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

				<Item.Actions class="gap-3.5">
					<Checkbox
						onclick={() => tasks.toggleStatus(task.id)}
						checked={task.status === TASK_STATUS.DONE}
					/>

					<IconButton destructive onclick={() => tasks.delete(task.id)}>
						<TrashcanIcon className="size-5 drop-shadow-liquid" />
					</IconButton>
				</Item.Actions>
			</Item.Root>
		{/each}
	</div>
</main>
