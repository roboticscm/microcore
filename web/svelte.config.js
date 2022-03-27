import adapter from '@sveltejs/adapter-node';
import preprocessor from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocessor(),
	kit: {
		adapter: adapter({
			
		}),
	},
	paths: {
		assets: '',
		base: ''
	},
	vite: () => ({})
};

export default config;
