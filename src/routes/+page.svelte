<script lang="ts">
	import { getBrowserTabTitle } from '$utils';
	import { ROUTES } from '$constants';

	let user = $state();
	let tasks = $state();
</script>

<svelte:head>
	<title>{getBrowserTabTitle(ROUTES.HOMEPAGE.title)}</title>
</svelte:head>

<p class="text-muted-foreground text-sm">
	Good morning {user ? `, ${user.name}` : ''}
</p>

<h1 class="scroll-m-20 text-2xl font-semibold tracking-tight">
	{#if tasks?.today}
		You have {tasks.today.length} tasks this month
	{:else if tasks?.today.length === 0 && tasks?.done.length > 0}
		You have completed {tasks} tasks this month
	{:else}
		Create your task
	{/if}
</h1>
