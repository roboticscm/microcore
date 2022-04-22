<script context="module">
	export const load = async ({ fetch, session, url }) => {
		const res = await fetch(`${import.meta.env.VITE_API_PREFIX}auth/need-admin-login`, {
			method: 'POST',
			body: JSON.stringify({
				pathname: url.pathname,
				session
			})
		});

		if (res.status > 300) {
			return (await res.json()).error;
		}
		await loadResource(fetch);
		return {
			props: {
				menuPath: url.pathname
			}
		};
	};
</script>

<script>
	import '../../../static/style/index.scss';
	import '../../init';
	import Nav from '$components/nav/index.svelte';
	import { onMount } from 'svelte';
	import { config } from '$src/config/config';
	import { AppStore } from '$src/store/app';
	import { LoginInfo } from '$src/store/login-info';
	import JsonParseBigInt from 'json-parse-bigint';
	import { loadResource, t } from '$lib/i18n';
	import { App } from '$lib/constants';
	import { SettingService } from '$src/services/setting';
	import { menuList } from '$src/components/nav/helper';
	import ProgressBar from '$ui/progress-bar/index.svelte';

	export let menuPath;

	const { notify$ } = AppStore;
	const { currentMenu$ } = LoginInfo;

	$: if (menuPath) {
		currentMenu$.next(menuList.find((it) => it.page === 'private' && it.path === menuPath) || {});
	}

	onMount(() => {
		const evtSource = new EventSource(`${config.messagingServer}/notify`);
		evtSource.onmessage = (event) => {
			notify$.next(JsonParseBigInt(event.data));
		};
		SettingService.reloadSettings();
	});

</script>

<svelte:head>
	<title>{App.NAME} - {$t($currentMenu$?.name)}</title>
</svelte:head>

<ProgressBar/>

<main class="main w-100 h-100">
	<section class="main__nav">
		<div class="main__nav__content h-100">
			<Nav page="private" isAdmin = {true}/>
		</div>
	</section>

	<section style="padding-top: 6px;" class="main__body">
		<div class="main__body__left">
			<Nav page="private" isAdmin = {true} embedMode={true} />
		</div>
		<div class="main__body__center">
			<slot />
		</div>
		<div class="main__body__right">Link</div>
	</section>
</main>
