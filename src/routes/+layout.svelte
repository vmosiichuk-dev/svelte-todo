<script lang="ts">
	import './layout.css';
	let { children } = $props();
</script>

<div class="contain-layout">
	{@render children()}
</div>
