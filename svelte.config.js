import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({ script: true }),
	kit: {
		adapter: adapter(),
		alias: {
			$assets: 'src/lib/assets',
			$constants: 'src/lib/constants',
			$ui: 'src/lib/components/ui',
			$utils: 'src/lib/utils'
		}
	},
};

export default config;
