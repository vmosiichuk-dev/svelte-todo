<script lang="ts">
	import { page } from '$app/state';
	import { ROUTES } from '$constants';
	import { getBrowserTabTitle, gotoPage } from '$utils';
	import { MoveRight } from '@lucide/svelte';
	import { errorIcon } from '$assets';
	import { Button } from '$ui/button';
	import { LiquidIcon } from '$ui/liquid-icon';
	import * as Empty from '$ui/empty';

	const { title, path } = ROUTES.HOMEPAGE;
	const messages = {
		404: 'Looks like the page you’re looking for doesn’t exist.',
		500: `Oops... Something went wrong.\nTry reloading the app or come back later.`,
	};
</script>

<svelte:head>
	<title>{getBrowserTabTitle(page.status)}</title>
</svelte:head>

<Empty.Root>
	<Empty.Header>
		<LiquidIcon src={errorIcon} alt="Error Icon" />

		<Empty.Title>
			{page.status} – {page.error?.message}
		</Empty.Title>

		<Empty.Description>
			<p class="text-balance whitespace-break-spaces">
				{page.status === 404 ? messages[404] : messages[500]}
			</p>
		</Empty.Description>
	</Empty.Header>

	{#if page.status === 404}
		<Empty.Content>
			<Empty.Description>
				<Button
					class="group"
					onclick={() => gotoPage(path)}
				>
					<MoveRight
						class={[
							'transition-transform duration-200',
							'group-hover:scale-125'
						]}
					/>

					<span>Go to {title.toLowerCase()}</span>
				</Button>
			</Empty.Description>
		</Empty.Content>
	{/if}
</Empty.Root>
