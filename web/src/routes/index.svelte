<script context="module">
	import { loadResource } from '$lib/i18n';
	export const load = async ({session, fetch, url}) => {
		if(session.user) {
			return {
				status: 302,
				redirect: "/views"
			}
		} else {
			const _session = url.searchParams.get('session');
			const needLogin = url.searchParams.get('mode')==='login';
			const refId = url.searchParams.get('rid');
			const resourcePromise = loadResource(fetch);
			await Promise.all([resourcePromise]);
			return {
				status: 200,
				props: {
					loaded: true,
					session: _session,
					needLogin,
					refId
				}
			};
		}
		

		// const res = await fetch('/api/auth/login', {
		//     method: 'post',
		//     body: '{}'
		// });

		// if(res.ok) {
		//     const data = await res.json();
		//     return {
		//         props: {
		//             loaded: true,
		//             data
		//         },
		//     }
		// }

		// return {
		//     status: res.status,
		//     body: {
		//         error: new Error('Unkown error')
		//     }
		// }
	};
</script>

<script>
	import '../../static/style/index.scss';
	import '../init';
	import { onMount } from 'svelte';
	import LoginForm from '/src/components/login/index.svelte';
	import SignupForm from '/src/components/signup/index.svelte';
	import ForgotPasswordForm from '/src/components/forgot-password/index.svelte';
	import ResetPasswordForm from '/src/components/reset-password/index.svelte';
	import { config } from '/src/config/config';
	import { AppStore } from '/src/store/app';
	import JsonParseBigInt from 'json-parse-bigint';
	import { Browser } from '$lib/browser';
	import { locale } from '$lib/i18n';
	import { LoginInfo } from '/src/store/login-info';

	export let loaded = false;
	export let session;
	export let needLogin;
	export let refId;

	const { notify$ } = AppStore;
	let secret = '';
	let token = '';
	let valid = undefined;
	let mode = 'LOGIN';

	const onCheck = () => {
		fetch(`/api/2fa/google-auth`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ secret, token })
		})
			.then(async (res) => {
				const body = await res.json();
				valid = body.valid;
			})
			.catch(() => (valid = false));
	};

	const onChangeMode = (e) => {
		mode = e.detail.mode;
		sessionStorage.setItem('currentPage', mode)
	}
	onMount(() => {
		mode = needLogin ? 'LOGIN' : sessionStorage.getItem('currentPage') || 'LOGIN';
		Browser.getAgentDesc();
		const defaultLocale = Browser.getLocale();
		LoginInfo.locale$.next(defaultLocale);
		$locale = defaultLocale;
		const evtSource = new EventSource(`${config.messagingServer}/notify`);
		evtSource.onmessage = (event) => {
			notify$.next(JsonParseBigInt(event.data));
		};
	});
</script>

{#if loaded}
	{#if session}
		<ResetPasswordForm on:changeMode={onChangeMode} />
	{:else if refId}
		<SignupForm {refId} on:changeMode={onChangeMode} />
	{:else}
		{#if mode === 'LOGIN'}
			<LoginForm on:changeMode={onChangeMode} />
		{:else if mode === 'SIGN_UP'}
			<SignupForm on:changeMode={onChangeMode} />
		{:else}
			<ForgotPasswordForm on:changeMode={onChangeMode} />
		{/if}
	{/if}
{/if}
<!-- <img src="{data.qrcode}" alt="">
<input bind:value = {token} type="text">
<input bind:value = {secret} type="text">
<button on:click={onCheck}>Check</button>
{#if valid == true}
    <div style="color: green;">Accesss granted</div>
{:else if valid == false}
    <div style="color: red;">Access dined!!!</div>
{/if} -->
