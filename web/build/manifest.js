export const manifest = {
	appDir: "_app",
	assets: new Set(["images/favicon.png","images/login-background.png","images/logo.png","style/base/_reset.scss","style/components/_alignment.scss","style/components/_border.scss","style/components/_button.scss","style/components/_common-control.scss","style/components/_dimension.scss","style/components/_floating-input.scss","style/components/_layout.scss","style/components/_menu.scss","style/components/_misc.scss","style/components/_shadow.scss","style/components/_snackbar.scss","style/components/_spacing.scss","style/components/_text-decoration.scss","style/helpers/_mixin.scss","style/helpers/_variables.scss","style/index.scss","style/responsive/_alignment.scss","style/responsive/_grid-system.scss","style/responsive/_margin.scss","style/responsive/_padding.scss","style/themes/_default.scss","style/views/_login.scss"]),
	mimeTypes: {".png":"image/png",".scss":"text/x-scss"},
	_: {
		entry: {"file":"start-edef5d1b.js","js":["start-edef5d1b.js","chunks/vendor-874722da.js","chunks/preload-helper-e4860ae8.js"],"css":[]},
		nodes: [
			() => import('./server/nodes/0.js'),
			() => import('./server/nodes/1.js'),
			() => import('./server/nodes/2.js'),
			() => import('./server/nodes/3.js'),
			() => import('./server/nodes/4.js'),
			() => import('./server/nodes/5.js')
		],
		routes: [
			{
				type: 'page',
				key: "",
				pattern: /^\/$/,
				params: null,
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/api\.json$/,
				params: null,
				load: () => import('./server/entries/endpoints/api.json.js')
			},
			{
				type: 'page',
				key: "about",
				pattern: /^\/about\/?$/,
				params: null,
				path: "/about",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				key: "home",
				pattern: /^\/home\/?$/,
				params: null,
				path: "/home",
				shadow: null,
				a: [0,4,5],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/resource\/find\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/resource/find.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/partner\/validation\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/partner/validation.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/partner\/sign-up\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/partner/sign-up.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/notify\/notify\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/notify/notify.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/auth\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/auth/index.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/auth\/refresh-token\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/auth/refresh-token.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/auth\/validation\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/auth/validation.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/auth\/api\.json$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/auth/api.json.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/auth\/register\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/auth/register.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/auth\/logout\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/auth/logout.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/auth\/login\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/auth/login.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/util\/delete\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/util/delete.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/util\/remove\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/util/remove.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/2fa\/google-auth\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/2fa/google-auth.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/api\/org\/upsert\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/api/org/upsert.js')
			}
		]
	}
};
