<script lang="ts">
	import type { Component } from 'svelte';
	import type { Task } from '$state/tasks';
	import { Clock, Calendar } from '@lucide/svelte';
	import { SvelteDate } from 'svelte/reactivity';
	import { tasks, TASK_STATUS } from '$state/tasks';
	import { Badge, Separator, IconButton, Checkbox } from '$ui';
	import { TrashcanIcon } from '$assets';
	import * as Item from '$components/item';

	let { task }: { task: Task } = $props();

	let isDone: boolean = $derived(task.status === TASK_STATUS.DONE);
	let isTodo: boolean = $derived(task.status === TASK_STATUS.TODO);

	const timeFormatter = new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
	});

	const dateFormatter = new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: 'short',
		year: '2-digit',
	});

	const time = timeFormatter.format(new SvelteDate(task.date));
	const date = dateFormatter.format(new SvelteDate(task.date));

	type BadgeWithIconParams = { Icon: Component; label: string };
</script>

{#snippet badgeWithIcon({ Icon, label }: BadgeWithIconParams)}
	<Badge variant="outline" class="items-[normal] inline-flex border-0 pl-0">
		<Icon />
		{label}
	</Badge>
{/snippet}

<Item.Root class="w-full gap-2.5 pt-3" variant={isDone ? 'muted' : 'outline'}>
	<div class="flex w-full justify-between">
		<Item.Title>{task.title}</Item.Title>

		<Badge class={['ml-2 h-max', isTodo && 'bg-[var(--chart-1)]']}>
			{task.status}
		</Badge>
	</div>

	<Separator />

	<Item.Content>
		<Item.Description>{task?.description}</Item.Description>

		<div>
			{@render badgeWithIcon({ Icon: Clock, label: time })}
			{@render badgeWithIcon({ Icon: Calendar, label: date })}
		</div>
	</Item.Content>

	<Item.Actions class="gap-3.5">
		<Checkbox checked={isDone} onclick={() => tasks.toggleStatus(task.id)} />

		<IconButton destructive onclick={() => tasks.delete(task.id)}>
			<TrashcanIcon class="size-5 drop-shadow-liquid" />
		</IconButton>
	</Item.Actions>
</Item.Root>
