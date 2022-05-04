<script context="module">
	export const load = async ({ fetch, session, url }) => {
		let fIsAdmin = false;
		let fInitialUserSetting = {}
		let fResource = {};
		if (!['/views/about', '/views/blogs'].includes(url.pathname)) {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_PREFIX}auth/need-login`, {
					method: 'POST',
					body: JSON.stringify({
						pathname: url.pathname,
						session
					})
				});

				if (res.status > 300) {
					return await res.json();
				}

				fIsAdmin = (await res.json())?.data?.accountType === 4;
			} catch (err) {
				throw err
			}
		}

		try {
			fInitialUserSetting = await fetchInitialUserSetting(fetch)
			fResource = await fetchResource(fetch)
		} catch (err) {
			throw err
		}

		return {
			props: {
				fMenuPath: url.pathname,
				fIsAdmin,
				fInitialUserSetting,
				fResource
			}
		};
	};
</script>

<script>
	import '../../../static/style/index.scss';
	import '../../init';
	import Nav from '$components/nav/index.svelte';
	import Header from '$components/header/index.svelte';
	import { onMount } from 'svelte';
	import { config } from '$src/config/config';
	import { AppStore } from '$src/store/app';
	import { LoginInfo } from '$src/store/login-info';
	import JsonParseBigInt from 'json-parse-bigint';
	import { applyResource, fetchResource, t } from '$lib/i18n';
	import { App } from '$lib/constants';
	import { menuList } from '$src/components/nav/helper';
	import { fetchInitialUserSetting } from '$src/services/setting';

	export let fMenuPath;
	export let fIsAdmin;
	export let fInitialUserSetting;
	export let fResource;

	const { notify$ } = AppStore;
	const { currentMenu$ } = LoginInfo;

	LoginInfo.set(fInitialUserSetting);
	applyResource(fResource);

	$: if (fMenuPath) {
		currentMenu$.next(menuList.find((it) => it.page === 'views' && it.path === fMenuPath) || {});
	}
	onMount(() => {
		const evtSource = new EventSource(`${config.messagingServer}/notify`);
		evtSource.onmessage = (event) => {
			notify$.next(JsonParseBigInt(event.data));
		};
	});
</script>

<svelte:head>
	<title>{App.NAME} - {$t($currentMenu$?.name)}</title>
</svelte:head>


<main class="main w-100 h-100">
	<section class="main__nav">
		<div class="main__nav__content h-100">
			<Header/>
		</div>
	</section>

	<section style="padding-top: 6px;" class="main__body">
		<div class="main__body__left">
			<Nav page="views" isAdmin = {fIsAdmin} menuPath={fMenuPath} />
		</div>
		<div class="main__body__center">
			<slot />
		</div>
		<div class="main__body__right">Link</div>
	</section>
</main>
