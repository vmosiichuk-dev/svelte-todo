<script lang="ts">
	type Size = 'xs' | 'sm' | 'md' | 'lg';

	type LiquidIconProps = {
		src: string;
		alt: string;
		size?: Size;
		iconClass?: string;
		containerClass?: string;
	};

	const sizes: Record<Size, string> = {
		xs: 'h-8 w-8',
		sm: 'h-12 w-12',
		md: 'h-16 w-16',
		lg: 'h-24 w-24'
	};

	let {
		src,
		alt,
		size = 'md',
		iconClass = '',
		containerClass = ''
	}: LiquidIconProps = $props();
</script>

<div class={['grid place-content-center', sizes[size], containerClass ]}>
	<img {src} {alt} class={['w-full drop-shadow-liquid', iconClass]} />
</div>
