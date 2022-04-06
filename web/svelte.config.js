import adapter from '@sveltejs/adapter-node';
import preprocessor from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocessor(),
	kit: {
		adapter: adapter({
			
		}),
		vite: {
			resolve: {
				alias: {
					'$src': path.resolve('./src/'),
					'$lib': path.resolve('./src/lib/'),
					'$components': path.resolve('./src/components/')
				}
			}
		}
	},
	paths: {
		assets: '',
		base: ''
	},
	vite: {
		ssr:{
			noExternal: ['chart.js']
		}
	}
};

export default config;
