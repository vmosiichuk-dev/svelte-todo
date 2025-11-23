<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithElementRef, WithoutChildren } from '$utils';
	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<
		WithElementRef<HTMLAttributes<HTMLDivElement>>
	> = $props();
</script>

<div
	bind:this={ref}
	data-slot="skeleton"
	class={cn('animate-pulse rounded-md bg-muted', className)}
	{...restProps}
></div>
