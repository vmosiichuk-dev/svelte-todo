<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import { tasks } from '$state/tasks';
	import { Skeleton } from '$ui';

	const now = new SvelteDate();
	const hour = now.getHours();

	const getCount = <T,>(array: Array<T>, enumerable: string) => {
		const pluralEnumerable = enumerable + 's';
		if (!Array.isArray(array)) return `0 ${pluralEnumerable}`;

		const result = array.length === 1 ? enumerable : pluralEnumerable;
		return `${array.length} ${result}`;
	};
</script>

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
				{#if tasks.todo.length > 0}
					You have {getCount(tasks.todo, 'task')} to do
				{:else if tasks.today.length === 0 && tasks.done.length > 0}
					You have completed {getCount(tasks.done, 'task')} so far
				{:else}
					Looks like your task list is empty...
				{/if}
			</h1>
		{/if}
	</div>
</div>
