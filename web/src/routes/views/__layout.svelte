<script context="module">
	import { loadResource } from '$lib/i18n';

	export const load = async ({ fetch, session, url }) => {
		// return protectPage(url, session, async () => {
		// 	const resourcePromise = loadResource(fetch);
		// 	await Promise.all([resourcePromise]);
		// 	return {
		// 		status: 200,
		// 		props: {
		// 			loaded: true
		// 		}
		// 	};
		// });

		return {
			status: 200,
			props: {

			}
		}
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
	import { t } from '$lib/i18n';
	import { App } from '$lib/constants';
	import { SettingService } from '$src/services/setting';

	const { notify$ } = AppStore;
	const { currentMenu$ } = LoginInfo;

	onMount(() => {
		const evtSource = new EventSource(`${config.messagingServer}/notify`);
		evtSource.onmessage = (event) => {
			notify$.next(JsonParseBigInt(event.data));
		};
	});

	const reloadSettings = () => {
		SettingService.getInitialUserSetting().then((res) => {
			// console.log(res);
		});
	};
	reloadSettings();
</script>

<svelte:head>
	<title>{App.NAME} - {$t($currentMenu$?.name)}</title>
</svelte:head>

<main class="main w-100 h-100">
	<section class="main__nav">
		<div class="main__nav__content h-100">
			<Nav />
		</div>
	</section>

	<section style="padding-top: 6px;" class="main__body">
		<div class="main__body__left">
			<Nav embedMode={true} />
		</div>
		<div class="main__body__center">
			<slot />
		</div>
		<div class="main__body__right">Link</div>
	</section>
</main>

