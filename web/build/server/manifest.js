export const manifest = {
	appDir: "_app",
	assets: new Set(["images/favicon.png","images/login-background.png","images/logo.png","style/base/_reset.scss","style/components/_alignment.scss","style/components/_border.scss","style/components/_button.scss","style/components/_common-control.scss","style/components/_dimension.scss","style/components/_floating-input.scss","style/components/_layout.scss","style/components/_menu.scss","style/components/_misc.scss","style/components/_shadow.scss","style/components/_snackbar.scss","style/components/_spacing.scss","style/components/_text-decoration.scss","style/helpers/_mixin.scss","style/helpers/_variables.scss","style/index.scss","style/responsive/_alignment.scss","style/responsive/_grid-system.scss","style/responsive/_margin.scss","style/responsive/_padding.scss","style/themes/_default.scss","style/views/_login.scss"]),
	mimeTypes: {".png":"image/png",".scss":"text/x-scss"},
	_: {
		entry: {"file":"start-a0fd4780.js","js":["start-a0fd4780.js","chunks/vendor-874722da.js","chunks/preload-helper-e4860ae8.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "api.json",
				pattern: /^\/api\.json$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api.json.js')
			},
			{
				type: 'page',
				id: "about",
				pattern: /^\/about\/?$/,
				names: [],
				types: [],
				path: "/about",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "home",
				pattern: /^\/home\/?$/,
				names: [],
				types: [],
				path: "/home",
				shadow: null,
				a: [0,4,5],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "api/resource/find",
				pattern: /^\/api\/resource\/find\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/resource/find.js')
			},
			{
				type: 'endpoint',
				id: "api/partner/validation",
				pattern: /^\/api\/partner\/validation\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/partner/validation.js')
			},
			{
				type: 'endpoint',
				id: "api/partner/sign-up",
				pattern: /^\/api\/partner\/sign-up\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/partner/sign-up.js')
			},
			{
				type: 'endpoint',
				id: "api/notify/notify",
				pattern: /^\/api\/notify\/notify\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/notify/notify.js')
			},
			{
				type: 'endpoint',
				id: "api/auth",
				pattern: /^\/api\/auth\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/auth/index.js')
			},
			{
				type: 'endpoint',
				id: "api/auth/refresh-token",
				pattern: /^\/api\/auth\/refresh-token\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/auth/refresh-token.js')
			},
			{
				type: 'endpoint',
				id: "api/auth/validation",
				pattern: /^\/api\/auth\/validation\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/auth/validation.js')
			},
			{
				type: 'endpoint',
				id: "api/auth/api.json",
				pattern: /^\/api\/auth\/api\.json$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/auth/api.json.js')
			},
			{
				type: 'endpoint',
				id: "api/auth/register",
				pattern: /^\/api\/auth\/register\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/auth/register.js')
			},
			{
				type: 'endpoint',
				id: "api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/auth/logout.js')
			},
			{
				type: 'endpoint',
				id: "api/auth/login",
				pattern: /^\/api\/auth\/login\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/auth/login.js')
			},
			{
				type: 'endpoint',
				id: "api/util/delete",
				pattern: /^\/api\/util\/delete\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/util/delete.js')
			},
			{
				type: 'endpoint',
				id: "api/util/remove",
				pattern: /^\/api\/util\/remove\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/util/remove.js')
			},
			{
				type: 'endpoint',
				id: "api/2fa/google-auth",
				pattern: /^\/api\/2fa\/google-auth\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/2fa/google-auth.js')
			},
			{
				type: 'endpoint',
				id: "api/org/upsert",
				pattern: /^\/api\/org\/upsert\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/org/upsert.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
