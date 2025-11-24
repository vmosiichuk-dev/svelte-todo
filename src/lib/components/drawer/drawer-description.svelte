<script lang="ts">
	import { Dialog as DrawerPrimitive } from 'bits-ui';
	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.DescriptionProps = $props();
</script>

<DrawerPrimitive.Description
	bind:ref
	data-slot="drawer-description"
	class={cn('text-sm text-muted-foreground', className)}
	{...restProps}
/>
