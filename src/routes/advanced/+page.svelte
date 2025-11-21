<script lang="ts">
	import { PAGE_TITLES } from '$lib/constants/paths';
	import { getBrowserTabTitle } from '$lib/utils/paths';

	const title = getBrowserTabTitle(PAGE_TITLES.ADVANCED);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{PAGE_TITLES.ADVANCED}</h1>
