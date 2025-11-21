<script lang="ts">
	import { ROUTES } from '$constants';
	import { getBrowserTabTitle } from '$utils';

	const title = getBrowserTabTitle(ROUTES.HOMEPAGE.title);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{ROUTES.HOMEPAGE.title}</h1>
