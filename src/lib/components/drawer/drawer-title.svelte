<script lang="ts">
	import { Dialog as DrawerPrimitive } from 'bits-ui';
	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.TitleProps = $props();
</script>

<DrawerPrimitive.Title
	bind:ref
	data-slot="drawer-title"
	class={cn('font-semibold text-foreground', className)}
	{...restProps}
/>
