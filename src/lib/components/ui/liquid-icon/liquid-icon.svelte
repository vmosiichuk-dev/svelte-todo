<script lang="ts">
	type Size = 12 | 16 | 24;
	type LiquidIconProps = {
		src: string;
		alt: string;
		size?: Size;
		iconClass?: string | undefined;
		containerClass?: string | undefined;
	};

	const sizes: Record<Size, string> = {
		12: 'h-12 w-12',
		16: 'h-16 w-16',
		24: 'h-24 w-24'
	};

	let {
		src,
		alt,
		size = 12,
		iconClass,
		containerClass
	}: LiquidIconProps = $props();
</script>

<div class={['grid place-content-center', sizes[size], containerClass ]}>
	<img {src} {alt} class={['w-full drop-shadow-liquid', iconClass]} />
</div>
