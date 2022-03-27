<script context="module">
	import { loadResource } from '$lib/i18n';
	export const load = async ({ session, fetch }) => {
		const resourcePromise = loadResource(fetch);
		await Promise.all([resourcePromise]);
		return {
			status: 200,
			props: {
				loaded: true
			}
		};

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
	import { config } from '/src/config/config';
	import { AppStore } from '/src/store/app';
	import JsonParseBigInt from 'json-parse-bigint';
	import { Browser } from '$lib/browser';
	import { locale } from '$lib/i18n';

	export let loaded = false;

	const { notify$ } = AppStore;
	let secret = '';
	let token = '';
	let valid = undefined;
	let signupMode = false;

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

	onMount(() => {
		const defaultLocale = Browser.getLocale();
		AppStore.locale$.next(defaultLocale);
		$locale = defaultLocale;
		const evtSource = new EventSource(`${config.messagingServer}/notify`);
		evtSource.onmessage = (event) => {
			notify$.next(JsonParseBigInt(event.data));
		};
	});
</script>

{#if loaded}
	{#if signupMode}
		<SignupForm on:changeMode={(e) => (signupMode = e.detail.signupMode)} />
	{:else}
		<LoginForm on:changeMode={(e) => (signupMode = e.detail.signupMode)} />
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
