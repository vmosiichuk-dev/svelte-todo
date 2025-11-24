<script lang="ts" module>
	import type { VariantProps } from 'tailwind-variants';
	import { tv } from 'tailwind-variants';

	export const drawerVariants = tv({
		base: 'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
		variants: {
			side: {
				top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
				bottom: 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
				left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
				right: 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
			},
		},
		defaultVariants: {
			side: 'right',
		},
	});

	export type Side = VariantProps<typeof drawerVariants>['side'];
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { WithoutChildrenOrChild } from '$utils';
	import { Dialog as DrawerPrimitive } from 'bits-ui';
	import { cn } from '$utils';
	import { X } from '@lucide/svelte';
	import DrawerOverlay from './drawer-overlay.svelte';

	let {
		ref = $bindable(null),
		class: className,
		side = 'right',
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<DrawerPrimitive.ContentProps> & {
		portalProps?: DrawerPrimitive.PortalProps;
		side?: Side;
		children: Snippet;
	} = $props();
</script>

<DrawerPrimitive.Portal {...portalProps}>
	<DrawerOverlay />

	<DrawerPrimitive.Content
		bind:ref
		data-slot="drawer-content"
		class={cn(drawerVariants({ side }), className)}
		{...restProps}
	>
		{@render children?.()}

		<DrawerPrimitive.Close
			class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none"
		>
			<X class="size-4" />

			<span class="sr-only">Close</span>
		</DrawerPrimitive.Close>
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>
