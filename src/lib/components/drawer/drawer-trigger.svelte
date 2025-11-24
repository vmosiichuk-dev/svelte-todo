<script lang="ts">
	import { Dialog as DrawerPrimitive } from 'bits-ui';
	let { ref = $bindable(null), ...restProps }: DrawerPrimitive.TriggerProps =
		$props();
</script>

<DrawerPrimitive.Trigger bind:ref data-slot="drawer-trigger" {...restProps} />
