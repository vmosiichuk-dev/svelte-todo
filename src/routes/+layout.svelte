<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="grid min-h-dvh w-full items-start gap-4 p-6">
	{@render children()}
</div>
