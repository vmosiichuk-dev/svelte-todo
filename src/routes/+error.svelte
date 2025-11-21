<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { PAGE_TITLES } from '$lib/constants/paths';
	import { getBrowserTabTitle } from '$lib/utils/paths';

	const title = getBrowserTabTitle(`${PAGE_TITLES.ERROR} ${page.status}`);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main>
	<h1>{page.status}</h1>
	<p>{page.error?.message}</p>

	{#if page.status === 404}
		<p>Looks like the page you’re looking for doesn’t exist.</p>
	{:else if page.status >= 500}
		<p>Something went wrong on our side. We’re already working on it.</p>
	{/if}

	<a href={resolve('/')}>Return to homepage</a>
</main>
