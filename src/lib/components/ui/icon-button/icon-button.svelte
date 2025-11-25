<script lang="ts">
	import type { ButtonProps } from '$ui';
	import { Button } from '$ui';

	let {
		class: className,
		label,
		active = false,
		destructive = false,
		children,
		...restProps
	}: ButtonProps & {
		label?: string;
		active?: boolean;
		destructive?: boolean;
	} = $props();

	const hoverClasses = destructive
		? 'group-hover:bg-[var(--destructive-1)] hover:bg-[var(--destructive-1)]'
		: 'group-hover:bg-muted/80 hover:bg-muted/80';

	const activeClasses = destructive
		? 'group-active:bg-[var(--destructive-1)] active:bg-[var(--destructive-1)]'
		: 'group-active:bg-muted/80 active:bg-muted/80';
</script>

<Button
	variant="ghost"
	class={[
		'group flex min-h-16 flex-col rounded-full [&]:p-0',
		'[&]:focus-visible:ring-0 [&]:focus-visible:outline-none',
		'[&]:hover:!bg-transparent',
		className,
	]}
	{...restProps}
>
	<span
		class={[
			'p-[15%]',
			'rounded-full focus-visible:outline-none',
			'group-focus-visible:ring-3 focus-visible:ring-3',
			'group-focus-visible:ring-ring focus-visible:ring-ring',
			hoverClasses,
			activeClasses,
			active && 'ring-3 ring-primary',
		]}
	>
		{@render children?.()}
	</span>

	{#if label}
		<span class="scroll-m-20 font-medium tracking-tight">
			{label}
		</span>
	{/if}
</Button>
