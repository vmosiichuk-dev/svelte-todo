<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Sun, Moon } from '@lucide/svelte';
	import { Button } from '$ui';

	const iconClasses = 'h-[1.2rem] w-[1.2rem] !transition-all';
	const sunClasses = 'scale-100 rotate-0 dark:scale-0 dark:-rotate-90';
	const moonClasses = 'absolute scale-0 rotate-90 dark:scale-100 dark:rotate-0';
</script>

<Button onclick={toggleMode} variant="outline" size="icon-sm">
	<Sun class={[iconClasses, sunClasses]} />
	<Moon class={[iconClasses, moonClasses]} />
	<span class="sr-only">Toggle theme</span>
</Button>
