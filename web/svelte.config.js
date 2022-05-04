import adapterNode from '@sveltejs/adapter-node';
import preprocessor from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocessor(),
	kit: {
		adapter: adapterNode({
			entryPoint: 'src/server.js'
		}),
		vite: {
			resolve: {
				alias: {
					'$src': path.resolve('./src/'),
					'$icons': path.resolve('./src/icons/'),
					'$components': path.resolve('./src/components/'),
					'$ui': path.resolve('./src/components/ui/')
				}
			},
			server: {
				fs: {
					// Allow serving files from one level up to the project root
					allow: ['..']
				}
			}
		}
	},
	paths: {
		assets: '',
		base: ''
	},
	vite: {
		ssr: {
			noExternal: ['chart.js', '@fortawesome/*']
		},
		server: {
			fs: {
				// Allow serving files from one level up to the project root
				allow: ['..']
			}
		}
	}
};

export default config;
