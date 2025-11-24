import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({ script: true }),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
		}),
		alias: {
			$assets: 'src/lib/assets',
			$components: 'src/lib/components',
			$state: 'src/lib/state',
			$utils: 'src/lib/utils',
			$ui: 'src/lib/components/ui',
		},
	},
};

export default config;
