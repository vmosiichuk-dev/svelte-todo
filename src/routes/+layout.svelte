<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { ModeToggle } from '$ui/mode-toggle';
	import './layout.css';

	let { children } = $props();
</script>

<div class="contain-layout">
	<ModeWatcher />
	<ModeToggle />
	{@render children()}
</div>
