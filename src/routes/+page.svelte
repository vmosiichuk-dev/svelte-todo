<script lang="ts">
	import { tasks } from '$state';
	import { SvelteDate } from 'svelte/reactivity';
	import { getBrowserTabTitle, ROUTES } from '$utils';

	// let user = $state({
	// 	id: crypto.randomUUID(),
	// 	name: 'Linus Torvarlds',
	// 	avatar: ''
	// });
</script>

<svelte:head>
	<title>{getBrowserTabTitle(ROUTES.HOMEPAGE.title)}</title>
</svelte:head>

<!--<p class="text-muted-foreground text-sm">-->
<!--	Good morning {user ? `, ${user?.name}` : ''}-->
<!--</p>-->

<!--<h1 class="scroll-m-20 text-2xl font-semibold tracking-tight">-->
<!--	{#if tasks?.today}-->
<!--		You have {tasks.today.length} tasks this month-->
<!--	{:else if tasks?.today.length === 0 && tasks?.done.length > 0}-->
<!--		You have completed {tasks} tasks this month-->
<!--	{:else}-->
<!--		Create your task-->
<!--	{/if}-->
<!--</h1>-->

<h1>You have {tasks.today.length} tasks today</h1>

<ul>
	{#each tasks.byStatus.todo as item (item.id)}
		<li>{item.title}</li>
	{/each}
</ul>

<button
	onclick={() =>
		tasks.add({
			id: crypto.randomUUID(),
			title: 'New Task',
			description: 'Example',
			timestamp: SvelteDate.now(),
			status: 'todo',
		})}
>
	Add Task
</button>
